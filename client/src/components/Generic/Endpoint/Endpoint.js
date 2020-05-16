import React from 'react';
import OptionFormGroup from '../Form/OptionFormGroup/OptionFormGroup';
import {Button} from 'reactstrap';
import {endpointTypes} from '../../../utils/Devices';
import InputFormGroup from '../Form/InputFormGroup/InputFormGroup';

const Endpoint = (props) =>{
   const endpoints =  props.endpoint.map((endpoint,index)=>{
        return(
          <div  key={index}>
            <OptionFormGroup Label={props.OptionsLabel}  value={endpoint.endpointType} required={props.required} onChange={(e)=>props.handleChange(e,index,props.endpoint)} type={props.optionType} name={props.OptionsName} placeholder={props.OptionsPlaceholder} options={endpointTypes} />
            <InputFormGroup Label={props.InputLabel}  value={endpoint.endPointDest}  required={props.required} onChange={(e)=>props.handleChange(e,index,props.endpoint)} type={props.InputType} name={props.InputName}  placeholder={props.InputPlaceholder} />
          </div>
        )
    })
    
    return(
        <div>
            <div style={{display:'flex',justifyContent:'flex-start',width:'80%',margin:'5px auto'}}>
                <Button style={{margin:'auto 0'}}  onClick={props.addEndpoint} type='button' outline color="primary">Add Endpoint</Button>{' '}
                      {props.endpoint.length>1?<Button style={{margin:'auto 0 auto 5px'}}  onClick={props.removeEndpoint} type='button' outline color="danger">Remove Endpoint</Button>:null}
            </div>
            {endpoints}
        </div>
    )

}

export default Endpoint;