// Convert Uint8Array to base64
export function uint8ArrayToBase64 (uint8Array) {
  return btoa(String.fromCharCode.apply(null, uint8Array))
}

// Convert base64 to Uint8Array
export function base64ToUint8Array (base64String, length) {
  const binaryString = atob(base64String)
  const uint8Array = new Uint8Array(length || binaryString.length)
  for (let i = 0; i < binaryString.length; i++) {
    uint8Array[i] = binaryString.charCodeAt(i)
  }
  return uint8Array
}

export function removePadding (base64String) {
  return base64String.replace(/={1,2}$/, '')
}

// Calculate missing padding
function calculateBase64Padding (strLength) {
  return (4 - (strLength % 4)) % 4
}

// Add padding back to base64 string
export function addBase64Padding (base64WithoutPadding) {
  const paddingLength = calculateBase64Padding(base64WithoutPadding.length)
  return base64WithoutPadding + '='.repeat(paddingLength)
}
