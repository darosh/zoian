export function generateStarPath(r) {
  // Angle between points (in radians)
  const angle = (2 * Math.PI) / 5;
  // Inner radius (for star points)
  const innerRadius = r * 0.382; // Golden ratio approximation

  let path = '';

  // Generate 10 points alternating between outer and inner radius
  for (let i = 0; i < 10; i++) {
    // Current angle
    const currentAngle = (i * angle) / 2 - Math.PI / 2;
    // Use outer radius for even indices, inner radius for odd
    const currentRadius = i % 2 === 0 ? r : innerRadius;
    // Calculate point coordinates
    const x = currentRadius * Math.cos(currentAngle);
    const y = currentRadius * Math.sin(currentAngle);

    // First point moves to, others draw lines
    path += i === 0 ? `M ${x},${y}` : ` L ${x},${y}`;
  }

  // Close the path
  return path + ' Z';
}
