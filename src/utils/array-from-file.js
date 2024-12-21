export function getUint8ArrayFromFile (file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    // Handle the file load event
    reader.onload = () => {
      const arrayBuffer = reader.result // Get ArrayBuffer
      resolve(new Uint8Array(arrayBuffer)) // Convert to Uint8Array
    }

    // Handle errors
    reader.onerror = () => {
      reject(new Error('Failed to read file.'))
    }

    // Read the file as an ArrayBuffer
    reader.readAsArrayBuffer(file)
  })
}
