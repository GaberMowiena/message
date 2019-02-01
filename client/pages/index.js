import Link from 'next/link';
import React, { Component } from 'react';
import fetch from 'isomorphic-unfetch';
// import axios from 'axios';
//  fetch('localhost:3000');

class Home extends Component {
  // static async getInitialProps() {
  //   const res = await fetch('http://localhost:3000');
  //   const images = await res.json();
  //   return { images };
  // }
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      calendarData: []
    };
  }

  async componentDidMount() {
    const users = await fetch('http://localhost:3000').then(data =>
      data.json()
    );
    const calendarData = await fetch(
      'http://slack-server.elasticbeanstalk.com/calendar/NY/9'
    ).then(calendars => calendars.json());

    this.setState({ users, calendarData });
  }
  render() {
    const { users } = this.state;
    const userList = users.map(user => {
      return (
        <div>
          <div>{user.name}</div>
          <div>{user.email}</div>
          <div>{user.password}</div>
          <div>{user.city}</div>
          <div>{user.cohort}</div>
        </div>
      );
    });
    return (
      <div>
        <Link href="/page2">
          <a>YO</a>
        </Link>

        <div>{userList}</div>
      </div>
    );
  }
}
// export const Bath = () => <div>HI</div>;

// import {Home, Bath} from './index'
///////////

export default Home;

// import Wrapper from './index'
