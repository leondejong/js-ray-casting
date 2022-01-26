// Formatted by StandardJS

function magnitude (x0, y0, x1, y1) {
  return Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2))
}

function constrainAngle (angle) {
  const pi2 = Math.PI * 2
  const a = angle % pi2
  return a < 0 ? a + pi2 : a
}

function getHeight (direction, angle, magnitude, unit, height) {
  const dir = Math.cos(direction - angle)
  const depth = (magnitude / unit) * dir
  const size = height / depth
  return Math.min(height, size)
}

function getRay (x, y, w, h, u, d, g, length, step, ray, grid) {
  const angle = constrainAngle(g + step * ray)
  const info = castRay(x, y, w, h, u, angle, grid)
  const { magnitude, orientation, type } = info
  const height = getHeight(d, angle, magnitude, u, length)
  return { angle, magnitude, orientation, type, height }
}

function castRay (x, y, w, h, unit, angle, grid) {
  const vc = verticalCollision(x, y, w, h, unit, angle, grid)
  const hc = horizontalCollision(x, y, w, h, unit, angle, grid)
  return vc.magnitude > hc.magnitude ? hc : vc
}

function collision (x, y, w, h, unit, grid) {
  const gx = Math.floor(x / unit)
  const gy = Math.floor(y / unit)
  const gw = Math.floor(w / unit)
  const gh = Math.floor(h / unit)
  return intersection(gx, gy, gw, gh, grid)
}

function intersection (x, y, w, h, grid) {
  if (!(x >= 0 && y >= 0 && x < w && y < h)) return false
  return grid[y][x]
}

function verticalCollision (x, y, w, h, unit, angle, grid) {
  const gy = y / unit
  const north = angle > 0 && angle < Math.PI
  const gridY = north ? Math.ceil(gy) : Math.floor(gy)

  const sy = gridY * unit
  const sx = x - (y - sy) / Math.tan(angle)

  const dy = unit
  const dx = unit / Math.tan(angle)

  if (north) {
    return topCollision(sx, sy, dx, dy, x, y, w, h, unit, grid)
  } else {
    return bottomCollision(sx, sy, dx, dy, x, y, w, h, unit, grid)
  }
}

function horizontalCollision (x, y, w, h, unit, angle, grid) {
  const gx = x / unit
  const east = angle > (Math.PI * 3) / 2 || angle < Math.PI / 2
  const gridX = east ? Math.ceil(gx) : Math.floor(gx)

  const sx = gridX * unit
  const sy = y + (sx - x) * Math.tan(angle)

  const dx = unit
  const dy = unit * Math.tan(angle)

  if (east) {
    return rightCollision(sx, sy, dx, dy, x, y, w, h, unit, grid)
  } else {
    return leftCollision(sx, sy, dx, dy, x, y, w, h, unit, grid)
  }
}

function topCollision (sx, sy, dx, dy, px, py, w, h, unit, grid) {
  for (let step = 0; sy + step * dy <= h; step++) {
    const tx = sx + step * dx
    const ty = sy + step * dy

    const type = collision(tx, ty, w, h, unit, grid)

    if (type) {
      return {
        magnitude: magnitude(px, py, tx, ty),
        orientation: up,
        type
      }
    }
  }

  return { magnitude: Infinity, orientation: 0 }
}

function bottomCollision (sx, sy, dx, dy, px, py, w, h, unit, grid) {
  for (let step = 0; sy - step * dy >= 0; step++) {
    const tx = sx - step * dx
    const ty = sy - step * dy

    const type = collision(tx, ty - unit, w, h, unit, grid)

    if (type) {
      return {
        magnitude: magnitude(px, py, tx, ty),
        orientation: down,
        type
      }
    }
  }

  return { magnitude: Infinity, orientation: 0 }
}

function rightCollision (sx, sy, dx, dy, px, py, w, h, unit, grid) {
  for (let step = 0; sx + step * dx <= w; step++) {
    const tx = sx + step * dx
    const ty = sy + step * dy

    const type = collision(tx, ty, w, h, unit, grid)

    if (type) {
      return {
        magnitude: magnitude(px, py, tx, ty),
        orientation: right,
        type
      }
    }
  }

  return { magnitude: Infinity, orientation: 0 }
}

function leftCollision (sx, sy, dx, dy, px, py, w, h, unit, grid) {
  for (let step = 0; sx - step * dx >= 0; step++) {
    const tx = sx - step * dx
    const ty = sy - step * dy

    const type = collision(tx - unit, ty, w, h, unit, grid)

    if (type) {
      return {
        magnitude: magnitude(px, py, tx, ty),
        orientation: left,
        type
      }
    }
  }

  return { magnitude: Infinity, orientation: 0 }
}
