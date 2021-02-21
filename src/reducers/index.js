import { combineReducers } from 'redux';
import errors from './errors';
import hosts from './hosts';
import notification from './notification';
import articles from './articles';
import colors from './colors';

export default combineReducers({
  errors,
  hosts,
  articles,
  notification,
  colors
});
