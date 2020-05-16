import React,{Component} from 'react';
import ReactTable from 'react-table';
import { Container} from 'reactstrap';
import axios from 'instance';
import DeletePrompt from './DeletePrompt/DeletePrompt';
import EditPrompt from './EditPrompt/EditPrompt';


class AdminLanding extends Component{

  constructor (props){
    super(props);
    this.columns = [
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
        Cell: props => <input type='checkbox' readOnly={true} disabled checked={props.original.InclRadio}></input> ,
        style:{ 
            textAlign:"center"
        },
      },
      {
        Header: "RawData",
        accessor: 'RawData',
        Cell: props =>  <input type='checkbox' readOnly={true} disabled checked={props.original.RawData}></input>,
        style:{
            textAlign:"center"
        },
      },

      {
        Header: "AccessToken",
        accessor: 'AccessToken',
        width:150,
        style:{
            
            textAlign:"center"
        }
        },
      { 
        Header:'Delete',
        sortable:false,
        Cell: row =>  <DeletePrompt data={this.state.data} setData={this.setData}  rowData={row.original} />,
        width:100,
        style:{
            textAlign:"center",
        },
        
      },

      { 
        Header:'Edit',
        sortable:false,
        Cell: row =>  <EditPrompt data={this.state.data} setData={this.setData}  rowData={row.original} />,
        width:100,
        style:{
            textAlign:"center",
        },
        
      },
      
    ];
  }
    
    state={
      data:[],
     
    }

   setData = (newData) =>{
     this.setState({
       data:newData
     })
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
             <Container style={{marginLeft:'0px',maxWidth:'fit-content'}}>
                  
             <ReactTable
                data={this.state.data}
                columns={this.columns}
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
  }
  export default AdminLanding;
  