import { Container ,  Button, Form, FormGroup, Label, Input, Alert} from 'reactstrap';
import React,{useState} from 'react';
import Papa from 'papaparse';
import axios from 'instance';

const MultipleDevices= ()=>{
    const [message,setMessage] = useState('');
    const [completedMessage,setCompletedMessage] = useState('');
    const [uploadMessage,setUploadMessage] = useState('');
    const [csvFile,setcsvFile] = useState(null);
    const [csvData,setcsvData] = useState([]);
    const [disable,setDisable] = useState(false);

    const handleFileChange = event => {
        setMessage('');
        setCompletedMessage('')
        setUploadMessage('')
        setcsvFile(event.target.files[0]);
    };
    
    const onSubmit = async(e) =>{
        e.preventDefault();
        setDisable(true);
        await Promise.all(
            csvData.map(async record=>{
                const updatedRecord= {
                   ...record,
                    InclRadio:record.InclRadio==="true"?true:false,
                    RawData:record.RawData==="true"?true:false,
                    AccessToken:(record.AccessToken!==""&&record.AccessToken.length===10)?record.AccessToken:Math.random().toString(32).substr(2,10).toUpperCase()
                }
                await axios.post('/devices/add',updatedRecord)
            })
        )
        .then(()=>{
            setCompletedMessage("All Devices Added")
            setDisable(false);
        })
    }
    const importCSV = () => {
        if(!csvFile){
            return;
        }
        Papa.parse(csvFile, {
          complete: updateData,
          header: true
        });
    };

    const updateData = (result) => {
        let data = result.data;
        const validCSV = data.every(item=> item.hasOwnProperty("Deviceeui") && item.hasOwnProperty('Devicetype')
        && item.hasOwnProperty("Endpointtype") && item.hasOwnProperty("Endpointdest") && item.hasOwnProperty("InclRadio") && item.hasOwnProperty("RawData")
        && item.hasOwnProperty("AccessToken")
        );
        if(!validCSV){
            setMessage('Invalid CSV format Follow Instructions')
            setcsvFile(null);
        }else{
           setcsvData(data);
           setUploadMessage('File upload successful')       
        }
    }
    return(
        <Container>
            <Form style={{margin: '15px auto',width:'70%'}} onSubmit={onSubmit}>    
                <FormGroup inline={true}>
                    {completedMessage?<Alert color="success">{completedMessage}</Alert>:null}
                    <Label for="exampleDevice">Select CSV File</Label>
                    <Alert color="primary">
                            Header Format:Deviceeui,Devicetype,Endpointtype,Endpointdest,InclRadio,RawData,AccessToken
                        </Alert>
                    <div style={{display:'inline'}}>
                        <Input required={true} style={{display:'inline',width:'25%'}}  type='file' accept={".csv"}  onChange={handleFileChange} onClick={(e)=>e.target.value=null}  placeholder={null} />
                        {message?<Alert color="danger">{message}</Alert>:null}

                        <Button onClick={importCSV}> Upload now!</Button>
                        {uploadMessage? <Alert color="success">{uploadMessage}</Alert>:null}
                    </div>
                </FormGroup> 
                    <Button disabled={disable}  color='primary' type='submit' style={{ margin: '70px auto',display:'block' }}>{disable?'Submitting':'Submit'}</Button>
                </Form>
        </Container>
    )
}
export default MultipleDevices;