import React from 'react';
import {Endpoint,InputFormGroup,OptionFormGroup,CheckBoxFormGroup} from 'components';
import { Container , Alert, Form} from 'reactstrap';
import { Button,  Modal, Header } from 'semantic-ui-react';
import {deviceTypes} from 'utils';

const EditForm = (props) => {
    return(
        <Modal onClose={!props.disable?()=>props.setOpen(open=>!open):()=>{return}} closeOnDimmerClick={true}  open={props.open} 
         centered style={{height:'auto',top:'auto',left:'auto'}} 
         trigger={<Button onClick={()=>props.setOpen(open=>!open)} color="green" >Edit</Button>} 
         closeIcon>
        <Modal.Content style={{display:'flex',justifyContent:'center',maxHeight:'none'}} image scrolling>
            <div className='single-device-main'>
                <Container>  
                    <Form className='single-device-form'  onSubmit={props.onSubmit}>
                        <Header textAlign={"center"} as='h1'>Edit Device:- {props.editDevice.deviceUI}</Header>
                        {props.message?<Alert color="success">{props.message}</Alert>:null}
                        <InputFormGroup Label="Access Token"
                                required={true}
                                value={props.editDevice.AccessToken}  onChange={props.editDeviceHandler} 
                                type="text" name="AccessToken"  placeholder="Enter Access Token" />

                        <InputFormGroup Label="Customer" 
                            required={true} 
                            value={props.editDevice.customer} 
                            onChange={props.editDeviceHandler}
                            type="text" name="customer"  placeholder="Enter Customer Name"/>

                        <OptionFormGroup Label="Select Device Type" value={props.editDevice.deviceType} required={true}    onChange={props.editDeviceHandler}  type="select" name="deviceType" options={deviceTypes} />

                        <Endpoint addEndpoint={(e)=>props.addEndpoint(props.editDevice.endpoint)}  
                        removeEndpoint={(e)=>props.removeEndpoint(props.editDevice.endpoint)} 
                        endpoint={props.editDevice.endpoint} OptionsLabel="Select Endpoint Type" InputLabel="Select Endpoint Destination" 
                        required={true} handleChange={props.handleEndpointChange} inputType='text' optionType='select'
                        InputPlaceholer="Select Endpoint Destination" OptionsPlaceholder="Select Endpoint Type"
                        OptionsName = "endpointType" InputName="endPointDest"/>
                        
                        <CheckBoxFormGroup checked={props.editDevice.InclRadio} Label="InclRadio" checkBoxHandler={props.checkBoxHandler} name='InclRadio' type="checkbox"  />
                        <CheckBoxFormGroup checked={props.editDevice.RawData} Label="RawData" checkBoxHandler={props.checkBoxHandler} name='RawData' type="checkbox"  />
                            <Button disabled={props.disable} color={'blue'} type='submit' style={{ margin: '5px auto',display:'block' }}>{props.disable?"Submitting":"Submit"}</Button>
                    </Form>
                </Container>
            </div>
        </Modal.Content>
    </Modal>
    )
}

export { EditForm }