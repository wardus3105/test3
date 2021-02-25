import { ENUM_KIND_OF_MESSAGE } from "../../../../../../../../libraries/Enum/message";
import { ICurrentChat } from "./current-chat.props";


function CurrentChatAdapter(props: ICurrentChat) {
    const setResponMess = () => {
        const { messageId, context, type, setRespondedMess } = props;
        setRespondedMess({
            messageId,
            context,
            type
        })
    }

    const copyText = () => {
        props.type === ENUM_KIND_OF_MESSAGE.TEXT && navigator.clipboard.writeText(props.context)
    }

    return {
        setResponMess,
        copyText
    }
}

export default CurrentChatAdapter;