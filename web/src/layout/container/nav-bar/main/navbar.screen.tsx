import React from 'react';
import { ENUM_KIND_OF_ICONPANEL } from '../../../../libraries/Enum/icon-panel';
import IconPanelScreen from './icon-panel/icon-panel.screen';
import './navbar.scss';

const iconUsersGroup1 = require('../../../../libraries/Icons/users-group-1.svg').default;
const iconChatMessage2LineWhite = require('../../../../libraries/Icons/chat-message-2-line-white.svg').default;
const iconBellNotificationOnWhite = require('../../../../libraries/Icons/bell-notification-on-white.svg').default;
const iconQuestionCircleWhite = require('../../../../libraries/Icons/question-circle-white.svg').default;

function NavbarScreen(props: any) {

  const { activedIcon , setActivedIcon } = props;

  return (
    <div className="navbar-container step2">
      <IconPanelScreen 
        isActive={ activedIcon === ENUM_KIND_OF_ICONPANEL.MESSAGES } 
        srcImg={ iconChatMessage2LineWhite } 
        contextToolTip={"Trò chuyện"} 
        onClick={ () =>{setActivedIcon(ENUM_KIND_OF_ICONPANEL.MESSAGES)} } 
        hasNotification={ true }
      ></IconPanelScreen>
      <IconPanelScreen 
        isActive={ activedIcon === ENUM_KIND_OF_ICONPANEL.COMPANYMEMBER } 
        srcImg={ iconUsersGroup1 } 
        contextToolTip={"Thành viên"} 
        onClick={ () =>{setActivedIcon(ENUM_KIND_OF_ICONPANEL.COMPANYMEMBER)} }
        hasNotification={ false }
      ></IconPanelScreen>
      <IconPanelScreen 
        isActive={ activedIcon === ENUM_KIND_OF_ICONPANEL.NOTI } 
        srcImg={ iconBellNotificationOnWhite } 
        contextToolTip={"Thông báo"} 
        onClick={ () =>{setActivedIcon(ENUM_KIND_OF_ICONPANEL.NOTI)} }
        hasNotification={ false }
      ></IconPanelScreen> 
      <div className="navbar-iconpanel-last">
        <IconPanelScreen 
          isActive={ activedIcon === ENUM_KIND_OF_ICONPANEL.QUESTIONS } 
          srcImg={ iconQuestionCircleWhite } 
          contextToolTip={"Giải đáp"} 
          onClick={ () =>{setActivedIcon(ENUM_KIND_OF_ICONPANEL.QUESTIONS)} }
          hasNotification={ false }
        ></IconPanelScreen>
      </div>
    </div>
  );
}

export default NavbarScreen;
