import React from 'react';
import { InputFormGroup, OptionFormGroup } from 'components';
import { Container, Alert, Form } from 'reactstrap';
import { Button, Modal, Header } from 'semantic-ui-react';
import { commandServerTypes } from 'utils';

const SendCommandForm = props => {
  return (
    <Modal
      onClose={
        !props.disable
          ? () => {
              props.setOpen(open => !open);
              props.updateSendCommandForm(form => {
                return { ...form, value: '', Command: '', Server: '' };
              });
            }
          : () => {
              return;
            }
      }
      closeOnDimmerClick={true}
      open={props.open}
      centered
      style={{ height: 'auto', top: 'auto', left: 'auto' }}
      trigger={
        <Button onClick={() => props.setOpen(open => !open)} color='green'>
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
            <Form className='single-device-form'>
              <Header textAlign={'center'} as='h1'>
                Send Command To Device:- {props.sendCommandForm.DeviceEui}
              </Header>
              {props.message ? <Alert color='success'>{props.message}</Alert> : null}

              <InputFormGroup
                Label='Command'
                value={props.sendCommandForm.Command}
                onChange={props.sendCommandFormHandler}
                type='text'
                name='Command'
                placeholder='Enter Command'
              />

              <InputFormGroup
                Label='Value'
                value={props.sendCommandForm.value}
                onChange={props.sendCommandFormHandler}
                type='text'
                name='value'
                placeholder='Enter Command Value'
              />

              <OptionFormGroup
                Label='Server'
                value={props.sendCommandForm.Server}
                required={true}
                onChange={props.sendCommandFormHandler}
                type='select'
                name='Server'
                options={commandServerTypes}
              />

              <Button
                disabled={
                  props.disable ||
                  !(
                    props.sendCommandForm.Server &&
                    props.sendCommandForm.value &&
                    props.sendCommandForm.Command
                  )
                }
                color={'blue'}
                onClick={e => props.onSubmit(e)}
                style={{ margin: '5px auto', display: 'block' }}
              >
                {props.disable ? 'Submitting' : 'Submit Command'}
              </Button>
              <Button
                type='click'
                disabled={
                  !(
                    props.sendCommandForm.Server &&
                    props.sendCommandForm.value &&
                    props.sendCommandForm.Command
                  )
                }
                color={'blue'}
                onClick={e => props.saveForBulk(e)}
                style={{ margin: '5px auto', display: 'block' }}
              >
                Save for Bulk Devices
              </Button>
            </Form>
          </Container>
        </div>
      </Modal.Content>
    </Modal>
  );
};

export { SendCommandForm };
