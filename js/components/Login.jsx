import React from 'react';

import TextField from './elements/TextField';
import Checkbox from './elements/Checkbox';
import Button from './elements/Button';
import { Link } from 'react-router'

import AccountActions from '../actions/AccountActions';

class Login extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
        formValid: false,
        requestPending: false
    };
  }

  render() {
        var emailClasses = [];
        var emailErrorText = null;
        
        if(this.state.email !== undefined && !this.validateEmail(this.state.email)) {
            emailClasses.push('fieldValidationError');
            emailErrorText = "Please enter a valid e-mail address.";
        }

    var buttonLabel = "Sign In";

    if(this.state.requestPending) {
        buttonLabel = "Submitting...";
    }
        
    return(
      <div className="bombastAccountModalOverlay">
          <div className="bombastAccountModalDialog">
              <span className="logo"></span>
              <div className="modalContent">
                  <h3 className="subheading">Your Community Awaits</h3>
                  <div className="bombastAccountFormContainer">
                      <TextField label="*Email" onChange={this.onEmailChanged.bind(this)} value={this.state.email} classes={emailClasses} errorText={emailErrorText} />
                      <TextField label="*Password" type="password" maxLength={128} onChange={this.onPasswordChanged.bind(this)} value={this.state.password} />
                      <span className="rememberMeCheckContainer left"><Checkbox label="Remember Me" /></span>
                      <span className="loginResetPass right"><Link to="/reset-password">Forgot Your Password?</Link></span>
                      <Button onClick={this.onSignInClicked.bind(this)} label={buttonLabel} isDisabled={!this.state.formValid || this.state.requestPending} />
                      <span className="fieldValidationError">{this.state.errorMessage}</span>
                  </div>
                  
                  <div className="signInRedirect">
                      <span id="signInRedirectMessage">
                          Don't have a Bombast Technology account?
                      </span>
                      <Link to="/register">Sign Up</Link>
                  </div>
              </div>
          </div>
      </div> 
    );
  }
  
  onSignInClicked() {
        var updatedState = {};
        
        if(this.state.email === undefined) {
            updatedState.email = '';
        }

        this.setState(updatedState);
        
        if(!this.checkValidForm()) {
            return false;
        }
        
        this.setState({
            requestPending: true
        });
        
        AccountActions.tryLogin({
            password: this.state.password,
            email: this.state.email 
        }, this.onLoginFailed.bind(this), this.onLoginSuccess.bind(this));
    }
    
    onLoginFailed() {
        this.setState({
            requestPending: false
        });
    }
    
    onLoginSuccess(res) {
        this.setState({
            requestPending: false
        });
        
        res = JSON.parse(res);
        
        if(res.error) {
            this.setState({
                errorCode: res.error.errorCode,
                errorMessage: res.error.text
            });
        }
    }
  
  checkValidForm() {
        var valid = true;
        
        if(!this.validateEmail(this.state.email)) {
            valid = false;
        }
        
        if(!this.state.password) {
            valid = false;
        }
        
        this.setState({
            formValid: valid 
        });
        
        return valid;
    }
    
    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
  
  onEmailChanged(value) {
      var updatedState = {
          email: value,
          emailValid: this.validateEmail(value)
      };
      
      this.setState(updatedState, this.checkValidForm.bind(this));
  }
  
  onPasswordChanged(value) {
      this.setState({
          password: value
      }, this.checkValidForm.bind(this));
  }
}

export default Login;  