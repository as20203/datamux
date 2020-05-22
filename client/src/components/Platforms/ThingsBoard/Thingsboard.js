import React, { useEffect,useState } from 'react';
import OptionFormGroup from 'components/Generic/Form/OptionFormGroup/OptionFormGroup';
import {Container,Button,Form,Collapse} from 'reactstrap'
import axios from 'platform-instance/Thingsboard';
import './Thingsboard.css';
import useForm from 'CustomHooks/useForm';
import DeviceGrid from './DeviceGrid/DeviceGrid';
import{Button as SemanticUIButton} from 'semantic-ui-react';
import Papa from 'papaparse';


const ThingsBoard = (props) =>{
    const [Customer,,handleCustomerChange] = useForm({customer:'',id:''});
    const [data,setData] = useState([]);
    const [collapse,setCollapse] = useState(false);
    const [devices,setDevices] = useState([]);
    const [check,toggleCheck] = useState(false);
    const [disable,setDisable] = useState(false);
  

    useEffect(()=>{
        let isMounted  = true;
        const credentials = {
            "username" :"muhammad.adil@talkpool.com",
            "password" : "TrackerWEB12!@#"
         }
        axios.post("/auth/login",credentials,{headers: {"Content-Type": "application/json"}})
        .then(result=>{
            const token = result.data.token;
            sessionStorage.setItem('ThingsBoardAccessToken',token);
            axios.get('/customers',{params: {limit: '1000'},headers: {"Content-Type": "application/json"}})
            .then(users=>{
                const customers = users.data.data.map(user=>{return ({key:user.name,value:user.id.id})});
                if(isMounted){
                    setData(customers);
                }
            })
        })
        .catch(err=>{
            console.log(err);
        })
        return (()=>{
            isMounted = false;
          })
    },[])

    const updateDevices = (e)=>{
       const customer = data.filter(customer=>customer.key===e.target.value)[0].value;
       const token = 'ABCD12EEER'
       axios.get(`customer/${customer}/devices`,{params: {limit: '1000'},headers: {"Content-Type": "application/json"}})
       .then(devices=>{
           const customerDevices = devices.data.data.map(device=>{return(
               {Deviceeui:device.name,Devicetype:device.type,Endpointtype:'HTTP',
                Endpointdest:`https://data.talkpool.io/api/v1/${token}/telemetry`,
                AccessToken:token,
                InclRadio:true,RawData:false,Customer:e.target.value,
                checked:false
        })
    })
           setDevices(customerDevices);
       })
      
    }

    const exportCSV = () =>{
        setDisable(false);
        const finalDevices = devices.filter(device=>device.checked)
        .map(device=>{
            let deviceClone = Object.assign({}, {...device,InclRadio:device.InclRadio?"true":"false",RawData:device.InclRadio.RawData?"true":"false"});
            return (delete deviceClone.checked, deviceClone);
        })
        console.log(finalDevices)
        let csv = Papa.unparse(finalDevices);

        var blob = new Blob([csv]);
        if (window.navigator.msSaveOrOpenBlob)  // IE hack; see http://msdn.microsoft.com/en-us/library/ie/hh779016.aspx
            window.navigator.msSaveBlob(blob, "thingsboard.csv");
        else
            {
                var a = window.document.createElement("a");
                a.href = window.URL.createObjectURL(blob, {type: "text/plain"});
                a.download = "thingsboard.csv";
                document.body.appendChild(a);
                a.click();  // IE: "Access is denied"; see: https://connect.microsoft.com/IE/feedback/details/797361/ie-10-treats-blob-url-as-cross-origin-and-denies-access
                document.body.removeChild(a);
            }
       
    }


    return(
        <div className="thingsboard-device-main">
        <Container>
            <Button  color="primary" onClick={()=>setCollapse(collapse=>!collapse)}>Add</Button>
                <Collapse isOpen={collapse}>
                    <Form  className='single-device-form'>
                        <OptionFormGroup Label="Select Customer" 
                        name='customer'  id={Customer.id} type="select"
                        onChange={(e)=>{handleCustomerChange(e);setDevices([]);toggleCheck(false);updateDevices(e)}} options={data.map(customer=>customer.key)} required={true}  />
                    </Form>
                </Collapse>
                {devices.length>1?<SemanticUIButton disabled={disable} color={'blue'} onClick={exportCSV} type='submit' style={{ margin: '5px auto',display:'block' }}>{disable?"Generating....":"Generate CSV"}</SemanticUIButton>:null}
                <DeviceGrid check={check} setCheck={toggleCheck} user={props.user} data={devices} setData={setDevices} />
        </Container>
        </div>
    )
    
}


export default ThingsBoard;