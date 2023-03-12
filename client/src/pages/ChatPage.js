import { useState, useEffect } from 'react'
import MessageList from '../components/MessageList'
import MessageInput from '../components/MessageInput'
import './ChatPage.css'
import io from 'socket.io-client'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { userId, userName } from '../api/Users'
import * as chatApi from '../api/Chat'
import 'react-toastify/dist/ReactToastify.css'

const ChatPage = () => {
  const [messages, setMessages] = useState([])
  const [socket, setSocket] = useState(null)
  const navigate = useNavigate()

  const { id } = useParams()
  const { name } = useLocation().state

  useEffect(() => {
    // connect to socket.io server and join the room
    const socket = io.connect(process.env.REACT_APP_SERVER_URL)
    socket.emit('join', { chatRoomId: id })
    setSocket(socket)

    // listen for incoming messages
    socket.on('message', async (data) => {
      const name = await userName(data.sender)
      data.sender={_id:data.sender,name:name}
      setMessages((prevMessages) => [data, ...prevMessages])
      if (data.sender._id != userId())
        toast.success('New Message Recieve in ' + name)
    })

    // request all messages from the server
    socket.emit('get-all-messages', id, (data) => {
      setMessages(data.reverse())
    })

    // cleanup function to disconnect from socket.io server
    return () => {
      socket.disconnect()
    }
  }, [])

  const leaveRoom = async () => {
    await chatApi.leaveRoom({ room_id: id })
    navigate('/joinedrooms')
  }

  return (
    <div className='ChatPage'>
      <header className='ChatPage-header'>
        <h1 className='ChatPage-title'>Room name :: {name}</h1>
        <button className='leave' onClick={() => leaveRoom()}>
          Leave
        </button>
        <button onClick={() => navigate('/joinedrooms')}>Close</button>
      </header>
      <MessageInput socket={socket} />
      <MessageList messages={messages} />
      <ToastContainer />
    </div>
  )
}

export default ChatPage
