import Dispatcher from '../dispatcher/Dispatcher';
import WebApiUtils from '../utils/WebApiUtils';
import AccountConstants from '../constants/AccountConstants';
import { browserHistory } from 'react-router';

export default class AccountActions {
    static tryRegister(data, errorCallback, successCallback) {
        WebApiUtils.post('/api/tryRegister', data, successCallback, errorCallback);
    }
    
    static loginUser(jwt) {
        var savedJwt = localStorage.getItem('jwt');        

        
        Dispatcher.dispatch({
            type: AccountConstants.LOGIN_USER,
            jwt: jwt
        });
        
        if(savedJwt != jwt) {
            browserHistory.push('/dashboard');
            
            localStorage.setItem('jwt', jwt);
        }
    }
    
    static logoutUser() {
        browserHistory.push('/signin');
        localStorage.removeItem('jwt');
        
        Dispatcher.dispatch({
            type: AccountConstants.LOGOUT_USER
        });
    }
}