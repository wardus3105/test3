import React from 'react';
import DetailPopupScreen from '../../../../../../libraries/Features/popup/detail-popup/detail-popup.screen';
import MainPopupScreen from '../../../../../../libraries/Features/popup/main-popup/main-popup.screen';
import ToggleSwitchScreen from '../../../../../../libraries/Features/toggle-switch/toggle-switch.screen';
import TooltipScreen from '../../../../../../libraries/Features/tooltip/tooltip.screen';
import './header-notification-list.scss';

const iconMoreVertical = require('../../../../../../libraries/Icons/more-vertical.svg').default;
const iconTrashDeleteBin = require('../../../../../../libraries/Icons/trash-delete-bin.svg').default;
const iconSettings = require('../../../../../../libraries/Icons/settings.svg').default;
const iconCheck = require('../../../../../../libraries/Icons/check.svg').default;
const iconBellNotificationOn = require('../../../../../../libraries/Icons/bell-notification-on.svg').default;

function HeaderNotificationListScreen(props: any) {

    const eleContext = (
        <div className="descriptionchatlist-header-container">
            <div className="brownnoti-container">
                <img src={ iconBellNotificationOn }  alt=""></img>
            </div>  
            <div>
                <h4>Thông báo</h4>
                <span>Tất cả các thông báo</span>
            </div>
            <ToggleSwitchScreen></ToggleSwitchScreen>
        </div>
    );

    const listEles = [
        {
            onClick: null,
            icon: iconCheck,
            text: "Đã đọc tất cả",
            eleContext: null,
        },
        {
            onClick: null,
            icon: iconSettings,
            text: "Cài đặt",
            eleContext: eleContext,
        },
        {
            onClick: null,
            icon: iconTrashDeleteBin,
            text: "Xóa tất cả",
            eleContext: eleContext,
        },
    ];

    const eleDetailPopup =(onClosePopup: any) =>(<DetailPopupScreen 
                                                    listEles={ listEles } 
                                                    onClosePopup={ onClosePopup }
                                                ></DetailPopupScreen>);

    return (
        <>
            <div className="notification-top">
                <div className="descriptionchatlist-header-container">
                    <p className="subheading-semibold">Thông báo</p>
                    
                    <MainPopupScreen context={ eleDetailPopup }>
                        <div>
                            <TooltipScreen context="Tạo tin nhắn">
                                <img src={ iconMoreVertical } className="descriptionchatlist-icon-penedit cursor-pointer icon-svg--hover" alt=""/>
                            </TooltipScreen>
                        </div>
                    </MainPopupScreen>
                </div>
            </div>
        </>
    );

}

export default HeaderNotificationListScreen;


