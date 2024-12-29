import JSZip from 'jszip'

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

    // Check if file is a ZIP
    if (file.name.toLowerCase().endsWith('.zip')) {
      const zipFiles = await processZipFile(file)
      files.push(...zipFiles)
    } else {
      files.push(file)
    }
  } else if (entry.isDirectory) {
    // Handle folder
    const reader = entry.createReader()
    await readAllDirectoryEntries(reader, files)
  }
}

// Process ZIP file and extract its contents
export async function processZipFile (file) {
  const zipFiles = []
  const zip = new JSZip()

  try {
    const content = await zip.loadAsync(file)

    // Process each file in the ZIP
    const processPromises = []

    content.forEach((relativePath, zipEntry) => {
      // Skip directories
      if (zipEntry.dir) return

      const promise = zipEntry.async('blob')
        .then(blob => {
          // Create a new File object with the correct name and type
          const extractedFile = new File(
            [blob],
            zipEntry.name.trim().split('/').pop(),
            {
              type: getMimeType(zipEntry.name),
              lastModified: zipEntry.date
            }
          )
          zipFiles.push(extractedFile)
        })

      processPromises.push(promise)
    })

    await Promise.all(processPromises)
  } catch (error) {
    console.error('Error processing ZIP file:', error)
  }

  return zipFiles
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

// Helper function to determine MIME type from filename
function getMimeType (filename) {
  const ext = filename.split('.').pop().toLowerCase()
  const mimeTypes = {
    'txt': 'text/plain',
    'pdf': 'application/pdf',
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'gif': 'image/gif',
  }

  return mimeTypes[ext] || 'application/octet-stream'
}
