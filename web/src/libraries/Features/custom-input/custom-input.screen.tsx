import { ReactComponent } from '*.svg';
import React, { ChangeEvent } from 'react';
import CustomInputAdapter from './custom-input.adapter';
import { ICustomInput } from './custom-input.props';
import './custom-input.scss';

const iconDeleteDisabled = require('../../Icons/delete-disabled.svg').default;

function CustomInputScreen(props : ICustomInput) {
  const {
    value ,
    inputRef,
    changeValue,
    changeValue2,
    clearText,
    setIsFocused
  } = CustomInputAdapter(props)
  

  return (
    <div className={ "custominput-container " + props.class}>
      {
        props.isTextArea ?
        <textarea 
          placeholder={ props.placeHolder } 
          value={ value } 
          style={ props.style } 
          ref={inputRef} 
          rows={1} 
          // onFocus={ () =>{ setIsFocused && setIsFocused(true) }}
          // onBlur={ () =>{ setIsFocused && setIsFocused(false) }}
          onChange={ (e: ChangeEvent<Element>) => changeValue(e)}
        ></textarea>
        :
        <input type="text" 
          id={ props?.id }
          multiple={ props.isMultiline } 
          ref={inputRef} 
          placeholder={ props.placeHolder } 
          value={ value } 
          onClick={ props.onClick } 
          onChange={ (e: ChangeEvent<any>) => changeValue2(e) }
          required={ true } 
          style={ props.style }
        /> 
      }
      {
        (props.hasClearText && value) && (
          <img src={ iconDeleteDisabled } alt="" onClick={ (e:any) =>{ clearText(e)} } className="custominput-icon-cleartext cursor-pointer"/>
        )
      }
    </div>
  );
}

export default CustomInputScreen;
