import React,{Component} from 'react';
import axios from 'axios';
import ReactTable from 'react-table';
import { Container , Button,} from 'reactstrap';
//import history from '../../../history';
class AdminLanding extends Component{
    constructor(props){
      super(props);
      this.columns =  [
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
          Cell: props => <input type='checkbox' readOnly={true} checked={props.original.InclRadio}></input> ,
          style:{ 
              textAlign:"center"
          },
        },
        {
          Header: "RawData",
          accessor: 'RawData',
          Cell: props =>  <input type='checkbox' readOnly={true} checked={props.original.RawData}></input>,
          style:{
              textAlign:"center"
          },
        },
       
        { 
          sortable:false,
          Cell: row =>  <Button color="danger" onClick={()=>{this.handleDelete(row.original.Deviceeui)}}>Delete</Button>,
          style:{
              textAlign:"center"
          },
          
        },
      ];
      
    }
    
    state={
      data:[],
     
    }

    // logoutHandler = () =>{
    //     localStorage.clear();
    //     console.log(localStorage.getItem("Token"));
    //     this.props.setUser(null);
    //     history.push("/");
    // };
  
    componentDidMount =() =>{
      axios.get('https://cors-anywhere.herokuapp.com/http://63.34.220.189:8081/devices/show')
      .then(commData=>{
        this.setState({
          data:commData.data
        })
      })
      .catch(err=>{
        console.log(err);
      })

    }
    
    handleDelete = (row) =>{
      const endpoint = 'https://cors-anywhere.herokuapp.com/http://63.34.220.189:8081/devices/delete/'+row;
      axios.delete(endpoint)
      .then(res=>{  
        axios.get('https://cors-anywhere.herokuapp.com/http://63.34.220.189:8081/devices/show')
        .then(commData=>{
          this.setState({
            data:commData.data
          })
        })
        .catch(err=>{
          console.log(err);
        })
      })
    }
  
  
    render(){
    
        return(
            <React.Fragment>  
             <Container style={{marginLeft:'0px'}}>
                  {/* <Button color="primary" onClick={this.logoutHandler} style={{ margin: '10px auto',display:'block'}}>Logout</Button> */}
                  
                  <ReactTable
                  data={this.state.data}
                  columns={this.columns}
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
  }
  export default AdminLanding;
  