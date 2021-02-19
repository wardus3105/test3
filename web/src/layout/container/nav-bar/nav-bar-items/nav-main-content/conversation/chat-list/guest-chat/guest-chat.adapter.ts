import { useHistory } from "react-router-dom";
import { ENUM_KIND_OF_MESSAGE } from "../../../../../../../../libraries/Enum/message";
import { IGuestChat } from "./guest-chat.props";

function GuestChatAdapter(props : IGuestChat){
    const history = useHistory();

    const redirectToDetailUser = () =>{
        history.push("/personal/detail/" + props.id);
    }

    const setResponseMess = () =>{
        props.setResponseMess(props.user.userName , props.context , props.kindOfMess)
    }

    const copyText = () =>{
        props.kindOfMess === ENUM_KIND_OF_MESSAGE.TEXT && navigator.clipboard.writeText(props.context)
    }

    return {
        redirectToDetailUser,
        setResponseMess,
        copyText
    }
}

export default GuestChatAdapter;