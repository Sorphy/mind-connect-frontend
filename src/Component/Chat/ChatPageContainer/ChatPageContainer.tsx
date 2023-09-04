import React,{useState} from 'react'
import './chatPageContainer.css'
import { SideComponent } from '../SideComponent/SideComponent'
import { ChatFeed } from '../ChatFeed/ChatFeed'
import { socket } from '../../../page/ChatPage/ChatPage';

const ChatPageContainer = () => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <>
    {!showChat ?(
      <div className="joinChatContainer">
           <h3>Join A Chat</h3>
           <input
             type="text"
             placeholder="John..."
             onChange={(event) => {
               setUsername(event.target.value);
             }}
           />
           <input
             type="text"
             placeholder="Room ID..."
             onChange={(event) => {
               setRoom(event.target.value);
             }}
           />
           <button onClick={joinRoom}>Join A Room</button>
         </div>
    ):(
    <div className='sidebarstyle'>
      <SideComponent />
      <ChatFeed socket={socket} username={username} room={room} />
    </div>
    )}
  </>
  )
}

export default ChatPageContainer