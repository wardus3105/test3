// @ts-nocheck
import React from "react";
import jitsiVidelCall from "./video-call.adapter";
import jitsiState from "./video-call.state"
import ChatInputServices from "../../../layout/container/nav-bar/nav-bar-items/nav-main-content/conversation/chat-input/main/chat-input.services"
import ChatInputAdapter from "../../../layout/container/nav-bar/nav-bar-items/nav-main-content/conversation/chat-input/main/chat-input.adapter"
import { IChat } from "../../../layout/container/nav-bar/nav-bar-items/nav-main-content/conversation/main/conversation.props"

const VideoConference = () => {
   //const { roomName  } = props;
   const url_string=window.location.href;
   var url = new URL(url_string);
   var roomId = url.searchParams.get("chatRoomID");
   var roomName = url.searchParams.get("roomName");
   var userId = url.searchParams.get("userId");
   const {
      jitsi,setJitsi
   } = jitsiState()

   const {
      sendMessage,
      initialiseJitsi
   } = jitsiVidelCall()

   const setStateJitsi = (value:any)=>{
      setJitsi(value);
    }
    const data={
        roomName:roomName,
        width:"100%",
        height:"100%",
        displayName:userId,
        email:"vinh.tran@hyperlogy.com",
        setJitsi:setStateJitsi
   }
   
    React.useEffect(() => {     
         let messageSend: IChat = {
            message: "Cuộc gọi đến",
            messageType: "6",
            messageStatus: "1",
            userId: userId,
            user: {
                userName: "Test 1",
                status: "1"
            },
            chatRoomId: roomId
        }
         const response =  sendMessage(messageSend)

         initialiseJitsi(data);

         return () => jitsi?.dispose?.();
    }, []);

    return (     
      <div id="jitsi-container-id" style={{ height: window.outerHeight, width: "100%" }} />
    )
  };

  export default VideoConference;