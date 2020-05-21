import React,{useState,useEffect} from 'react';
import Columns from './Columns/Columns';
import ReactTable from 'react-table';
import Loader from 'components/Generic/Loader/Loader';
import axios from 'instance';

const Landing = (props)=>{
    const [data,setData] = useState([]);
    const [loading,setLoading] = useState(true);
   
    const columns = Columns(props.user.userType,data,setData);
    const LandingStyle={padding:'8px 16px',maxWidth:'100%',minHeight:'100vh',display:loading?'flex':'',justifyContent:'center',alignItems:'center'}
    
    useEffect(()=>{
      let isMounted  = true;
        axios.get('/devices/show')
        .then(commData=>{
          if(isMounted){
            setLoading(false);
            setData(commData.data);
          }
        })
        .catch(err=>{
          console.log(err);
        })
        return (()=>{
          isMounted = false;
        })
      },[])
      return( 
        <React.Fragment> 
         
          <div style={LandingStyle}>
          {loading?<Loader  />:
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
          />}
          </div>
      </React.Fragment>     
    ) 
}

export default Landing;

