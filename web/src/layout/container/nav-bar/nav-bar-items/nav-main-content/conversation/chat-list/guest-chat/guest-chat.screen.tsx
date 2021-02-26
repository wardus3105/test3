import React from 'react';
import CircleAvatarScreen from '../../../../../../../../libraries/Features/circle-avtar/circle-avatar.screen';
import MainPopupScreen from '../../../../../../../../libraries/Features/popup/main-popup/main-popup.screen';
import DetailPopupScreen from '../../../../../../../../libraries/Features/popup/detail-popup/detail-popup.screen';
import './guest-chat.scss';
import GuestChatAdapter from './guest-chat.adapter';
import { IGuestChat } from './guest-chat.props';

// const iconMoreHorizontal = require('../../../../../../../../libraries/Icons/more-horizontal.svg').default;
const iconShareArrowLeftLine = require('../../../../../../../../libraries/Icons/share-arrow-left-line.svg').default;
const iconSlidesSquare = require('../../../../../../../../libraries/Icons/slides-square.svg').default;
const iconTrashDeleteBin = require('../../../../../../../../libraries/Icons/trash-delete-bin.svg').default;

function GuestChatScreen(props : IGuestChat){

    const { user , children } = props;

    const {
        redirectToDetailUser,
        setResponMess,
        copyText
    } = GuestChatAdapter(props);

    const listEles = [
        {
            onClick: setResponMess,
            icon: iconShareArrowLeftLine,
            text: "Trả lời"
        },
        {
            onClick: copyText,
            icon: iconSlidesSquare,
            text: "Sao chép"
        },
        {
            onClick: null,
            icon: iconTrashDeleteBin,
            text: "Xóa"
        },
    ];

    const eleDetailPopup =(onClosePopup: any) =>(<DetailPopupScreen 
                                                    listEles={ listEles } 
                                                    onClosePopup={ onClosePopup }
                                                ></DetailPopupScreen>);

    return (
        <div className="guestchat-container margin-4">
            <CircleAvatarScreen
                src={ user.avatar }
                class="guestchat-left img-32"
                isOnline={ false }
                onClick={ redirectToDetailUser }
            ></CircleAvatarScreen>
            <div className="guestchat-right margin-left-8">
                <span className="subtitle-regular margin-left-12">
                    { user.userName }
                </span>
                <div className="guestchat-maincontext">
                    
                    { children }
                    
                    <MainPopupScreen context={ eleDetailPopup }> 
                        <div className="guestchat-icon cursor-pointer flex-center img-24">
                            <div className="vertical3dots"></div>
                        </div>
                    </MainPopupScreen>

                </div>
            </div>
        </div>
    )
}

export default GuestChatScreen;
