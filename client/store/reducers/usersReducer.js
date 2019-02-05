import actions from '../actions/constants';

export default (state = {}, action) => {
  switch (action.type) {
    case actions.GET_USERS:
      return { ...state, users: action.users };
    default:
      return state;
  }
};
