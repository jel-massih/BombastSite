import Dispatcher from 'Dispatcher';
import { EventEmitter } from 'events';
import AccountConstants from '../constants/AccountConstants';

const ACCOUNT_SETTINGS_RETRIEVED_EVENT = 'settingsRetrievedEvent';

var accountSettings = undefined;

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
}

const AccountStore = new AccountStoreClass();

Dispatcher.register(action => {
    switch(action.type) {
        case AccountConstants.ACCOUNT_SETTINGS_RETRIEVED:
            accountSettings = action.accountSettings;
            AccountStore.emit(ACCOUNT_SETTINGS_RETRIEVED_EVENT);
            break;
    } 
});

export default AccountStore;