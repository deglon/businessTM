import React  from 'react';

import { Provider } from 'react-redux';
import store from './store';

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";

function App() {
  
 
    return (
      <Provider store={store}>
        <div className="App"> 
        
        <BrowserRouter>
            <Switch>
                <Route path="/admin" render={props => <AdminLayout {...props} />} />
                <Route path="/auth" render={props => <AuthLayout {...props} />} />
                <Redirect from="/" to="/auth" />
            </Switch>
        </BrowserRouter>
        </div>
      </Provider>
    );
  }
  
  export default App;
