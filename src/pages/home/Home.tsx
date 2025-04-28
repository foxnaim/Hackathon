import React from 'react'
import MessageList from '../../components/ai/MessageList'
import MessageInput from '../../components/ai/MessageInput'


const Home = () => {
  return (
   <React.Fragment>
   <div className="flex flex-col h-screen text-text w-[1000px] mx-auto">
      <MessageList />
      <MessageInput />
    </div>
   </React.Fragment>
  )
}

export default Home
