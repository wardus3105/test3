import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { ENUM_KIND_OF_STATUS_CODE } from "../../../../../../../../libraries/Enum/status-code";
import useScroll from "../../../../../../../../libraries/Hooks/useScroll";
import ChatListServices from "./chat-list.services";
import useIdInPath from "../../../../../../../../libraries/Hooks/useIdInPath";
import ChatInputServices from "../../chat-input/main/chat-input.services";

import ChatListStates from "./chat-list.states";

function ChatListAdapter(chats: any , count: number, page:number , setPage: any , isUpdating: boolean , id: string) {
    const chatlistRef = useRef<HTMLInputElement>(null);
    const location = useLocation();

    const {createChatRoom} = ChatListServices();

    const {
        isMainLoading, setIsMainLoading,
        userid, setUserid,
        chatList, setChatList,
        roomId, setRoomId
    } = ChatListStates();

    console.log(chats)

    useLayoutEffect(() =>{
        if(chatlistRef.current){
            if(page === 1){
                chatlistRef.current.scrollTop = chatlistRef.current.scrollHeight;
            } else{
                if(!isUpdating){
                    chatlistRef.current.scrollTop = chatlistRef.current.scrollHeight / 2;
                }
            }
        } 
    } , [ page , isUpdating])

    useEffect(() => {
        const userId = localStorage.getItem('userId') || "";
        setUserid(userId);
    }, [ setUserid ])


    useEffect(() => {
        if(roomId === id){
            setChatList(prev =>[ ...prev , ...chats ])
            setIsMainLoading(false);
        } else{
            setRoomId(id);
            setChatList(chats)
            setIsMainLoading(false);
        }

    }, [ chats ])


    const clickFirstMessage = async ()  => {
        let pathList = location.pathname.split("/");
        const id = pathList[2];

        let chatRoomMemberList = [
            {userId: userid},
            {userId: id}
        ];
        
        let chatRoom = {
            avatar: "url",
            title: "Chat riêng",
            slogan: "Room này tạo ra để 2 người chat",
            type: 0,
            createdBy: userid,
            chatRoomMemberList: chatRoomMemberList
        }

        console.log(chatRoom);
    
        await createChatRoom(chatRoom);
    }

    const { handleScroll } = useScroll( page , setPage , count , isUpdating , chatlistRef , true )

    const roomid = useIdInPath()

    const sendHello = async () =>{
        let formData = new FormData();
        formData.append('chatRoomId', roomid);
        formData.append('userId', userid);
        formData.append('message', "Xin chào");
        formData.append('parentId', '');
        formData.append('messageType', '0');
        formData.append('messageStatus', '0');
        formData.append('status', '0');

        const response = await ChatInputServices().getInstance().postMessage(formData);
        if(response && response.status === ENUM_KIND_OF_STATUS_CODE.SUCCESS){
            
        }
    }

    // const observer = useRef<any>();
    // const lastMessageRef = useCallback(node => {
    //     if (loading) return
    //     if (observer.current) observer.current.disconnect()
    //     observer.current = new IntersectionObserver(entries => {
    //         if (entries[0].isIntersecting && hasMore) {
    //             console.log(111)
    //             // setPageNum(prevPageNumber => prevPageNumber + 1)
    //         }
    //     })
    //     if (node) observer.current.observe(node)
    // }, [loading, hasMore]);

    return {
        userid,
        isMainLoading,
        chatlistRef,
        chatList,
        handleScroll,
        isUpdating,
        clickFirstMessage
    };
}

export default ChatListAdapter;
