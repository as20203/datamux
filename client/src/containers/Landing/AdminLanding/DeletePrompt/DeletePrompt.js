import React, { useState } from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react';
import {Alert} from 'reactstrap';
import axios from '../../../../instance';
const ModalExampleCloseIcon = (props) => {
    const [open,setOpen] = useState(false);
    const [deleteMessage,setDeleteMessage] = useState("");
    const [disable,setDisable] = useState(false);
    
    const handleDelete = (row) =>{
      setDisable(true);
        const endpoint = '/devices/delete/'+row;
        axios.delete(endpoint)
        .then(()=>{  
          axios.get('/devices/show')
          .then(commData=>{
            props.setData(commData.data)
            setOpen(open=>!open);
            setDeleteMessage("");
            setDisable(false);
          })
          .catch(err=>{
            console.log(err);
            setOpen(open=>!open);
          })
        })
        .catch(err=>{
            console.log(err);
            setDeleteMessage("Cannot Delete Device")

        })
      }
  

    return(
        <Modal onClose={()=>setOpen(open=>!open)} closeOnDimmerClick={true} open={open}  centered style={{height:'auto',top:'auto',left:'auto'}} trigger={<Button onClick={()=>setOpen(open=>!open)} color="red" >Delete</Button>} closeIcon>
            <Header icon='archive' content='Delete Device' />
            <Modal.Content>
            <div>
                {deleteMessage!==""?<Alert color="danger" align='center'>{deleteMessage}</Alert>:null}
                Are you sure you want to delete {props.rowData.Deviceeui}? 
            </div>
            </Modal.Content>
            <Modal.Actions>
            <Button onClick={()=>setOpen(open=>!open)} color='red'>
                <Icon name='remove' /> No
            </Button>
            <Button disabled={disable} onClick={()=>handleDelete(props.rowData.Deviceeui)} color='green'>
                <Icon name='checkmark' /> Yes
            </Button>
            </Modal.Actions>
        </Modal>
    )
}

export default ModalExampleCloseIcon
