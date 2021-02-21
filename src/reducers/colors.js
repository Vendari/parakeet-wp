import { SET_BACKGROUND_COLOR, SET_TEXT_COLOR }  from '../actions/types';

const initialState = {
  backgroundColor: '#fff',
  textColor: '#000'
};

export default function (state = initialState, action) {
  switch (action.type) {
  case SET_BACKGROUND_COLOR:
    return {...state, backgroundColor: action.payload};
  case SET_TEXT_COLOR:
    return {...state, textColor: action.payload};
  default:
    return state;
  }
}
