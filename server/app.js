const express = require('express')
require('dotenv').config()
require('./src/services/db')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const http = require('http')
const Message = require('./src/models/message')
const socketIo = require('socket.io')
const usersRouter = require('./src/routes/users')
const chatRouter = require('./src/routes/chat')
const cors = require('cors')
require('./src/middlewares/auth')

const app = express()
app.set('trust proxy', 1)

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    next()
})

app.use(
 cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    })
)

const server = http.createServer(app)
const io = socketIo(server, {
cors: {
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST'],
    allowedHeaders: ['my-custom-header'],
    credentials: true,
    },
})

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// //Routes
app.use('/api/users', usersRouter)
app.use('/api/chat', chatRouter)

io.on('connection', (socket) => {
    // Join a chat room
    socket.on('join', async ({ chatRoomId }) => {
        socket.join(chatRoomId)
        console.log(`Socket ${socket.id} joined chat room ${chatRoomId}`)
    })

    // Send a message to a chat room
    socket.on('message', async ({ roomId, content, sender }) => {
        try {
            const message = new Message({
                content,
                sender,
                chatRoom: roomId,
            })
            await message.save()
            io.to(roomId).emit('message', message)
        } catch (err) {
            console.error(err)
        }
    })

    // Get all messages for a chat room
    socket.on('get-all-messages', async (chatRoomId, callback) => {
        try {
            const messages = await Message.find({ chatRoom: chatRoomId }).populate('sender', 'name')
            callback(messages)
        } catch (err) {
            console.error(err)
        }
    })

    socket.on('disconnect', () => {
        console.log('Client disconnected')
    })
})

server.listen(process.env.PORT || 3000, () =>
    console.log(`Server running on port ${process.env.PORT || 3000}`)
)

module.exports = app
