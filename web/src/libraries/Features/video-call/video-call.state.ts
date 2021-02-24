import {useState} from "react";
function VideoCallStates() {
    // const [roomName, setRoomName] = useState("");
    // const [width, setWidth] = useState("");
    // const [height, setHeight] = useState("");
    // const [displayName, setDisplayName] = useState("");
    // const [email, setEmail] = useState("");
    const [jitsi, setJitsi] = useState({});
    return {
        jitsi, setJitsi
    }
}

export default VideoCallStates;
