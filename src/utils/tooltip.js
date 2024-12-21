export function getTooltipPosition (blockPosition, tooltipWidth, tooltipHeight, svgWidth, svgHeight, scale, svg) {
  const { x, y, height, width } = blockPosition

  // Get SVG element and its bounding rect
  const svgRect = svg.getBoundingClientRect()

  // Default position (below block)
  let tooltipX = x
  let tooltipY = y + height

  // Check right edge
  if (tooltipX + tooltipWidth > svgWidth) {
    tooltipX = x - tooltipWidth + width
  }

  // Convert tooltip position to screen coordinates to check viewport bounds
  const screenTooltipY = svgRect.top + (tooltipY * scale)

  if (screenTooltipY + (tooltipHeight * scale) > window.innerHeight) {
    // Place above the block instead
    // Convert back from screen to SVG coordinates
    tooltipY = y - tooltipHeight
  }

  // Ensure tooltip doesn't go off the left edge
  tooltipX = Math.max(0, tooltipX)

  // Ensure tooltip doesn't go off the top edge
  tooltipY = Math.max(0, tooltipY)

  return { x: tooltipX, y: tooltipY }
}
