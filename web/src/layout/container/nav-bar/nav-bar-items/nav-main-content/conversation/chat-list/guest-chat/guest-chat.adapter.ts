import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ENUM_KIND_OF_MESSAGE } from "../../../../../../../../libraries/Enum/message";
import { IGuestChat } from "./guest-chat.props";
import GuestChatStates from "./guest-chat.states";

function GuestChatAdapter(props : IGuestChat){
    const history = useHistory();

    const {
        isVisibleReaction, setVisibleReaction
    } = GuestChatStates()

    const redirectToDetailUser = () =>{
        history.push("/personal/detail/" + props.roomId);
    }

    const setResponMess = () =>{
        const { messageId , context , type , user:{ userName } , setRespondedMess } = props;
        setRespondedMess({
            messageId,
            context,
            type,
            userName
        })
    }


    const addReaction = (event: any) => {
        // console.log(event);
        // console.log(props.messageId);
    }

    const copyText = () =>{
        props.type === ENUM_KIND_OF_MESSAGE.TEXT && navigator.clipboard.writeText(props.context)
    }

    return {
        redirectToDetailUser,
        setResponMess,
        copyText,
        addReaction,
        isVisibleReaction, setVisibleReaction
    }
}

export default GuestChatAdapter;