import React from 'react';
import './Dashboard.css';
import Admin from './AdminDashboard/AdminDashboard';
import User from './UserDashboard/UserDashboard';

const Dashboard = (props)=>{ 
  const logoutHandler = () =>{
    localStorage.clear();
    props.setUser(null);
  };

 
  const {user} = props;
  if(user && user.userType === "admin") {
    return <Admin user={user} logoutHandler={logoutHandler} />
  } 
  else if(user && user.userType === "user") {
    return <User user={user} logoutHandler={logoutHandler}/>
  }
  return null;  
}
  
  export default Dashboard;


