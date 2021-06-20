import React, { useState, FormEvent } from 'react';
import { Container, Typography, Button } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import './Signup.css';
import axios from 'axios';
import { useForm } from 'CustomHooks';
import { InputFormGroup } from 'components';
type MaterialUiAlter = 'error' | 'info' | 'success' | 'warning';
const Signup = () => {
  const [signup, clearSignup, handleSignup] = useForm({
    username: '',
    password: '',
    email: '',
    userType: 'user'
  });
  const [message, setMessage] = useState('');
  const [disable, setDisable] = useState(false);
  const [color, setColor] = useState<MaterialUiAlter>('info');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setDisable(true);
    axios
      .post('/api/register', signup)
      .then(result => {
        const user = {
          username: '',
          password: '',
          email: '',
          userType: 'user',
          message: 'User Created Successfully'
        };
        clearSignup(user);
        setMessage('User Successfully Created');
        setColor('success');
        setDisable(false);
      })
      .catch(err => {
        const message = err.response.data.message;
        setColor('error');
        setMessage(message);
        setDisable(false);
      });
  };

  return (
    <Container style={{ margin: '200px auto' }}>
      <Typography align='center' variant={'h1'}>
        Signup
      </Typography>
      <form style={{ margin: '5px auto', width: '50%' }} onSubmit={onSubmit}>
        {message ? <Alert color={color}>{message}</Alert> : null}
        <InputFormGroup
          id='username'
          label='Username:'
          value={signup.username}
          required={true}
          onChange={e => {
            setMessage('');
            handleSignup(e);
          }}
          type='text'
          name='username'
          placeholder='Enter your username'
        />
        <InputFormGroup
          id='password'
          label='Password:'
          value={signup.password}
          required={true}
          onChange={event => {
            setMessage('');
            handleSignup(event);
          }}
          type='password'
          name='password'
          placeholder='Enter your password'
        />
        <InputFormGroup
          id='email'
          label='Email:'
          value={signup.email}
          required={true}
          onChange={event => {
            setMessage('');
            handleSignup(event);
          }}
          type='email'
          name='email'
          placeholder='Enter your email'
        />
        <Button disabled={disable} type='submit' style={{ margin: '5px auto', display: 'block' }}>
          {disable ? 'Submitting' : 'Submit'}
        </Button>
      </form>
    </Container>
  );
};

export { Signup };
