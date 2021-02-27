// @ts-nocheck
import React from "react";
import { URL_PATHS } from '../../../../src/helpers/networking/url-paths';
import axios from "axios";
import { ENUM_KIND_OF_VIDEO_CALL } from '../../Enum/video-call'
import jitsiState from "./video-call.state"
import ReconnectingWebSocket from 'reconnecting-websocket';
import { IChat } from "../../../layout/container/nav-bar/nav-bar-items/nav-main-content/conversation/main/conversation.props"
var config = require('./config.js')
var interfaceConfig = require('./interface_config.js')

const Jitsi = () => {
    const {
        jitsi, setJitsi,
        roomId, setRoomId,
        roomName, setRoomName,
        userId, setUserId
    } = jitsiState()

    const loadJitsiScript = () => {
        let resolveLoadJitsiScriptPromise: any | null = null;

        const loadJitsiScriptPromise = new Promise(resolve => {
            resolveLoadJitsiScriptPromise = resolve;
        });

        const script = document.createElement("script");
        script.src = ENUM_KIND_OF_VIDEO_CALL.LINK_JITSI_MEET_JS;
        script.async = true;
        script.onload = () => resolveLoadJitsiScriptPromise(true);
        document.body.appendChild(script);

        return loadJitsiScriptPromise;
    };

    const initialiseJitsi = async (props: any) => {
        window.onbeforeunload = null;
        const { roomName, width, height, displayName, email, setJitsi } = props;
        if (!window.JitsiMeetExternalAPI) {
            await loadJitsiScript();
        }

        const _jitsi = new window.JitsiMeetExternalAPI(ENUM_KIND_OF_VIDEO_CALL.LINK_JITSI_MEET, {
            roomName: roomName,
            width: width,
            // height: height,            
            // userInfo: {
            //     email: 'email@jitsiexamplemail.com',
            // },
            // jwt: '<jwt_token>',
            devices: {
                audioInput: '<deviceLabel>',
                audioOutput: '<deviceLabel>',
                videoInput: '<deviceLabel>'
            },
            configOverwrite: { startWithAudioMuted: true,enableClosePage:false },
            interfaceConfigOverwrite: interfaceConfig,
            parentNode: document.getElementById("jitsi-container-id")
            //parentNode: a.document.getElementById('jitsi-video-container'),
        });

        //set tên người tham gia phòng chat
        _jitsi.executeCommand('displayName', displayName);
        //set email người tham gia phòng chat
        _jitsi.executeCommand('email', email);

        //hành động tắt cuộc gọi
        _jitsi.addEventListener('readyToClose',  function(){      
            alert('close')    
        });

        //khi đóng cửa số chat
        window.addEventListener('beforeunload', (event) => {
            event.preventDefault();
            event.returnValue = '';    
        });

        setJitsi(_jitsi);
    }; 

    return {
        initialiseJitsi              
    }
}
export default Jitsi