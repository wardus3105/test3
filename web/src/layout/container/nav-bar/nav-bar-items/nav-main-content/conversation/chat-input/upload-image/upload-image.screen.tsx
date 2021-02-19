import React from 'react';
import './upload-image.scss';

const iconDeleteDisabled = require('../../../../../../../../libraries/Icons/delete-disabled.svg').default;


function UploadImageScreen(props: any) {
  return (
    <div 
      className={"uploadimage-container " + props.class} 
      style={{ backgroundImage : `url(${ props.pathFile })` , width: props.width , height: props.height}}
      onClick={ () =>{ props.removePathFile(props.pathFile) }}
    >
      <div className="uploadimage-icon-delete-panel flex-center cursor-pointer">
          <img src={ iconDeleteDisabled } alt=""></img>
      </div>
    </div> 
  );
}

export default UploadImageScreen;
