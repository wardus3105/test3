import { ENUM_KIND_OF_ATTACHMENT } from './../../../../../../../../libraries/Enum/attachment';
import { ENUM_KIND_OF_STATUS_CODE } from '../../../../../../../../libraries/Enum/status-code';
import { ENUM_KIND_OF_MESSAGE } from "../../../../../../../../libraries/Enum/message";
import buildFileSelector from "../../../../../../../../libraries/Functions/build-file-selector";
import { IAttachment, IChat } from "../../main/conversation.props";
import ChatInputServices from "./chat-input.services";
import ChatInputStates from "./chat-input.states";
import useKeyDown from '../../../../../../../../libraries/Hooks/useKeyDown';

function ChatInputAdapter(props: any) {
    const { responseMess , id , setListMessage, listMessage , hasUploadImages ,  setHasUploadImages } = props;

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

    useKeyDown(pressEnterToSendChat)

    const sendChat = async () =>{
        const userId = localStorage.getItem('userId') || "";

        let parentId = ""

        if(responseMess){
            parentId = responseMess.messageId
        }

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
                chatRoomId: id,
                createdAt: new Date(),
                attachments:[],
                parentId: parentId,
            }

            const response = await ChatInputServices().getInstance().sendMessage(messageSend);
            if(response && response.status === ENUM_KIND_OF_STATUS_CODE.SUCCESS){
                setMessage("")

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

            console.log(response);

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
                    chatRoomId: id,
                    createdAt: new Date(),
                    attachments:attachments,
                    parentId: parentId,
                }
    
                response = await ChatInputServices().getInstance().sendMessage(messageSend);
                if(response && response.status === ENUM_KIND_OF_STATUS_CODE.SUCCESS){
                    setFile(null)
                    setPathFileList([])
                    setHasUploadImages(false)

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

    const showContextResponseMess = () =>{
        const { type , context } = responseMess;
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

        if(hasUploadImages || responseMess){
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
        hasUploadImages,
        pathFileList,
        handleFileSelect,
        removePathFile,
        setIsMultilineText,
        message , setMessage,
        sendChat,
        setIsFocused,
        listMessage ,  setListMessage
    }
}

export default ChatInputAdapter;
