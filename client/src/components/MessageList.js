import './MessageList.css'

const MessageList = props => {
  const { messages } = props

  return (
    <div className="MessageList">
      {messages.map( message => {
        const date = new Date(message.createdAt);
        const formattedDate = date.toLocaleDateString()
        const formattedTime = date.toLocaleTimeString()

        return(
        <div className="Message" key={message.id}>
          <h5>{message.content}</h5>
          <p className="Message-author">{'user: ' + message.sender.name}</p>
          <p className="Message-author">{formattedDate + ' ' + formattedTime}</p>
        </div>
        )
})}
    </div>
  )
}

export default MessageList
