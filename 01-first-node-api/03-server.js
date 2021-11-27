const http = require('http')
const port = process.env.PORT || 1337


function responsedText(req, res) {
    res.setHeader('Content-Type', 'text/plain')
    res.end('hi')
}

function responsedJson(req, res) {
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({text: 'hi', numbers: [1,2,3]}))
}

function responsedNotFound(req, res) {
    res.writeHead(404, {'Content-Type': 'text/plain'})
    res.end('not found')
}

const server = http.createServer(function(req, res) {
    if(req.url === '/') return responsedText(req, res)
    if(req.url === '/json') return responsedJson(req, res)

    responsedNotFound(req, res)
})

server.listen(port)
console.log(`Server listening on port ${port}`)