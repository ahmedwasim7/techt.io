import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { userId } from '../api/Users'
import './MessageInput.css'

const MessageInput = ({ socket }) => {
  const [inputValue, setInputValue] = useState('')
  const { id } = useParams()

  const handleInputChange = event => {
    setInputValue(event.target.value)
  }

  const handleSubmit = event => {
    event.preventDefault()
    socket.emit('message', {
      roomId: id,
      sender: userId(),
      content: inputValue,
    })
    setInputValue('')
  }

  return (
    <form className="MessageInput" onSubmit={handleSubmit}>
      <input
        className="MessageInput-input"
        type="text"
        placeholder="Type your message here"
        value={inputValue}
        onChange={handleInputChange}
      />
      <button className="MessageInput-button" type="submit">
        Send
      </button>
    </form>
  )
}

export default MessageInput
