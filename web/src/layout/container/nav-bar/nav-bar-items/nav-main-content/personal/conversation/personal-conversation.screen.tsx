// @ts-nocheck
import React from 'react';
import DetailPopupScreen from '../../../../../../../libraries/Features/popup/detail-popup/detail-popup.screen';
import MainPopupScreen from '../../../../../../../libraries/Features/popup/main-popup/main-popup.screen';
import TooltipScreen from '../../../../../../../libraries/Features/tooltip/tooltip.screen';
import { ReactComponent as IconVideoCircleLine } from '../../../../../../../libraries/Icons/video-circle-line.svg';
import jitsiVidelCall from '../../../../../../../libraries/Features/video-call/video-call.adapter'
import jitsiState from '../../../../../../../libraries/Features/video-call/video-call.state'
import VideoConference from '../../../../../../../libraries/Features/video-call/video-call.screen'
import useIdInPath from "../../../../../../../libraries/Hooks/useIdInPath"
import { useLocation } from "react-router-dom";
import ReconnectingWebSocket from 'reconnecting-websocket';

import PersonalConversationAdapter from './personal-conversation.adapter'
const iconVolumeOff = require('../../../../../../../libraries/Icons/volume-off.svg').default;
const iconMoreVertical = require('../../../../../../../libraries/Icons/more-vertical.svg').default;
const iconSearchLoupe = require('../../../../../../../libraries/Icons/search-loupe.svg').default;
const iconTrashDeleteBin = require('../../../../../../../libraries/Icons/trash-delete-bin.svg').default;
const iconVideoCircleLine = require('../../../../../../../libraries/Icons/video-circle-line.svg').default;



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

function PersonalConversationScreen() {
    var roomId=useIdInPath(2);
    var roomName=Math.floor(Math.random() * 1000000);

    // React.useEffect(() => {
    //     socket.onmessage = (message) => {
    //         debugger
    //         var json=JSON.parse(decodeURIComponent(JSON.parse(message.data).text));
    //         if(localStorage.getItem('userId')!==json.value.userId){
    //             // window.open(window.location.protocol+"/video-call?roomName="+json.value.chatRoomId+"&userId="+localStorage.getItem('userId')+"&isCall=0","_blank","width=1000,height=1000");    
    //         }
    //    };
    // });
    // const {
    //     pushStreamService
    //  } = PersonalConversationAdapter()


    //  pushStreamService.subChat(localStorage.getItem('userId'));

    const clickCallVideo=()=>{              
         window.open(window.location.protocol+"/video-call?roomName="+roomId+"&userId="+localStorage.getItem('userId')+"&isCall=1","_blank","width=1000,height=1000"); 
    }


    const listEles = [
        {
            onClick: null,
            icon: iconSearchLoupe,
            text: "Tìm kiếm"
        },
        {
            onClick: null,
            icon: iconVolumeOff,
            text: "Tắt thông báo"
        },
        {
            onClick: null,
            icon: iconTrashDeleteBin,
            text: "Xóa chat"
        }
    ];

    const eleDetailPopup =(onClosePopup: any) =>(<DetailPopupScreen 
                                                    listEles={ listEles } 
                                                    onClosePopup={ onClosePopup }
                                                ></DetailPopupScreen>);

    const eleOptionHeader = (onSearch: any) => (
        <>
            <TooltipScreen position={ ['bottom center'] } context="Gọi video">
                <div onClick={()=>clickCallVideo()}>
                    <img src={ iconVideoCircleLine } alt="camera" className="cursor-pointer icon-svg--hover"></img>
                </div>
            </TooltipScreen>
            <TooltipScreen context="Tìm kiếm">
                <div>
                    <img src={ iconSearchLoupe } alt="search" onClick={ onSearch } className="cursor-pointer icon-svg--hover"></img>
                </div>
            </TooltipScreen>
            <MainPopupScreen context={ eleDetailPopup }>
                <div>
                    <TooltipScreen position={ ['top center'] } context="Chức năng khác">
                        <div className="img-24 flex-center cursor-pointer icon-svg--hover">
                            <div className="vertical3dots " ></div>
                        </div>
                        {/* <div>
                            <img src={ iconMoreVertical } alt="3 dots" className="cursor-pointer icon-svg--hover"></img>
                        </div> */}
                    </TooltipScreen>
                </div>
            </MainPopupScreen>
        </>
    )

    return eleOptionHeader;
}

export default PersonalConversationScreen;
