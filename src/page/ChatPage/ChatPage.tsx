import React from 'react';
import ChatPageContainer from '../../Component/Chat/ChatPageContainer/ChatPageContainer';
import {io} from "socket.io-client";



export const socket = io("http://localhost:4000");

export const ChatPage = () => {

  return (
    <>
      <ChatPageContainer/>
    </>
  );
};
