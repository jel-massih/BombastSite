import React from 'react'

import AuthenticatedComponent from './AuthenticatedComponent.jsx';

export default AuthenticatedComponent(class Login extends React.Component {
    render() {
        console.log(this.props.user);
        return (
            <div>Dashboard </div>  
        );
    }
});