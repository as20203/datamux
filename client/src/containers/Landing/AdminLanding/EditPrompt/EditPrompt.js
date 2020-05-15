import React,{useState,useEffect} from 'react';
import './EditPrompt.css';
import { Container , Alert, Form} from 'reactstrap';
import { Button,  Modal, Header } from 'semantic-ui-react';
import axios from '../../../../instance';
import {deviceTypes} from '../../../../utils/Devices';
import Endpoint from '../../../Generic/Endpoint/Endpoint';
import InputFormGroup from '../../../Generic/Form/InputFormGroup/InputFormGroup';
import OptionFormGroup from '../../../Generic/Form/OptionFormGroup/OptionFormGroup';
import CheckBoxFormGroup from '../../../Generic/Form/CheckBoxFormGroup/CheckBoxFormGroup';

const ModalExampleScrollingContent = (props) => {
    const [open,setOpen]               = useState(false);
    const [deviceUI,setDeviceUi]       = useState('');
    const [deviceType,setDeviceType]   = useState('');
    const [accessToken,setAccessToken] = useState('');
    const [endpoint,setEndpoint]       = useState([]);
    const [InclRadio,setInclRadio]      = useState(null);
    const [RawData,setRawData]          = useState(null);
    const [disable,setDisable]         = useState(false);
    const [message,setMessage] = useState("")
    const handleChange = (e,index)=>{
        const [name] = [e.target.name];
        const updatedEndpoint = [...endpoint];
        updatedEndpoint[index][name]= e.target.value;
        setEndpoint(updatedEndpoint)
    }

    useEffect(()=>{ 
        setDeviceUi(props.rowData.Deviceeui);
        setDeviceType(props.rowData.Devicetype);
        setAccessToken(props.rowData.AccessToken);
        setEndpoint(()=>{
            const endpointType = props.rowData.Endpointtype.split("|");
            const endpointDest = props.rowData.Endpointdest.split("|");
            const endpoint = [];
            for (let i=0;i<endpointType.length;i++){
                endpoint.push({endpointType:endpointType[i],endPointDest:endpointDest[i]});
            }
            return endpoint;
        })
        setInclRadio(props.rowData.InclRadio);
        setRawData(props.rowData.RawData);
    },[props])

    const  addEndpoint = () =>{
        setEndpoint(endpoint=>[...endpoint,{endpointType:'',endPointDest:''}])
    }

    
    const removeEndpoint = () =>{
        setEndpoint(endpoint=>{
            const updatedEndpoints = [...endpoint];
            updatedEndpoints.pop();
            return updatedEndpoints;
        });
    }
    
    const onSubmit = async(e) =>{
        e.preventDefault();
        if(endpoint.length>0){
            if(accessToken.length===10){
                setDisable(true);
                const endPointDest = endpoint.map(endpoint=> endpoint.endPointDest.trim()).join("|").trim();
                const endpointType = endpoint.map(endpoint=> endpoint.endpointType.trim()).join("|").trim();
                const updatedDevice = {Deviceeui:deviceUI,Devicetype:deviceType,Endpointdest:endPointDest,Endpointtype:endpointType,InclRadio,RawData,AccessToken:accessToken}
                const deleteEndpoint = '/devices/delete/'+deviceUI;
                axios.delete(deleteEndpoint)
                .then(()=>{  
                    const index = props.data.findIndex(d=>d.Deviceeui===deviceUI);
                    const updatedDevices = [...props.data]
                    updatedDevices.splice(index,1);
                    axios.post('/devices/add',updatedDevice)
                    .then(res=>{
                            updatedDevices.push(updatedDevice);
                            props.setData(updatedDevices)
                            setOpen(open=>!open);
                            setDisable(false);
                    })
                    .catch(err=>{
                        console.log(err);
                        setMessage("Cannot Create Device")
                        setDisable(false);
                    })
                })
                .catch(err=>{
                    console.log(err);
                    setMessage("Cannot Delete Device")
                    setDisable(false);
                }) 
            }
        }else{
            setMessage("Select Atleast One Endpoint")
            setDisable(false);
        }
    }

return(
    <Modal onClose={()=>setOpen(open=>!open)} closeOnDimmerClick={true} open={open}  centered style={{height:'auto',top:'auto',left:'auto'}} trigger={<Button onClick={()=>setOpen(open=>!open)} color="green" >Edit</Button>} closeIcon>
    <Modal.Content style={{display:'flex',justifyContent:'center'}} image scrolling>
        <div className='single-device-main'>
            <Container>  
                <Form className='single-device-form'  onSubmit={onSubmit}>
                    <Header textAlign={"center"} as='h1'>Edit Device:- {deviceUI}</Header>
                    {message?<Alert color="success">{message}</Alert>:null}
                    <InputFormGroup Label="Access Token"
                            pattern="(?=.*\d)((?=.*[a-z])|(?=.*[A-Z])).{10}" required={true}
                            value={accessToken.toString()}  onChange={(e)=>setAccessToken(e.target.value)} 
                            title="Length should be 10 characters with atleast one digit and upper or lowercase letter"
                            type="text" name="AccessToken"  placeholder="Enter Access Token" />

                    <OptionFormGroup Label="Select Device Type" value={deviceType} required={true}    onChange={(e)=>setDeviceType(e.target.value)}  type="select" name="deviceType" options={deviceTypes} />

                    <Endpoint addEndpoint={addEndpoint}  removeEndpoint={removeEndpoint} endpoint={endpoint} OptionsLabel="Select Endpoint Type" InputLabel="Select Endpoint Destination" 
                            required={true} handleChange={handleChange} inputType='text' optionType='select'
                            InputPlaceholer="Select Endpoint Destination" OptionsPlaceholder="Select Endpoint Type"
                            OptionsName = "endpointType" InputName="endPointDest"/>
                    
                    <CheckBoxFormGroup checked={InclRadio} Label="InclRadio" checkBoxHandler={(e)=>setInclRadio(e.target.checked)} name='InclRadio' type="checkbox"  />
                    <CheckBoxFormGroup checked={RawData} Label="RawData" checkBoxHandler={(e)=>setRawData(e.target.checked)} name='RawData' type="checkbox"  />
                        <Button disabled={disable} color={'blue'} type='submit' style={{ margin: '5px auto',display:'block' }}>{disable?"Submitting":"Submit"}</Button>
                </Form>
                   
            </Container>
        </div>
    </Modal.Content>
  </Modal>
)
}
export default ModalExampleScrollingContent
