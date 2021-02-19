import React from 'react';
import { IIconCirclePanel } from './icon-circle-panel.props';
import './icon-circle-panel.scss';

function IconCirclePanel(props : IIconCirclePanel) {
  const style = {
    padding: props.padding,
    width: props.width ? props.width : "",
    height: props.height ? props.height : "",
  }
  return (
    <div className={ props.class ? ("iconcirclepanel-container " + props.class) : "iconcirclepanel-container"} style={ style } onClick={ props.onClick }>
      <img src={ props.srcIcon } alt=""/>
    </div>
  );
}

export default IconCirclePanel;
