function polarToCartesian (centerX, centerY, radius, angleInDegrees) {
  const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0
  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  }
}

export function describeArc (x, y, radius, startAngle, endAngle) {
  const start = polarToCartesian(x, y, radius, endAngle)
  const end = polarToCartesian(x, y, radius, startAngle)

  // For full circle, we need to use two arcs
  if (Math.abs(endAngle - startAngle) >= 360) {
    const middle = polarToCartesian(x, y, radius, startAngle + 180)
    return [
      'M', start.x, start.y,
      'A', radius, radius, 0, 1, 0, middle.x, middle.y,
      'A', radius, radius, 0, 1, 0, start.x, start.y
    ].join(' ')
  }

  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1'

  return [
    'M', start.x, start.y,
    'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y
  ].join(' ')
}
