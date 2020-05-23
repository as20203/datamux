import React  from 'react';
import ReactTable from 'react-table';
import Columns from './Columns/Columns';

const DeviceGrid = (props) =>{
    const columns = Columns(props.user.userType,props.data,props.setData,props.check,props.setCheck,props.setDevicesMessage);
    const LandingStyle={padding:'8px 16px',maxWidth:'100%',minHeight:'100vh',display:props.data.length<1?'flex':'',justifyContent:'center',alignItems:'center'}
    return(
        <React.Fragment> 
            <div style={LandingStyle}>
                
                {props.data.length>1?
                <ReactTable
                data={props.data}
                columns={columns}
                showPaginationTop={true}
                minRows={8} 
                className="-striped -highlight"
                defaultFilterMethod= {(filter, row) =>row[filter.id].toLowerCase().includes(filter.value.toLowerCase())}   
                defaultSorted={[
                    {
                    id: "Endpointtype",
                    }
                ]}      
                />:null}
            </div>
    </React.Fragment>     
    )
}


export default DeviceGrid;