import './DeviceUI.css'
import { Container , Collapse, Button, Form, FormGroup, Label, Input, Alert} from 'reactstrap';
import axios from '../../../instance';
import React,{Component} from 'react';

class DeviceUI extends Component{
    state={
        collapse:false,
        deviceUI:'',
        deviceType:'',
        endpoint:[{endpointType:'',endPointDest:''}],
        InclRadio:null,
        RawData:null,
        message:'',
        AccessToken:Math.random().toString(32).substr(2,10).toUpperCase(),
        disable:false
    
    }

    toggle = ()=> {
        this.setState((prevState, props) => ({collapse:!prevState.collapse}))
    }

    onChange = (event) =>{
        this.setState({[event.target.name]:event.target.value,message:'' });
        

      }
    
      checkBoxHandler = (event)=>{
        this.setState({[event.target.name]:event.target.checked });
      }

      handleChange = (e,index)=>{
        const [name] = [e.target.name];
        const updatedEndpoint = this.state.endpoint;
        updatedEndpoint[index][name]= e.target.value;
        this.setState({
          endpoint:updatedEndpoint
        }) 
      }

      addEndpoint = () =>{
        this.setState(prevState => ({
          endpoint:[...prevState.endpoint,{endpointType:'',endPointDest:''}],
          message:''
        }));
      }

      removeEndpoint = () =>{
        const updatedEndpoints = this.state.endpoint;
        updatedEndpoints.pop();
        this.setState({
          endpoint:updatedEndpoints,
          message:''
        }) 
      }
    
      onSubmit = async(e) =>{
        e.preventDefault();
        this.setState({
          disable:true
        })
        const {deviceUI,deviceType,endpoint,InclRadio,RawData,AccessToken} = this.state;
          if(endpoint.length>0){
            if(this.state.AccessToken.length===10){
              const endPointDest = endpoint.map(endpoint=> endpoint.endPointDest).join("|").trim();
              const endpointType = endpoint.map(endpoint=> endpoint.endpointType).join("|").trim();
              const newDevice = {Deviceeui:deviceUI,deviceType,endPointDest,endpointType,InclRadio,RawData,AccessToken}
              axios.post('/devices/add',newDevice)
              .then(res=>{
                this.setState({
                  deviceUI:'',
                  deviceType:'',
                  endpoint:[{endpointType:'',endPointDest:''}],
                  InclRadio:false,
                  RawData:null,
                  disable:null,
                  AccessToken:Math.random().toString(32).substr(2,10).toUpperCase(),
                  message:'Device Created Successfully'
                })
              })
            }
          }else{
            this.setState({
              message:'Set Atleast One Endpoint'
            })
          }
         
        
      }

    render(){
      let message = null;
      if(this.state.message){
        message = <Alert color="success">
                  {this.state.message}
                </Alert>
      }
        return(
            <div className='single-device-main'>
              <Container>
                <Button  color="primary" onClick={this.toggle}>Add</Button>
                    <Collapse isOpen={this.state.collapse}>
                      
                        <Form className='single-device-form'  onSubmit={this.onSubmit}>
                        {message}
                        <FormGroup>
                            <Label for="exampleEmail">Device UI</Label>
                            <Input
                            pattern="([A-Z]|[0-9])([A-Z]|[0-9])-([A-Z]|[0-9])([A-Z]|[0-9])-([A-Z]|[0-9])([A-Z]|[0-9])-([A-Z]|[0-9])([A-Z]|[0-9])-([A-Z]|[0-9])([A-Z]|[0-9])-([A-Z]|[0-9])([A-Z]|[0-9])-([A-Z]|[0-9])([A-Z]|[0-9])-([A-Z]|[0-9])([A-Z]|[0-9])" 
                            required={true} 
                            value={this.state.deviceUI}
                            onChange={this.onChange} 
                            title="Format:70-B3-D5-D7-20-04-03-9A"
                            type="text" name="deviceUI" id="exampleEmail" placeholder="Enter your Device UI" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleToken">Access Token</Label>
                            <Input
                            pattern="(?=.*\d)((?=.*[a-z])|(?=.*[A-Z])).{10}"
                            required={true} 
                            value={this.state.AccessToken}
                            onChange={this.onChange} 
                            title="Length should be 10 characters with atleast one digit and 
                                  upper or lowercase letter"
                            type="text" name="AccessToken" id="exampleToken" placeholder="Enter your Device UI" />
                        </FormGroup>

                      
                        <FormGroup>
                            <Label for="exampleDevice">Select Device Type</Label>
                            <Input  value={this.state.deviceType} required={true} onChange={this.onChange} type="select" name="deviceType" id="exampleDevice">
                            <option> </option>
                            <option>OY1100</option>
                            <option>OY1110</option>
                            <option>OY1210</option>
                            <option>OY1310</option>
                            <option>OY1320</option> 
                            <option>OY1700</option>
                            <option>UNKNOWN</option>
                            <option>OY1400</option>
                            <option>OY1410</option>
                            <option>SmartValve</option>
                            <option>LR210</option>
                            <option>OY1600V1</option>
                            <option>WaterIWMLR3</option>
                            <option>DigimondoMeter</option>
                            <option>OY1320V1</option>
                            <option>LandisGyr</option>
                            <option>OY1200</option>
                            <option>TetraedreMBUS</option>
                            </Input>
                        </FormGroup>
                        
                        <div style={{display:'flex',justifyContent:'flex-start',width:'80%',margin:'5px auto'}}>
                        <Button style={{margin:'auto 0'}}  onClick={this.addEndpoint} type='button' outline color="primary">Add Endpoint</Button>{' '}
                        {this.state.endpoint.length>1?<Button style={{margin:'auto 0 auto 5px'}}  onClick={this.removeEndpoint} type='button' outline color="danger">Remove Endpoint</Button>:null}
                        </div>

                        {
                          this.state.endpoint.map((endpoint,index)=>{
                            return(
                              <div  key={index}>
                              <FormGroup>
                                <Label for="examplePoint">Select Endpoint Type</Label>
                                <Input  value={endpoint.endpointType} required={true} onChange={(e)=>this.handleChange(e,index)} type="select" name="endpointType" >
                                <option> </option>
                                <option>CORLYSIS</option>
                                <option>HTTP</option>
                                <option>FIWARE</option>
                                <option>THINGSBOARD</option>
                                <option>MQTT</option>
                                </Input>
                              </FormGroup>
                                <FormGroup>
                                <Label for='endPointDest'>End Point Destination</Label>
                                <Input  value={endpoint.endPointDest}  required={true} onChange={(e)=>this.handleChange(e,index)} type="text" name="endPointDest"  placeholder="Enter your Device UI" />
                              </FormGroup>
                              </div>
                            )
                          })
                        }
                       
                            <FormGroup check>
                            <Label check>
                                <Input   onChange={this.checkBoxHandler} name='InclRadio' type="checkbox" />{' '}
                                InclRadio 
                            </Label>
                            </FormGroup>
                            <FormGroup check>
                            <Label check>
                                <Input   onChange={this.checkBoxHandler} name='RawData' type="checkbox" />{' '}
                                Raw Data 
                            </Label>
                            </FormGroup>
                            <Button disabled={this.state.disable} type='submit' style={{ margin: '5px auto',display:'block' }}>
                              {this.state.disable?"Submitting":"Submit"}</Button>
                        </Form>
                    </Collapse>
              </Container>
            </div>
        )
    }
}
export default DeviceUI;