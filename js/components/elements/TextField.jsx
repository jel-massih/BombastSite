import React from 'react'

class Register extends React.Component {
    constructor(props) {
        super(props);
    }
    
    onChange(e) {
        if(this.props.onChange) {
            this.props.onChange(e.target.value);
        }
    }
        
    render() {
        var errorMessage = null;
        if(this.props.errorText) {
            errorMessage = (<div className="fieldValidationError" >
                <label className="fieldValidationError">{this.props.errorText}</label>
            </div>);
        }
        
        return (
        <div className="textField">
            <label>{this.props.label}</label>
            <input type={this.props.type} maxLength={this.props.maxLength} onChange={this.onChange.bind(this)} value={this.props.value} className={this.props.classes.join(' ')} />
            {errorMessage}
        </div>);
    }
}

Register.defaultProps = {
    type: 'text',
    label: '',
    value: '',
    classes: [],
    maxLength: null,
    errorText: ''
}

export default Register;