import React from 'react';
import CustomInputScreen from '../../../../../../../../libraries/Features/custom-input/custom-input.screen';
import UploadImageScreen from '../upload-image/upload-image.screen';
import './chat-input.scss';
import ChatInputAdapter from './chat-input.adapter';

const iconSmileCircle = require('../../../../../../../../libraries/Icons/smile-circle.svg').default;
const iconGimFile = require('../../../../../../../../libraries/Icons/gim-file.svg').default;
const iconSendMessage = require('../../../../../../../../libraries/Icons/send-message.svg').default;
const iconDeleteDisabled = require('../../../../../../../../libraries/Icons/delete-disabled.svg').default;

const styleCustomInput = {
    backgroundImage:`url('${ iconSmileCircle }')`,
    backgroundPosition:'99% 50%',
    padding:'10px 35px 10px 10px',
    borderRadius:'8px',
    fontSize:'14px',
}

function ChatInputScreen(props: any){
    const {
        respondedMess,
        classNameChatInput,
        showContextRespondedMess,
        hasUploadImages,
        pathFileList,
        handleFileSelect,
        removePathFile,
        setIsMultilineText,
        message , setMessage,
        sendChat,
        setIsFocused,
    } = ChatInputAdapter(props)
    
    return (
        <div className={ classNameChatInput() } id="chat-input">
            {
                respondedMess && (
                    <div className="chatinput-responseMess">
                        <div>
                            <span className="app-mainfont">
                                Trả lời 
                                <span className="chatinput-responseMess-username"> { respondedMess.userName ? respondedMess.userName : "chính bạn"  } </span>
                            </span>
                            <p className="chatinput-responseMess-context  text-overflow-ellipsis app-mainfont">
                                { showContextRespondedMess() }
                            </p>
                        </div>
                        <img src={ iconDeleteDisabled } alt="gim" onClick={ () => { props.setRespondedMess() } } className="chatinput-responseMess-icon-cancel cursor-pointer"></img>
                    </div>
                )
            }
            {
                hasUploadImages && (
                    <div className="chatinput-uploadimages">
                        {
                            pathFileList.map((pathFile: string , index: number) => <UploadImageScreen key={ index } pathFile={ pathFile } class="" removePathFile={ removePathFile }></UploadImageScreen>)
                        }
                    </div>
                )
            }
            <div className="chatinput-main">
                <img src={ iconGimFile } alt="gim" onClick={ handleFileSelect } className="cursor-pointer icon-svg--hover"></img>

                <CustomInputScreen 
                    setValue={ setMessage } 
                    value={ message } 
                    placeHolder="Nhập nội dung bình luận" 
                    class="" 
                    style={ styleCustomInput } 
                    setIsMultiline={ setIsMultilineText } 
                    isMultiline={ true } 
                    isTextArea={ false }
                    setIsFocused={ setIsFocused }
                ></CustomInputScreen>
                
                <img src={ iconSendMessage } alt="send data" onClick={ sendChat } className="cursor-pointer icon-svg--hover"></img>
            </div>
        </div>
    )
}

export default ChatInputScreen;




