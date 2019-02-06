import Link from 'next/link';
import React, { Component } from 'react';
import Particles from 'react-particles-js';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Router from 'next/router';

import { getUsers } from '../store/actions/usersActions';
import NavStyles from '../components/Nav/styles/NavStyles';

const particlesOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
};

const TitleWrapper = styled.span`
  text-transform: uppercase;
  font-weight: 900;
  font-size: 1em;
  background: none;
  border: 0;
`;

const IndexWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const ParticleWrapper = styled.div`
  height: 200px;
`;
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      calendarData: []
    };
  }
  static async getInitialProps({ store }) {
    const { users } = await store.dispatch(getUsers());
    return { users };
  }

  componentDidMount() {
    const token = window.sessionStorage.getItem('token');
    if (token) {
      fetch('http://localhost:3000/users/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        }
      })
        .then(data => data.json())
        .then(user => {
          if (user) {
            Router.push('/profile');
          }
        });
    }
  }
  render() {
    return (
      <IndexWrapper>
        <ParticleWrapper>
          <Particles params={particlesOptions} />
        </ParticleWrapper>
        <TitleWrapper>Peer Me</TitleWrapper>
        <NavStyles>
          <Link href="/register">
            <a>Register</a>
          </Link>
          <Link href="/signin">
            <a>Sign In</a>
          </Link>
        </NavStyles>
      </IndexWrapper>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users
});

export default connect(mapStateToProps)(Home);
