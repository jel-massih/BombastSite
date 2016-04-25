import React from 'react';  
import { render } from 'react-dom';  
import { Router, Route, browserHistory  } from 'react-router'

import About from './components/About.jsx';
import Register from './components/Register.jsx';
import Login from './components/Login.jsx';
import Bombast from './components/BombastApp.jsx';

var routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Bombast} />
    <Route path="/register" component={Register}/>
    <Route path="/signin" component={Login}/>
  </Router>  
);

render(routes, document.getElementById('appBase'));