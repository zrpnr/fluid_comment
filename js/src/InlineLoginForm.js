'use strict';

import React from 'react';

class InlineLoginForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {nameField: '', passField: '', failed: false};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Username:&nbsp;
            <input type="text" name="nameField" value={this.state.nameField} onChange={this.handleChange} />
          </label>
          <label>
            Password:&nbsp;
            <input type="password" name="passField" value={this.state.passField} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Log In" />
        </form>
    );
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    const options = {
      method: 'POST',
      body: JSON.stringify({
        name: this.state.nameField,
        pass: this.state.passField
      })
    };
    fetch(this.props.loginUrl, options).then(response => {
      this.props.onLogin(response.ok);
    });
  }

}

export default InlineLoginForm;
