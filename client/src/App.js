import React, { useState, useEffect} from 'react';
import { Router,Route, Switch} from 'react-router-dom';
import history from "MyHistory"; 
import axios from 'axios';
import Login from 'components/Authentication/Login/Login';
import 'App.css';
import Dashboard from 'components/Dashboard/Dashboard';

const App=()=>{
  const [user,setUser] =useState(null);
 
  useEffect(()=>{
    const token = localStorage.getItem("Token");
    if(token){
      axios.post("/api/verify-token")
      .then(result=>{
        if(result.status!==200){
          history.push("/");
        } else {
            setUser(result.data.user);
            const currentPath = history.location.pathname;
           if(currentPath==='/'){
             history.push("/dashboard")
           }else{
            history.push(currentPath);
           }    
        }
      })
    }
    else{
        history.push("/");
    }
  },[])

  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={() => <Login setUser={setUser} />}  />
        <Route path="/dashboard" component={() => <Dashboard user={user} setUser={setUser} />}/>            
      </Switch>
    </Router>
  );


}
export default App;
