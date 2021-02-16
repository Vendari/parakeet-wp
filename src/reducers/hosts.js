import { GET_HOSTS, CHECK_HOST, SET_HOST} from '../actions/types';

const initialState = {
};

export default function (state = initialState, action) {
  switch (action.type) {
  case GET_HOSTS:
    return {hosts: action.payload};
  case CHECK_HOST:
    return {hostOk: {status: true, date: new Date()}};
  case SET_HOST: 
    return {actualHost: state.hosts.find(host => host.id===action.payload)};
  default:
    return state;
  }
}
