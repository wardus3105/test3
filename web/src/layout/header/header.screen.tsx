import React from 'react';
import CircleAvatarScreen from '../../libraries/Features/circle-avtar/circle-avatar.screen';
import DetailPopupScreen from '../../libraries/Features/popup/detail-popup/detail-popup.screen';
import MainPopupScreen from '../../libraries/Features/popup/main-popup/main-popup.screen';
import './header.scss';

const iconBellNotificationOn = require('../../libraries/Icons/bell-notification-on.svg').default;
const iconQuestionCircle = require('../../libraries/Icons/question-circle.svg').default;
const iconUserProfileSquare = require('../../libraries/Icons/user-profile-square.svg').default;
const iconSignoutRight = require('../../libraries/Icons/signout-right.svg').default;
const iconGridLayout = require('../../libraries/Icons/grid-layout.svg').default;
const iconLogoColorFull = require('../../libraries/Icons/logo-color-full.svg').default;

function HeaderScreen(props : any) {

  const listEles = [
    {
        onClick: null,
        icon: iconBellNotificationOn,
        text: "Cài đặt thông báo"
    },
    {
        onClick: null,
        icon: iconUserProfileSquare,
        text: "Hồ sơ của tôi"
    },
    {
        onClick: null,
        icon: iconQuestionCircle,
        text: "Trợ giúp"
    },
    {
        onClick: null,
        icon: iconSignoutRight,
        text: "Đăng xuất"
    },
  ];

  const eleHeader = (
    <div className="detailpopup-header">
      <CircleAvatarScreen 
        isOnline={false}
        src={ "https://png.pngtree.com/element_our/20190530/ourlarge/pngtree-520-couple-avatar-boy-avatar-little-dinosaur-cartoon-cute-image_1263411.jpg" }
        width={'36px'}
        height={'36px'}
        class={""}
      ></CircleAvatarScreen>
      <div className="detailpopup-header-right">
        <p>
          Quang Huy
        </p>
        <span>
          iSoft
        </span>
      </div>
    </div>
  )

  const eleDetailPopup =(onClosePopup: any) =>(<DetailPopupScreen 
                                                listEles={ listEles } 
                                                eleHeader={ eleHeader }
                                                onClosePopup={ onClosePopup }
                                              ></DetailPopupScreen>);

  return (
    <div className="header-container">
      <img src={ iconGridLayout } className="header-icon-9dots step1 cursor-pointer" alt="9 dots"></img>
      <img src={ iconLogoColorFull } className="header-icon-main cursor-pointer" alt="9 dots" ></img>

      <div className="header-icon-avatar">
        <MainPopupScreen context={ eleDetailPopup }>
          <div>
            <CircleAvatarScreen 
              isOnline={false}
              src={"https://cactusthemes.com/blog/wp-content/uploads/2018/01/tt_avatar_small.jpg"}
              width={'40px'}
              height={'40px'}
              class={""}
              hasCursor={ true }
            ></CircleAvatarScreen>
          </div>

        </MainPopupScreen>
      </div>

  </div>

  );
}

export default HeaderScreen;

