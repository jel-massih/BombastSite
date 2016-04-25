import React from 'react'

class Checkbox extends React.Component {
    constructor(props) {
        super(props);
    }
    
    onChange(e) {
        if(this.props.onChange) {
            this.props.onChange(e.target.value);
        }
    }
        
    render() {
        return (
        <div className="checkContainer">
            <input type="checkbox" value={this.props.value} checked={this.props.isChecked} className="check" />
            <label className="checkLabel">{this.props.label}</label>
        </div>
        );
    }
}

Checkbox.defaultProps = {
    label: '',
    value: '',
    isChecked: false
};

export default Checkbox;