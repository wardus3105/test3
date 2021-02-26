import {useState} from "react";

function VideoCallStates() {
    // const [roomName, setRoomName] = useState("");
    // const [width, setWidth] = useState("");
    const url_string=window.location.href;
    var url = new URL(url_string);
    const [roomId, setRoomId] = useState();
    const [roomName, setRoomName] = useState(url.searchParams.get("roomName"));
    const [userId, setUserId] = useState(url.searchParams.get("userId"));
    const [isCall, setIsCall] = useState(url.searchParams.get("isCall"));

    const [jitsi, setJitsi] = useState({});
    return {
        jitsi, setJitsi,
        roomId,setRoomId,
        roomName,setRoomName,
        userId,setUserId,
        isCall,setIsCall
    }
}

export default VideoCallStates;
