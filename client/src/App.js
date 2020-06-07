import React from 'react';
import { Router,Route, Switch} from 'react-router-dom';
import history from "MyHistory"; 
import 'App.css';
import { Dashboard, Login, PrivateRoute } from 'components';
import {AuthContextProvider} from 'services';

const App=()=>{

  return (
    <AuthContextProvider>
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Login}  />
          <PrivateRoute path="/dashboard" component={Dashboard}/>            
        </Switch>
      </Router>
    </AuthContextProvider>
  );


}
export default App;
