import React,{useState,useEffect, useContext} from 'react';
import ReactTable from 'react-table';
import {Loader,Columns} from 'components';
import axios from 'instance';
import { authContext } from 'services';
import{Button as SemanticUIButton} from 'semantic-ui-react';
import Papa from 'papaparse';

const Landing = (props)=>{
    const [data,setData] = useState([]);
    const [loading,setLoading] = useState(false);
    const [auth] = useContext(authContext);
    const [disable, setDisable] = useState(false);
   
    const columns = Columns(auth.user.userType,data,setData);
    const LandingStyle={padding:'8px 16px',maxWidth:'100%',minHeight:'100vh',display:loading?'flex':'',justifyContent:'center',alignItems:'center'}
    const getData = (isMounted) => {
       setLoading(true);
       axios.get('/devices/show')
        .then(commData=>{
          if(isMounted){
            setLoading(false);
            if (Array.isArray(commData.data)) setData(commData.data);
          }
        })
        .catch(err=>{
          console.log(err);
        })
    }
    useEffect(()=>{
      let isMounted  = true;
        getData(isMounted);
        return (()=>{
          isMounted = false;
        })
      },[])
    const exportCSV = () =>{
      setDisable(true);
      const exportedData = data.map(value => {
        return {
          ...value,
          InclRadio: value.InclRadio ? 'true' : 'false',
          RawData: value.RawData ? 'true' : 'false',
          AccessToken: value.AccessToken || '',
          Customer: value.Customer || '',
          LastUpdatedOn: value.LastCreatedOn || '',
          LastCreatedOn: value.LastCreatedOn  || ''
        }
      })
      let csv = Papa.unparse(exportedData);
      var blob = new Blob([csv]);
      if (window.navigator.msSaveOrOpenBlob)  // IE hack; see http://msdn.microsoft.com/en-us/library/ie/hh779016.aspx
          window.navigator.msSaveBlob(blob, "devices.csv");
      else{
          var a = window.document.createElement("a");
          a.href = window.URL.createObjectURL(blob, {type: "text/plain"});
          a.download = `${(new Date()).toISOString()}-devices.csv`;
          document.body.appendChild(a);
          a.click();  // IE: "Access is denied"; see: https://connect.microsoft.com/IE/feedback/details/797361/ie-10-treats-blob-url-as-cross-origin-and-denies-access
          document.body.removeChild(a);
      }
      setDisable(false);  
    }
      return( 
        <React.Fragment> 
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start'}}>
          {data.length> 0?<SemanticUIButton  disabled={disable} color={'blue'} onClick={exportCSV} type='submit' style={{ margin: '5px',display:'block' }}>{disable?"Generating....":"Generate CSV"}</SemanticUIButton>:null}
          {data.length> 0?<SemanticUIButton disabled={disable} color={'blue'} onClick={getData} style={{ margin: '5px',display:'block' }}>Refresh </SemanticUIButton>:null}
          </div>
          <div style={LandingStyle}>
            {loading?<Loader  />:
            <ReactTable
              data={data}
              columns={columns}
              showPaginationTop={true}
              minRows={8} 
              className="-striped -highlight"
              defaultFilterMethod= {(filter, row) =>row[filter.id].toLowerCase().includes(filter.value.toLowerCase())}      
            />}
          </div>
      </React.Fragment>     
    ) 
}

export { Landing };

