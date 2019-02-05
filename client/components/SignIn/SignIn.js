import React, { Component } from 'react';
import Router from 'next/router';
import Form from '../styles/Form';

class SignIn extends Component {
  state = {
    email: '',
    password: ''
  };
  saveToken = token => {
    window.sessionStorage.setItem('token', token);
  };
  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({
      [name]: val
    });
  };
  handleSignInSubmit = () => {
    fetch('http://localhost:3000/signin', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data && data.success) {
          this.saveToken(data.token);
          Router.push('/');
        }
      })
      .catch(err => console.log(err));
  };
  render() {
    const { email, password } = this.state;
    return (
      <Form
        onSubmit={e => {
          e.preventDefault();
          this.handleSignInSubmit();
        }}
      >
        <fieldset>
          <label>
            <input
              name="email"
              type="email"
              placeholder="email"
              value={email}
              onChange={this.handleChange}
            />
          </label>
          <label>
            <input
              name="password"
              type="password"
              placeholder="password"
              value={password}
              onChange={this.handleChange}
            />
          </label>

          <button type="submit">Sign In</button>
        </fieldset>
      </Form>
    );
  }
}

export default SignIn;
