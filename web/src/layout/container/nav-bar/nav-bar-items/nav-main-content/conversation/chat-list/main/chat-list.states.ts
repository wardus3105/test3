import { useState } from "react";

function ChatListStates() {
    const [isMainLoading, setIsMainLoading] = useState<boolean>(true);
    const [userid, setUserid] = useState<string>("");
    const [roomIdz, setRoomIdz] = useState<string>("");
    const [chatList, setChatList] = useState<any[]>([]);
    const [bottom , setBottom] = useState<string>("60")

    return {
        isMainLoading, setIsMainLoading,
        userid, setUserid,
        chatList, setChatList,
        roomIdz, setRoomIdz,
        bottom , setBottom
    }
}

export default ChatListStates;
