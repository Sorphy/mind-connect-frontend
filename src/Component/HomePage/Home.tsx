import React from 'react'
import Post from './Post'
import Side from './Side'
import "./home.css"
import Input from './Input'


const Home = () => {
  return (
    <div className="home-section">

      <Input />
      <div className='home'> 
      <Post/>
      <Side/>
    </div>
    </div>
    
  )
}

export default Home