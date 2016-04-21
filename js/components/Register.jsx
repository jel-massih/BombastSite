import React from 'react'

import TextField from './elements/TextField';
import Button from './elements/Button';

import AccountActions from '../actions/AccountActions';

class Register extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            formValid: false,
            email: 'jel-massih@hotmail.com',
            username: 'theflamingskunk',
            password: 'skunks123'
        };
    }
    
    
    render() {
        var usernameClasses = [];
        var usernameErrorText = null;
        var emailClasses = [];
        var emailErrorText = null;
        var passwordClasses = [];
        var passwordErrorText = null;
        
        if(this.state.email !== undefined && !this.validateEmail(this.state.email)) {
            emailClasses.push('fieldValidationError');
            emailErrorText = "Please enter a valid e-mail address.";
        }
        
        if(this.state.username !== undefined && !this.validateUsername(this.state.username)) {
            usernameClasses.push('fieldValidationError');
            usernameErrorText = "Your username must be between 3 and 16 characters, and may contain letters, numbers, dashes, periods and underscores.";
        }
        
        if(this.state.password !== undefined && !this.validatePassword(this.state.password)) {
            passwordClasses.push('fieldValidationError');
            passwordErrorText = "Passwords must be between 7 and 128 characters, at least 1 number and at least 1 letter.";
        }
        
        switch(this.state.errorCode) {
            case 1:
            case 2:
                emailClasses.push('fieldValidationError');
                emailErrorText = this.state.errorMessage;
                break;
            default:
                break;
        }
        
        return (
            <div className="bombastAccountModalOverlay">
                <div className="bombastAccountModalDialog">
                    <span className="logo"></span>
                    <div className="modalContent">
                        <h3 className="subheading">Join the Community</h3>
                        <div className="bombastAccountRegisterContainer">
                            <TextField label="*Username" onChange={this.onUsernameChanged.bind(this)} value={this.state.username} classes={usernameClasses} errorText={usernameErrorText} />
                            <TextField label="*Email" onChange={this.onEmailChanged.bind(this)} value={this.state.email} classes={emailClasses} errorText={emailErrorText} />
                            <TextField label="*Password" type="password" maxLength={128} onChange={this.onPasswordChanged.bind(this)} value={this.state.password} classes={passwordClasses} errorText={passwordErrorText} />
                            <Button onClick={this.onSignUpClicked.bind(this)} label="Sign Up" isDisabled={!this.state.formValid} />
                        </div>
                        
                        <div className="signInRedirect">
                            <span id="signInRedirectMessage">
                                Have a Bombast Technology account?
                            </span>
                            <a><span>Sign In</span></a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
    onSignUpClicked() {
        var updatedState = {};
        
        if(this.state.username === undefined) {
            updatedState.username = '';
        }
        
        if(this.state.password === undefined) {
            updatedState.password = '';
        }
        
        if(this.state.email === undefined) {
            updatedState.email = '';
        }

        this.setState(updatedState);
        
        if(!this.checkValidForm()) {
            return false;
        }
        
        AccountActions.tryRegister({
            username: this.state.username,
            password: this.state.password,
            email: this.state.email 
        }, this.onRegisterFailed.bind(this), this.onRegisterSuccess.bind(this));
    }
    
    onRegisterFailed() {
    }
    
    onRegisterSuccess(res) {
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
        
        if(!this.validateUsername(this.state.username)) {
            valid = false;
        } else if(!this.validateEmail(this.state.email)) {
            valid = false;
        } else if(!this.validatePassword(this.state.password)) {
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
    
    validatePassword(password) {
        if(!password) {
            return false;
        }
        
        if(password.length < 7 || password.length > 128) {
            return false;
        }
        
        var re = /[0-9]/;
        if(!re.test(password)) {
            return false;
        }
        
        re = /[a-z|A-Z]/;
        if(!re.test(password)) {
            return false;
        }
        
        return true;
    }
    
    validateUsername(username) {
        if(!username) {
            return false;
        }
        
        if(username.length < 3 || username.length > 16) {
            return false;
        }
        
        var re = /^[a-zA-Z0-9-_.]+$/;
        
        if(!re.test(username)) {
            return false;
        }
        
        return true;
    }
    
    onUsernameChanged(value) {
        this.setState({
            username: value
        }, this.checkValidForm.bind(this));
    }
    
    onEmailChanged(value) {
        var updatedState = {
            email: value,
            emailValid: this.validateEmail(value)
        };
        
        if(this.state.errorCode == 2) {
            updatedState.errorCode = null,
            updatedState.errorMessage = null
        };;
        
        this.setState(updatedState, this.checkValidForm.bind(this));
    }
    
    onPasswordChanged(value) {
        this.setState({
            password: value
        }, this.checkValidForm.bind(this));
    }
}

export default Register;