import React,{Component} from 'react';
import axios from 'axios';
import ReactTable from 'react-table';
import { Container , Button,} from 'reactstrap';
class AdminLanding extends Component{
    constructor(props){
      super(props);
      this.columns =  [
        {
        Header: 'username',
        accessor: 'username',
        sortable:true,
        filterable: true,
        style:{
            textAlign:"center"
        }
        }, 
        {
        Header: 'email',
        accessor: 'email',
        filterable: true,
        style:{ 
          textAlign:"center"
        }
        }, 
        
        { 
          sortable:false,
          Cell: row =>  <Button color="danger" onClick={()=>{this.handleDelete(row.original.email)}}>Delete</Button>,
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
      axios.get('/api/users')
      .then(users=>{
        this.setState({
          data:users.data.allUsers
        })
      })
      .catch(err=>{
        console.log(err);
      })

    }
    
    handleDelete = (row) =>{
      const endpoint = '/api/delete/'+row;
        axios.delete(endpoint)
        .then(res=>{  
            axios.get('/api/users')
            .then(users=>{
            this.setState({
                data:users.data.allUsers
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
                  <ReactTable
                  data={this.state.data}
                  columns={this.columns}
                  minRows={8} 
                  className="-striped -highlight"
                  defaultFilterMethod= {(filter, row) =>row[filter.id].toLowerCase().includes(filter.value.toLowerCase())}   
                  defaultSorted={[
                    {
                      id: "username",
                    }
                  ]}      
                  /> 
              
              </Container>
          </React.Fragment>    
            
          )
      }
  }
  export default AdminLanding;
  