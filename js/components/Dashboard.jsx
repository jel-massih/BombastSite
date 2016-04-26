import React from 'react'

import AuthenticatedComponent from './AuthenticatedComponent.jsx';
import AccountActions from '../actions/AccountActions';

export default AuthenticatedComponent(class Login extends React.Component {
    render() {
        return (
            <div className="account-management">
                <div className="account-header">
                    <div className="account-info">
                        <div className="profile-img">
                            <span></span>
                        </div>
                        <div className="profile-info">
                            <ul className="personal">
                                <li className="email">{this.props.user.email}</li>
                                <li>{this.props.user.username}</li>
                                <li><a onClick={this.state.onLogoutClicked}>Sign Out</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                            
                <div className="account-management-content">
                    <section className="account">
                        <div className="container">
                            <div className="home-download">
                                <div className="bombast-launcher">
                                    <h1 className="download">Get Bombast Engine</h1>
                                    <a className="defaultDownloadLink btn-a" href="https://jel-massih.com">Download</a>
                                </div>
                            </div>
                            <div className="home-download">
                                <div className="bombast-launcher">
                                    <h1 className="download">Get Bombast Engine Full Source Code</h1>
                                    <p>View and Download the full source code for bombast engine on <a href="https://github.com/jel-massih/BombastEngine">Github</a>.</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        );
    }
    
    onLogoutClicked() {
        AccountActions.logoutUser();
    }
});