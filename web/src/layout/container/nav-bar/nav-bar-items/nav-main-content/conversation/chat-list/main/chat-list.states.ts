import { useState } from "react";

function ChatListStates() {
    const [isMainLoading, setIsMainLoading] = useState<boolean>(true);
    const [userid, setUserid] = useState<string>("");
    const [roomId, setRoomId] = useState<string>("");
    const [chatList, setChatList] = useState<any[]>([]);


    return {
        isMainLoading, setIsMainLoading,
        userid, setUserid,
        chatList, setChatList,
        roomId, setRoomId
    }
}

export default ChatListStates;
