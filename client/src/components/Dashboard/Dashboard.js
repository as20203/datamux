import React, { useContext } from 'react';
import './Dashboard.css';
import {AdminDashboard,UserDashboard} from 'components';
import { authContext } from 'services';
// import {Redirect} from 'react-router-dom';
const Dashboard = (props)=>{ 
  const [auth,dispatch] = useContext(authContext)
  const logoutHandler = () =>{
    localStorage.clear();
    sessionStorage.clear(); 
    dispatch({type:'notauthenticated',isAuthenticated:false,user:{}}); 
  };
  if(auth.user && auth.user.userType === "admin") {
    return <AdminDashboard  logoutHandler={logoutHandler} />
  } 
  else if(auth.user && auth.user.userType === "user") {
    return <UserDashboard    logoutHandler={logoutHandler}/>
  }
  return null;  
}
  
export { Dashboard };


