import React from 'react';
import './circle-avatar.scss';
import { ICircleAvatar } from './circle-avatar.props';

const iconDeleteDisabled = require('../../Icons/delete-disabled.svg').default;

function CircleAvatarScreen(props : ICircleAvatar) {

  let { src , isOnline } = props;

  if(!src){
    src = "https://cdn.dribbble.com/users/2199928/screenshots/11532918/shot-cropped-1590177932366.png?compress=1&resize=400x300";
  }

  const styleInline = { 
    backgroundImage : `url(${src})` , 
    backgroundColor:"#d7e4e2",
    minWidth: props.width , 
    minHeight: props.height,
    cursor: props.hasCursor ? "pointer" : "initial"
  };

  return (
    <>
      <div 
        className={ "circleavatar-container " + props.class + (isOnline ? " isOnline" : "") } 
        style={ styleInline }
        onClick={ props.onClick && props.onClick }
      >
        { 
          props.canRomove && <div className="circleavatar-remove flex-center cursor-pointer" onClick={ props.onRemove }>
                                <img src={ iconDeleteDisabled } alt="" />
                              </div>  
        }
        { props.notiIcon && <img className="circleavatar-online" src={ props.notiIcon } alt="" /> }
      </div> 
    </>
  );
}

export default CircleAvatarScreen;


