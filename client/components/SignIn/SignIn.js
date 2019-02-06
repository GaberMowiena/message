import React, { Component } from 'react';
import Router from 'next/router';

// app imports
import Form from '../Form/styles/Form';
import FormSectionHeading from '../Form/FormSectionHeading';
import FormTextInput from '../Form/FormTextInput';
import FormLabel from '../Form/FormLabel';
import FormFieldSet from '../Form/FormFieldSet';

class SignIn extends Component {
  state = {
    email: '',
    password: ''
  };
  saveToken = token => {
    window.sessionStorage.setItem('token', token);
  };
  sanitizeEmail(email) {
    return email && email.replace(/\s+/g, '').toLowerCase();
  }

  sanitizeUsername(username) {
    return username && username.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  }
  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({
      [name]: val
    });
  };
  handleSignInSubmit = () => {
    const { email, password } = this.state;
    fetch('http://localhost:3000/users/signin', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.sanitizeEmail(email),
        password
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
        <FormSectionHeading>sign in</FormSectionHeading>
        <FormFieldSet>
          <FormLabel htmlFor="email">
            Email
            <FormTextInput
              id="email"
              name="email"
              type="email"
              placeholder="email"
              onChange={this.handleChange}
              value={email}
            />
          </FormLabel>
          <FormLabel htmlFor="password">
            Password
            <FormTextInput
              id="password"
              name="password"
              type="password"
              placeholder="password"
              onChange={this.handleChange}
              value={password}
            />
          </FormLabel>

          <button type="submit">Sign In</button>
        </FormFieldSet>
      </Form>
    );
  }
}

export default SignIn;
