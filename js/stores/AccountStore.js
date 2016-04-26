import Dispatcher from '../dispatcher/Dispatcher';
import { EventEmitter } from 'events';
import AccountConstants from '../constants/AccountConstants';
import jwt_decode from 'jwt-decode';

const ACCOUNT_SETTINGS_RETRIEVED_EVENT = 'settingsRetrievedEvent';
const USER_LOGGED_IN_EVENT = 'userLoggedInEvent';

var accountSettings = undefined;

var _user = null;
var _jwt = null;

class AccountStoreClass extends EventEmitter {
    getAccountSettings() {
        return accountSettings;
    }
    
    addAccountSettingsChangeListener(listener, context) {
        this.on(ACCOUNT_SETTINGS_RETRIEVED_EVENTS, listener, context);
    }
    
    removeAccountSettingsChangeListener(listener, context) {
        this.removeListener(ACCOUNT_SETTINGS_RETRIEVED_EVENTS, listener, context);
    }
    
    addUserLoggedInListener(listener, context) {
        this.on(USER_LOGGED_IN_EVENT, listener, context);
    }
    
    removeUserLoggedInListener(listener, context) {
        this.removeListener(USER_LOGGED_IN_EVENT, listener, context);
    }
    
    getUser() {
        return _user;
    }
    
    getJwt() {
        return _jwt;
    }
    
    isLoggedIn() {
        return !!_user;
    }
}

const AccountStore = new AccountStoreClass();

Dispatcher.register(action => {
    switch(action.type) {
        case AccountConstants.ACCOUNT_SETTINGS_RETRIEVED:
            accountSettings = action.accountSettings;
            AccountStore.emit(ACCOUNT_SETTINGS_RETRIEVED_EVENT);
            break;
        case AccountConstants.LOGIN_USER:
            _jwt = action.jwt;
            _user = jwt_decode(_jwt).data;
            AccountStore.emit(USER_LOGGED_IN_EVENT);
            break;
        case AccountConstants.LOGOUT_USER:
            _user = null;
            _jwt = null;
            AccountStore.emit(USER_LOGGED_IN_EVENT);
            break;
    } 
});

export default AccountStore;