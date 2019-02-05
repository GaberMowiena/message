import actions from './constants';
import fetch from 'isomorphic-unfetch';

export const getUsers = () => async dispatch => {
  // const data = await fetch('http://localhost:3000/');
  const data = await fetch(
    'http://slack-server.elasticbeanstalk.com/calendar/NY/9'
  );
  const users = await data.json();
  return dispatch({ type: actions.GET_USERS, users: users });
};
