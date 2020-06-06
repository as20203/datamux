import React,{useState,useEffect} from 'react';
import './EditPrompt.css';
import axios from 'instance';
import { EditForm } from 'components';
import {useForm}  from 'CustomHooks';

const EditPrompt = (props) => {
    const [disable,setDisable] = useState(false);
    const [message,setMessage] = useState("");
    const [open,setOpen]  = useState(false);
    const [editDevice,updateDevice,editDeviceHandler,checkBoxHandler,
        handleEndpointChange,addEndpoint,removeEndpoint] = useForm({deviceUI:'',deviceType:'',
        AccessToken:'',endpoint:[],InclRadio:'',RawData:'',customer:''})

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
            AccessToken:props.rowData.AccessToken,endpoint:setEndpoint(),customer:props.rowData.Customer,
            InclRadio:props.rowData.InclRadio,RawData:props.rowData.RawData}
            updateDevice(newDevice);
    },[props,updateDevice])

    
    const onSubmit = async(e) =>{
        e.preventDefault();
        if(editDevice.endpoint.length>0){
            setDisable(true);
            const endPointDest = editDevice.endpoint.map(endpoint=> endpoint.endPointDest.trim()).join("|").trim();
            const endpointType = editDevice.endpoint.map(endpoint=> endpoint.endpointType.trim()).join("|").trim();
            const updatedDevice = {Deviceeui:editDevice.deviceUI,Devicetype:editDevice.deviceType,Endpointdest:endPointDest,Endpointtype:endpointType,
                                    InclRadio:editDevice.InclRadio,Customer:editDevice.customer,RawData:editDevice.RawData,AccessToken:editDevice.AccessToken}
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
        }else{
            setMessage("Select Atleast One Endpoint")
            setOpen(open=>!open);
            setDisable(false);
        }
    }

    return(
            <EditForm editDevice={editDevice}  updateDevice={updateDevice} 
            editDeviceHandler={editDeviceHandler} checkBoxHandler={checkBoxHandler}
            handleEndpointChange={handleEndpointChange} addEndpoint={addEndpoint}
            removeEndpoint={removeEndpoint} disable={disable} message={message} onSubmit={onSubmit}
            open={open} setOpen={setOpen}  />
    )
}
export  { EditPrompt };
