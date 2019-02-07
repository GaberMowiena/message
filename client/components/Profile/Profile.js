import React, { Component } from 'react';
import styled from 'styled-components';
import Card from '../Card/Card';

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
    return (
      <ProfileStyle>
        <Card
          text={`Event name: ${name}`}
          text1={`Location: ${location}`}
          text2={`Status: ${status}`}
          text3={`YES rsvp: ${rsvp}`}
          backtext="Click to RSVP"
        />
        <Card
          text="Problem of the day"
          text1="Find the max number of ways to make 5 given an array of [1,2,5]"
          backtext="Link to problem statement"
          backtext1="https://leetcode.com/problems/coin-change-2/description/"
        />
        <Card
          text="Philip's coding meme of the week"
          backtext="None available"
        />
        <Card
          text="View Codesmith Application"
          text1="Number of JSHP visits: 15"
          backtext="Interview scheduled: Feb 29, 2019"
        />
      </ProfileStyle>
    );
  }
}

export default Profile;
