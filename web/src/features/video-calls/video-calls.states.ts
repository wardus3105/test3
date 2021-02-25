import { useState } from "react";

function VideoCallsStates(){
  const [videoCallsIsDisplayed , setVideoCallsIsDisplayed] = useState<boolean>(true);

  return {
    videoCallsIsDisplayed , setVideoCallsIsDisplayed
  }
}

export default VideoCallsStates;