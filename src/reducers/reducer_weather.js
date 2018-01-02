import { FETCH_WEATHER } from '../actions/index';

export default function(state = [], action) {
  switch(action.type) {
    case FETCH_WEATHER:
      // New instance of state must be returned to preserve immutability
      return [action.payload.data, ...state];
    break;
  }


  return state;
}