import React from 'react';
import DetailPopupScreen from '../../../../../../../libraries/Features/popup/detail-popup/detail-popup.screen';
import MainPopupScreen from '../../../../../../../libraries/Features/popup/main-popup/main-popup.screen';
import TooltipScreen from '../../../../../../../libraries/Features/tooltip/tooltip.screen';


const iconVolumeOff = require('../../../../../../../libraries/Icons/volume-off.svg').default;
// const iconMoreVertical = require('../../../../../../../libraries/Icons/more-vertical.svg').default;
const iconSearchLoupe = require('../../../../../../../libraries/Icons/search-loupe.svg').default;
const iconTrashDeleteBin = require('../../../../../../../libraries/Icons/trash-delete-bin.svg').default;
const iconSignoutRight = require('../../../../../../../libraries/Icons/signout-right.svg').default;
const iconInformationInforLine = require('../../../../../../../libraries/Icons/information-infor-line.svg').default;

function GroupConversationScreen() {

    const listEles = [
        {
            onClick: null,
            icon: iconSearchLoupe,
            text: "Tìm kiếm"
        },
        {
            onClick: null,
            icon: iconVolumeOff,
            text: "Tắt thông báo"
        },
        {
            onClick: null,
            icon: iconInformationInforLine,
            text: "Giới thiệu"
        },
        {
            onClick: null,
            icon: iconSignoutRight,
            text: "Thoát khỏi nhóm"
        },
        {
            onClick: null,
            icon: iconTrashDeleteBin,
            text: "Xóa nhóm"
        }
    ];
    const eleDetailPopup =(onClosePopup: any) =>(<DetailPopupScreen 
                                                    listEles={ listEles } 
                                                    onClosePopup={ onClosePopup }
                                                ></DetailPopupScreen>);

    const eleOptionHeader = (onSearch: any) => (
        <>
            <TooltipScreen context="Tìm kiếm">
                <div>
                    <img src={ iconSearchLoupe } alt="search" onClick={ onSearch } className="cursor-pointer"></img>
                </div>
            </TooltipScreen>
            <MainPopupScreen context={ eleDetailPopup }>
                <div>
                    <TooltipScreen context="Chức năng khác">
                        {/* <div >
                            <img src={ iconMoreVertical } alt="3 dots" className="cursor-pointer"></img>
                        </div> */}
                        <div className="img-24 flex-center cursor-pointer icon-svg--hover">
                            <div className="vertical3dots"></div>
                        </div>
                    </TooltipScreen>
                </div>
            </MainPopupScreen>
        </>
    );

    return eleOptionHeader
}

export default GroupConversationScreen;






