import React from 'react';
import {
  BrowserRouter as Router
} from "react-router-dom";

import NavbarScreen from './nav-bar/main/navbar.screen';
import NavDetailScreen from '../../features/nav-detail/main/nav-detail.screen';
import BodyAdapter from './body.adapter';
import './body.scss';
import ContentScreen from './nav-bar/nav-bar-items/nav-main-content/main/content.screen';
import ToastifyScreen from '../../libraries/Features/toastify/toastify.screen';
import GetidModalScreen from '../../features/getid-modal/getid-modal.screen';
import GuidedTourScreen from '../../features/guided-tour/guided-tour.screen';
import VideoCallsScreen from '../../features/video-calls/video-calls.screen';
import LossNetworkModalScreen from '../../features/loss-network-modal/loss-network-modal.screen';

function BodyScreen(props : any) {
  const {
    activedIcon , setActivedIcon,
    hasNavbar,
    styleInline
  } = BodyAdapter(props);

  return (
    <>
      <ToastifyScreen></ToastifyScreen>

      <GetidModalScreen></GetidModalScreen>

      <GuidedTourScreen></GuidedTourScreen>

      <VideoCallsScreen></VideoCallsScreen>

      <LossNetworkModalScreen></LossNetworkModalScreen>

      <Router>
        <div className="body-container" style = { styleInline }>
          <div className={ hasNavbar ? "body-left" : "body-left body-left--hide"}>
            <NavbarScreen activedIcon={ activedIcon } setActivedIcon={ setActivedIcon }></NavbarScreen>
          </div>
          <div className={ hasNavbar ? "body-right--hasnavbar body-right" : "body-right"}>
            <NavDetailScreen  activedIcon={ activedIcon }></NavDetailScreen>
            <ContentScreen></ContentScreen>
          </div>
        </div>
      </Router>
    </>


  );
}


export default BodyScreen;
