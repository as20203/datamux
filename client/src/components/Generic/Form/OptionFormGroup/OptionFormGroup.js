import React from 'react';
import {FormGroup, Label, Input} from 'reactstrap';

const OptionFormGroup = (props)=>{
    const options = props.options.map((option,index)=><option key={index}>{option}</option>)
    return(
        <FormGroup>
            <Label>{props.Label}</Label>
            <Input  value={props.value} required={props.required} onChange={props.onChange} type={props.type} name={props.name}>
            <option> </option>
            {options}
            </Input>
        </FormGroup>
    )
}

export default OptionFormGroup;