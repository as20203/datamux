import React, { SyntheticEvent, useState, useContext, FormEvent } from 'react';
import { Loader, InputFormGroup } from 'components';
import { Typography } from '@material-ui/core';
import {
  LoginButton,
  LoginContainer,
  LoginMain,
  LoginImage,
  LoginImageContainer,
  LoginForm
} from './elements';
import axios from 'axios';
import history from 'MyHistory';
import { useForm } from 'CustomHooks';
import { authContext } from 'services';

const Login = () => {
  const [login, , handleLogin] = useForm({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [disable, setDisable] = useState(false);
  const [loading, setLoading] = useState(true);
  const [, dispatch] = useContext(authContext);
  const styles = {
    input: { border: 'none', borderBottom: '1px solid #ced4da', boxShadow: 'none' }
  };
  const handleImageLoad = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    e.preventDefault();
    setLoading(false);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios
      .post('/api/login', login)
      .then(result => {
        dispatch({ type: 'authenticated', value: true, user: result.data.user });
        localStorage.setItem('Token', result.data.token);
        axios.put('/api/last-login').then(_ => {
          history.replace('/dashboard');
        });
      })
      .catch(err => {
        const message = err.response.data.message;
        setDisable(false);
        setMessage(message);
      });
  };
  return (
    <LoginMain>
      {loading ? <Loader /> : null}
      <LoginContainer loading={loading}>
        <LoginImageContainer display={window.matchMedia('(max-width: 850px)').matches}>
          <LoginImage
            onLoad={handleImageLoad}
            src='https://www.researchgate.net/profile/Khurshid_Aliev/publication/323258913/figure/fig5/AS:631607719391275@1527598423702/LoRa-star-network-architecture.png'
            alt='hello'
          />
        </LoginImageContainer>
        {!loading ? (
          <LoginForm
            width={window.matchMedia('(max-width: 350px)').matches ? 300 : 350}
            onSubmit={onSubmit}
          >
            <Typography
              variant={'h4'}
              align={window.matchMedia('(max-width: 500px)').matches ? 'center' : 'left'}
            >
              Login Now
            </Typography>
            {message !== '' ? (
              <p style={{ textAlign: 'center' }} color='danger'>
                {message}
              </p>
            ) : null}
            <InputFormGroup
              style={styles.input}
              label='Email:'
              value={login.email}
              required={true}
              onChange={event => {
                setMessage('');
                handleLogin(event);
              }}
              type='text'
              name='email'
              id='email'
              placeholder='Enter your email'
            />

            <InputFormGroup
              style={styles.input}
              label='Password:'
              value={login.password}
              required={true}
              onChange={e => {
                setMessage('');
                handleLogin(e);
              }}
              type='password'
              name='password'
              id='password'
              placeholder='Enter your password'
            />
            <LoginButton
              textColor='white'
              variant='contained'
              disabled={disable}
              backgroundColor={'#007bff'}
              type='submit'
            >
              {disable ? 'Submitting' : 'Submit'}
            </LoginButton>
          </LoginForm>
        ) : null}
      </LoginContainer>
    </LoginMain>
  );
};

export { Login };
