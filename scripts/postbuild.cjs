const fs = require('fs')
const path = require('path')

// Assuming your project root is one level up from the 'scripts' directory
const projectRoot = path.join(__dirname, '..')
const sourceFile = path.join(projectRoot, 'mockServiceWorker.js')
const destinationFolder = path.join(projectRoot, 'dist')
const destinationFile = path.join(destinationFolder, 'mockServiceWorker.js')

try {
  fs.mkdirSync(destinationFolder, { recursive: true }) // Ensure the dist folder exists
  fs.copyFileSync(sourceFile, destinationFile)
  console.log(`Copied '${sourceFile}' to '${destinationFile}'`)
} catch (error) {
  console.error('Error during file copy:', error)
}
