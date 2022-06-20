import { USER_EMAIL } from '../actions';

const INITIAL_STATE = {
  email: 'email-da-pessoa',
};

const reducerInicial = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_EMAIL:
    return {
      ...state,
      email: action.payload.emailString,
    };
  default:
    return state;
  }
};

export default reducerInicial;
