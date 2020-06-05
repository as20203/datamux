import React,{useState, useEffect} from 'react';
import axios from 'axios';
import ReactTable from 'react-table';
import {Loader,DeleteUser} from 'components';

const RemoveUser =()=>{
  const [data,setData] = useState([]);
  const [loading,setLoading] = useState(true);
  const userStyle={padding:'8px 16px',maxWidth:'100%',minHeight:'100vh',display:loading?'flex':'',justifyContent:'center',alignItems:'center'}

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
      setLoading(false);
    })
    .catch(err=>{
      console.log(err);
    })
  },[])

 
  return(
      <React.Fragment>  
        <div style={userStyle}>
          {loading?<Loader />:                  
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
          /> }
        </div>
    </React.Fragment>    
  )
}
export { RemoveUser };
  