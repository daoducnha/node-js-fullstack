const fs = require('fs')
const http = require('http')
const queryString = require('querystring')

const port = process.env.PORT || 1337

const server = http.createServer(function (req, res) {
    if (req.url === '/') return responsedText(req, res)
    if (req.url === '/json') return responsedJson(req, res)
    if (req.url.match(/^\/echo/)) return responsedEcho(req, res)
    if (req.url.match(/^\/static/)) return responsedStatic(req, res)

    responsedNotFound(req, res)
})

server.listen(port)
console.log(`Server listening on port ${port}`)

function responsedText(req, res) {
    res.setHeader('Content-Type', 'text/plain')
    res.end('hi')
}

function responsedJson(req, res) {
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ text: 'hi', numbers: [1, 2, 3] }))
}

function responsedEcho(req, res) {
    const { input = '' } = queryString.parse(
        req.url
            .split('?')
            .slice(1)
            .join('')
    )

    res.setHeader('Content-Type', 'application/json')
    res.end(
        JSON.stringify({
            normal: input, 
            shouty: input.toUpperCase(),
            characterCount: input.length,
            backwards: input
            .split('')
            .reverse()
            .join('')
        })
    )
}

function responsedStatic(req, res) {
    const filename = `${__dirname}/public${req.url.split('static')[1]}`
    fs.createReadStream(filename)
    .on('error', () => responsedNotFound(req, res))
    .pipe(res)
}

function responsedNotFound(req, res) {
    res.writeHead(404, { 'Content-Type': 'text/plain' })
    res.end('not found')
}