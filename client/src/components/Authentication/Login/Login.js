import React,{useState,useContext} from 'react';
import './Login.css'
import { Button,Form,Alert} from 'reactstrap';
import {InputFormGroup,Loader} from 'components';
import axios from 'axios';
import history from 'MyHistory';
import { useForm } from 'CustomHooks';
import { authContext } from 'services';


const Login=(props)=>{
  const [login,,handleLogin] = useForm({email:'',password:''})
  const [message,setMessage] = useState("");
  const [disable,setDisable] = useState(false);
  const [loading,setLoading] = useState(true);
  const [,dispatch]       = useContext(authContext);
  const styles = {
    input: {border:'none',borderBottom:'1px solid #ced4da',boxShadow:'none'},
    loginContainer: {display:loading?'none':'flex'},
    loginImage    : {display:window.matchMedia("(max-width: 850px)").matches?'none':'flex'},
    loginForm     : {width:window.matchMedia("(max-width: 350px)").matches?'300px':'350px'}
  }
  const handleImageLoad = (e) =>{
    e.preventDefault();
    setLoading(false);
  }

 

  const onSubmit = (e) =>{
        e.preventDefault();
        axios.post("/api/login",login)
        .then(result=>{
          dispatch({type:'authenticated',value:true,user:result.data.user});
          localStorage.setItem('Token',result.data.token);
          axios.put("/api/last-login")
          .then(_=>{
            history.replace("/dashboard");
          })
        })
        .catch(err=>{
          const message = err.response.data.message;
          setDisable(false);
          setMessage(message);
        })
  };
  return(
      <div className='login-main'> 
      {loading?<Loader />:null}
          <div className='login-container' style={styles.loginContainer}>
            <div className='login-image' style={styles.loginImage}>
                <img onLoad={handleImageLoad} src='https://www.researchgate.net/profile/Khurshid_Aliev/publication/323258913/figure/fig5/AS:631607719391275@1527598423702/LoRa-star-network-architecture.png' alt='hello' />
            </div>
            {!loading?
            <Form className='form-main' style={styles.loginForm}  onSubmit={onSubmit}>
              <h1 align={window.matchMedia("(max-width: 500px)").matches?'center':'left'}   as="h1">Login Now</h1>
              {message!==''?<Alert style={{textAlign:"center"}} color="danger">{message}</Alert>:null}
              <InputFormGroup style={styles.input} Label="Email:" value={login.email}  required={true} onChange={(e)=>{setMessage("");handleLogin(e)}} type="text" name="email" id="email" placeholder="Enter your email" />
              <InputFormGroup style={styles.input} Label="Password:" value={login.password}  required={true} onChange={(e)=>{setMessage("");handleLogin(e)}} type="password" name="password" id="password" placeholder="Enter your password" />
              <Button disabled={disable} color="primary" type='submit' style={{ margin: '5px auto',display:'block' }}>{disable?'Submitting':'Submit'}</Button>
            </Form>
            :null}
          </div>
           
      </div>
    )
}

export { Login };