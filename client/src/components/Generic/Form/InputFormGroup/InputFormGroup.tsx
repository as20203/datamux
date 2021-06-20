import React, { CSSProperties, ChangeEventHandler } from 'react';
import { FormControl, InputLabel, Input } from '@material-ui/core';

interface InputFormGroupProps<T> {
  style?: CSSProperties;
  required?: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  title?: string;
  type?: string;
  name?: string;
  placeholder?: string;
  label: string;
  value: T;
  id?: string;
  pattern?: string;
}
const InputFormGroup = <T,>({
  style,
  required,
  onChange,
  title,
  type,
  name,
  value,
  placeholder,
  label,
  id,
  pattern
}: InputFormGroupProps<T>) => {
  return (
    <>
      <FormControl>
        <InputLabel htmlFor={label}>{label}</InputLabel>
        <Input
          inputProps={{ pattern }}
          value={value}
          onChange={onChange}
          style={style}
          required={required}
          title={title}
          type={type}
          name={name}
          placeholder={placeholder}
          id={id}
        />
      </FormControl>
    </>
  );
};

export { InputFormGroup };
