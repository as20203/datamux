import './DeviceUI.css'
import { Container , Collapse, Form, Alert,Button} from 'reactstrap';
import {Button as SemanticButton} from 'semantic-ui-react';
import axios from 'instance';
import React,{useState,useRef,useEffect} from 'react';
import InputFormGroup from 'components/Generic/Form/InputFormGroup/InputFormGroup';
import OptionFormGroup from 'components/Generic/Form/OptionFormGroup/OptionFormGroup';
import {deviceTypes} from 'utils/Devices';
import Endpoint from 'components/Generic/Endpoint/Endpoint';
import CheckBoxFormGroup from 'components/Generic/Form/CheckBoxFormGroup/CheckBoxFormGroup';
import useForm from 'CustomHooks/useForm';


const DeviceUI = ()=>{
  const [newDevice,updateDevice,newDeviceHandler,checkBoxHandler,
    handleEndpointChange,addEndpoint,removeEndpoint] = useForm({deviceUI:'',deviceType:'',customer:'',
    AccessToken:Math.random().toString(32).substr(2,10).toUpperCase(),endpoint:[{endpointType:'',endPointDest:''}],InclRadio:'',RawData:''})
  const [collapse,setCollapse] = useState(false);
  const [disable,setDisable]   = useState(false);
  const [message,setMessage]   = useState("");
  const [color,setColor]       = useState("");
  let isMounted  = useRef(true);

  useEffect(()=>{
    return (()=>{
        isMounted.current = false;
    })
},[isMounted])

  const onSubmit = async(e) =>{
    e.preventDefault();
      if(newDevice.endpoint.length>0){
        if(newDevice.AccessToken.length===10 &&  /((([A-Z]|\d){2}-){7})([A-Z]|\d){2}/.test(newDevice.deviceUI)){
          setDisable(true);
          const endPointDest = newDevice.endpoint.map(endpoint=> endpoint.endPointDest.trim()).join("|").trim();
          const endpointType = newDevice.endpoint.map(endpoint=> endpoint.endpointType.trim()).join("|").trim();
          const device = {Deviceeui:newDevice.deviceUI,Devicetype:newDevice.deviceType,Endpointdest:endPointDest,
                          Endpointtype:endpointType,InclRadio:newDevice.InclRadio,
                          RawData:newDevice.RawData,AccessToken:newDevice.AccessToken,
                          Customer:newDevice.customer}
          axios.post('/devices/add',device)
          .then(_=>{
            if(isMounted.current){
              const device = {deviceUI:'',deviceType:'',endpoint:[{endpointType:'',endPointDest:''}],
              InclRadio:'',RawData:'',customer:'',AccessToken:Math.random().toString(32).substr(2,10).toUpperCase()}
              updateDevice(device); 
              setMessage("Successfully Added Device");
              setColor("success")
              setDisable(false);      
            }
               
          })
          .catch(err=>{
            if(isMounted.current){
              setMessage(`Cannot Add Device:-   ${err.response.data?err.response.data:''}`);
              setColor("danger")
              setDisable(false);    
            }
          })
        }else{
          if(isMounted.current){
            setMessage('Correct DeviceUI and AccessToken');
            setColor("danger")
            setDisable(false);
          }
        }
      }else{
        if(isMounted.current){
          setMessage('Set Atleast One Endpoint');
          setColor("danger")
          setDisable(false);
        }
      }
  }

  return(
    <div className='single-device-main'>
      <Container>
        <Button  color="primary" onClick={()=>setCollapse(collapse=>!collapse)}>Add</Button>
            <Collapse isOpen={collapse}>
                <Form className='single-device-form'  onSubmit={onSubmit}>
                  {message?<Alert color={color}>{message}</Alert>:null}
                  <InputFormGroup  Label="Device UI" pattern="((([A-Z]|\d){2}-){7})([A-Z]|\d){2}"
                  required={true}  value={newDevice.deviceUI}  onChange={(e)=>{setMessage("");newDeviceHandler(e)}} 
                  title="Format:70-B3-D5-D7-20-04-03-9A"  type="text" name="deviceUI"
                  placeholder="Enter your Device UI"   />

                  <InputFormGroup Label="Access Token"
                                pattern="(?=.*\d)((?=.*[a-z])|(?=.*[A-Z])).{10}" required={true}
                                value={newDevice.AccessToken}  onChange={(e)=>{setMessage("");newDeviceHandler(e)}} 
                                title="Length should be 10 characters with atleast one digit and upper or lowercase letter"
                                type="text" name="AccessToken"  placeholder="Enter Access Token" />
                  
                  <InputFormGroup Label="Customer" required={true} value={newDevice.customer} 
                    onChange={(e)=>{setMessage("");newDeviceHandler(e)}}
                    type="text" name="customer"  placeholder="Enter Customer Name"
                  />

                  <OptionFormGroup Label="Select Device Type" value={newDevice.deviceType} required={true}    onChange={(e)=>{setMessage("");newDeviceHandler(e)}}   type="select" name="deviceType" options={deviceTypes} />

                  <Endpoint addEndpoint={(e)=>addEndpoint(newDevice.endpoint)}  
                  removeEndpoint={(e)=>removeEndpoint(newDevice.endpoint)} 
                  endpoint={newDevice.endpoint} OptionsLabel="Select Endpoint Type" InputLabel="Select Endpoint Destination" 
                  required={true} handleChange={handleEndpointChange} inputType='text' optionType='select'
                  InputPlaceholer="Select Endpoint Destination" OptionsPlaceholder="Select Endpoint Type"
                  OptionsName = "endpointType" InputName="endPointDest"/>
                  
                  <CheckBoxFormGroup checked={newDevice.InclRadio} Label="InclRadio" checkBoxHandler={checkBoxHandler} name='InclRadio' type="checkbox"  />
                  <CheckBoxFormGroup checked={newDevice.RawData} Label="RawData" checkBoxHandler={checkBoxHandler} name='RawData' type="checkbox"  />
                      <SemanticButton disabled={disable} color={'blue'} type='submit' style={{ margin: '5px auto',display:'block' }}>{disable?"Submitting":"Submit"}</SemanticButton>
                </Form> 
            </Collapse>
      </Container>
    </div>
)}

export default DeviceUI;