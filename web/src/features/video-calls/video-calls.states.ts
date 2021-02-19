import { useState } from "react";

function VideoCallsStates(){
  const [videoCallsIsDisplayed , setVideoCallsIsDisplayed] = useState<boolean>(false);

  return {
    videoCallsIsDisplayed , setVideoCallsIsDisplayed
  }
}

export default VideoCallsStates;