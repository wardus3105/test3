// @ts-nocheck
import React from "react";
import jitsiVidelCall from "./video-call.adapter";
import jitsiState from "./video-call.state"
import ChatInputServices from "../../../layout/container/nav-bar/nav-bar-items/nav-main-content/conversation/chat-input/main/chat-input.services"
import ChatInputAdapter from "../../../layout/container/nav-bar/nav-bar-items/nav-main-content/conversation/chat-input/main/chat-input.adapter"
import { IChat } from "../../../layout/container/nav-bar/nav-bar-items/nav-main-content/conversation/main/conversation.props"
import { ENUM_KIND_OF_MESSAGE } from '../../Enum/message'
import { ENUM_KIND_OF_STATUS } from '../../Enum/status'
import { ENUM_KIND_OF_MESSAGE_VIDEO_CALL,ENUM_TYPE_STATUS_VIDEO_CALL } from '../../Enum/video-call'
import { ENUM_KIND_OF_TYPE_VIDEO_CALL } from '../../Enum/type-video-call'
import videoCallService from "./video-call.service";
import ReconnectingWebSocket from 'reconnecting-websocket';

var sockets: ReconnectingWebSocket[] = [];
var socket: ReconnectingWebSocket;
const options = {
  WebSocket: WebSocket, // custom WebSocket constructor
  connectionTimeout: 1000,
  maxRetries: 10,
};
socket = new ReconnectingWebSocket(
  `ws://172.20.50.77:31000/ws?Channels=` + localStorage.getItem('userId'),
  [],
  options
);

const VideoConference = () => {
   //const { roomName  } = props;
   // const url_string=window.location.href;
   // var url = new URL(url_string);
   // var roomId = url.searchParams.get("chatRoomID");
   // var roomName = url.searchParams.get("roomName");
   // var userId = url.searchParams.get("userId");
   const {
      jitsi, setJitsi,
      roomId, setRoomId,
      roomName, setRoomName,
      userId, setUserId,
      isCall, setIsCall
   } = jitsiState()

   const {
      initialiseJitsi
   } = jitsiVidelCall()

   const {
      sendMessage,
      getUserById
   } = videoCallService()

   const setStateJitsi = (value: any) => {
      setJitsi(value);
   }
   
   
   const data = {
      roomName: roomName,
      width: "100%",
      height: "100%",
      setJitsi: setStateJitsi
   }
   
   React.useEffect(() => {
      //Lấy thông tin người đăng nhập
      (async () => {
         const response=await getUserById(userId);
         // data.displayName=response.data.lastName + " " + response.data.firstName
         if(response && response.data && response.data.email){
            data.email=response.data.email
         }
       })();   

       //Nếu là người tạo cuộc gọi gửi request call video
      if (isCall == "1") {
         let messageSend: IChat ={
            message: ENUM_KIND_OF_MESSAGE_VIDEO_CALL.CREATE_CALL_VIDEO,
            messageType: ENUM_KIND_OF_MESSAGE.VIDEO_CALL,
            messageStatus: ENUM_KIND_OF_STATUS.ACTIVE,
            userId: userId,
            chatRoomId: roomName,
            typeVideoCall: ENUM_KIND_OF_TYPE_VIDEO_CALL.PRIVATE
         }
         sendMessage(messageSend)
      }
      //khởi tạo cuộc gọi
      initialiseJitsi(data);

      socket.onmessage = (message) => {
         debugger
         var data = JSON.parse(decodeURIComponent(JSON.parse(message.data).text));
         if(data.value.statusVideoCall===ENUM_TYPE_STATUS_VIDEO_CALL.NOT_LISTEN_CALL_VIDEO){
            
         }
       };
       return () => jitsi?.dispose?.();
   }, []);



   return (
      <div id="jitsi-container-id" style={{ height: window.outerHeight, width: "100%" }} />
   )
};

export default VideoConference;