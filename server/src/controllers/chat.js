const mongoose = require('mongoose')
const ChatRoom = require('../models/chatRoom')
const Message = require('../models/message')

const getAllRooms = async (req, res) => {
  try {
      const userIdObj = mongoose.Types.ObjectId(req.user._id)
      const chatRooms = await ChatRoom.find({
          users: { $not: { $elemMatch: { $eq: userIdObj } } },
      })
      res.status(200).json(chatRooms)
  } catch (err) {
      console.error(err)
      res.status(500).send('Server error')
  }
}

const getMyRooms = async (req, res) => {
  try {
      const chatRooms = await ChatRoom.find({
          users: { $in: [req.user._id] },
      })
      res.status(200).json(chatRooms)
  } catch (err) {
      console.error(err)
      res.status(500).send('Server error')
  }
}

const addNewRoom = async (req, res) => {
  try {
      const { name } = req.body
      const chatRoom = new ChatRoom({ name, users: [req.user._id] })
      await chatRoom.save()
      res.status(201).json(chatRoom)
  } catch (err) {
      console.error(err)
      res.status(500).send('Server error')
  }
}

const joinRoom = async (req, res) => {
  try {
      const { room_id } = req.body
      const chatRoom = await ChatRoom.updateOne(
          { _id: room_id },
          { $push: { users: req.user._id } }
      )
      res.status(201).json(chatRoom)
  } catch (err) {
      console.error(err)
      res.status(500).send('Server error')
  }
}

const leaveRoom = async (req, res) => {
  try {
      const { room_id } = req.body
      const chatRoom = await ChatRoom.updateOne(
          { _id: room_id },
          { $pull: { users: req.user._id } }
      )
      res.status(200).json(chatRoom)
  } catch (err) {
      console.error(err)
      res.status(500).send('Server error')
  }
}

const sendMessage = async (req, res) => {
  try {
      const { content } = req.body
      const message = new Message({
          content,
          sender: req.user._id,
          chatRoom: req.params.id,
      })
      await message.save()
      const chatRoom = await ChatRoom.findByIdAndUpdate(
          req.params.id,
          { $push: { messages: message._id } },
          { new: true }
      )
      res.status(201).json(chatRoom)
  } catch (err) {
      console.error(err)
      res.status(500).send('Server error')
  }
}

module.exports = {getAllRooms, getMyRooms, addNewRoom, joinRoom, leaveRoom, sendMessage}



