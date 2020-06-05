import React from 'react';
import {FormGroup,Input,Label} from 'reactstrap';

const CheckBoxFormGroup = (props) =>{
    return(
        <FormGroup check>
            <Label check>
                <Input checked={props.checked}   onChange={props.checkBoxHandler} name={props.name} type={props.type} />{' '}
                {props.Label}
            </Label>
        </FormGroup>
    )

}


export { CheckBoxFormGroup };