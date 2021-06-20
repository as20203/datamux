import './SingleDeviceUI.css';
import React, { useState, useRef, useEffect, FormEvent } from 'react';
import { Container, Collapse, Button } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import axios from 'instance';
import { InputFormGroup, OptionFormGroup, CheckBoxFormGroup, Endpoint } from 'components';
import { deviceTypes } from 'utils';
import { Color } from '@types';
import { useForm } from 'CustomHooks';

const SingleDeviceUI = () => {
  const [
    newDevice,
    updateDevice,
    newDeviceHandler,
    checkBoxHandler,
    handleEndpointChange,
    addEndpoint,
    removeEndpoint
  ] = useForm({
    deviceUI: '',
    deviceType: '',
    customer: '',
    AccessToken: Math.random().toString(32).substr(2, 10).toUpperCase(),
    endpoint: [{ endpointType: '', endPointDest: '' }],
    InclRadio: false,
    RawData: false
  });
  const [collapse, setCollapse] = useState(false);
  const [disable, setDisable] = useState(false);
  const [message, setMessage] = useState('');
  const [color, setColor] = useState<Color | undefined>();
  let isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, [isMounted]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newDevice.endpoint.length > 0) {
      if (/((([A-Z]|\d){2}-){7})([A-Z]|\d){2}/.test(newDevice.deviceUI)) {
        setDisable(true);
        const endPointDest = newDevice.endpoint
          .map(endpoint => endpoint.endPointDest.trim())
          .join('|')
          .trim();
        const endpointType = newDevice.endpoint
          .map(endpoint => endpoint.endpointType.trim())
          .join('|')
          .trim();
        const device = {
          Deviceeui: newDevice.deviceUI,
          Devicetype: newDevice.deviceType,
          Endpointdest: endPointDest,
          Endpointtype: endpointType,
          InclRadio: newDevice.InclRadio,
          RawData: newDevice.RawData,
          AccessToken: newDevice.AccessToken,
          Customer: newDevice.customer
        };
        axios
          .post('/devices/add', device)
          .then(_ => {
            if (isMounted.current) {
              const device = {
                deviceUI: '',
                deviceType: '',
                endpoint: [{ endpointType: '', endPointDest: '' }],
                InclRadio: false,
                RawData: false,
                customer: '',
                AccessToken: Math.random().toString(32).substr(2, 10).toUpperCase()
              };
              updateDevice(device);
              setMessage('Successfully Added Device');
              setColor('success');
              setDisable(false);
            }
          })
          .catch(err => {
            if (isMounted.current) {
              setMessage(`Cannot Add Device:-   ${err.response.data ? err.response.data : ''}`);
              setColor('error');
              setDisable(false);
            }
          });
      } else {
        if (isMounted.current) {
          setMessage('Correct DeviceUI');
          setColor('error');
          setDisable(false);
        }
      }
    } else {
      if (isMounted.current) {
        setMessage('Set Atleast One Endpoint');
        setColor('error');
        setDisable(false);
      }
    }
  };

  return (
    <div className='single-device-main'>
      <Container>
        <Button color='primary' onClick={() => setCollapse(collapse => !collapse)}>
          Add
        </Button>
        <Collapse in={collapse}>
          <form className='single-device-form' onSubmit={onSubmit}>
            {message ? <Alert color={color}>{message}</Alert> : null}
            <InputFormGroup
              label='Device UI'
              pattern='((([A-Z]|\d){2}-){7})([A-Z]|\d){2}'
              required={true}
              value={newDevice.deviceUI}
              onChange={e => {
                setMessage('');
                newDeviceHandler(e);
              }}
              title='Format:70-B3-D5-D7-20-04-03-9A'
              type='text'
              name='deviceUI'
              placeholder='Enter your Device UI'
            />

            <InputFormGroup
              label='Access Token'
              required={true}
              value={newDevice.AccessToken}
              onChange={e => {
                setMessage('');
                newDeviceHandler(e);
              }}
              type='text'
              name='AccessToken'
              placeholder='Enter Access Token'
            />

            <InputFormGroup
              label='Customer'
              required={true}
              value={newDevice.customer}
              onChange={e => {
                setMessage('');
                newDeviceHandler(e);
              }}
              type='text'
              name='customer'
              placeholder='Enter Customer Name'
            />

            <OptionFormGroup
              label='Select Device Type'
              value={newDevice.deviceType}
              required={true}
              onChange={e => {
                setMessage('');
                newDeviceHandler(e);
              }}
              name='deviceType'
              options={deviceTypes}
            />

            <Endpoint
              addEndpoint={e => addEndpoint(newDevice.endpoint)}
              removeEndpoint={e => removeEndpoint(newDevice.endpoint)}
              endpoints={newDevice.endpoint}
              optionsLabel='Select Endpoint Type'
              inputLabel='Select Endpoint Destination'
              required={true}
              handleChange={handleEndpointChange}
              inputType='text'
              inputPlaceholder='Select Endpoint Destination'
              optionsPlaceholder='Select Endpoint Type'
              optionsName='endpointType'
              inputName='endPointDest'
            />

            <CheckBoxFormGroup
              checked={newDevice.InclRadio}
              label='InclRadio'
              checkBoxHandler={checkBoxHandler}
              name='InclRadio'
              type='checkbox'
            />
            <CheckBoxFormGroup
              checked={newDevice.RawData}
              label='RawData'
              checkBoxHandler={checkBoxHandler}
              name='RawData'
              type='checkbox'
            />
            <Button
              disabled={disable}
              color={'primary'}
              type='submit'
              style={{ margin: '5px auto', display: 'block' }}
            >
              {disable ? 'Submitting' : 'Submit'}
            </Button>
          </form>
        </Collapse>
      </Container>
    </div>
  );
};

export { SingleDeviceUI };
