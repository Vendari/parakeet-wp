import { NOTIFICATION } from '../actions/types';

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
  case NOTIFICATION:
    return {message: action.payload?.message, link: action.payload?.link};
  default:
    return state;
  }
}
