import moment from 'moment';
import React from 'react';
import { ENUM_KIND_OF_MESSAGE } from '../../../../../../../../../libraries/Enum/message';
import { ENUM_KIND_OF_SHAPE_OF_MESSAGE } from '../../../../../../../../../libraries/Enum/shape_of_message';
import getApiUrl from '../../../../../../../../../libraries/Functions/get-api-url';
import getTimePeriodFromNow from '../../../../../../../../../libraries/Functions/get-time-period-from-now';
import './text-context-chat.scss';

function TextContextChatScreen(props : any){
    const { context , datetime , time , index , respondedMess , isCurrent } = props;

    const showContext = () =>{
        const rows = context.split("\n");
        if(rows.length > 1){
            return rows.map((row: string) =>{
                if(row){
                    return <span>
                        {row}
                        <br></br>
                    </span>;
                }
                return <></>;
            })
        }
        return <span className="body-regular">
            {context}
        </span>;
    }

    const getClassByShape = () =>{
        const shape = props.shape;
        if(isCurrent){
            switch (shape) {
                case ENUM_KIND_OF_SHAPE_OF_MESSAGE.TOP:
                    return "";
                case ENUM_KIND_OF_SHAPE_OF_MESSAGE.CENTER:
                    return "currentchat-center";
                case ENUM_KIND_OF_SHAPE_OF_MESSAGE.BOTTOM:
                    return "currentchat-bottom";
            }
        }
        return ""
    }



    const getView = () =>{
        const url = respondedMess.attachments.length > 0 ? respondedMess.attachments[0].name : respondedMess.message

        return respondedMess.messageType === ENUM_KIND_OF_MESSAGE.ATTACHMENT ? (
            <div className={"imagechat-container cursor-pointer " + ( isCurrent ? "margin-left-auto" : "" )}>
                <img src={ getApiUrl(url)} alt=""/>
            </div>
        ) : (
            <>
                { 
                    isCurrent && <p>Bạn đã trời lời { respondedMess.user.userName }</p>
                }
                <div className={"textcontext-respondedmess "  + ( isCurrent ? "margin-left-auto" : "" )}>
                    <span className="margin-left-8">
                        {/* Nội dung phản hồi */}
                        { respondedMess.message }
                    </span>

                    <span className="chat-time">
                        {/* { props.shape + " --- " + moment(time).format("YYYY-MM-DD HH:mm:ss") + " --- " + index } */}
                        { getTimePeriodFromNow(respondedMess.createdAt) }
                    </span>
                </div>
            </>
        )
    }

    if(context){
        return (
            <>
                <div className="textcontext-container">
                    {
                        respondedMess && getView()
                    }
                </div>
                <div className={ "padding-12 " + (isCurrent ? "currentchat-text " : "guestchat-text ") + getClassByShape() }>
                        { showContext() }    
                        <span className="chat-time">
                            {/* { props.shape + " --- " + moment(time).format("YYYY-MM-DD HH:mm:ss") + " --- " + index } */}
                            { datetime }
                        </span>
                    </div>
                <div className={"reaction-icon"}>😀1</div>
            </>
 
        )
    }

    return <></>;
}

export default TextContextChatScreen;


