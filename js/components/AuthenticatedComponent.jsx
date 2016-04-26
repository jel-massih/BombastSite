import React from 'react'
import AccountStore from '../stores/AccountStore';

export default (ComposedComponent) => {
    return class AuthenticatedComponent extends React.Component {        
        constructor() {
            super();
            
            this.listeners = {
                onUserLoggedIn: this.onUserLoggedIn.bind(this)
            }
            
            this.state = this.getLoginState();
        }
        
        getLoginState() {
            return {
                userLoggedIn: AccountStore.isLoggedIn(),
                user: AccountStore.getUser(),
                jwt: AccountStore.getJwt()
            };
        }
        
        componentDidMount() {
            AccountStore.addUserLoggedInListener(this.listeners.onUserLoggedIn);
        }
        
        componentWillUnmount() {
            AccountStore.removeUserLoggedInListener(this.listeners.onUserLoggedIn);
        }
        
        onUserLoggedIn() {
            this.setState(this.getLoginState())
        }
        
        render() {
            return(
            <ComposedComponent
                {...this.props}
                user={this.state.user}
                jwt={this.state.jwt}
                userLoggedIn={this.state.userLoggedIn} />  
            );
        }
    }
};