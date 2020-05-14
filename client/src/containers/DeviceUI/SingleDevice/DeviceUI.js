import './DeviceUI.css'
import { Container , Collapse, Button, Form, Alert} from 'reactstrap';
import axios from '../../../instance';
import React,{Component} from 'react';
import InputFormGroup from '../../Generic/Form/InputFormGroup/InputFormGroup';
import OptionFormGroup from '../../Generic/Form/OptionFormGroup/OptionFormGroup';
import {deviceTypes} from '../../../utils/Devices';
import Endpoint from '../../Generic/Endpoint/Endpoint';
import CheckBoxFormGroup from '../../Generic/Form/CheckBoxFormGroup/CheckBoxFormGroup';
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
            if(this.state.AccessToken.length===10 &&  /((([A-Z]|\d){2}-){7})([A-Z]|\d){2}/.test(deviceUI)){
              const endPointDest = endpoint.map(endpoint=> endpoint.endPointDest.trim()).join("|").trim();
              const endpointType = endpoint.map(endpoint=> endpoint.endpointType.trim()).join("|").trim();
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
              message:'Set Atleast One Endpoint',
              disable:null,
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
                          <InputFormGroup  Label="Device UI" pattern="((([A-Z]|\d){2}-){7})([A-Z]|\d){2}"
                          required={true}  value={this.state.deviceUI}  onChange={this.onChange}  
                          title="Format:70-B3-D5-D7-20-04-03-9A"  type="text" name="deviceUI"
                          placeholder="Enter your Device UI"   />

                          <InputFormGroup Label="Access Token"
                          pattern="(?=.*\d)((?=.*[a-z])|(?=.*[A-Z])).{10}" required={true}
                          value={this.state.AccessToken}  onChange={this.onChange} 
                          title="Length should be 10 characters with atleast one digit and upper or lowercase letter"
                          type="text" name="AccessToken"  placeholder="Enter Access Token" />

                          <OptionFormGroup Label={"Select Device Type"} value={this.state.deviceType} required={true} onChange={this.onChange} type="select" name="deviceType" options={deviceTypes} />
                       
                          <Endpoint addEndpoint={this.addEndpoint}  removeEndpoint={this.removeEndpoint} endpoint={this.state.endpoint} OptionsLabel="Select Endpoint Type" InputLabel="Select Endpoint Destination" 
                          required={true} handleChange={this.handleChange} inputType='text' optionType='select'
                          InputPlaceholer="Select Endpoint Destination" OptionsPlaceholder="Select Endpoint Type"
                          OptionsName = "endpointType" InputName="endPointDest"
                          />
                          <CheckBoxFormGroup Label="InclRadio" checkBoxHandler={this.checkBoxHandler} name='InclRadio' type="checkbox"  />
                          <CheckBoxFormGroup Label="RawData" checkBoxHandler={this.checkBoxHandler} name='RawData' type="checkbox"  />

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