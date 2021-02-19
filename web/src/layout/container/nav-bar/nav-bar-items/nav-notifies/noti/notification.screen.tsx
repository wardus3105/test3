import React from 'react';
import { ENUM_KIND_OF_NOTIFICATION } from '../../../../../../libraries/Enum/notification';
import CircleAvatarScreen from '../../../../../../libraries/Features/circle-avtar/circle-avatar.screen';
import decodeHTML from '../../../../../../libraries/Functions/decode-html';
import getTimePeriod from '../../../../../../libraries/Functions/get-time-period';
import useWindowSize from '../../../../../../libraries/Hooks/useWindowSize';
import { INotification } from './notification.props';
import './notification.scss';

const iconNotiTag = require("../../../../../../libraries/Icons/noti-tag.svg").default;
const iconNotiSignout = require("../../../../../../libraries/Icons/noti-signout.svg").default;
const iconNotiLike = require("../../../../../../libraries/Icons/noti-like.svg").default;
const iconNotiReply = require("../../../../../../libraries/Icons/noti-reply.svg").default;

function NotificationScreen(props: INotification) {
    const { width } = useWindowSize();

    function context ():string{
        switch (props.status) {
            case ENUM_KIND_OF_NOTIFICATION.REPLY:
                return "đã trả lời bình luận của bạn trong &#8243; " + props.context +" &#8243;";
            case ENUM_KIND_OF_NOTIFICATION.KICKED:
                return "đã xóa bạn khỏi nhóm chat &#8243; " + props.context +" &#8243;";
            case ENUM_KIND_OF_NOTIFICATION.LIKE:
                return "đã tương tác bình luận của bạn ";
            case ENUM_KIND_OF_NOTIFICATION.TAG:
                return "đã nhắc bạn trong một bình luận ";
            default:
                return "";
        }
    }

    const icon = () =>{
        switch (props.status) {
            case ENUM_KIND_OF_NOTIFICATION.REPLY:
                return iconNotiReply;
            case ENUM_KIND_OF_NOTIFICATION.KICKED:
                return iconNotiSignout;
            case ENUM_KIND_OF_NOTIFICATION.LIKE:
                return iconNotiLike
            case ENUM_KIND_OF_NOTIFICATION.TAG:
                return iconNotiTag;
        }
    }

    const renderUserImage = () => {
        let widthAva="48px";
        let heightAva="48px";
        if (width < 768) {
            widthAva="40px";
            heightAva="40px";
        }

        return (
            <CircleAvatarScreen
              class=""
              width={ widthAva }
              height={ heightAva }
              src={ props.avatar }
              isOnline={ false }
              notiIcon={ icon() }
            />
        );
    };

    return (
        <div className={ "descriptionchat-container notification-container cursor-pointer " + ( props.isActive ? "descriptionchat-container--active" : "" )}>
            <div className="descriptionchat-image">
                {
                    renderUserImage()
                }
            </div>
            <div className="descriptionchat-context">
                <div>
                    <div className="notification-context">
                        <p>{ props.username }</p>
                        {" "}
                        <span>{ decodeHTML(context()) }</span>
                    </div>
                    <span className="notification-time">
                        { getTimePeriod(props.time) } 
                    </span>
                </div>
            </div>
        </div>
    );
}

export default NotificationScreen;


