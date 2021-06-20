import React, { FC, ChangeEvent } from 'react';
import { FormGroup, Checkbox, InputLabel } from '@material-ui/core';
interface CheckBoxFormGroupProps {
  checked: boolean;
  name: string;
  type: string;
  label: string;
  checkBoxHandler: (event: ChangeEvent<HTMLInputElement>) => void;
}
const CheckBoxFormGroup: FC<CheckBoxFormGroupProps> = props => {
  return (
    <FormGroup>
      <InputLabel>
        {props.label}
        <Checkbox checked={props.checked} onChange={props.checkBoxHandler} name={props.name} />{' '}
      </InputLabel>
    </FormGroup>
  );
};

export { CheckBoxFormGroup };
