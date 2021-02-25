import { ENUM_KIND_OF_ATTACHMENT } from './../../../../../../../../libraries/Enum/attachment';
import { ENUM_KIND_OF_STATUS_CODE } from '../../../../../../../../libraries/Enum/status-code';
import { ENUM_KIND_OF_MESSAGE } from "../../../../../../../../libraries/Enum/message";
import buildFileSelector from "../../../../../../../../libraries/Functions/build-file-selector";
import { IAttachment, IChat } from "../../main/conversation.props";
import ChatInputServices from "./chat-input.services";
import ChatInputStates from "./chat-input.states";
import useKeyDown from '../../../../../../../../libraries/Hooks/useKeyDown';
import { useEffect } from 'react';

function ChatInputAdapter(props: any) {
    const { respondedMess , setListMessage , hasUploadImages ,  setHasUploadImages , roomId , setRespondedMess } = props;

    const  {
        pathFileList , setPathFileList,
        isMultilineText, setIsMultilineText,
        message, setMessage,
        isFocused, setIsFocused,
        file , setFile
    } = ChatInputStates()

    const pressEnterToSendChat = async (e: KeyboardEvent) =>{
        if(e.keyCode === 13 && isFocused){
            sendChat()
        }
    }

    useKeyDown(pressEnterToSendChat);

    useEffect(() => {
        setHasUploadImages(false);
        setFile(null)
        setPathFileList([])
    }, [ roomId ])

    const sendChat = async () =>{
        const userId = localStorage.getItem('userId') || "";

        if(message){
            let messageSend: IChat = {
                message: message,
                messageType: ENUM_KIND_OF_MESSAGE.TEXT + "",
                messageStatus: "1",
                userId: userId,
                user: {
                    userName: "Test 1",
                    status: "1",
                    id:userId
                },
                chatRoomId: roomId,
                createdAt: new Date(),
                attachments:[],
            }

            if(respondedMess){
                messageSend = { ...messageSend, parentId: respondedMess.messageId }
            }

            const response = await ChatInputServices().getInstance().sendMessage(messageSend);
            if(response && response.status === ENUM_KIND_OF_STATUS_CODE.SUCCESS){
                setMessage("")
                setRespondedMess()

                setListMessage([messageSend]);

            }
        }

        if(file){
            let attachments: IAttachment[] = []
            const formData = new FormData();
            for (let index = 0; index < file.length; index++) {
                formData.append('fileContent', file[index]);         
            }

            let response = await ChatInputServices().getInstance().sendFile(formData);

            if(response && response.status === ENUM_KIND_OF_STATUS_CODE.SUCCESS){
                const pathFileList = response.data.data;

                for (let index = 0; index < pathFileList.length; index++){
                    const attachment = {
                        contentType:ENUM_KIND_OF_ATTACHMENT.IMAGE,
                        name:pathFileList[index].guid,
                        type:ENUM_KIND_OF_ATTACHMENT.IMAGE
                    }
                    attachments.push(attachment)
                }

                let messageSend: IChat = {
                    message: "",
                    messageType: ENUM_KIND_OF_MESSAGE.ATTACHMENT,
                    messageStatus: "1",
                    userId: userId,
                    user: {
                        userName: "Test 1",
                        status: "1",
                        id:userId
                    },
                    chatRoomId: roomId,
                    createdAt: new Date(),
                    attachments:attachments,
                }

                if(respondedMess){
                    messageSend = { ...messageSend, parentId: respondedMess.messageId }
                }
    
                response = await ChatInputServices().getInstance().sendMessage(messageSend);
                if(response && response.status === ENUM_KIND_OF_STATUS_CODE.SUCCESS){
                    setFile(null)
                    setPathFileList([])
                    setHasUploadImages(false)
                    setRespondedMess()

                    setListMessage([messageSend]);
                }
            }
        }
    }

    const cb = (pathFileListTemp: string[]) =>{
        setPathFileList(pathFileListTemp);
        setHasUploadImages(true)
    }

    const fileSelector = buildFileSelector(true , cb , setFile)

    const handleFileSelect = (e: any) => {
        e.preventDefault();
        fileSelector.click();
    }

    const removePathFile = (pathFilez: string) =>{
        const list = pathFileList.filter(item => item !== pathFilez);
        setPathFileList(list);
        if(list.length === 0){
            setHasUploadImages(false)
        }
    }

    const showContextRespondedMess = () =>{
        const { type , context } = respondedMess;
        switch (type) {
            case ENUM_KIND_OF_MESSAGE.TEXT:
                return context;
            case ENUM_KIND_OF_MESSAGE.ATTACHMENT:
                return "File";
            case ENUM_KIND_OF_MESSAGE.LINK:
                return "Link";
            default:
                return ""
        }
    }

    const classNameChatInput = () =>{
        const  containerClass = "chatinput-container";
        const extensionClass = "chatinput-extension";
        const hasResponseMessClass = "chatinput--hasresponseMess";
        const space = " ";
        let result = containerClass;

        if(hasUploadImages || respondedMess){
            result += space + extensionClass + space + hasResponseMessClass
        }else{
            if(isMultilineText){
                result += space + extensionClass 
            }
        }
        return result;
    } 

    return {
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
        setListMessage
    }
}

export default ChatInputAdapter;
