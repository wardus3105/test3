import { useHistory } from "react-router-dom";
import { ENUM_KIND_OF_MESSAGE } from "../../../../../../../../libraries/Enum/message";
import { IGuestChat } from "./guest-chat.props";

function GuestChatAdapter(props : IGuestChat){
    const history = useHistory();

    const redirectToDetailUser = () =>{
        history.push("/personal/detail/" + props.roomId);
    }

    const setResponMess = () =>{
        const { messageId , context , type , user:{ userName } , setResponseMess } = props;
        setResponseMess({
            messageId,
            context,
            type,
            userName
        })
    }

    const copyText = () =>{
        props.type === ENUM_KIND_OF_MESSAGE.TEXT && navigator.clipboard.writeText(props.context)
    }

    return {
        redirectToDetailUser,
        setResponMess,
        copyText
    }
}

export default GuestChatAdapter;