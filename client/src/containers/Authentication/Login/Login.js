import React,{Component} from 'react'
import { Button,Form,Container,FormGroup, Label, Input} from 'reactstrap'
import './Login.css'
import axios from 'axios';
import history from '../../../history';
class Login extends Component{
  state = {
    email:'',
    password:''
  };
  onChange = (e) =>{
    this.setState({
      [e.target.name]:e.target.value
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
      console.log(err);
    })
  };
  render(){
      return(
        // <div style={{margin:'200px auto'}}>
          <Container style={{margin:'200px auto'}}>
          <h1 align="center" as="h1">Login</h1>
            <Form style={{margin: '5px auto',width:'50%'}} onSubmit={this.onSubmit}>
              <FormGroup>
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
        // </div>
      )
  }
}

export default Login;