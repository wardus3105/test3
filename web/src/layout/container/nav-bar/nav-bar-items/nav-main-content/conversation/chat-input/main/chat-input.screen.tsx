import React from 'react';
import CustomInputScreen from '../../../../../../../../libraries/Features/custom-input/custom-input.screen';

import { connect } from "react-redux";
import { unactiveResponseMess } from "../../../../../../../../redux/Actions/ResponseMess.action";
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
        responseMess,
        classNameChatInput,
        showContextResponseMess,
        hasImage,
        pathFileList,
        handleFileSelect,
        removePathFile,
        setIsMultilineText,
        message , setMessage,
        sendChat,
        setIsFocused,
    } = ChatInputAdapter(props)
    
    return (
        <div className={ classNameChatInput() }>
            {
                responseMess.isActive && (
                    <div className="chatinput-responseMess">
                        <div>
                            <span className="app-mainfont">
                                Trả lời 
                                <span className="chatinput-responseMess-username"> { responseMess.name } </span>
                            </span>
                            <p className="chatinput-responseMess-context  text-overflow-ellipsis app-mainfont">
                                { showContextResponseMess(responseMess.kindOfMess , responseMess.context) }
                            </p>
                        </div>
                        <img src={ iconDeleteDisabled } alt="gim" onClick={ props.unactiveResponseMess } className="chatinput-responseMess-icon-cancel cursor-pointer"></img>
                    </div>
                )
            }
            {
                hasImage && (
                    <div className="chatinput-uploadimages">
                        {
                            pathFileList.map((pathFile: string , index: number) => <UploadImageScreen pathFile={ pathFile } class="" removePathFile={ removePathFile }></UploadImageScreen>)
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

const mapStateToProps = (state: any) => {
    return {
        responseMess: state.responseMess,
    }
}
  
const mapDispatchToProps = (dispatch: any) => {
    return {
        unactiveResponseMess: () => dispatch(unactiveResponseMess()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatInputScreen)




