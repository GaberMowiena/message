import React, { Component } from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import { Github } from 'styled-icons/boxicons-logos/Github';

import Form from '../styles/Form';
// import { GithubButton } from '../Button/Github';

export const GithubButton = styled(Github)`
  height: 1.6rem;
  width: 1.6rem;
`;
class Register extends Component {
  state = {
    email: '',
    password: '',
    name: '',
    city: '',
    cohort: ''
  };
  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({
      [name]: val
    });
  };
  handleRegisterSubmit = () => {
    fetch('http://localhost:3000/users/register', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        name: this.state.name,
        city: this.state.city,
        cohort: this.state.cohort
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data) {
          Router.push('/signin');
        } else {
          console.log(data);
        }
      });
  };
  handleRegisterGithub = () => {
    fetch('http://localhost:3000/auth/github');
  };
  render() {
    const { email, password, name, city, cohort } = this.state;
    return (
      <div>
        <Form
          onSubmit={e => {
            e.preventDefault();
            this.handleRegisterSubmit();
          }}
        >
          <fieldset>
            <label>
              <input
                name="name"
                type="name"
                placeholder="name"
                value={name}
                onChange={this.handleChange}
              />
            </label>
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
            <label>
              <input
                name="city"
                text="text"
                placeholder="city"
                value={city}
                onChange={this.handleChange}
              />
            </label>
            <label>
              <input
                name="cohort"
                type="text"
                placeholder="cohort"
                value={cohort}
                onChange={this.handleChange}
              />
            </label>
            <button type="submit">Register</button>
          </fieldset>
        </Form>
        <button onClick={this.handleRegisterGithub}>
          <GithubButton />
        </button>
      </div>
    );
  }
}

export default Register;
