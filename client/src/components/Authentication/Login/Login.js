import React,{useState} from 'react'
import { Button,Form,Container,Alert} from 'reactstrap';
import InputFormGroup from 'components/Generic/Form/InputFormGroup/InputFormGroup';
import './Login.css'
import axios from 'axios';
import history from 'MyHistory';
import useForm from 'CustomHooks/useForm';


const Login=(props)=>{
  const [login,,handleLogin] = useForm({email:'',password:''})
  const [message,setMessage] = useState("");
  
  const onSubmit = (e) =>{
        e.preventDefault();
        axios.post("/api/login",login)
        .then(result=>{
          if(result.status===200){
            props.setUser(result.data.user);
            localStorage.setItem("Token",result.data.token);
            axios.put("/api/last-login")
            .then(result=>{
              if(result.status===200){
                history.replace("/dashboard");
              }
            })
          }
        })
        .catch(err=>{
          const message = err.response.data.message;
          setMessage(message);
        })
  };

  return(
      <div className='login-main'> 
          <Container className='login-container'>
            <Form className='form-main'  onSubmit={onSubmit}>
              <h1 align="center" as="h1">Login</h1>
              {message!==''?<Alert style={{textAlign:"center"}} color="danger">{message}</Alert>:null}
              <InputFormGroup Label="Email:" value={login.email}  required={true} onChange={(e)=>{setMessage("");handleLogin(e)}} type="text" name="email" id="email" placeholder="Enter your email" />
              <InputFormGroup Label="Password:" value={login.password}  required={true} onChange={(e)=>{setMessage("");handleLogin(e)}} type="password" name="password" id="password" placeholder="Enter your password" />
              <Button type='submit' style={{ margin: '5px auto',display:'block' }}>Submit</Button>
            </Form>
      </Container> 
      </div>
    )
}

export default Login;