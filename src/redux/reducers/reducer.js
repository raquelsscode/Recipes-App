import { INGREDIENT_NAME } from '../actions';

const INITIAL_STATE = {
  ingredientName: '',
};

const reducerInicial = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case INGREDIENT_NAME:
    return {
      ...state,
      ingredientName: action.payload.choosed,
    };
  default:
    return state;
  }
};

export default reducerInicial;
