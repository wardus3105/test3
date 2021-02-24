import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { IConversation } from "./conversation.props";
import useIdInPath from "../../../../../../../libraries/Hooks/useIdInPath";
import ConversationServices from "./conversation.services";
import ConversationStates from "./conversation.states";
import { ENUM_KIND_OF_STATUS_CODE } from "../../../../../../../libraries/Enum/status-code";

function ConversationAdapter() {
    const history = useHistory();
    const roomId = useIdInPath()

    const {
        query , setQuery,
        hasSearch , setHasSearch,
        conversation , setConversation,
        page , setPage,
        count , setCount,
        isUpdating, setIsUpdating,
        isGroup, setIsGroup,
        listMessage, setListMessage,
        hasUploadImages, setHasUploadImages,
        responseMess, setResponseMess,
    } = ConversationStates()

    useEffect(() => {
        !hasSearch && setQuery("");
    },[hasSearch , setQuery])

    useEffect(() => {
        const getData = async () => {
            // setIsUpdating(true)
            const response = await ConversationServices().getInstance().getConversationList(roomId , page);
            if(response && response.status === ENUM_KIND_OF_STATUS_CODE.SUCCESS){
                setListMessage(response.data.data)
            }

            const conversation: IConversation = {
                id: roomId,
                title: "test",
                status: "1",
                avatar: "",
                type: "1",
                chats: []
            }
            setConversation(conversation);

            setIsUpdating(false)
        }

        getData();
    }, [ setConversation , roomId , page , setCount , setIsUpdating , setIsGroup , setListMessage ]);

    const onSearch = () =>{
        setHasSearch(prev => !prev)
    }

    const redirectToDetail = (id: string) =>{
        history.push("/g/detail/" + id)
    }

    return {
        query , setQuery,
        hasSearch,
        conversation,
        onSearch,
        count,
        page , setPage,
        isUpdating,
        isGroup, 
        listMessage, setListMessage,
        hasUploadImages, setHasUploadImages,
        redirectToDetail,
        responseMess, setResponseMess,
        roomId
    }
}

export default ConversationAdapter;
