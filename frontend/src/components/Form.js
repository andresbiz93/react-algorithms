import React, { Component } from "react";
import PropTypes from "prop-types";
class Form extends Component {
  static propTypes = {
    endpoint: PropTypes.string.isRequired
  };
  state = {
    name: "",
    email: "",
    message: ""
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    const { name, email, message } = this.state;
    const lead = { name, email, message };
    const conf = {
      method: "post",
      body: JSON.stringify(lead),
      headers: new Headers({ "Content-Type": "application/json" })
    };
    fetch(this.props.endpoint, conf).then(response => console.log(response));
  };
  render() {
    const { name, email, message } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Name</label>
            <div>
              <input
                type="text"
                name="name"
                onChange={this.handleChange}
                value={name}
                required
              />
            </div>
          </div>
          <div>
            <label>Email</label>
            <div>
              <input
                type="email"
                name="email"
                onChange={this.handleChange}
                value={email}
                required
              />
            </div>
          </div>
          <div>
            <label>Message</label>
            <div>
              <textarea
                type="text"
                name="message"
                onChange={this.handleChange}
                value={message}
                required
              />
            </div>
          </div>
          <div>
            <button type="submit">
              Send message
            </button>
          </div>
        </form>
      </div>
    );
  }
}
export default Form;