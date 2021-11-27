const { error } = require('console')
const fs = require('fs')

const filename = '03-read-file-callback.jss'

fs.readFile(filename, (err, fileData) => {
    if (err) return console.error(err)

    console.log(`${filename}: ${fileData.length}`)
})