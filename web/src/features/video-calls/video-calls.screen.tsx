import React from 'react';
import CircleAvatarScreen from '../../libraries/Features/circle-avtar/circle-avatar.screen';
import ModalScreen from '../../libraries/Features/modal/modal.screen';
import VideoCallsStates from './video-calls.states';
import "./video-calls.scss";

const VideoCallScreen = (props: any) =>{
  return (
    <div className="videocall-container">
      <div className="videocall-top">
        <CircleAvatarScreen
        isOnline={false}
        src={ "https://png.pngtree.com/element_our/20190530/ourlarge/pngtree-520-couple-avatar-boy-avatar-little-dinosaur-cartoon-cute-image_1263411.jpg" }
        class=""
        width="90px"
        height="90px"
        ></CircleAvatarScreen>
        <span className="subheading-semibold">
          { props.username }
        </span>
        <span className="subtitle-hint">Đang gọi tới</span>
      </div>

      <div className="videocall-bottom flex-center">
        <button className="btn-outline" onClick={ props.close } >Từ chối</button>

        <button >Trả lời</button>                                                                                          
      </div>
    </div>
  )
}

const eleContextSignout = (close: any) => {
  return (
    <VideoCallScreen username={ "Hương Nguyễn" } close={ close }></VideoCallScreen>  
  )
}

function VideoCallsScreen() {

  const {
    videoCallsIsDisplayed 
  } = VideoCallsStates()
  
  return (

    <ModalScreen 
      headerContent={ "Cuộc gọi video tới" }
      hasPadding={ true }
      contextHasClose={ eleContextSignout }
      open={ videoCallsIsDisplayed }
    >
      <></>
    </ModalScreen>
  );
}

export default VideoCallsScreen;



