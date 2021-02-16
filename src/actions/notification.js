import { NOTIFICATION } from './types';

export const pushNotification = ({message, link}) => dispatch => {
  if(message)
    dispatch({ type: NOTIFICATION, payload: {message, link} });
};
