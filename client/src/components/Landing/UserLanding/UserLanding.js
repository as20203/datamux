import React,{Component} from 'react';
import axios from 'instance';
import ReactTable from 'react-table';
import { Container} from 'reactstrap';

class UserLanding extends Component{
    constructor(props){
      super(props);
      this.columns =  [
        {
        Header: 'Deviceeui',
        accessor: 'Deviceeui',
        sortable:true,
        width:250,
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
        width:250,
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
       
      ];
      
    }
    
    state={
      data:[],
     
    }

    componentDidMount =() =>{
      axios.get('/devices/show')
      .then(commData=>{
        this.setState({
          data:commData.data
        })
      })
      .catch(err=>{
        console.log(err);
      })

    }
    
  
  
    render(){
    
        return(
            <React.Fragment>  
              <Container style={{marginLeft:'0px'}}>
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
  export default UserLanding;
  