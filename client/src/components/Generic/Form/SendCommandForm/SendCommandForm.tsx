import React, { ChangeEvent, MouseEventHandler, MouseEvent } from 'react';
import { InputFormGroup, OptionFormGroup } from 'components';
import { Container, Typography, Button } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Modal } from 'semantic-ui-react';
import { commandServerTypes } from 'utils';
import { ComponentHandler, CommandDevice } from '@types';

interface SendCommandFormProps {
  setOpen: ComponentHandler<boolean>;
  updateSendCommandForm: ComponentHandler<CommandDevice>;
  sendCommandForm: CommandDevice;
  disable: boolean;
  open: boolean;
  message: string;
  sendCommandFormHandler: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  onSubmit: MouseEventHandler<HTMLButtonElement>;
  saveForBulk: (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
}
const SendCommandForm = ({
  setOpen,
  updateSendCommandForm,
  disable,
  open,
  sendCommandForm,
  message,
  sendCommandFormHandler,
  onSubmit,
  saveForBulk
}: SendCommandFormProps) => {
  return (
    <Modal
      onClose={
        !disable
          ? () => {
              setOpen(open => !open);
              updateSendCommandForm(form => {
                return { ...form, value: '', Command: '', Server: '' };
              });
            }
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
          Send Command
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
            <form className='single-device-form'>
              <Typography align={'center'} variant='h1'>
                Send Command To Device:- {sendCommandForm.DeviceEui}
              </Typography>
              {message ? <Alert color='success'>{message}</Alert> : null}

              <InputFormGroup
                label='Command'
                value={sendCommandForm.Command}
                onChange={sendCommandFormHandler}
                type='text'
                name='Command'
                placeholder='Enter Command'
              />

              <InputFormGroup
                label='Value'
                value={sendCommandForm.value}
                onChange={sendCommandFormHandler}
                type='text'
                name='value'
                placeholder='Enter Command Value'
              />

              <OptionFormGroup
                label='Server'
                value={sendCommandForm.Server}
                required={true}
                onChange={sendCommandFormHandler}
                name='Server'
                options={commandServerTypes}
              />

              <Button
                disabled={
                  disable ||
                  !(sendCommandForm.Server && sendCommandForm.value && sendCommandForm.Command)
                }
                color={'secondary'}
                onClick={event => onSubmit(event)}
                style={{ margin: '5px auto', display: 'block' }}
              >
                {disable ? 'Submitting' : 'Submit Command'}
              </Button>
              <Button
                disabled={
                  !(sendCommandForm.Server && sendCommandForm.value && sendCommandForm.Command)
                }
                color={'secondary'}
                onClick={event => saveForBulk(event)}
                style={{ margin: '5px auto', display: 'block' }}
              >
                Save for Bulk Devices
              </Button>
            </form>
          </Container>
        </div>
      </Modal.Content>
    </Modal>
  );
};

export { SendCommandForm };
