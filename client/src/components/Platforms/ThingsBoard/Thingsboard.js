import React, { useEffect,useState } from 'react';
import OptionFormGroup from 'components/Generic/Form/OptionFormGroup/OptionFormGroup';
import {Container,Button,Form,Collapse} from 'reactstrap'
import axios from 'platform-instance/Thingsboard';
import './Thingsboard.css';
import useForm from 'CustomHooks/useForm';


const ThingsBoard = () =>{
    const [Customer,,,handleCustomerChange] = useForm({customer:''});
    const [data,setData] = useState([]);
    const [collapse,setCollapse] = useState(false);
  

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
            axios.get('https://data.talkpool.io/api/customers',{params: {limit: '1000'},headers: {"Content-Type": "application/json"}})
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
    return(
        <div className="thingsboard-device-main">
        <Container>
            <Button  color="primary" onClick={()=>setCollapse(collapse=>!collapse)}>Add</Button>
                <Collapse isOpen={collapse}>
                    <Form  className='single-device-form'>
                        <OptionFormGroup Label="Select Customer" 
                        name='customer' value={Customer.customer} type="select"
                        onChange={handleCustomerChange} options={data.map(customer=>customer.key)} required={true}  />
                    </Form>
                </Collapse>
        </Container>
        </div>
    )
    
}


export default ThingsBoard;