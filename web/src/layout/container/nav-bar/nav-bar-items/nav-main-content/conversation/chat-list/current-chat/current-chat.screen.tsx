import React from 'react';
import DetailPopupScreen from '../../../../../../../../libraries/Features/popup/detail-popup/detail-popup.screen';
import MainPopupScreen from '../../../../../../../../libraries/Features/popup/main-popup/main-popup.screen';
import CurrentChatAdapter from './current-chat.adapter';
import { ICurrentChat } from './current-chat.props';
import './current-chat.scss';

const iconMoreHorizontal = require('../../../../../../../../libraries/Icons/more-horizontal.svg').default;
const iconShareArrowLeftLine = require('../../../../../../../../libraries/Icons/share-arrow-left-line.svg').default;
const iconSlidesSquare = require('../../../../../../../../libraries/Icons/slides-square.svg').default;
const iconTrashDeleteBin = require('../../../../../../../../libraries/Icons/trash-delete-bin.svg').default;
function CurrentChatScreen(props: ICurrentChat) {

    const {
        setResponMess,
        copyText
    } = CurrentChatAdapter(props);

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
    const eleDetailPopup = (onClosePopup: any) => (<DetailPopupScreen
        listEles={listEles}
        onClosePopup={onClosePopup}
    ></DetailPopupScreen>);
    return (

        <div className={"currentchat-container"}>
            <MainPopupScreen context={eleDetailPopup}>
                <div className="currentchat-icon-horizontal3dots">
                    <img src={iconMoreHorizontal} alt="horizontal 3 dots" className="cursor-pointer"></img>
                </div>
            </MainPopupScreen>
            { props.children}
        </div>
    )
}

export default CurrentChatScreen;