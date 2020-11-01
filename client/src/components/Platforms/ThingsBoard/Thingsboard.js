import React, { useEffect,useState, useRef } from 'react';
import { OptionFormGroup, Loader, DeviceGrid} from 'components';
import {Button,Form,Collapse,Alert} from 'reactstrap'
import {thingsboardInstance as axios} from 'platform-instance';
import './Thingsboard.css';
import {useForm} from 'CustomHooks';
import{Button as SemanticUIButton} from 'semantic-ui-react';
import Papa from 'papaparse';


const ThingsBoard = (props) =>{
    const [Customer,,handleCustomerChange] = useForm({customer:'',id:''});
    const [data,setData] = useState([]);
    const [collapse,setCollapse] = useState(false);
    const [devices,setDevices] = useState([]);
    const [check,toggleCheck] = useState(false);
    const [disable,setDisable] = useState(false);
    const [loading,setLoading] = useState(true);
    const [deviceLoader,setDeviceLoader] = useState(false);
    const [devicesMessage,setDevicesMessage]  = useState('');
    let isMounted  = useRef(true);

    const getCustomers = async () => {
        try {
            const credentials = {
                "username" :"muhammad.adil@talkpool.com",
                "password" : "TrackerWEB12!@#"
            }
            const { data: { token }} = await axios.post("/auth/login",credentials,{headers: {"Content-Type": "application/json"}})
            sessionStorage.setItem('ThingsBoardAccessToken',token);
            const { data: { data: customers }} = await axios.get('/customers',{params: {pageSize: 1000, page: 0 },headers: {"Content-Type": "application/json"}})
             if(isMounted.current && token){
                const updatedCustomers = customers.map(user=>{return ({key:user.name,value:user.id.id})});
                setData(updatedCustomers);
                setLoading(false);
            }
        } catch {
            setLoading(false);
        }
    }

    useEffect(()=>{
        getCustomers();
        return (()=>{
            isMounted.current = false;
          })
    },[isMounted])

    const updateDevices = async (e)=>{
        try {
            setDeviceLoader(true);
            setDevicesMessage('');
            const customer = data.filter(customer=>customer.key===e.target.value)[0].value;
            const { data : { data: devices }}  = await axios.get(`customer/${customer}/devices`,{params: {pageSize: 1000, page: 0 },headers: {"Content-Type": "application/json"}});
            if(isMounted && devices){
                const customerDevices = await Promise.allSettled(
                    devices.map(async device=>{
                        return new Promise(async (resolve, reject) => {
                            if(isMounted.current){
                            try{
                                const credentials = await axios.get(`/device/${device.id.id}/credentials`)
                                const updatedRecord= {
                                    Deviceeui:device.name,Devicetype:device.type,Endpointtype:'THINGSBOARD',Customer:e.target.value,
                                    Endpointdest:`https://data.talkpool.io/api/v1/${credentials.data.credentialsId}/telemetry`,
                                    AccessToken:credentials.data.credentialsId, InclRadio:true,RawData:false,checked:false
                                }
                                resolve(updatedRecord)
                            }catch (error) {
                                reject(error);
                            } 
                            } else {
                                reject('component is not mounted');
                            }
                        })
                    })
                )
                if(isMounted.current){
                    if(customerDevices.length<1){
                        setDevicesMessage('No device found')
                    }
                    const updatedCustomerDevices = customerDevices.filter(device => device.status === 'fulfilled').map(device => {
                        return device.value;
                    })
                    setDevices(updatedCustomerDevices);
                    setDeviceLoader(false);
                }
                
            }
        } catch {
            setDeviceLoader(false);
        }
    }

    const exportCSV = () =>{
        setDisable(true);
        setDevicesMessage('');
        const finalDevices = devices.filter(device=>device.checked)
        .map(device=>{
            let deviceClone = Object.assign({}, {...device,InclRadio:device.InclRadio?'true':'false',RawData:device.InclRadio.RawData?"true":"false"})
            return (delete deviceClone.checked, deviceClone);
        })

        if(finalDevices.length>=1){
            let csv = Papa.unparse(finalDevices);
            var blob = new Blob([csv]);
            if (window.navigator.msSaveOrOpenBlob)  // IE hack; see http://msdn.microsoft.com/en-us/library/ie/hh779016.aspx
                window.navigator.msSaveBlob(blob, "thingsboard.csv");
            else{
                var a = window.document.createElement("a");
                a.href = window.URL.createObjectURL(blob, {type: "text/plain"});
                a.download = `${finalDevices[0].Customer}.csv`;
                document.body.appendChild(a);
                a.click();  // IE: "Access is denied"; see: https://connect.microsoft.com/IE/feedback/details/797361/ie-10-treats-blob-url-as-cross-origin-and-denies-access
                document.body.removeChild(a);
            }
            
        }else{
            setDevicesMessage('Select a device')
        }
        setDisable(false);  
    }


    return(
        <div style={{display:loading?'flex':'',justifyContent:'center',alignItems:'center',minHeight:'100vh'}} className="thingsboard-device-main">
        {loading?<Loader />:
            <div className='thingsboard-device-form'>
                <Button  color="primary" onClick={()=>setCollapse(collapse=>!collapse)}>Add</Button>
                    <Collapse isOpen={collapse}>
                        <Form  className='single-device-form'>
                            <OptionFormGroup Label="Select Customer" 
                            name='customer'  id={Customer.id} type="select"
                            onChange={(e)=>{handleCustomerChange(e);setDevices([]);toggleCheck(false);setDevicesMessage('');updateDevices(e)}} options={data.map(customer=>customer.key)} required={true}  />
                        </Form>
                    </Collapse>
                    {devices.length>1?<SemanticUIButton disabled={disable} color={'blue'} onClick={exportCSV} type='submit' style={{ margin: '5px auto',display:'block' }}>{disable?"Generating....":"Generate CSV"}</SemanticUIButton>:null}
                    <div style={{display:'flex',justifyContent:'center',flexDirection:'column',alignItems:devicesMessage?'center':deviceLoader?'center':'flex-start',minHeight:'100vh'}}>
                        {devicesMessage?<Alert color="info">{devicesMessage}</Alert>:null}
                        {deviceLoader?<Loader />: <DeviceGrid check={check} setCheck={toggleCheck} data={devices} setData={setDevices} setDevicesMessage={setDevicesMessage} />}
                    </div>
            </div>}
        </div>
    )  
}
export {ThingsBoard};