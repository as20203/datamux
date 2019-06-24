import { Container ,  Button, Form, FormGroup, Label, Input, Alert} from 'reactstrap';
import React,{Component} from 'react';
import Papa from 'papaparse';
import axios from 'axios';

class MultipleDevices extends Component{
    state={
        csvFile:null,
        csvData:[],
        message:'',
        completedMessage:'',
        uploadSuccessMessage:''
    }

    toggle = ()=> {
        this.setState((prevState, props) => ({collapse:!prevState.collapse}))
    }

    onChange = (event) =>{
        this.setState({[event.target.name]:parseInt(event.target.value) });
    }

    handleFileChange = event => {
        this.setState({
          csvfile: event.target.files[0],
          message:'',
          completedMessage:'',
          uploadSuccessMessage:''
          
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
                RawData:csvData[i].RawData==="true"?true:false
            }
           
            const response = await axios.post('https://cors-anywhere.herokuapp.com/http://63.34.220.189:8081/devices/add',data)
           if(response){
            added=added+1;
            
            if(added===csvData.length){
               this.setState({
                   completedMessage:"All Devices Added"
               })
            }
           
           }

          
        } 
    }


    importCSV = () => {
        const { csvfile } = this.state;
        if(!csvfile){
            return;
        }
        Papa.parse(csvfile, {
          complete: this.updateData,
          header: true
        });
    };

    updateData = (result) => {
        let data = result.data;
        const validCSV = data.every(item=> item.hasOwnProperty("Deviceeui") && item.hasOwnProperty('Devicetype')
        && item.hasOwnProperty("Endpointtype") && item.hasOwnProperty("Endpointdest") && item.hasOwnProperty("InclRadio") && item.hasOwnProperty("RawData")
        );
        console.log(data);
        if(!validCSV){
            const message = 'Invalid CSV format Follow Instructions';
            this.setState({
                message:message,
                success:true
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
                                Header Format:Deviceeui,Devicetype,Endpointtype,Endpointdest,InclRadio,RawData
                         </Alert>
                        <div style={{display:'inline'}}>
                            <Input required={true} style={{display:'inline',width:'25%'}}  type='file' accept={".csv"} onChange={this.handleFileChange} placeholder={null} />
                            {message}

                            <Button onClick={this.importCSV}> Upload now!</Button>
                            {uploadMessage}
                        </div>
                    </FormGroup> 
                       
                        
                        <Button color='primary' type='submit' style={{ margin: '70px auto',display:'block' }}>Submit</Button>
                    </Form>
            </Container>
        )
    }
}
export default MultipleDevices;