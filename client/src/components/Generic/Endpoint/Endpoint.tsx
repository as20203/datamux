import React, { FC } from 'react';
import { Button } from '@material-ui/core';
import { endpointTypes } from 'utils';
import { InputFormGroup, OptionFormGroup } from 'components';
import { DeviceEndpoint } from '@types';

interface EndpointProps {
  endpoints: DeviceEndpoint[];
  optionsLabel: string;
  required: boolean;
  optionsName: string;
  inputLabel: string;
  inputName: string;
  inputType: string;
  optionsPlaceholder: string;
  inputPlaceholder: string;
  addEndpoint: (endpoint: DeviceEndpoint[]) => void;
  removeEndpoint: (endpoint: DeviceEndpoint[]) => void;
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
    endpoint: DeviceEndpoint[]
  ) => void;
}
const Endpoint: FC<EndpointProps> = ({
  endpoints,
  optionsLabel,
  required,
  optionsName,
  inputLabel,
  inputName,
  inputType,
  optionsPlaceholder,
  inputPlaceholder,
  addEndpoint,
  removeEndpoint,
  handleChange
}) => {
  const mappedEndpoints = endpoints.map((endpoint, index) => {
    return (
      <div key={index}>
        <OptionFormGroup
          label={optionsLabel}
          value={endpoint.endpointType}
          required={required}
          onChange={event => handleChange(event, index, endpoints)}
          name={optionsName}
          placeholder={optionsPlaceholder}
          options={endpointTypes}
        />
        <InputFormGroup
          label={inputLabel}
          value={endpoint.endPointDest}
          required={required}
          onChange={event => handleChange(event, index, endpoints)}
          type={inputType}
          name={inputName}
          placeholder={inputPlaceholder}
        />
      </div>
    );
  });

  return (
    <div>
      <div
        style={{ display: 'flex', justifyContent: 'flex-start', width: '80%', margin: '5px auto' }}
      >
        <Button
          style={{ margin: 'auto 0' }}
          onClick={() => addEndpoint(endpoints)}
          type='button'
          variant='outlined'
          color='secondary'
        >
          Add Endpoint
        </Button>{' '}
        {endpoints.length > 1 ? (
          <Button
            style={{ margin: 'auto 0 auto 5px' }}
            onClick={() => removeEndpoint(endpoints)}
            type='button'
            variant='outlined'
            color='primary'
          >
            Remove Endpoint
          </Button>
        ) : null}
      </div>
      {mappedEndpoints}
    </div>
  );
};

export { Endpoint };
