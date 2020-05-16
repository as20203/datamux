import React, {Component} from 'react';
import './Dashboard.css';
import Admin from './AdminDashboard/AdminDashboard';
import User from './UserDashboard/UserDashboard';

class Dashboard extends Component{ 
  logoutHandler = () =>{
    localStorage.clear();
    this.props.setUser(null);
  };

  render(){
    const {user} = this.props;
    if(user && user.userType === "admin") {
      return <Admin user={user} logoutHandler={this.logoutHandler} />
    } 
    else if(user && user.userType === "user") {
      return <User user={user} logoutHandler={this.logoutHandler}/>
    }
    return null;
  }
    
  }
  
  export default Dashboard;


