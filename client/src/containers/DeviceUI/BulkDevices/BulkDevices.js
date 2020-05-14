import { Container ,  Button, Form, FormGroup, Label, Input, Alert} from 'reactstrap';
import React,{Component} from 'react';
import Papa from 'papaparse';
import axios from '../../../instance';

class MultipleDevices extends Component{
    state={
        csvFile:null,
        csvData:[],
        message:'',
        completedMessage:'',
        uploadSuccessMessage:'',
    }

    toggle = ()=> {
        this.setState((prevState, props) => ({collapse:!prevState.collapse}))
    }

    onChange = (event) =>{
        this.setState({[event.target.name]:parseInt(event.target.value) });
    }

    handleFileChange = event => {
        this.setState({
          csvFile: event.target.files[0],
          message:'',
          completedMessage:'',
          uploadSuccessMessage:'',
          
        });
    };
    
    onSubmit = async(e) =>{
        e.preventDefault();
        const {csvData} = this.state;
       
        
        let i,added=0;
        for (i = 0; i < csvData.length; i++) {
            const data = {
                Deviceeui:csvData[i].Deviceeui,
                Devicetype:csvData[i].Devicetype,
                Endpointtype:csvData[i].Endpointtype,
                Endpointdest:csvData[i].Endpointdest,
                InclRadio:csvData[i].InclRadio==="true"?true:false,
                RawData:csvData[i].RawData==="true"?true:false,
                AccessToken:(csvData[i].AccessToken!==""&&csvData[i].AccessToken.length===10)?csvData[i].AccessToken:Math.random().toString(32).substr(2,10).toUpperCase()
            }
            const response = await axios.post('/devices/add',data)
           if(response){
            added=added+1;
            if(added===csvData.length){
               this.setState({
                   completedMessage:"All Devices Added",
               })
            }
           }      
        } 
    }
    importCSV = () => {
        const { csvFile } = this.state;
        if(!csvFile){
            return;
        }
        Papa.parse(csvFile, {
          complete: this.updateData,
          header: true
        });
    };

    updateData = (result) => {
        let data = result.data;
        const validCSV = data.every(item=> item.hasOwnProperty("Deviceeui") && item.hasOwnProperty('Devicetype')
        && item.hasOwnProperty("Endpointtype") && item.hasOwnProperty("Endpointdest") && item.hasOwnProperty("InclRadio") && item.hasOwnProperty("RawData")
        && item.hasOwnProperty("AccessToken")
        );
        if(!validCSV){
            const message = 'Invalid CSV format Follow Instructions';
            this.setState({
                message:message,
                success:true,
                csvFile:null,
            })
        }else{
            
           this.setState({
               csvData:data,
               uploadSuccessMessage:'File upload successful',
               success:false
           })
                       
        }
    }

    render(){
        let message = null,completedMessage=null,uploadMessage=null;
        if(this.state.message){
            message = <Alert color="danger">
                            {this.state.message}
                      </Alert>
        }
        if(this.state.uploadSuccessMessage){
            uploadMessage = <Alert color="success">
                            {this.state.uploadSuccessMessage}
                      </Alert>
        }

        if(this.state.completedMessage){
            completedMessage = <Alert color="success">
                            {this.state.completedMessage}
                      </Alert>
        }

        return(
            <Container>
                <Form style={{margin: '15px auto',width:'70%'}} onSubmit={this.onSubmit}>    
                   

                    <FormGroup inline={true}>
                        {completedMessage}
                        <Label for="exampleDevice">Select CSV File</Label>
                        <Alert color="primary">
                                Header Format:Deviceeui,Devicetype,Endpointtype,Endpointdest,InclRadio,RawData,AccessToken
                         </Alert>
                        <div style={{display:'inline'}}>
                            <Input required={true} style={{display:'inline',width:'25%'}}  type='file' accept={".csv"}  onChange={this.handleFileChange} onClick={(e)=>e.target.value=null}  placeholder={this.state.csvName} />
                            {message}

                            <Button onClick={this.importCSV}> Upload now!</Button>
                            {uploadMessage}
                        </div>
                    </FormGroup> 
                       
                        
                        <Button  color='primary' type='submit' style={{ margin: '70px auto',display:'block' }}>Submit</Button>
                    </Form>
            </Container>
        )
    }
}
export default MultipleDevices;