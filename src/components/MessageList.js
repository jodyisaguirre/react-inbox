import React from 'react'
import Message from './Message'

// deconstructed props. if the curly boi are not there then you would need props.messages
const MessageList = ({messages, toggleStarred, toggleSelected}) => {
// maping through the messages array and passing props to Message Component
// setting this to a variable
  const messageComponents = messages.map(message =>{
    return  <Message key={message.id}
                     id={message.id}
                     labels={message.labels}
                     read ={message.read}
                     selected={message.selected}
                     starred ={message.starred}
                     subject ={message.subject}
                     toggleStarred={toggleStarred}
                     toggleSelected={toggleSelected} />

  })


  return(
      // rendering the stored variable
    <div>

      {messageComponents}
    </div>
  )


}

export default MessageList
