const fs = require('fs')
const https = require('https')

const fileUrl = 'https://www.fullstackreact.com/assets/images/fullstack-react-hero-book.png'

https.get(fileUrl, res => {
    res
    .pipe(fs.createWriteStream('book-21.png'))
    .on('finish', () => console.log('file saved!'))
})