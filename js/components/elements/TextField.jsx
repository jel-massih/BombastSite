import React from 'react'

export default React.createClass({
    getDefaultProps: function() {
        return {
            type: 'text',
            label: ''
        };
    },
    
    render() {
        return (
        <div className="textField">
            <label>{this.props.label}</label>
            <input type={this.props.type} />
        </div>);
    }
})

