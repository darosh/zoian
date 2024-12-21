export async function handleDrop (items) {
  const files = []

  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    // Get entry using getAsEntry() or webkitGetAsEntry()
    const entry = item.getAsEntry ? item.getAsEntry() : item.webkitGetAsEntry()

    if (entry) {
      await processEntry(entry, files)
    }
  }

  return files
}

async function processEntry (entry, files) {
  if (entry.isFile) {
    // Handle file
    const file = await getFile(entry)
    files.push(file)
  } else if (entry.isDirectory) {
    // Handle folder
    const reader = entry.createReader()
    await readAllDirectoryEntries(reader, files)
  }
}

// Get file from FileEntry
function getFile (fileEntry) {
  return new Promise((resolve) => {
    fileEntry.file(file => {
      resolve(file)
    })
  })
}

// Read all entries in a directory
async function readAllDirectoryEntries (directoryReader, files) {
  const entries = await readEntriesPromise(directoryReader)

  if (entries.length > 0) {
    // Process each entry
    await Promise.all(entries.map(entry => processEntry(entry, files)))
    // Read next batch of entries
    await readAllDirectoryEntries(directoryReader, files)
  }
}

// Convert directory reader to promise-based
function readEntriesPromise (directoryReader) {
  return new Promise((resolve) => {
    directoryReader.readEntries(entries => {
      resolve(entries)
    })
  })
}
