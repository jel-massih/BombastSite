import React from 'react';  
import { render } from 'react-dom';  
import { Router, Route, browserHistory  } from 'react-router'

import About from './components/About.jsx';
import Register from './components/Register.jsx';
import Bombast from './components/BombastApp.jsx';

var routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Bombast} />
    <Route path="/get-bombastengine" component={Register}/>
  </Router>  
);

render(routes, document.getElementById('appBase'));
