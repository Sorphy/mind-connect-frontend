import React from 'react'

import './chatsidebar.css'

export const ChatSideBar = (props:any) => {

   
    const styles = {
        borderLeft: props.active ? "4px solid #175CD3" : "none", ...(props.active && { 
        
            backgroundColor:'#EAECF0',
            width:"100%"
         }),
    }
    const stylesUnread = {
    color: props.unreadCount > 0 ? "#175CD3" : ""
    }
  return (
    
    <div className="chats" onClick={()=>props.toggleActive(props.id)} style={styles} >
    <div className="userchats">
        <img src={props.image} className='chatavatarimg'/>
        <div className="userchatsinfo" >
        <span>{props.sender}</span>
        <p style={stylesUnread}>{props.timestamp}</p>
        <div className="chatmessage"><p>{props.message}</p>
        {props.unreadCount > 0 && <b>{props.unreadCount}</b>}
        </div>
        </div>
        </div>
    
    <hr/>
     

{/*      
    <div className="chats--unread">
    <div className="userchats">
        <img src={saImage} className='chatavatarimg'/>
        <div className="userchatsinfo" >
        <span>Silvester Stallon</span>
        <p className='time'>15/12/2022, 1:23PM</p>
        <div className="chatmessage">
            <p>Hello, how are you doing? M...</p>
            <b>1</b>
            </div>
        </div>
    </div>
    </div>
    <hr/> */}
     
  
    </div>
  )
}

export default ChatSideBar