import { useRef } from 'react';
import { ICustomInput } from './custom-input.props';

function CustomInputAdapter(props : ICustomInput) {
    const inputRef = useRef<any>(null);

    const { value , setIsFocused , setValue } = props;

    // useEffect(() => {
    //     props.value && setValue(props.value);
    // });

    const changeValue = (e: any) =>{
        const value = e.target.value;
        setValue(value);
        props.setValue && props.setValue(value);
        if(props.isMultiline){
            const lineNum = e.target.value.split("\n").length;
            if(inputRef.current){
                if(lineNum > 1){
                    inputRef.current.rows = 3;
                    props.setIsMultiline(true);
                } else{
                    inputRef.current.rows = 1;
                    props.setIsMultiline(false);
                }
            }
        }
    }

    const changeValue2 = (e: any) =>{
        props.onChange && props.onChange(e);
        const value = e.target.value;
        setValue && setValue(value);
    }

    const clearText = (e: any) =>{
        props.onChange && props.onChange(e);
        setValue && setValue("");
    }

    return {
        value ,
        changeValue,
        changeValue2,
        clearText,
        inputRef,
        setIsFocused
    }
}

export default CustomInputAdapter;
