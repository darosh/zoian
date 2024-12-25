interface Point {
  x: number
  y: number
}

interface CableOptions {
  bendFactor?: number // How much the cable bends (0-1, default: 0.5)
  tension?: number // How "tight" the cable is (0-1, default: 0.5)
  gravity?: number // Downward pull on the cable (0-1, default: 0.2)
}

// Straight cable
export const straightCable = {
  bendFactor: 0.3,
  tension: 0.8,
  gravity: 0,
}

// Loose cable with gravity
export const looseCable = {
  bendFactor: 0.7,
  tension: 0.3,
  gravity: 0.3,
}

// Natural cable
export const naturalCable = {
  bendFactor: 0.5,
  tension: 0.5,
  gravity: 0.15,
}

export function getCablePath(start: Point, end: Point, options: CableOptions = {}): string {
  const {
    bendFactor = 0.1,
    tension = 0.8,
    gravity = 0.1,
  } = options

  const isVertical = start.x === end.x
  // Calculate the distance between points
  const dx = end.x - start.x
  const dy = end.y - start.y
  const distance = Math.sqrt(dx * dx + dy * dy)

  // Calculate control points with parallel offset
  const controlDistance = distance * (isVertical ? bendFactor * 5 : bendFactor)

  // Calculate midpoint for offset application
  const midPoint = {
    x: (start.x + end.x) / 2,
    y: (start.y + end.y) / 2,
  }

  // Base control points
  const control1: Point = {
    x: start.x + controlDistance * (dx > 0 ? 0.5 : -0.5),
    y: start.y + controlDistance * 0.2,
  }

  const control2: Point = {
    x: end.x - controlDistance * (dx > 0 ? 0.5 : -0.5),
    y: end.y - controlDistance * 0.2,
  }

  // Apply tension
  const tensionFactor = tension * (1 - Math.min(1, distance / 500))

  control1.x = control1.x * (1 - tensionFactor) + midPoint.x * tensionFactor
  control1.y = control1.y * (1 - tensionFactor) + midPoint.y * tensionFactor
  control2.x = control2.x * (1 - tensionFactor) + midPoint.x * tensionFactor
  control2.y = control2.y * (1 - tensionFactor) + midPoint.y * tensionFactor

  // Apply gravity (reduced for vertical connections)
  const gravityPull = distance * gravity * (isVertical ? 0.3 : 1)

  if (!isVertical) {
    control1.y += gravityPull
    control2.y += gravityPull
  }

  return `M ${start.x} ${start.y} C ${control1.x} ${control1.y}, ${control2.x} ${control2.y}, ${end.x} ${end.y}`
}
