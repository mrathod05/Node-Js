const express = require('express')
const { events } = require('./Products')
const EventEmitter = require('events')

const app = express()
const event = new EventEmitter()

let Count = 0

event.on('Count API',()=>{
    Count++
     console.log("Counted",Count)
})

app.get('/', (req, res) => {
    console.log("API-called")
    res.send('Hello World!')
    event.emit("Count API",Count)
})

app.listen(2006)