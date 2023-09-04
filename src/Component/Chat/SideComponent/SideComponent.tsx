import React, { useState } from "react";
import "./sidecomponent.css";
import { FiEdit } from "react-icons/fi";
import { ChatSideBar } from "../ChatSideBarComponent/ChatSideBar";

export const SideComponent = () => {
  const [chats, setChats] = useState({
    objects: [
      {
        id: 1,
        image: "src/assets/chatpageImage/chatavatar.png",
        sender: "Silvester Stallon",
        message: "Hello, how are you doing? M...",
        timestamp: "15/12/2022, 1:23PM",
        active: true,
        unreadCount:3

      },
      {
        id: 2,
        image: "src/assets/chatpageImage/saImage.png",
        sender: "Silvester Stallon",
        message: "Hello, how are you doing? M...",
        timestamp: "15/12/2022, 1:23PM",
        active: false,
        unreadCount: 0
      },
      {
        id: 3,
        image: "src/assets/chatpageImage/chatavatar.png",
        sender: "Silvester Stallon",
        message: "Hello, how are you doing? M...",
        timestamp: "15/12/2022, 1:23PM",
        active: false,
        unreadCount: 2
      },
      {
        id: 4,
        image: "src/assets/chatpageImage/saImage.png",
        sender: "Silvester Stallon",
        message: "Hello, how are you doing? M...",
        timestamp: "15/12/2022, 1:23PM",
        active: false,
        unreadCount: 0
      },
      {
        id: 5,
        image: "src/assets/chatpageImage/saImage.png",
        sender: "Silvester Stallon",
        message: "Hello, how are you doing? M...",
        timestamp: "15/12/2022, 1:23PM",
        active: false,
        unreadCount: 2
      },
      {
        id: 6,
        image: "src/assets/chatpageImage/chatavatar.png",
        sender: "Silvester Stallon",
        message: "Hello, how are you doing? M...",
        timestamp: "15/12/2022, 1:23PM",
        active: false,
        unreadCount: 0
      },
      {
        id: 7,
        image: "src/assets/chatpageImage/saImage.png",
        sender: "Silvester Stallon",
        message: "Hello, how are you doing? M...",
        timestamp: "15/12/2022, 1:23PM",
        active: false,
        unreadCount: 0
      },
    ],
  });
  const toggleActive = (id: number) => {
    setChats((prevChat) => {
      if (prevChat.objects && Array.isArray(prevChat.objects)) {
        return {
          ...prevChat,
          objects: prevChat.objects.map((chat: any) => {
            return chat.id === id ? { ...chat, active: !chat.active, unreadCount:0 } : chat
          }),
        };
      }
      return prevChat;
    });
  };
 
  const chatArray = chats.objects.map((chat) => (
    <ChatSideBar
      key={chat.id}
      image={chat.image}
      sender={chat.sender}
      message={chat.message}
      timestamp={chat.timestamp}
      active={chat.active}
      unreadCount={chat.unreadCount}
      toggleActive={()=>toggleActive(chat.id)}
    />
  ));
  return (
    <div className="innerbox1">
      <div className="mininav">
        <h1>Messages</h1>
        <FiEdit className="editStyle" />
      </div>
      {chatArray}
    </div>
  );
};
