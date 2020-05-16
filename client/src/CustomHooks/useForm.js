import {useState} from 'react';

const useForm = (formValues) =>{
    const[state,setState] = useState(formValues);
    const handleChange = (e) =>{
        e.persist();
        setState(state=>({...state,[e.target.name]:e.target.value}));
    }

    const  addEndpoint = (endpoint) =>{
        setState(state=>({...state,endpoint:[...endpoint,{endpointType:'',endPointDest:''}]}));
    }

    const checkBoxHandler = (e)=>{
        e.persist();
        setState(state=>({...state,[e.target.name]:e.target.checked}));
      }

    const handleEndpointChange = (e,index,endpoint)=>{
        e.persist();
        const [name] = [e.target.name];
        const updatedEndpoint = [...endpoint];
        updatedEndpoint[index][name]= e.target.value;
        setState(state=>({...state,endpoint:updatedEndpoint}));
    }
    const removeEndpoint = (endpoint) =>{
        const updatedEndpoints = [...endpoint];
        updatedEndpoints.pop();
        setState(state=>({...state,endpoint:updatedEndpoints}));
    }
    
    return [state,setState,handleChange,checkBoxHandler,handleEndpointChange,addEndpoint,removeEndpoint];
}

export default useForm;
