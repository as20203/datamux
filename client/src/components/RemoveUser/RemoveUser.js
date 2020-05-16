import React,{useState, useEffect} from 'react';
import axios from 'axios';
import ReactTable from 'react-table';
import { Container} from 'reactstrap';
import DeleteUser from './DeleteUser/DeleteUser';

const AdminLanding =()=>{
  const [data,setData] = useState([]);
  const columns =  [
    {
    Header: 'username',
    accessor: 'username',
    sortable:true,
    filterable: true,
    style:{
        textAlign:"center"
    }
    }, 
    {
    Header: 'email',
    accessor: 'email',
    filterable: true,
    style:{ 
      textAlign:"center"
    }
    }, 
    
    { 
      sortable:false,
      Cell: row =>  <DeleteUser setData={setData} data={data} row={row.original.email}  />,
      style:{
          textAlign:"center"
      }, 
    },
  ];
    
  useEffect(()=>{
    axios.get('/api/users')
    .then(users=>{
      setData(users.data.allUsers)
    })
    .catch(err=>{
      console.log(err);
    })
  },[])

 
  return(
      <React.Fragment>  
        <Container style={{marginLeft:'0px'}}>                  
            <ReactTable
            data={data}
            columns={columns}
            minRows={8} 
            className="-striped -highlight"
            defaultFilterMethod= {(filter, row) =>row[filter.id].toLowerCase().includes(filter.value.toLowerCase())}   
            defaultSorted={[
              {
                id: "username",
              }
            ]}      
            /> 
        </Container>
    </React.Fragment>    
  )
}
export default AdminLanding;
  