import React, { Component } from "react";
import { MDBFormInline, MDBInput } from "mdbreact";

class SelectAnswer extends Component {
    state = {
        radio: 0
    };

    onClick = nr => () =>{
        this.setState({
            radio: nr
        }, () => this.props.onChangeAnswer(this.state.radio));
    };

    componentDidMount() {
        this.setState({
            radio: this.props.value
        })
    }

    render() {
        return (
            <MDBFormInline>
                <MDBInput onClick={this.onClick(1)} checked={this.state.radio == 1} label="Yes"
                          type="radio" id="radio1" />
                <MDBInput onClick={this.onClick(2)} checked={this.state.radio == 2} label="No"
                          type="radio" id="radio2" />
                <MDBInput onClick={this.onClick(3)} checked={this.state.radio == 3} label="I don't know"
                          type="radio" id="radio3" />
            </MDBFormInline>
        );
    }
}

export default SelectAnswer;