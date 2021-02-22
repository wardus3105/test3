import React from 'react';
import { ENUM_KIND_OF_NOTFOUNDICON } from '../../Enum/not-found-icon';
import { IDataNotFound } from './data-not-found.props';
import './data-not-found.scss';

const iconnotfounddata = require('../../Icons/iconnotfounddata.svg').default;
const iconnotfoundchat = require('../../Icons/iconnotfoundchat.svg').default;
const iconnotfoundnoti = require('../../Icons/iconnotfoundnoti.svg').default;
// const iconnotfoundmessage = require('../../Icons/iconnotfoundmessage.svg').default;

function DataNotFoundScreen(props : IDataNotFound) {

  const icon = () =>{
    switch (props.icon) {
      case ENUM_KIND_OF_NOTFOUNDICON.CHAT:
        return iconnotfoundchat;
      case ENUM_KIND_OF_NOTFOUNDICON.DATA:
        return iconnotfounddata;
      case ENUM_KIND_OF_NOTFOUNDICON.NOTI:
        return iconnotfoundnoti;
      case ENUM_KIND_OF_NOTFOUNDICON.MESSAGE:
        return '/images/sayhi.png';   
    }
  }

  return (
    <div className={"datanotfound-container " + ( props.isPosition ? "datanotfound-container--isposition" : "" )}>
      <div className="cursor-pointer">
        <img src={ icon() } alt="" className="datanotfound-icon" onClick={props?.onClick}  />
        <h4>
          { props.text }
        </h4>
      </div>
    </div>
  );
}

export default DataNotFoundScreen;
