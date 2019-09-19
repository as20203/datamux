import { Container , Collapse, Button, Form, FormGroup, Label, Input, Alert} from 'reactstrap';
import axios from 'axios';
import React,{Component} from 'react';

class DeviceUI extends Component{
    state={
        collapse:false,
        deviceUI:'',
        deviceType:'',
        endpointType:'',
        endPointDest:'',
        InclRadio:false,
        RawData:false,
        message:''
    
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
    
      onSubmit = async(e) =>{
        e.preventDefault();
        const {deviceUI,deviceType,endPointDest,endpointType,InclRadio,RawData} = this.state;
        const newDevice = {Deviceeui:deviceUI,deviceType,endPointDest,endpointType,InclRadio,RawData}
        axios.post('/devices/add',newDevice)
        .then(res=>{
          this.setState({
            deviceUI:'',
            deviceType:'',
            endpointType:'',
            endPointDest:'',
            InclRadio:false,
            RawData:false,
            message:'Device Created Successfully'
          })
        })
      }

    render(){
      let message = null;
      if(this.state.message){
        message = <Alert color="success">
                  {this.state.message}
                </Alert>
      }
        return(
            <Container>
            <Button  color="primary" onClick={this.toggle} style={{ margin: '10px auto',display:'block'}}>Add</Button>
                <Collapse isOpen={this.state.collapse}>
                   
                    <Form style={{margin: '5px auto',width:'70%'}} onSubmit={this.onSubmit}>
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
                        <Label for="exampleDevice">Select Device Type</Label>
                        <Input  value={this.state.deviceType} required={true} onChange={this.onChange} type="select" name="deviceType" id="exampleDevice">
                        <option> </option>
                        <option>OY1100</option>
                        <option>OY1110</option>
                        <option>OY1210</option>
                        <option>OY1310</option>
                        <option>OY1320</option> 
                        <option>OY1700</option>
                        <option>OY1410</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePoint">Select Endpoint Type</Label>
                        <Input  value={this.state.endpointType} required={true} onChange={this.onChange} type="select" name="endpointType" id="examplePoint">
                        <option> </option>
                        <option>CORLYSIS</option>
                        <option>HTTP</option>
                        <option>FIWARE</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for='endPointDest'>End Point Destination</Label>
                        <Input  value={this.state.endPointDest}  required={true} onChange={this.onChange} type="text" name="endPointDest" id="endPointDest" placeholder="Enter your Device UI" />
                        </FormGroup>  
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
                        <Button type='submit' style={{ margin: '5px auto',display:'block' }}>Submit</Button>
                    </Form>
                </Collapse>
            </Container>
        )
    }
}
export default DeviceUI;