import { ENUM_KIND_OF_MESSAGE } from "../../../../../../../../libraries/Enum/message";
import { ENUM_KIND_OF_STATUS_CODE } from "../../../../../../../../libraries/Enum/status-code";
import { ICurrentChat } from "./current-chat.props";
import CurrentChatServices from "./current-chat.services";

function CurrentChatAdapter(props: ICurrentChat) {

    const { messageId , context , type  , setRespondedMess , roomId , userId , setChatList } = props;

    const setResponMess = () => {
        setRespondedMess({
            messageId,
            context,
            type
        })
    }

    const copyText = () => {
        props.type === ENUM_KIND_OF_MESSAGE.TEXT && navigator.clipboard.writeText(props.context)
    }

    const removeMessage = async () => {
        let messageSend: any = {
            id:messageId,
            message: '',
            messageType: '',
            messageStatus: "1",
            userId: userId,
            user: {
                userName: "Test 1",
                status: "1",
                id: userId
            },
            chatRoomId: roomId,
            createdAt: new Date(),
            attachments: []
        }

        const response = await CurrentChatServices().getInstance().removeMessage(messageSend);
        if (response && response.status === ENUM_KIND_OF_STATUS_CODE.SUCCESS) {
            setChatList((prev: any) => prev.filter((chat:any) => chat.id !== messageId))
        }
    }

    return {
        setResponMess,
        copyText,
        removeMessage
    }
}

export default CurrentChatAdapter;