import React from 'react';
import './upload-image.scss';

const iconDeleteDisabled = require('../../../../../../../../libraries/Icons/delete-disabled.svg').default;


function UploadImageScreen(props: any) {
  return (
    <div 
      className={"uploadimage-container " + props.class} 
      style={{ backgroundImage : `url(${ props.pathFile })` , width: props.width , height: props.height}}
    >
      <div 
        className="uploadimage-icon-delete-panel flex-center cursor-pointer"
        onClick={ () =>{ props.removePathFile(props.pathFile) }}
      >
          <img src={ iconDeleteDisabled } alt="" className="img-16"></img>
      </div>
    </div> 
  );
}

export default UploadImageScreen;
