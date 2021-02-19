import React from 'react';
import { IconPanelModel } from './icon-panel.props';
import TooltipScreen from '../../../../../libraries/Features/tooltip/tooltip.screen';
import './icon-panel.scss';

function IconPanelScreen(props : IconPanelModel) {

  return (
    <TooltipScreen context={ props.contextToolTip }>
      <div 
        className={ "navbar-iconpanel-container cursor-pointer flex-center " +  
                    (props.isActive ? "navbar-iconpanel-container--active " : "") + 
                    (props.hasNotification ? "hasNotification " : "") +
                    (props.className ? props.className : "") 
                  }
        onClick={ props.onClick }
      >
          <span>
        <img src={ props.srcImg } alt="" className="navbar-iconpanel-icon cursor-pointer"></img>
          </span>
      </div>
    </TooltipScreen>

  );
}

export default IconPanelScreen;
