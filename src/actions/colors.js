import { SET_BACKGROUND_COLOR, SET_TEXT_COLOR } from './types';

export const setBackgroundColor = (hex) => dispatch => {
  dispatch({type: SET_BACKGROUND_COLOR, payload: hex});
};

export const setTextColor = (hex) => dispatch => {
  dispatch({type: SET_TEXT_COLOR, payload: hex});
};
