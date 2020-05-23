import EditPrompt from 'components/Landing/EditPrompt/EditPrompt';
import React from 'react';

const getColumns = (userType,data,setData,check,toggleCheck,setDevicesMessage) =>{
   
    const columns = [
        {
        sortable:false,
        resizable:false,
        Header: (<input type="checkbox" 
        onChange={(e)=>toggleCheck(check=>{
            const checkAll = !check;
            setDevicesMessage('');
            setData(data=>{
                const updatedData = [...data].map(device=>{return({...device,checked:checkAll})});
                return updatedData;
            })
            return checkAll
        })} 
        checked={check}/>),
        width:80,
        Cell:props=>{return <input type='checkbox'  
        onChange={(e)=>{
          e.persist()
          setDevicesMessage('');
          setData(data=>{ 
               
                const updatedData  = [...data];
                updatedData[props.index] = {...updatedData[props.index],checked:e.target.checked};

                return updatedData;
        })}}  
        checked={props.original.checked}></input>},
        style:{
            textAlign:"center"
        },
        },
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
          width:80,
          Cell: props => <input type='checkbox' readOnly={true} disabled checked={props.original.InclRadio}></input> ,
          style:{ 
              textAlign:"center"
          },
        },
        {
          Header: "RawData",
          accessor: 'RawData',
          width:80,
          Cell: props =>  <input type='checkbox' readOnly={true} disabled checked={props.original.RawData}></input>,
          style:{
              textAlign:"center"
          },
        },
    
        {
          Header: "AccessToken",
          accessor: 'AccessToken',
          width:120,
          style:{
              
              textAlign:"center"
          }
        },
        {
          Header: "Customer",
          accessor: 'Customer',
          width:120,
          filterable: true,
          style:{
              
              textAlign:"center"
          }
        },
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