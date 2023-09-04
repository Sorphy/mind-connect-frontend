
import React,{useState,useEffect, ReactNode}  from 'react'
import './chatfeed.css'
import  { OptionModal} from '../OptionModal/OptionModal'
import saImage from "../../../assets/chatpageImage/saImage.png";
import {MdOutlineAttachment} from 'react-icons/md';
import ScrollToBottom from 'react-scroll-to-bottom'
export const ChatFeed = (props:any) => {
  
  const [currentMessage, setCurrentMessage ]= useState("")
  const [messageList, setMessageList] =useState<{
    timeStamp: ReactNode;
    author: any; message: any 
}[]>([]);

const sendMessage = async()=>{
  if (currentMessage !== ""){
const messageData={
  room:props.room,
  author:props.username,
  message:currentMessage,
  timeStamp:new Date(Date.now()).getHours() + ":" +new Date(Date.now()).getMinutes()
}
await props.socket.emit("send_message", messageData)
  setMessageList((list) => [...list, messageData])
  setCurrentMessage("")
}    
}




useEffect(() => {
  props.socket.on("receive_message", (data:any) => {
    setMessageList((list) => [...list, data])
  });
}, [props.socket]);



  return (
          <div className="innerbox2">
        <div className='mininav'>
  <h1>Silvester Stallon</h1>
  <h4 className="active">Active</h4>
  <OptionModal />
</div>
<section className="messages">
  <ScrollToBottom className='scroll' >
{messageList.map((messageContent, index) => (

          <div key={index} className="sendersmessage">
            <img src={saImage} alt="Sender" />
            <div>
        {props.username === messageContent.author ?(
              <div className="chattext"  >
                <p>{messageContent.message}</p>
                <p className='time'>{messageContent.timeStamp}</p>
              </div>
 ) :(
    <div className="chattext2">
      <p className='receiversmessage'>{messageContent.message}</p>
      <p className='time2'>{messageContent.timeStamp}</p>
      </div>
)}
    </div> 
    </div>
    ))}
    </ScrollToBottom>
        </section>

        <div className="inputmessageBox">
        <MdOutlineAttachment size={20} color="#757575"/>
        <div className='messageInputdiv'>
          <input 
          type="text" 
          value={currentMessage}
        placeholder='Type a message' 
        className='messageInput'
        onChange={(event) => {
          setCurrentMessage(event.target.value);
        }}
        onKeyPress={(event) => {
          event.key === "Enter" && sendMessage();
        }}
        >
        </input>
        </div>
        <div className='messageInputbutton'>
        <button  className="input-button" onClick={sendMessage}>Send</button>
          </div>
        </div>
</div>
  )
}


