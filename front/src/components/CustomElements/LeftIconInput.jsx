import React,{Component} from 'react';
import {
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText
} from 'reactstrap';

class LeftIconInput extends Component{
    constructor(props) {
        super(props);
        this.state = {
            focused: ""
        };
    }
    onFocus = () => {
        this.setState({
            focused: "input-group-focus"
        });
    };
    onBlur = () => {
        this.setState({
            focused: ""
        });
    };
    handleChange = (event) => {
        this.props.onChange(event);
    }
    handleKeyUp = (event) => {
        this.props.onKeyUp(event);
    }
    render(){
        return (
            <div id={`formGroup_${this.props.name}`}>
                <label htmlFor={`input_${this.props.name}`}>{this.props.displayName}</label>
                <InputGroup className={this.state.focused}>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                            <i className={`tim-icons ${this.props.icon}`} />
                        </InputGroupText>
                    </InputGroupAddon>
                    <Input
                        name={this.props.name}
                        id={`input_${this.props.name}`}
                        type={this.props.type}
                        placeholder={this.props.placeHolder}
                        onFocus={this.onFocus}
                        onBlur={this.onBlur}
                        value={this.props.value}
                        onChange={this.handleChange}
                    />
                </InputGroup>
            </div>
        );
    }
}

export default LeftIconInput;
