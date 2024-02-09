import React from 'react';
import {FormGroup,Input} from 'reactstrap';

function InputNumber({ ...props }) {
    function isNumberKey(evt){
        var theEvent = evt || window.event;
        // Handle paste
        if (theEvent.type === 'paste') {
            // eslint-disable-next-line
            key = theEvent.clipboardData.getData('text/plain');
        } else {
        // Handle key press
            var key = theEvent.keyCode || theEvent.which;
            key = String.fromCharCode(key);
        }
        var regex = /[0-9]|\./;
        if( !regex.test(key) ) {
            theEvent.returnValue = false;
            if(theEvent.preventDefault) theEvent.preventDefault();
        }
    }
    function handleChange(event){
        props.onChange(event)
    }
    return (<>
        <label htmlFor={`input_${props.name}`}>{props.displayName}</label>
        <FormGroup id={`formGroup_${props.name}`} className={props.className}>
            <Input
                name={props.name}
                id={`input_${props.name}`}
                placeholder={props.placeHolder}
                type="number"
                min={props.min}
                max={props.max}
                step={props.step}
                onKeyPress={event => {
                    isNumberKey(event);
                }}
                value={props.defaultValue}
                onChange={handleChange}
            />
        </FormGroup>
    </>);
}

export default InputNumber;
