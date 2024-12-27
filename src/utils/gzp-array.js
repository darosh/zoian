export async function gzipUint8Array (inputArray) {
  // Step 1: Create a ReadableStream from the Uint8Array
  const inputStream = new ReadableStream({
    start (controller) {
      controller.enqueue(inputArray) // Enqueue the Uint8Array
      controller.close() // Close the stream when done
    }
  })

  // Step 2: Pipe the stream through a CompressionStream
  const compressedStream = inputStream.pipeThrough(new CompressionStream('gzip'))

  // Step 3: Collect the compressed chunks into a single Uint8Array
  const reader = compressedStream.getReader()
  const chunks = []
  let totalLength = 0

  while (true) {
    const { value, done } = await reader.read()
    if (done) break
    chunks.push(value)
    totalLength += value.length
  }

  // Combine all chunks into a single Uint8Array
  const compressedArray = new Uint8Array(totalLength)
  let offset = 0

  for (const chunk of chunks) {
    compressedArray.set(chunk, offset)
    offset += chunk.length
  }

  return compressedArray
}

export async function ungzipUint8Array(compressedArray) {
  // Step 1: Create a ReadableStream from the Uint8Array
  const compressedStream = new ReadableStream({
    start(controller) {
      controller.enqueue(compressedArray); // Enqueue the compressed data
      controller.close(); // Close the stream when done
    }
  });

  // Step 2: Pipe the stream through a DecompressionStream
  const decompressedStream = compressedStream.pipeThrough(new DecompressionStream("gzip"));

  // Step 3: Collect the decompressed chunks into a single Uint8Array
  const reader = decompressedStream.getReader();
  const chunks = [];
  let totalLength = 0;

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    chunks.push(value);
    totalLength += value.length;
  }

  // Combine all chunks into a single Uint8Array
  const decompressedArray = new Uint8Array(totalLength);
  let offset = 0;
  for (const chunk of chunks) {
    decompressedArray.set(chunk, offset);
    offset += chunk.length;
  }

  return decompressedArray;
}
