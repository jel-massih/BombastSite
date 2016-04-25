import Dispatcher from '../dispatcher/Dispatcher';
import WebApiUtils from '../utils/WebApiUtils';
import AccountConstants from '../constants/AccountConstants';

export default class AccountActions {
    static tryRegister(data, errorCallback, successCallback) {
        WebApiUtils.post('/api/tryRegister', data, successCallback, errorCallback);
    }
    
    static tryLogin(data, errorCallback, successCallback) {
        WebApiUtils.post('/api/tryLogin', data, successCallback, errorCallback);
    }
    
    static settingsRetrieved(settings) {
        AppDispatcher.dispatch({
            type: AccountConstants.ACCOUNT_SETTINGS_RETRIEVED,
            accountSettings: settings 
        });
    }
}