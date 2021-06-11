import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';

const OptionFormGroup = props => {
  const options = props.options.map((option, index) => (
    <option
      customer-key={option.customer || ''}
      value={option}
      data-key={option.key || index}
      key={index}
    >
      {option.value || option}
    </option>
  ));
  return (
    <FormGroup style={{ marginBottom: props.marginBottom || 'auto' }}>
      {props.Label && <Label>{props.Label}</Label>}
      <Input
        id={props.id}
        value={props.value}
        required={props.required}
        onChange={props.onChange}
        type={props.type}
        name={props.name}
      >
        <option> </option>
        {options}
      </Input>
    </FormGroup>
  );
};

export { OptionFormGroup };
