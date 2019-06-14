import React, {Component} from 'react';
import { Router,Route, Switch} from 'react-router-dom';
import history from "./history"; 
import axios from 'axios';
import Login from './containers/Authentication/Login/Login';
import './App.css';
// import Landing from './containers/Landing/landing';
import Dashboard from './containers/Dashboard/Dashboard';



class App extends Component{
  state = {
    user:null
  };
  setUser = (user) => {
    this.setState({user});
  };

  componentDidMount = ()=>{
    const token = localStorage.getItem("Token");
    if(token){
      axios.post("/api/verify-token")
      .then(result=>{
        if(result.status!==200){
          history.push("/");
        } else {
            this.setState({user: result.data.user});
            history.push("/dashboard");
        }
      })
    }
    else{
        history.push("/");
    }
  };

  render(){
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={() => <Login setUser={this.setUser} />}  />
          <Route path="/dashboard" component={() => <Dashboard user={this.state.user} setUser={this.setUser} />}/>
        </Switch>
      </Router>
    );
  }

}
export default App;
