import React, { useState } from 'react';
import { Button, Form, Container, Alert } from 'reactstrap';
import './ResetPassword.css';
import axios from 'axios';
import { useForm } from 'CustomHooks';
import { InputFormGroup } from 'components';

const ResetPassword = () => {
  const [newPassword, setPassword, handlePasswordChange] = useForm({
    password: '',
    oldpassword: ''
  });
  const [message, setMessage] = useState('');
  const [disable, setDisable] = useState(false);
  const [color, setColor] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    setDisable(true);
    axios
      .post('/api/reset-password', newPassword)
      .then(result => {
        const resetPassword = {
          oldpassword: '',
          password: ''
        };
        setPassword(resetPassword);
        setColor('success');
        setMessage('Successfully Changed Password');
        setDisable(false);
      })
      .catch(err => {
        const message = err.response.data.message;
        setColor('danger');
        setMessage(message);
        setDisable(false);
      });
  };

  return (
    <Container style={{ margin: '200px auto' }}>
      <h1 align='center' as='h1'>
        Reset Password
      </h1>
      <Form style={{ margin: '5px auto', width: '50%' }} onSubmit={onSubmit}>
        {message ? (
          <Alert color={color} align='center'>
            {message}
          </Alert>
        ) : null}
        <InputFormGroup
          Label='Old Password'
          value={newPassword.oldpassword}
          required={true}
          onChange={e => {
            setMessage('');
            handlePasswordChange(e);
          }}
          type='password'
          name='oldpassword'
          placeholder='Enter old password'
        />
        <InputFormGroup
          Label='New Password'
          value={newPassword.password}
          required={true}
          onChange={e => {
            setMessage('');
            handlePasswordChange(e);
          }}
          type='password'
          name='password'
          placeholder='Enter your new password'
        />
        <Button disabled={disable} type='submit' style={{ margin: '5px auto', display: 'block' }}>
          {disable ? 'Resetting' : 'Reset'}
        </Button>
      </Form>
    </Container>
  );
};

export { ResetPassword };
