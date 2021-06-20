import React, { FC, FormEventHandler, ChangeEvent } from 'react';
import { Endpoint, InputFormGroup, OptionFormGroup, CheckBoxFormGroup } from 'components';
import { Container, Button, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Modal } from 'semantic-ui-react';
import { deviceTypes } from 'utils';
import { ComponentHandler } from '@types';
interface EditDevice {
  deviceUI: string;
  deviceType: string;
  AccessToken: string;
  endpoint: never[];
  InclRadio: boolean;
  RawData: boolean;
  customer: string;
}
interface EditFormProps {
  setOpen: ComponentHandler<boolean>;
  disable: boolean;
  open: boolean;
  onSubmit: FormEventHandler<HTMLFormElement>;
  message: string;
  editDevice: EditDevice;
  editDeviceHandler: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  checkBoxHandler: (event: ChangeEvent<HTMLInputElement>) => void;
  addEndpoint: (endpoint: Endpoint[]) => void;
  removeEndpoint: (endpoint: Endpoint[]) => void;
  handleEndpointChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
    endpoint: Endpoint[]
  ) => void;
}
const EditForm: FC<EditFormProps> = ({
  setOpen,
  disable,
  open,
  onSubmit,
  message,
  editDevice,
  editDeviceHandler,
  checkBoxHandler,
  addEndpoint,
  removeEndpoint,
  handleEndpointChange
}) => {
  return (
    <Modal
      onClose={
        !disable
          ? () => setOpen(open => !open)
          : () => {
              return;
            }
      }
      closeOnDimmerClick={true}
      open={open}
      centered
      style={{ height: 'auto', top: 'auto', left: 'auto' }}
      trigger={
        <Button onClick={() => setOpen(open => !open)} color='primary'>
          Edit
        </Button>
      }
      closeIcon
    >
      <Modal.Content
        style={{ display: 'flex', justifyContent: 'center', maxHeight: 'none' }}
        image
        scrolling
      >
        <div className='single-device-main'>
          <Container>
            <form className='single-device-form' onSubmit={onSubmit}>
              <Typography align={'center'} variant='h1'>
                Edit Device:- {editDevice.deviceUI}
              </Typography>
              {message ? <Alert color='success'>{message}</Alert> : null}
              <InputFormGroup
                label='Access Token'
                value={editDevice.AccessToken}
                onChange={editDeviceHandler}
                type='text'
                name='AccessToken'
                placeholder='Enter Access Token'
              />

              <InputFormGroup
                label='Customer'
                value={editDevice.customer}
                onChange={editDeviceHandler}
                type='text'
                name='customer'
                placeholder='Enter Customer Name'
              />

              <OptionFormGroup
                label='Select Device Type'
                value={editDevice.deviceType}
                required={true}
                onChange={editDeviceHandler}
                name='deviceType'
                options={deviceTypes}
              />

              <Endpoint
                addEndpoint={() => addEndpoint(editDevice.endpoint)}
                removeEndpoint={() => removeEndpoint(editDevice.endpoint)}
                endpoints={editDevice.endpoint}
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
                checked={editDevice.InclRadio}
                label='InclRadio'
                checkBoxHandler={checkBoxHandler}
                name='InclRadio'
                type='checkbox'
              />
              <CheckBoxFormGroup
                checked={editDevice.RawData}
                label='RawData'
                checkBoxHandler={checkBoxHandler}
                name='RawData'
                type='checkbox'
              />
              <Button
                disabled={disable}
                color='primary'
                type='submit'
                style={{ margin: '5px auto', display: 'block' }}
              >
                {disable ? 'Submitting' : 'Submit'}
              </Button>
            </form>
          </Container>
        </div>
      </Modal.Content>
    </Modal>
  );
};

export { EditForm };
