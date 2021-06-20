import React, { ChangeEvent, FC } from 'react';
import { FormGroup, InputLabel, Select } from '@material-ui/core';
interface Option {
  key: string;
  value?: string | number | readonly string[];
}

interface OptionFormGroupProps {
  id?: string;
  value: string | number | readonly string[];
  label: string;
  marginBottom?: number;
  options: (Option | string)[];
  name?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  required: boolean;
  placeholder?: string;
}

const OptionFormGroup: FC<OptionFormGroupProps> = ({
  options,
  id,
  value,
  required,
  name,
  label,
  marginBottom,
  placeholder,
  onChange
}) => {
  const formGroupOptions = options.map((option, index) => (
    <option
      customer-key={typeof option !== 'string' ? option.value : ''}
      value={typeof option !== 'string' ? option.value : option}
      data-key={typeof option !== 'string' ? option.key : index}
      key={index}
    >
      {(typeof option !== 'string' && option.value) || option}
    </option>
  ));
  return (
    <FormGroup style={{ marginBottom: marginBottom || 'auto' }}>
      {label && <InputLabel>{label}</InputLabel>}
      <input
        type='select'
        id={id}
        value={value}
        placeholder={placeholder}
        required={required}
        onChange={onChange}
        name={name}
      >
        <option> </option>
        {formGroupOptions}
      </input>
    </FormGroup>
  );
};

export { OptionFormGroup };
