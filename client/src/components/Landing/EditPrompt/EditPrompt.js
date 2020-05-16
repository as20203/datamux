import React,{useState,useEffect} from 'react';
import './EditPrompt.css';
import { Container , Alert, Form} from 'reactstrap';
import { Button,  Modal, Header } from 'semantic-ui-react';
import axios from 'instance';
import {deviceTypes} from 'utils/Devices';
import Endpoint from 'components/Generic/Endpoint/Endpoint';
import InputFormGroup from 'components/Generic/Form/InputFormGroup/InputFormGroup';
import OptionFormGroup from 'components/Generic/Form/OptionFormGroup/OptionFormGroup';
import CheckBoxFormGroup from 'components/Generic/Form/CheckBoxFormGroup/CheckBoxFormGroup';
import useForm           from 'CustomHooks/useForm';

const EditPrompt = (props) => {
    const [open,setOpen]               = useState(false);
    const [disable,setDisable]         = useState(false);
    const [message,setMessage] = useState("")
    const [editDevice,updateDevice,editDeviceHandler,checkBoxHandler,
        handleEndpointChange,addEndpoint,removeEndpoint] = useForm({deviceUI:'',deviceType:'',
        AccessToken:'',endpoint:[],InclRadio:'',RawData:''})

    useEffect(()=>{ 
        const setEndpoint = ()=>{
            const endpointType = props.rowData.Endpointtype.split("|");
            const endpointDest = props.rowData.Endpointdest.split("|");
            const endpoint = [];
            for (let i=0;i<endpointType.length;i++){
                endpoint.push({endpointType:endpointType[i],endPointDest:endpointDest[i]});
            }
            return endpoint;
        }
        const newDevice = {deviceUI:props.rowData.Deviceeui,deviceType:props.rowData.Devicetype,
            AccessToken:props.rowData.AccessToken,endpoint:setEndpoint(),InclRadio:props.rowData.InclRadio,RawData:props.rowData.RawData}
            updateDevice(newDevice);
    },[props,updateDevice])

    
    const onSubmit = async(e) =>{
        e.preventDefault();
        if(editDevice.endpoint.length>0){
            if(editDevice.AccessToken.length===10){
                setDisable(true);
                const endPointDest = editDevice.endpoint.map(endpoint=> endpoint.endPointDest.trim()).join("|").trim();
                const endpointType = editDevice.endpoint.map(endpoint=> endpoint.endpointType.trim()).join("|").trim();
                const updatedDevice = {Deviceeui:editDevice.deviceUI,Devicetype:editDevice.deviceType,Endpointdest:endPointDest,Endpointtype:endpointType,InclRadio:editDevice.InclRadio,RawData:editDevice.RawData,AccessToken:editDevice.AccessToken}
                const deleteEndpoint = '/devices/delete/'+editDevice.deviceUI;
                axios.delete(deleteEndpoint)
                .then(()=>{  
                    const index = props.data.findIndex(d=>d.Deviceeui===editDevice.deviceUI);
                    const updatedDevices = [...props.data]
                    updatedDevices.splice(index,1);
                    axios.post('/devices/add',updatedDevice)
                    .then(res=>{
                            updatedDevices.push(updatedDevice);
                            setOpen(open=>!open);
                            setDisable(false);
                            props.setData(updatedDevices)
                          
                    })
                    .catch(err=>{
                        console.log(err);
                        setMessage("Cannot Create Device")
                        setOpen(open=>!open);
                        setDisable(false);
                    })
                })
                .catch(err=>{
                    console.log(err);
                    setMessage("Cannot Delete Device")
                    setOpen(open=>!open);
                    setDisable(false);
                }) 
            }
        }else{
            setMessage("Select Atleast One Endpoint")
            setOpen(open=>!open);
            setDisable(false);
        }
    }

    return(
        <Modal onClose={!disable?()=>setOpen(open=>!open):()=>{return}} closeOnDimmerClick={true}  open={open} 
         centered style={{height:'auto',top:'auto',left:'auto'}} 
         trigger={<Button onClick={()=>setOpen(open=>!open)} color="green" >Edit</Button>} 
         closeIcon>
        <Modal.Content style={{display:'flex',justifyContent:'center'}} image scrolling>
            <div className='single-device-main'>
                <Container>  
                    <Form className='single-device-form'  onSubmit={onSubmit}>
                        <Header textAlign={"center"} as='h1'>Edit Device:- {editDevice.deviceUI}</Header>
                        {message?<Alert color="success">{message}</Alert>:null}
                        <InputFormGroup Label="Access Token"
                                pattern="(?=.*\d)((?=.*[a-z])|(?=.*[A-Z])).{10}" required={true}
                                value={editDevice.AccessToken}  onChange={editDeviceHandler} 
                                title="Length should be 10 characters with atleast one digit and upper or lowercase letter"
                                type="text" name="AccessToken"  placeholder="Enter Access Token" />

                        <OptionFormGroup Label="Select Device Type" value={editDevice.deviceType} required={true}    onChange={editDeviceHandler}  type="select" name="deviceType" options={deviceTypes} />

                        <Endpoint addEndpoint={(e)=>addEndpoint(editDevice.endpoint)}  
                        removeEndpoint={(e)=>removeEndpoint(editDevice.endpoint)} 
                        endpoint={editDevice.endpoint} OptionsLabel="Select Endpoint Type" InputLabel="Select Endpoint Destination" 
                        required={true} handleChange={handleEndpointChange} inputType='text' optionType='select'
                        InputPlaceholer="Select Endpoint Destination" OptionsPlaceholder="Select Endpoint Type"
                        OptionsName = "endpointType" InputName="endPointDest"/>
                        
                        <CheckBoxFormGroup checked={editDevice.InclRadio} Label="InclRadio" checkBoxHandler={checkBoxHandler} name='InclRadio' type="checkbox"  />
                        <CheckBoxFormGroup checked={editDevice.RawData} Label="RawData" checkBoxHandler={checkBoxHandler} name='RawData' type="checkbox"  />
                            <Button disabled={disable} color={'blue'} type='submit' style={{ margin: '5px auto',display:'block' }}>{disable?"Submitting":"Submit"}</Button>
                    </Form>
                </Container>
            </div>
        </Modal.Content>
    </Modal>
    )
}
export default EditPrompt;
