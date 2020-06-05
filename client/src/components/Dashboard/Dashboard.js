import React from 'react';
import './Dashboard.css';
import {AdminDashboard,UserDashboard} from 'components';
const Dashboard = (props)=>{ 
  const logoutHandler = () =>{
    localStorage.clear();
    sessionStorage.clear(); 
    props.setUser(null);
  };

 
  const {user} = props;
  if(user && user.userType === "admin") {
    return <AdminDashboard user={user} logoutHandler={logoutHandler} />
  } 
  else if(user && user.userType === "user") {
    return <UserDashboard user={user} logoutHandler={logoutHandler}/>
  }
  return null;  
}
  
export { Dashboard };


