import React, { Component } from "react";
import Router from "next/router";
import styled from "styled-components";
// import { Github } from 'styled-icons/boxicons-logos/Github';
import Link from "next/link";

// app imports
import Form from "../Form/styles/Form";
import FormSectionHeading from "../Form/FormSectionHeading";
import FormTextInput from "../Form/FormTextInput";
import FormLabel from "../Form/FormLabel";
import FormFieldSet from "../Form/FormFieldSet";

// export const GithubButton = styled(Github)`
//   height: 1.6rem;
//   width: 1.6rem;
// `;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
class Register extends Component {
  state = {
    email: "",
    password: "",
    name: "",
    city: "",
    cohort: ""
  };
  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;
    this.setState({
      [name]: val
    });
  };
  handleRegisterSubmit = () => {
    fetch("http://localhost:3000/users/register", {
      method: "post",
      headers: { "Content-Type": "application/json" },
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
          Router.push("/signin");
        } else {
          console.log(data);
        }
      });
  };
  render() {
    const { email, password, name, city, cohort } = this.state;
    return (
      <div id="form">
        <Form
          onSubmit={e => {
            e.preventDefault();
            this.handleRegisterSubmit();
          }}
        >
          <FormSectionHeading>register</FormSectionHeading>
          <FormFieldSet>
            <FormLabel htmlFor="name">Name</FormLabel>
            <br />
            <FormTextInput
              id="name"
              name="name"
              type="name"
              placeholder="name"
              onChange={this.handleChange}
              value={name}
            />
            <br />

            <FormLabel htmlFor="email">Email</FormLabel>
            <br />
            <FormTextInput
              id="email"
              name="email"
              type="email"
              placeholder="email"
              onChange={this.handleChange}
              value={email}
            />
            <br />

            <FormLabel htmlFor="password">Password</FormLabel>
            <br />
            <FormTextInput
              id="password"
              type="password"
              name="password"
              placeholder="password"
              onChange={this.handleChange}
              value={password}
            />
            <br />
            <br />
            <button>Register</button>
          </FormFieldSet>
        </Form>

        <Link href="https://github.com/login/oauth/authorize?client_id=e0ce55a5891b2f5d27d0">
          <a>Register with Github</a>
        </Link>
      </div>
    );
  }
}

export default Register;
