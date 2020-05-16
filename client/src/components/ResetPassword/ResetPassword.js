import React,{Component} from 'react'
import { Button,Form,Container,FormGroup, Label, Input,Alert} from 'reactstrap'
import './ResetPassword.css'
import axios from 'axios';

class Login extends Component{
  state = {
    oldpassword:'',
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
    axios.post("/api/reset-password",credentials)
    .then(result=>{ 
      if(result.status===200){
        this.setState({
            oldpassword:'',
            password:'',
            message:result.data.message
        })
      }
    })
    .catch(err=>{
      console.log(err);
    })
  };
  render(){
      let successAlert =null;
      if(this.state.message){
          successAlert=  <Alert color='success' align='center'>{this.state.message}</Alert>
      }
      return(
          <Container style={{margin:'200px auto'}}>
          <h1 align="center" as="h1">Reset Password</h1>
           
            <Form style={{margin: '5px auto',width:'50%'}} onSubmit={this.onSubmit}>
            {successAlert}
              <FormGroup>
                  <Label for='oldpassword'>Old Password:</Label>
                  <Input  value={this.state.oldpassword}  required={true} onChange={this.onChange} type="password" name="oldpassword" id="oldpassword" placeholder="Enter old password" />
              </FormGroup>  
              <FormGroup>
                  <Label for='password'>New Password:</Label>
                  <Input  value={this.state.password}  required={true} onChange={this.onChange} type="password" name="password" id="password" placeholder="Enter your new password" />
              </FormGroup>  
              <Button type='submit' style={{ margin: '5px auto',display:'block' }}>Reset</Button>
            </Form>
          </Container> 
        
      )
  }
}

export default Login;