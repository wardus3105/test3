import React from 'react';
import DetailPopupScreen from '../../../../../../../../libraries/Features/popup/detail-popup/detail-popup.screen';
import MainPopupScreen from '../../../../../../../../libraries/Features/popup/main-popup/main-popup.screen';
import { IconShareArrowLeftLine, IconSlidesSquare, IconTrashDeleteBin } from '../../../../../../../../libraries/Icons/icon.screen';
import CurrentChatAdapter from './current-chat.adapter';
import { ICurrentChat } from './current-chat.props';
import './current-chat.scss';

function CurrentChatScreen(props: ICurrentChat) {

    const {
        setResponMess,
        copyText,
        removeMessage
    } = CurrentChatAdapter(props);

    const listEles = [
        {
            onClick: setResponMess,
            icon: <IconShareArrowLeftLine></IconShareArrowLeftLine>,
            text: "Trả lời"
        },
        {
            onClick: copyText,
            icon: <IconSlidesSquare></IconSlidesSquare>,
            text: "Sao chép"
        },
        {
            onClick: removeMessage,
            icon: <IconTrashDeleteBin></IconTrashDeleteBin>,
            text: "Xóa"
        },
    ];
    
    const eleDetailPopup = (onClosePopup: any) => (<DetailPopupScreen
        listEles={listEles}
        onClosePopup={onClosePopup}
    ></DetailPopupScreen>);

    return (
        <div className={"currentchat-container"}>

            <MainPopupScreen context={ eleDetailPopup }> 
                <div className="currentchat-icon cursor-pointer img-24 flex-center margin-right-8">
                    <div className="vertical3dots"></div>
                </div> 
            </MainPopupScreen>

            { props.children}
        </div>
    )
}

export default CurrentChatScreen;