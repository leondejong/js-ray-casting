// Formatted by StandardJS

function drawRectangle (ctx, x, y, width, height, color) {
  ctx.fillStyle = color || style
  ctx.fillRect(x, y, width, height)
}

function drawCircle (ctx, x, y, radius, color) {
  ctx.beginPath()
  ctx.fillStyle = color || style
  ctx.arc(x, y, radius, 0, Math.PI * 2)
  ctx.fill()
}

function drawLine (ctx, x0, y0, x1, y1, width, color) {
  ctx.lineWidth = width || 1
  ctx.strokeStyle = color || style
  ctx.beginPath()
  ctx.moveTo(x0, y0)
  ctx.lineTo(x1, y1)
  ctx.stroke()
}

function background (ctx, color) {
  ctx.fillStyle = color || style
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
}

function drawMapBackground (ctx, map, colors) {
  const { x, y, width, height } = map
  const { background } = colors
  drawRectangle(ctx, x, y, width, height, background)
}

function drawSceneBackground (ctx, scene, colors) {
  const { x, y, width, height } = scene
  const { top, bottom } = colors
  drawRectangle(ctx, x, y, width, height / 2, top)
  drawRectangle(ctx, x, y + height / 2, width, height / 2, bottom)
}

function drawMap (ctx, config, map, colors) {
  const { grid } = config
  const { x, y, unit } = map
  const { content } = colors
  grid.forEach((row, h) => {
    row.forEach((type, v) => {
      if (type !== 0) {
        const cx = x + unit * v
        const cy = y + unit * h
        const color = colors[`color${type}`] || content
        drawRectangle(ctx, cx, cy, unit, unit, color)
      }
    })
  })
}

function drawPlayer (ctx, map, player, colors) {
  const { x: mx, y: my } = map
  const { x: px, y: py, radius } = player
  const { player: color } = colors
  drawCircle(ctx, mx + px, my + py, radius, color)
}

function drawRays (ctx, config, scene, map, player, colors, version = 'all') {
  const { grid, step } = config
  const { height: length } = scene
  const { width: w, height: h, unit: u } = map
  const { x, y, gradient: g, direction: o } = player
  for (let ray = 0; ray < config.rays; ray++) {
    const info = getRay(x, y, w, h, u, o, g, length, step, ray, grid)
    const { angle, magnitude, orientation, type, height } = info
    if (version === typeAll || version === typeMap) {
      drawMapRay(ctx, map, player, colors, magnitude, angle, type)
    }
    if (version === typeAll || version === typeScene) {
      drawSceneRay(ctx, config, scene, colors, ray, height, orientation, type)
    }
  }
}

function drawMapRay (ctx, map, player, colors, length, angle, type) {
  const { x: mx, y: my } = map
  const { x: px, y: py } = player
  const x0 = mx + px
  const y0 = my + py
  const x1 = x0 + length * Math.cos(angle)
  const y1 = y0 + length * Math.sin(angle)
  const c = colors[`tint${type}`] || content
  drawLine(ctx, x0, y0, x1, y1, 1, c)
}

function drawSceneRay (ctx, config, scene, colors, position, height, ot, type) {
  const { resolution } = config
  const { x, y, height: h } = scene
  const rx = x + position * resolution
  const ry = y + (h - height) / 2
  const vertical = ot === up || ot === down
  const c1 = colors[`color${type}`] || content
  const c2 = colors[`shade${type}`] || content
  const color = vertical ? c2 : c1
  drawRectangle(ctx, rx, ry, resolution, height, color)
}
