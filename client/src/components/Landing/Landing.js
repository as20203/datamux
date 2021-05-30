import React,{useState,useEffect, useContext} from 'react';
import ReactTable from 'react-table';
import {Loader,Columns} from 'components';
import axios from 'instance';
import { authContext } from 'services';
import{Button as SemanticUIButton} from 'semantic-ui-react';
import Papa from 'papaparse';

const Landing = ()=>{
    const [data,setData] = useState([]);
    const [loading,setLoading] = useState(false);
    const [auth] = useContext(authContext);
    const [disable, setDisable] = useState(false);
    const [check,toggleCheck] = useState(false);
    const sendCommand  = async rowData => {
      try {
        console.log(rowData);
        const { server, Deviceeui, command, value, AccessToken, Devicetype } = rowData;
        const commandData = {
          Server: server,
          DeviceEui: Deviceeui,
          Command: command,
          value: Number(value),
          AccessToken,
          Devicetype
        }
        console.log(commandData);
        const result = await axios.post(`/downlink`, commandData);
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    }

    const sendCommandToBulk  = async data => {
      try {
        await Promise.allSettled(data.map(async rowData => {
          return new Promise(async (resolve, reject) => {
            try {
              const { server, Deviceeui, command, value, AccessToken, Devicetype } = rowData;
              const commandData = {
                Server: server,
                DeviceEui: Deviceeui,
                Command: command,
                value: Number(value),
                AccessToken,
                Devicetype
              }
              console.log(commandData);
              const result = await axios.post(`/downlink`, commandData);
              resolve(result);
            } catch (error) {
              console.log(error);
              resolve(error);
            }
          })
         
        }))
      } catch (error) {
        console.log(error);
      }
    }
    const columns = Columns(auth.user.userType,data,setData, check, toggleCheck, sendCommand);

    
    const LandingStyle={padding:'8px 16px',maxWidth:'100%',minHeight:'100vh',display:loading?'flex':'',justifyContent:'center',alignItems:'center'}
    const getData = (isMounted) => {
       setLoading(true);
       axios.get('/devices/show')
        .then(commData=>{
          if(isMounted){
            setLoading(false);
            if (Array.isArray(commData.data)) setData(commData.data.map(data => {
              return {
                ...data,
                command: '',
                value: -1,
                server: '',
                checked: false
              }
            }));
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
          {data.filter(({ checked }) => checked).length> 0?<SemanticUIButton disabled={disable} color={'blue'} onClick={() => sendCommandToBulk(data.filter(({ checked }) => checked))} style={{ margin: '5px',display:'block' }}>Send Command to Bulk Devices</SemanticUIButton>:null}
          </div>
          <div style={LandingStyle}>
            {loading ?<Loader  />:
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

