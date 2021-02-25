import { useState } from "react";

function VideoCallsStates(){
  const [videoCallsIsDisplayed , setVideoCallsIsDisplayed] = useState<boolean>(false);
  const [name , setName] = useState<string>("");
  const [data , setData] = useState<any>();
  return {
    videoCallsIsDisplayed , setVideoCallsIsDisplayed,
    name,setName,
    data,setData
  }
}

export default VideoCallsStates;