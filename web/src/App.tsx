import React, { useEffect, useState } from "react";
import "./App.scss";
import "./libraries/Styles/base/hyper-input.scss";
import "./libraries/Styles/base/hyper-common.scss";
import "./libraries/Styles/base/hyper-list.scss";
import "./libraries/Styles/base/hyper-button.scss";
import HeaderScreen from "./layout/header/header.screen";
import BodyScreen from "./layout/container/body.screen";
import "font-awesome/css/font-awesome.min.css";

import ReconnectingWebSocket from "reconnecting-websocket";


var sockets: ReconnectingWebSocket[] = [];
var socket: ReconnectingWebSocket;

const options = {
  WebSocket: WebSocket, // custom WebSocket constructor
  connectionTimeout: 1000,
  maxRetries: 10,
};

function App() {
  const [hasNavbar, setHasNavbar] = useState<boolean>(true);

  const pushStreamService = {
    // subAllChats: (userChats: User[]) => {
    //   pushStreamService.closeAllSocket();
    //   for (let i = 0; i < userChats.length; i++) {
    //     pushStreamService.subChat(userChats[i].id);
    //   }
    // },

    // subChannelSystem: () => {
    //   pushStreamService.subChat('CHANNEL_ACTIVITIES');
    // },

    messageReceived: (message: any) => {
      console.log("-----Message Received-----");
      console.log(message);
    },

    subChat: (userId: string) => {
      console.log("-----Sub chat-----");
      console.log(`ws://172.20.50.77:31000/ws?Channels=` + userId);
      socket = new ReconnectingWebSocket(
        `ws://172.20.50.77:31000/ws?Channels=` + userId,
        [],
        options
      );

      socket.onopen = () => {
        // connection opened
        console.log("test_Connected");
        console.log(`test_ws://172.20.50.77:31000/ws?Channels=` + userId);
      };

      socket.onmessage = (e) => {
        console.log("-----on message");
        pushStreamService.messageReceived(
          decodeURIComponent(JSON.parse(e.data).text)
        );
      };

      socket.onerror = (e: any) => {
        // an error occurred
        console.log("test_socket_err: ", e);
        // socket.close();
        // clearInterval();
        // setTimeout(function() {
        // pushStreamService.subChat(userId);
        // }, 1000);
      };

      socket.onclose = (e: any) => {
        console.log(
          "test_Socket is closed. Reconnect will be attempted in 1 second.",
          e.reason
        );
      };
      // sockets.push(ws);
    },
    closeSocket: () => {
      console.log("test_closeSocket");
      socket.close();
    },
    closeAllSocket: () => {
      console.log("test_closeAllSocket");
      sockets.map((s) => s.close());
    },
  };

  const toggleNavbar = () => {
    setHasNavbar((prev) => !prev);
  };

  // useEffect(() => {
  //   console.log('test_init_app...');
  //   // localStorage.setItem('userId', "189cbce2-4532-4c0e-9e68-2e4fec9351e2");
  //   const userId: string = localStorage.getItem("userId") || "";
  //   if(userId){
  //     pushStreamService.subChat(userId);
  //   }
  // }, []);

  return (
    <>
      <HeaderScreen toggleNavbar={toggleNavbar}></HeaderScreen>

      <BodyScreen
        hasNavbar={hasNavbar}
      ></BodyScreen>
    </>
  );
}

export default App;
