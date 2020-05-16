import EditPrompt from '../EditPrompt/EditPrompt';
import DeletePrompt from '../DeletePrompt/DeletePrompt';
import React from 'react';

const getColumns = (userType,data,setData) =>{
    const columns = [
        {
        Header: 'Deviceeui',
        accessor: 'Deviceeui',
        sortable:true,
        width:200,
        filterable: true,
        style:{
            textAlign:"center"
        }
        }, 
        {
        Header: 'Devicetype',
        accessor: 'Devicetype',
        filterable: true,
        style:{ 
          textAlign:"center"
        }
        }, 
        {
        Header: "Endpointdest",
        accessor: 'Endpointdest',
        width:200,
        filterable: true,
        style:{
            
            textAlign:"center"
        }
        },
        {
          Header: "Endpointtype",
          accessor: 'Endpointtype',
          filterable: true,
          
          style:{
              
              textAlign:"center"
          },
        },
        {
          Header: "InclRadio",
          accessor: 'InclRadio',
          Cell: props => <input type='checkbox' readOnly={true} disabled checked={props.original.InclRadio}></input> ,
          style:{ 
              textAlign:"center"
          },
        },
        {
          Header: "RawData",
          accessor: 'RawData',
          Cell: props =>  <input type='checkbox' readOnly={true} disabled checked={props.original.RawData}></input>,
          style:{
              textAlign:"center"
          },
        },
    
        {
          Header: "AccessToken",
          accessor: 'AccessToken',
          width:150,
          style:{
              
              textAlign:"center"
          }
        },
        userType==="admin"?{ 
          Header:'Delete',
          sortable:false,
          Cell: row =>  <DeletePrompt data={data} setData={setData}  rowData={row.original} />,
          width:100,
          style:{
              textAlign:"center",
           },
        }:{show:false},
    
        userType==="admin"?{ 
          Header:'Edit',
          sortable:false,
          Cell: row =>  <EditPrompt data={data} setData={setData}  rowData={row.original} />,
          width:100,
          style:{
              textAlign:"center",
          }, 
        }:{show:false}  
    ];
    return columns;
}

export default getColumns;