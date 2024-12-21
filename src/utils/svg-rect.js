export function svgRect({ left, right, size, radius }) {
  const { width, height } = size;

  // Clamp radius
  const r = Math.min(radius, width / 2, height / 2);

  // Start from top-left
  const path = [];

  // Top line
  if (left) {
    path.push(`M ${r},0`); // Start after curve
    path.push(`h ${width - (left && right ? 2 * r : r)}`); // Adjust width for both sides if needed
  } else {
    path.push(`M 0,0`); // Start at corner
    path.push(`h ${width - (right ? r : 0)}`); // Top line
  }

  // Right side
  if (right) {
    path.push(`a ${r},${r} 0 0 1 ${r},${r}`); // Top-right curve
    path.push(`v ${height - 2 * r}`); // Right line
    path.push(`a ${r},${r} 0 0 1 ${-r},${r}`); // Bottom-right curve
  } else {
    path.push(`v ${height}`); // Straight down
  }

  // Bottom line
  if (left) {
    path.push(`h ${-(width - (left && right ? 2 * r : r))}`); // Mirror top line adjustment
  } else {
    path.push(`h ${-(width - (right ? r : 0))}`); // Bottom line
  }

  // Left side
  if (left) {
    path.push(`a ${r},${r} 0 0 1 ${-r},${-r}`); // Bottom-left curve
    path.push(`v ${-(height - 2 * r)}`); // Left line
    path.push(`a ${r},${r} 0 0 1 ${r},${-r}`); // Top-left curve
  } else {
    path.push(`v ${-height}`); // Straight up
  }

  return path.join(" ") + " Z";
}
