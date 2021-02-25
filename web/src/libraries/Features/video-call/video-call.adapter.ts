// @ts-nocheck
import React from "react";
import { URL_PATHS } from '../../../../src/helpers/networking/url-paths';
import axios from "axios";
import { ENUM_KIND_OF_VIDEO_CALL } from '../../Enum/video-call'
import jitsiState from "./video-call.state"
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
        const { roomName, width, height, displayName, email, setJitsi } = props;
        if (!window.JitsiMeetExternalAPI) {
            await loadJitsiScript();
        }

        // //const a=window.open("https://meet.hyperlogy.com/" + roomName, "", "width=1000,height=1000");
        // const a=window.open()
        // a.document.write("<div id='jitsi-video-container'></div>")
        // // a.document.getElementById("jitsi-video-container")

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
            configOverwrite: { startWithAudioMuted: true },
            interfaceConfigOverwrite: interfaceConfig,
            parentNode: document.getElementById("jitsi-container-id")
            //parentNode: a.document.getElementById('jitsi-video-container'),
        });

        _jitsi.executeCommand('displayName', displayName);
        _jitsi.executeCommand('email', email);

        setJitsi(_jitsi);
    };

    const sendMessage = async (message: IChat) => {
        return axios({
            method: "POST",
            url: `http://${process.env.REACT_APP_IPADDRESS_API}/${URL_PATHS.POST_MESSAGE}`,
            headers: {
                "content-type": 'application/json',
            },
            data: message,
            timeout: 30000
        })
            .then((res) => res)
            .catch((err) => console.log(err))

    }

    return {
        sendMessage,
        initialiseJitsi
                
    }
}
export default Jitsi