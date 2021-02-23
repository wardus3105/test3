import { ENUM_KIND_OF_ATTACHMENT } from './../../../../../../../../libraries/Enum/attachment';
import { ENUM_KIND_OF_STATUS_CODE } from '../../../../../../../../libraries/Enum/status-code';

import { ENUM_KIND_OF_MESSAGE } from "../../../../../../../../libraries/Enum/message";
import buildFileSelector from "../../../../../../../../libraries/Functions/build-file-selector";
import { IAttachment, IChat } from "../../main/conversation.props";
import ChatInputServices from "./chat-input.services";
import ChatInputStates from "./chat-input.states";
import useKeyDown from '../../../../../../../../libraries/Hooks/useKeyDown';
import path from 'path';

function ChatInputAdapter(props: any) {
    const { responseMess , id , setListMessage, listMessage } = props;

    const  {
        pathFileList , setPathFileList,
        hasImage , setHasImage,
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

    useKeyDown(pressEnterToSendChat)

    const sendChat = async () =>{
        let attachments: IAttachment[] = []
        if(file){
            const formData = new FormData();
            for (let index = 0; index < file.length; index++) {
                formData.append('fileContent', file[index]);         
            }
            const response = await ChatInputServices().getInstance().sendFile(formData);
            if(response && response.status === ENUM_KIND_OF_STATUS_CODE.SUCCESS){
                const pathFileList = response.data.data;

                for (let index = 0; index < pathFileList.length; index++){
                    const attachment = {
                        contentType:ENUM_KIND_OF_ATTACHMENT.IMAGE,
                        name:pathFileList[index].guid
                    }
                    attachments.push(attachment)
                }
            }
        }

        if(message || file){
            const userId = localStorage.getItem('userId') || "";

            let messageSend: IChat = {
                message: message,
                messageType: "1",
                messageStatus: "1",
                userId: userId,
                user: {
                    userName: "Test 1",
                    status: "1"
                },
                chatRoomId: id,
                createdAt: new Date(),
                attachments:attachments
            }
            
            setListMessage([messageSend]);

            const response = await ChatInputServices().getInstance().sendMessage(messageSend);
            if(response && response.status === ENUM_KIND_OF_STATUS_CODE.SUCCESS){
  
            }

            setMessage("")
            setFile(null)
            setHasImage(false)
            setPathFileList([])
        }
    }

    function cb (pathFileListTemp: string[]){
        setPathFileList(pathFileListTemp);
        setHasImage(true);
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
            setHasImage(false);
        }
    }

    const showContextResponseMess = (kindOfMess: number , context: string) =>{
        let eleResult = "";
        switch (kindOfMess) {
            case ENUM_KIND_OF_MESSAGE.TEXT:
                eleResult = context;
                break;
            case ENUM_KIND_OF_MESSAGE.IMAGE:
                eleResult = "Ảnh";
                break;
            case ENUM_KIND_OF_MESSAGE.FILE:
                eleResult = "File";
                break;
            case ENUM_KIND_OF_MESSAGE.LINK:
                eleResult = "Link";
                break;
            default:
                break;
        }
        return eleResult;
    }

    const classNameChatInput = () =>{
        const  containerClass = "chatinput-container";
        const extensionClass = "chatinput-extension";
        const hasResponseMessClass = "chatinput--hasresponseMess";
        const space = " ";
        let result = containerClass;

        if(responseMess.isActive || hasImage){
            result += space + extensionClass + space + hasResponseMessClass
        }else{
            if(isMultilineText){
                result += space + extensionClass 
            }
        }
        return result;
    } 

    return {
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
        setIsFocused, setListMessage, listMessage
    }
}

export default ChatInputAdapter;
