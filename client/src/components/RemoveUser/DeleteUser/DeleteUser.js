import React,{useState} from 'react';
import {Button} from 'reactstrap';
import axios from 'axios';
const  DeleteUser = (props) =>{
    const [disable,setDisable] = useState(false);
    const handleDelete = (row) =>{
        const endpoint = '/api/delete/'+row;
        setDisable(true);
          axios.delete(endpoint)
          .then(res=>{  
            const index = props.data.findIndex(d=>d.email===row);
            const updatedDevices = [...props.data]
            updatedDevices.splice(index,1);
            setDisable(false);
            props.setData(updatedDevices);
          })
          .catch(error=>{
              setDisable(false);
          })
      }
    return <Button  disabled={disable} color="danger" onClick={()=>{handleDelete(props.row)}}>{disable?'Deleting':'Delete'}</Button>
}

export { DeleteUser };