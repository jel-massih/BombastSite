import React from 'react';  
import { render } from 'react-dom';  
import { Router, Route, browserHistory  } from 'react-router'

import AccountActions from './actions/AccountActions';
import AccountStore from './stores/AccountStore';

import Register from './components/Register.jsx';
import Login from './components/Login.jsx';
import Dashboard from './components/Dashboard.jsx';

import Bombast from './components/BombastApp.jsx';

function requiresAuthentication(nextState, replace) {
  if(!AccountStore.isLoggedIn()) {
      replace({
        pathname: '/signin',
        state: { nextPathname: nextState.location.pathname }
      });
  }
}

var routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Bombast} />
    <Route path="/register" component={Register}/>
    <Route path="/signin" component={Login}/>
    <Route path="/dashboard" component={Dashboard} onEnter={requiresAuthentication}/>
  </Router>  
);

var jwt = localStorage.getItem('jwt');
if(jwt) {
  AccountActions.loginUser(jwt);
}

render(routes, document.getElementById('appBase'));