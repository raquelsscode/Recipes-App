import { combineReducers } from 'redux';
import reducerInicial from './reducer';

const rootReducer = combineReducers({ player: reducerInicial });

export default rootReducer;
