import React from 'react'

class Button extends React.Component {
    onClick() {
        if(this.props.onClick) {
            this.props.onClick();
        }
    }
    
    render() {
        var inputClass = "active";
        
        if(this.props.isDisabled) {
            inputClass = "disabled";
        }
        
        return (
        <div className="button">
            <input type="submit" value={this.props.label} className={inputClass} onClick={this.onClick.bind(this)} />
        </div>);
    }
}

Button.defaultProps = {
    label: '',
    isDisabled: false
}

export default Button;