const fs = require('fs')
const express = require('express')

const port = process.env.PORT || 1337

const app = express()

app.get('/', responsedText)
app.get('/json', responsedJson)
app.get('/echo', responsedEcho)
app.get('/static/*', responsedStatic)
app.get('/*', responsedStatic)

app.listen(port, () => console.log(`Server listening on port ${port}`))


function responsedText(req, res) {
    res.setHeader('Content-Type', 'text/plain')
    res.end('hi')
}

function responsedJson(req, res) {
    res.json({ text: 'hi', numbers: [1, 2, 3] })    
}

function responsedEcho(req, res) {

    const {input = ''} = req.query 
    
    res.json({
            normal: input, 
            shouty: input.toUpperCase(),
            characterCount: input.length,
            backwards: input
            .split('')
            .reverse()
            .join('')
        })    
}

function responsedStatic(req, res) {
    const filename = `${__dirname}/public/${req.params[0]}`

    fs.createReadStream(filename)
    .on('error', () => responsedNotFound(req, res))
    .pipe(res)
}

function responsedNotFound(req, res) {
    res.writeHead(404, { 'Content-Type': 'text/plain' })
    res.end('not found')
}