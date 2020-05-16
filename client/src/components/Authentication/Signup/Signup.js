import React,{useState} from 'react'
import { Button,Form,Container, Alert} from 'reactstrap'
import './Signup.css'
import axios from 'axios';
import useForm from 'CustomHooks/useForm';
import InputFormGroup from 'components/Generic/Form/InputFormGroup/InputFormGroup';

const Signup=()=>{
  const [signup,clearSignup,handleSignup] = useForm({username:'',password:'',email:'',userType:"user"});
  const [message,setMessage]  = useState('');
  const [disable,setDisable]  = useState(false);

const onSubmit = (e) =>{
    e.preventDefault();
    setDisable(true);
    axios.post("/api/register",signup)
    .then(result=>{
      const user = {username:'',password:'',email:'',userType:'user',message:'User Created Successfully'}
      clearSignup(user);
      setMessage('User Successfully Created');
      setDisable(false);
    })
    .catch(err=>{
      const message = err.response.data.message;
      setMessage(message);
      setDisable(false);

    })
  };

  return(
      <Container style={{margin:'200px auto'}}>
      <h1 align="center" as="h1">Signup</h1>
        <Form style={{margin: '5px auto',width:'50%'}} onSubmit={onSubmit}>
          {message?<Alert color="success">{message}</Alert>:null}
          <InputFormGroup Label="Username:" value={signup.username} required={true} onChange={(e)=>{setMessage("");handleSignup(e)}} type="text" name="username" placeholder="Enter your username"   />
          <InputFormGroup Label="Password:" value={signup.password} required={true} onChange={(e)=>{setMessage("");handleSignup(e)}} type="password" name="password" placeholder="Enter your password"   />
          <InputFormGroup Label="Email:" value={signup.email}    required={true} onChange={(e)=>{setMessage("");handleSignup(e)}} type="email" name="email" placeholder="Enter your email"   />
          <Button disabled={disable} type='submit' style={{ margin: '5px auto',display:'block' }}>{disable?"Submitting":"Submit"}</Button>
        </Form>
      </Container> 
  )
  }


export default Signup;