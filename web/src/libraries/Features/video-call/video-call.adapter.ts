// @ts-nocheck
import React from "react";
import { URL_PATHS } from '../../../../src/helpers/networking/url-paths';
import axios from "axios";
var config = require('./config.js')
var interfaceConfig = require('./interface_config.js')
const Jitsi = () =>{
    
    const loadJitsiScript = () => {
        let resolveLoadJitsiScriptPromise: any | null = null;
    
        const loadJitsiScriptPromise = new Promise(resolve => {
          resolveLoadJitsiScriptPromise = resolve;
        });
        
        const script = document.createElement("script");
        script.src = "https://meet.jit.si/external_api.js";
        script.async = true;
        script.onload = () => resolveLoadJitsiScriptPromise(true);
        document.body.appendChild(script);
    
        return loadJitsiScriptPromise;
    };

    const initialiseJitsi = async (props:any) => {

        const { roomName , width , height,displayName,email,setJitsi } = props;
    
        if (!window.JitsiMeetExternalAPI) {
          await loadJitsiScript();
        }

        // //const a=window.open("https://meet.hyperlogy.com/" + roomName, "", "width=1000,height=1000");
        // const a=window.open()
        // a.document.write("<div id='jitsi-video-container'></div>")
        // // a.document.getElementById("jitsi-video-container")

        const _jitsi = new window.JitsiMeetExternalAPI("meet.hyperlogy.com", {
            roomName: roomName,
            // width: width,
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
            interfaceConfigOverwrite:interfaceConfig,
            parentNode: document.getElementById("jitsi-container-id")
            //parentNode: a.document.getElementById('jitsi-video-container'),
        });
    
        _jitsi.executeCommand('displayName', displayName);
        _jitsi.executeCommand('email', email);

        setJitsi(_jitsi);
    };
    
    const sendMessage= async (message: IChat) => {
        console.log("-----Sended---- vinh-", message)
        // return await postInstance(URL_PATHS.SEND_MESSAGE , {
        //     params:{
        //         message:message,
        //     }
        // })
        // .then((res)=> res)
        // .catch((err) => console.log(err))

        return axios({
            method:"POST",
            url:`http://${process.env.REACT_APP_IPADDRESS_API}/${URL_PATHS.SEND_MESSAGE}`,
            headers: { 
                "content-type": 'application/json',
            },
            data: message,
            timeout:30000  
        })
        .then((res)=> console.log(res))
        .catch((err) => console.log(err))
    }

    return { 
        sendMessage,
        initialiseJitsi
    }
}
export default Jitsi