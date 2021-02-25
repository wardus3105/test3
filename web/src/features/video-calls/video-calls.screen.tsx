import React, { useState } from 'react';
import CircleAvatarScreen from '../../libraries/Features/circle-avtar/circle-avatar.screen';
import ModalScreen from '../../libraries/Features/modal/modal.screen';
import VideoCallsStates from './video-calls.states';
import "./video-calls.scss";

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

socket.onopen = () => {
  // connection opened
  console.log("test_Connected");
  console.log(`test_ws://172.20.50.77:31000/ws?Channels=` + localStorage.getItem('userId'));
};
const VideoCallScreen = (props: any) => {
  return (
    <div className="videocall-container">
      <div className="videocall-top">
        <CircleAvatarScreen
          isOnline={false}
          src={"https://png.pngtree.com/element_our/20190530/ourlarge/pngtree-520-couple-avatar-boy-avatar-little-dinosaur-cartoon-cute-image_1263411.jpg"}
          class=""
          width="90px"
          height="90px"
        ></CircleAvatarScreen>
      </div>
      <div className="div-subheading-semibold">
        <span className="subheading-semibold">
          {props.username}
        </span>
      </div>
      <div className="div-subtitle-hint">
        <span className="subtitle-hint">Đang gọi tới</span>
      </div>
      <div className="videocall-bottom flex-center">
        <button className="btn-outline" onClick={props.close} >Từ chối</button>

        <button onClick={props.start}>Trả lời</button>
      </div>
    </div>
  )
}

function VideoCallsScreen() {
  const {
    videoCallsIsDisplayed, setVideoCallsIsDisplayed,
    name, setName,
    data, setData
  } = VideoCallsStates()

  React.useEffect(() => {
    socket.onmessage = (message) => {
      var json = JSON.parse(decodeURIComponent(JSON.parse(message.data).text));
      if (localStorage.getItem('userId') !== json.value.userId) {
        setVideoCallsIsDisplayed(true)
        setName("VLL")
        setData(json)
      }
    };
  });

  const start = () => {
    if (localStorage.getItem('userId') !== data.value.userId) {
      setVideoCallsIsDisplayed(false)
      window.open(window.location.protocol + "/video-call?roomName=" + data.value.chatRoomId + "&userId=" + localStorage.getItem('userId') + "&isCall=0", "_blank", "width=1000,height=1000");
    }
  }
  const eleContextSignout = (close: any) => {
    return (
      <VideoCallScreen start={start} username={name} close={close}></VideoCallScreen>
    )
  }

  return (

    <ModalScreen
      headerContent={"Cuộc gọi video tới"}
      hasPadding={true}
      contextHasClose={eleContextSignout}
      open={videoCallsIsDisplayed}
    >
      <></>
    </ModalScreen>
  );
}

export default VideoCallsScreen;



