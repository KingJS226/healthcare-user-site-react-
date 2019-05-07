import React, { Component } from "react";
import { MDBFormInline, MDBInput } from "mdbreact";

class FreeAnswer extends Component {
    state = {
        answer: ""
    };

    changeHandler = event => {
        console.log("event value", event.target.value)
        this.setState({ [event.target.name]: event.target.value }, () => this.props.onChangeAnswer(this.state.answer));
    };

    componentDidMount() {
        this.setState({
            answer: this.props.value
        })
    }

    render() {
        return (
            <div className="form-group">
                <input
                    onChange={this.changeHandler}
                    value={this.state.answer || ""}
                    type="text"
                    name="answer"
                    className="form-control"
                />
            </div>
        );
    }
}

export default FreeAnswer;