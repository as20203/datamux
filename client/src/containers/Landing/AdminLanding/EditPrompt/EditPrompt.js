import React,{useState,useEffect} from 'react';
import './EditPrompt.css';
import { Container , Alert, Form, FormGroup, Label, Input,Button as ReactStrapButton} from 'reactstrap';
import { Button,  Modal, Header } from 'semantic-ui-react';
import axios from '../../../../instance';

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
    },[props.rowData.AccessToken,props.rowData.Deviceeui,props.rowData.Devicetype,
        props.rowData.Endpointtype,props.rowData.Endpointdest,props.rowData.InclRadio,props.rowData.RawData])


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
    
    const  onSubmit = async(e) =>{
        e.preventDefault();
        if(endpoint.length>0){
            if(accessToken.length===10){
                setDisable(true);
                const endPointDest = endpoint.map(endpoint=> endpoint.endPointDest).join("|").trim();
                const endpointType = endpoint.map(endpoint=> endpoint.endpointType).join("|").trim();
                const updatedDevice = {Deviceeui:deviceUI,deviceType,endPointDest,endpointType,InclRadio,RawData,AccessToken:accessToken}
                const deleteEndpoint = '/devices/delete/'+deviceUI;
                axios.delete(deleteEndpoint)
                .then(()=>{  
                    axios.post('/devices/add',updatedDevice)
                .then(res=>{
                        axios.get('/devices/show')
                        .then(commData=>{
                            props.setData(commData.data)
                            setOpen(open=>!open);
                            setDisable(false);
                        })
                        .catch(err=>{
                            console.log(err);
                            setOpen(open=>!open);
                        })
                })
                .catch(err=>{
                    console.log(err);
                    setMessage("Cannot Create Device")
                })
                })
                .catch(err=>{
                    console.log(err);
                    setMessage("Cannot Delete Device")
                }) 
            }
        }else{
            setMessage("Select Atleast One Endpoint")
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
                <FormGroup>
                    <Label for="exampleToken">Access Token</Label>
                    <Input
                    pattern="(?=.*\d)((?=.*[a-z])|(?=.*[A-Z])).{10}"
                    required={true} 
                    value={accessToken.toString()}
                    onChange={(e)=>setAccessToken(e.target.value)} 
                    title="Length should be 10 characters with atleast one digit and 
                            upper or lowercase letter"
                    type="text" name="AccessToken" id="exampleToken" placeholder="Enter your Access Token" />
                </FormGroup>

                
                <FormGroup>
                    <Label for="exampleDevice">Select Device Type</Label>
                    <Input  
                    value={deviceType} 
                    required={true} 
                    onChange={(e)=>setDeviceType(e.target.value)} 
                    type="select" name="deviceType" id="exampleDevice">
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
                <ReactStrapButton style={{margin:'auto 0'}}  onClick={addEndpoint} type='button' outline color="primary">Add Endpoint</ReactStrapButton>{' '}
                {endpoint.length>1?<ReactStrapButton style={{margin:'auto 0 auto 5px'}}  onClick={removeEndpoint} type='button' outline color="danger">Remove Endpoint</ReactStrapButton>:null}
                </div>

                {
                    endpoint.map((endpoint,index)=>{
                    return(
                        <div  key={index}>
                            <FormGroup>
                            <Label for="examplePoint">Select Endpoint Type</Label>
                            <Input  
                            value={endpoint.endpointType} 
                            required={true}
                                onChange={(e)=>handleChange(e,index)} 
                                type="select" name="endpointType">
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
                            <Input  
                            value={endpoint.endPointDest} 
                                required={true} 
                                onChange={(e)=>handleChange(e,index)} 
                                type="text" name="endPointDest" placeholder="Enter your Device UI" />
                            </FormGroup>
                        </div>
                    )
                    })
                }
                
                    <FormGroup check>
                    <Label check>
                        <Input   
                        onChange={(e)=>setInclRadio(e.target.checked)} 
                        name='InclRadio' type="checkbox" checked={InclRadio} />{' '}
                        InclRadio 
                    </Label>
                    </FormGroup>
                    <FormGroup check>
                    <Label check>
                        <Input   
                        onChange={(e)=>setRawData(e.target.checked)} 
                        name='RawData' type="checkbox" checked={RawData} />{' '}
                        Raw Data 
                    </Label>
                    </FormGroup>
                    <Button disabled={disable} color={'blue'} type='submit' style={{ margin: '5px auto',display:'block' }}>{disable?"Submitting":"Submit"}</Button>
                </Form>
                   
            </Container>
        </div>
    </Modal.Content>
  </Modal>
)
}
export default ModalExampleScrollingContent
