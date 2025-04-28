import React from 'react'
import MessageList from '../../components/ai/MessageList'
import MessageInput from '../../components/ai/MessageInput'


const Home = () => {
  return (
   <React.Fragment>
   <div className="flex flex-col w-full h-screen bg-background text-text">
      <MessageList />
      <MessageInput />
    </div>
   </React.Fragment>
  )
}

export default Home
