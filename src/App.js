import React, { Component } from 'react';
import './App.css';
import MessageList from './components/MessageList'
import ToolBar from './components/ToolBar'
import NewMessages from './components/NewMessages'
class App extends Component {
  state={
      messages:[],
      showMessage: false,
      sendMessage: true,
      selectedClass:false,



    }
    componentDidMount() {
      fetch('http://localhost:8082/api/messages')
      .then (response => response.json())
      .then(messages =>{
        console.log(messages)
        this.setState

        ({messages : messages})

      })

    }
  toggleCompose = () => {

    this.setState ({
      showMessage: !this.state.showMessage
    })
  }



    handleChange = (e) => {
      this.setState({
        subjectValue: e.target.value
      })
    }

    handleBody = (e) => {
        this.setState({
          bodyValue: e.target.value
        })
    }

    sendIt = async(e) => {
      e.preventDefault();
      console.log('hiiii')
        const url = 'http://localhost:8082/api/messages'
        const payload = {
          subject: this.state.subjectValue,
          body: this.state.bodytValue,
          read: false,
          starred: false,
          labels: [],
          selected: false
        }
        await fetch(url,{
          method: 'post',
          headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
          body: JSON.stringify(payload)
        }).then(function (response) {
          return response.json();
        }).then(res=> {
          this.setState({
            messages: this.state.messages.concat(res)
          })
        } )
      }

  toggleSelected = (id) => {

    const match= this.state.messages.find(msg => msg.id === id)
    match.selected = !match.selected
    this.setState ({
      messages: this.state.messages
    })
  }



  sendItRead = () => {
    const messageIds= this.filterSelected()
    fetch('http://localhost:8082/api/messages',{
        method:'PATCH',
        headers:{
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          messageIds: messageIds,
          command:'read',
          read: true
        })
      })
      .then(response => response.json())
      .then(newMessages => {
        this.setState({
          messages: newMessages
        })
      })
    }
    sendItUnRead = () => {
      const messageIds= this.filterSelected()
      fetch('http://localhost:8082/api/messages',{
          method:'PATCH',
          headers:{
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            messageIds: messageIds,
            command:'read',
            read: false
          })
        })
        .then(response => response.json())
        .then(newMessages => {
          this.setState({
            messages: newMessages
          })
        })
      }


    filterSelected = () => {
      const array= this.state.messages
      const newArray =[]
      for (var i = 0; i< array.length; i++ ){
        if(array[i].selected === true){
          newArray.push(array[i].id)
        }
      }
      return newArray
    }


















  toggleStarred = (messageId) => {
    fetch('http://localhost:8082/api/messages',{
      method:'PATCH',
      headers:{
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        messageIds: [messageId],
        command:'star'
      })
    })
    .then(response => response.json())
    .then(newMessages => {
      this.setState({
        messages: newMessages
      })
    })
  }



  render() {
    return (
    <div className = "App">
      <ToolBar toggleCompose={this.toggleCompose}
                sendItRead={this.sendItRead}
                sendItUnRead={this.sendItUnRead}
      />
        {this.state.showMessage && <NewMessages
          handleBody={this.handleBody}
          handleChange={this.handleChange}
          sendIt={this.sendIt} />}
      <MessageList
        messages={this.state.messages}
        toggleSelected={this.toggleSelected}
        toggleStarred={this.toggleStarred}  />
    </div>
    )
  }
}

export default App;
