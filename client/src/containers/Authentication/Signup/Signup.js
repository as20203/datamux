import React,{Component} from 'react'
import { Button,Form,Container,FormGroup, Label, Input} from 'reactstrap'
import './Signup.css'
import axios from 'axios';
class Signup extends Component{
  state = {
    username:'',
    password:'',
    email:'',
    userType:'user'
  };
  onChange = (e) =>{
    this.setState({
      [e.target.name]:e.target.value
    })
  };
  onSubmit = (e) =>{
    e.preventDefault();
    const credentials = this.state;
    axios.post("/api/register",credentials)
    .then(result=>{
      if(result.status===200){
        this.setState({
          username:'',
          password:'',
          email:'',
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
          <h1 align="center" as="h1">Signup</h1>
            <Form style={{margin: '5px auto',width:'50%'}} onSubmit={this.onSubmit}>
              <FormGroup>
                  <Label for='username'>Username:</Label>
                  <Input  value={this.state.username}  required={true} onChange={this.onChange} type="text" name="username" id="username" placeholder="Enter your username" />
              </FormGroup>  
              <FormGroup>
                  <Label for='password'>Password:</Label>
                  <Input  value={this.state.password}  required={true} onChange={this.onChange} type="password" name="password" id="password" placeholder="Enter your password" />
              </FormGroup>
              <FormGroup>
                  <Label for='email'>Email:</Label>
                  <Input  value={this.state.email}  required={true} onChange={this.onChange} type="email" name="email" id="email" placeholder="Enter your email" />
              </FormGroup>  
              <Button type='submit' style={{ margin: '5px auto',display:'block' }}>Submit</Button>
            </Form>
          </Container> 
        // </div>
      )
  }
}

export default Signup;