import Dispatcher from '../dispatcher/Dispatcher';
import WebApiUtils from '../utils/WebApiUtils';
import AccountConstants from '../constants/AccountConstants';
import { browserHistory } from 'react-router'

export default class AccountActions {
    static tryRegister(data, errorCallback, successCallback) {
        WebApiUtils.post('/api/tryRegister', data, successCallback, errorCallback);
    }
    
    static loginUser(jwt) {
        browserHistory.push('/dashboard');
        localStorage.setItem('jwt', jwt);
        
        Dispatcher.dispatch({
            type: AccountConstants.LOGIN_USER,
            jwt: jwt
        });
    }
}