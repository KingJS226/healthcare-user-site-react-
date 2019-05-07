import React, { Component } from "react";
import { MDBFormInline, MDBInput } from "mdbreact";

class Relevant extends Component {
    state = {
        radio: 0
    }

    onClick = nr => () =>{
        this.setState({
            radio: nr
        }, () => this.props.onChangeRelevant(this.state.radio));
    };

    componentDidMount() {
        this.setState({
            radio: this.props.value
        })
    }

    render() {
        return (
            <MDBFormInline className="d-flex justify-content-center">
                <MDBInput onClick={this.onClick(1)} checked={this.state.radio === 1} type="radio" id="radio1" />
                <MDBInput onClick={this.onClick(2)} checked={this.state.radio === 2} type="radio" id="radio2" />
                <MDBInput onClick={this.onClick(3)} checked={this.state.radio === 3} type="radio" id="radio3" />
                <MDBInput onClick={this.onClick(4)} checked={this.state.radio === 4} type="radio" id="radio3" />
            </MDBFormInline>
        );
    }
}

export default Relevant;