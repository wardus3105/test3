import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ENUM_KIND_OF_CHATROOM } from "../../../../../../../libraries/Enum/chat-room";
import { IChat, IConversation } from "./conversation.props";
import useIdInPath from "../../../../../../../libraries/Hooks/useIdInPath";
import ConversationServices from "./conversation.services";
import ConversationStates from "./conversation.states";
import { ENUM_KIND_OF_STATUS } from "../../../../../../../libraries/Enum/status";
import { ENUM_KIND_OF_STATUS_CODE } from "../../../../../../../libraries/Enum/status-code";

function ConversationAdapter() {
    const history = useHistory();

    const {
        query , setQuery,
        hasSearch , setHasSearch,
        conversation , setConversation,
        page , setPage,
        count , setCount,
        isUpdating, setIsUpdating,
        isGroup, setIsGroup, listMessage, setListMessage,
    } = ConversationStates()

    const roomid = useIdInPath()

    // useEffect(() => {
    //     let message: IChat = {
    //         message: "Test 1",
    //         messageType: "1",
    //         messageStatus: "1",
    //         userId: "Test",
    //         createdAt: "08:08:00",
    //         user: {
    //             userName: "Test 1",
    //             lastLogin: "08:08:00",
    //             status: "1"
    //         },
    //         attachments: []
    //     }
    //     setListMessage([message]); 
    // }, [setListMessage ]);

    useEffect(() => {
        !hasSearch && setQuery("");
    },[hasSearch , setQuery])

    useEffect(() => {
        const getData = async () => {
            // setIsUpdating(true)
            const response = await ConversationServices().getInstance().getConversationList(roomid , page);
            if(response && response.status === ENUM_KIND_OF_STATUS_CODE.SUCCESS){
                // console.log(response)
                // setConversation(response.data.result[0]);
                // setIsGroup(response.data.result[0].type  === ENUM_KIND_OF_CHATROOM.GROUP);
                // setCount(response.data.count);
                setListMessage(response.data.data)
            }
            var conversation: IConversation = {
                id: roomid,
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
    }, [ setConversation , roomid , page , setCount , setIsUpdating , setIsGroup , setListMessage ]);

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
        isGroup, listMessage, setListMessage,
        redirectToDetail
    }
}

export default ConversationAdapter;
