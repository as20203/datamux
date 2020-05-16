import React,{useState,useEffect} from 'react';
import Columns from './Columns/Columns';
import ReactTable from 'react-table';
import { Container} from 'reactstrap';
import axios from 'instance';

const Landing = (props)=>{
    const [data,setData] = useState([]);
    const columns = Columns(props.user.userType,data,setData);
    
    useEffect(()=>{
        axios.get('/devices/show')
        .then(commData=>{
            setData(commData.data);
        })
        .catch(err=>{
          console.log(err);
        })
      },[])

      return(
        <React.Fragment>  
          <Container style={{marginLeft:'0px',maxWidth:'fit-content'}}>
          <ReactTable
            data={data}
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
          />
          </Container>
      </React.Fragment>     
    ) 
}

export default Landing;

