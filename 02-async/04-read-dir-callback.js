const fs = require('fs')

const directoryPath = `${__dirname}`

fs.readdir(directoryPath, (err, fileList) => {
    if(err) return console.log(err)

    console.log(fileList)
})