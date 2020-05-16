import React,{Component} from 'react'
import { Button,Form,Container,FormGroup, Label, Input,Alert} from 'reactstrap'
import './Login.css'
import axios from 'axios';
import history from 'MyHistory';
class Login extends Component{
  state = {
    email:'',
    password:'',
    message:''
  };
  onChange = (e) =>{
    this.setState({
      [e.target.name]:e.target.value,
      message:''
    })
  };
  onSubmit = (e) =>{
    e.preventDefault();
    const credentials = this.state;
    axios.post("/api/login",credentials)
    .then(result=>{
      if(result.status===200){
        this.props.setUser(result.data.user);
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
      this.setState({
        message:message
      })
    })
  };
  render(){
      return(
          <div className='login-main'> 
              <Container className='login-container'>
                <Form className='form-main'  onSubmit={this.onSubmit}>
                  <h1 align="center" as="h1">Login</h1>
                  {this.state.message!==''?<Alert style={{textAlign:"center"}} color="danger">{this.state.message}</Alert>:null}
                  <FormGroup >
                    <Label for='email'>Email:</Label>
                    <Input  value={this.state.email}  required={true} onChange={this.onChange} type="text" name="email" id="email" placeholder="Enter your email" />
                  </FormGroup>  
                  <FormGroup>
                    <Label for='password'>Password:</Label>
                    <Input  value={this.state.password}  required={true} onChange={this.onChange} type="password" name="password" id="password" placeholder="Enter your password" />
                  </FormGroup>  
                  <Button type='submit' style={{ margin: '5px auto',display:'block' }}>Submit</Button>
                </Form>
          </Container> 
          </div>
          
      )
  }
}

export default Login;