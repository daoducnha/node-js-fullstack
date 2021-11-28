const fs = require('fs').promises

printLenghts('./')

async function printLenghts(dir) {
    const fileList = await fs.readdir(dir)

    const results = fileList.map(
        async file => await fs.readFile(file).then(data => [file, data.length])
    )

    results.forEach(result => console.log(`${result[0]}: ${result[1]}`))

    console.log('done')
}