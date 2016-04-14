import React from 'react'

import TextField from './elements/TextField';

export default React.createClass({
  render() {
    return (
        <div className="bombastAccountModalOverlay">
            <div className="bombastAccountModalDialog">
                <span className="logo"></span>
                <div className="modalContent">
                    <h3 className="subheading">Join the Community</h3>
                    <div className="bombastAccountRegisterContainer">
                        <TextField label="*Display Name"/>
                    </div>
                </div>
            </div>
        </div>
    );
  }
});