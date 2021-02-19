import React from 'react';
import DetailPopupScreen from '../../../../../../../libraries/Features/popup/detail-popup/detail-popup.screen';
import MainPopupScreen from '../../../../../../../libraries/Features/popup/main-popup/main-popup.screen';
import TooltipScreen from '../../../../../../../libraries/Features/tooltip/tooltip.screen';
import { ReactComponent as IconVideoCircleLine } from '../../../../../../../libraries/Icons/video-circle-line.svg';

const iconVolumeOff = require('../../../../../../../libraries/Icons/volume-off.svg').default;
const iconMoreVertical = require('../../../../../../../libraries/Icons/more-vertical.svg').default;
const iconSearchLoupe = require('../../../../../../../libraries/Icons/search-loupe.svg').default;
const iconTrashDeleteBin = require('../../../../../../../libraries/Icons/trash-delete-bin.svg').default;
const iconVideoCircleLine = require('../../../../../../../libraries/Icons/video-circle-line.svg').default;

function PersonalConversationScreen() {

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
            icon: iconTrashDeleteBin,
            text: "Xóa chat"
        }
    ];

    const eleDetailPopup =(onClosePopup: any) =>(<DetailPopupScreen 
                                                    listEles={ listEles } 
                                                    onClosePopup={ onClosePopup }
                                                ></DetailPopupScreen>);

    const eleOptionHeader = (onSearch: any) => (
        <>
            <TooltipScreen position={ ['bottom center'] } context="Gọi video">
                <div>
                    <img src={ iconVideoCircleLine } alt="camera" className="cursor-pointer icon-svg--hover"></img>
                </div>
            </TooltipScreen>
            <TooltipScreen context="Tìm kiếm">
                <div>
                    <img src={ iconSearchLoupe } alt="search" onClick={ onSearch } className="cursor-pointer icon-svg--hover"></img>
                </div>
            </TooltipScreen>
            <MainPopupScreen context={ eleDetailPopup }>
                <div>
                    <TooltipScreen position={ ['top center'] } context="Chức năng khác">
                        <div>
                            <img src={ iconMoreVertical } alt="3 dots" className="cursor-pointer icon-svg--hover"></img>
                        </div>
                    </TooltipScreen>
                </div>
            </MainPopupScreen>
        </>
    )

    return eleOptionHeader;
}

export default PersonalConversationScreen;
