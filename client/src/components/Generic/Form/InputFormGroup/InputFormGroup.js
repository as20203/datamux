import React from 'react';
import {FormGroup, Label, Input} from 'reactstrap';

const InputFormGroup = (props) =>{
    
    return(
        <FormGroup>
            <Label>{props.Label}</Label>
            <Input
            style={props.style}
            pattern={props.pattern} 
            required={props.required} 
            value={props.value}
            onChange={props.onChange} 
            title={props.title}
            type={props.type} name={props.name}  placeholder={props.placeholder} />
        </FormGroup>
    )
}


export {InputFormGroup };