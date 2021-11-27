const fs = require('fs')
const express = require('express')
const EventEmitter = require('events')

const chatEmmiter = new EventEmitter()
const port = process.env.PORT || 1337

const app = express()

app.get('/', responsedText)
app.get('/json', responsedJson)
app.get('/echo', responsedEcho)
app.get('/static/*', responsedStatic)
app.get('/chat', responseChat)
app.get('/sse', responseSSE)
// app.get('/chatlog', reponseChatLog)
// app.get('/previousMessage', reponseChatLog)

app.listen(port, () => console.log(`Server listening on port ${port}`))

function responsedText(req, res) {
    res.setHeader('Content-Type', 'text/plain')
    res.end('hi')
}

function responsedJson(req, res) {
    res.json({ text: 'hi', numbers: [1, 2, 3] })
}

function responsedEcho(req, res) {

    const { input = '' } = req.query

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

function responseChat(req, res) {
    const { message } = req.query

    chatEmmiter.emit('message', message)
    const logfile = `${__dirname}/public/logs.txt`

    fs.appendFile(logfile, message + '\n', (error) => {
        if (error) throw error
        console.log('The "data to append" was appended to file!')
    })

    res.end()
}

function responseSSE(req, res) {

    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive'
    })

    const onMessage = msg => res.write(`data: ${msg}\n\n`)

    chatEmmiter.on('message', onMessage)

    res.on('close', function () {
        chatEmmiter.off('message', onMessage)
    })
}

function responsedNotFound(req, res) {
    res.writeHead(404, { 'Content-Type': 'text/plain' })
    res.end('not found')
}

// function chatLog(message, logFiles) {

// }