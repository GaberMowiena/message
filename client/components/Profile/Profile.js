import React, { Component } from "react";
import styled from "styled-components";
import Card from "../Card/Card";

const ProfileStyle = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 60px;
  width: 100%;
  height: calc(100% - 50px);
`;

class Profile extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    name: null,
    location: null,
    status: null,
    rsvp: null
  };
  async componentDidMount() {
    try {
      const data = await fetch(`http://localhost:3000/profile/meetup`);
      const result = await data.json();
      console.log(result);
      const { name, location, status, rsvp } = result;
      this.setState({ name, location, status, rsvp });
    } catch (err) {
      console.log(err);
    }
  }
  render() {
    const { name, location, status, rsvp } = this.state;
    return <section>HI THERE</section>;
  }
}

export default Profile;
