import { GET_HOSTS, CHECK_HOST, SET_HOST, GET_ERRORS } from './types';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuidv4 from '../utils/uuidv4';

export const getHosts = () => async dispatch => {
  try {
    const hosts_str = await AsyncStorage.getItem('hosts');
    const hosts = (hosts_str !== null) ? JSON.parse(hosts_str) : [];
    dispatch({type: GET_HOSTS, payload: hosts});
  }  
  catch {
    dispatch({type: GET_ERRORS, payload: {hosts: 'Error while reading hosts list',
      message: 'Error while reading hosts list'}});
  }
};

export const addHost = ({name, url, favourite, notifications}) => async dispatch => {
  if(!(name && url && favourite && notifications)) {
    dispatch({type: GET_ERRORS, payload: {hosts: 'Cannot add host. Check if you provided correct parameters',
      message: 'Error while reading hosts list'}});
  }
  const new_host = {
    id: uuidv4(),
    name, url, favourite, notifications};
  try { 
    const hosts_str = await AsyncStorage.getItem('hosts');
    let hosts = (hosts_str !== null) ? JSON.parse(hosts_str) : [];

    // check if host already exist
    if(hosts.find(host => host.id === new_host.id)) {
      dispatch({type: GET_ERRORS, payload: {hosts: 'Host with this url already exist',
        message: 'Error while reading hosts list'}});
    }

    hosts = [...hosts, new_host];
    const hosts_to_save_str = JSON.stringify(hosts);
    await AsyncStorage.setItem('hosts', hosts_to_save_str);
    dispatch({type: GET_HOSTS, payload: hosts});
  }
  catch {
    dispatch({type: GET_ERRORS, payload: {hosts: 'Error while saving new host',
      message: 'Error while reading hosts list'}});
  }
};

export const removeHost = (id) => async dispatch => {
  try { 
    const hosts_str = await AsyncStorage.getItem('hosts');
    let hosts = (hosts_str !== null) ? JSON.parse(hosts_str) : [];
    hosts = hosts.filter(host => host.id!==id);
    const hosts_to_save_str = JSON.stringify(hosts);
    await AsyncStorage.setItem('hosts', hosts_to_save_str);
    dispatch({type: GET_HOSTS, payload: hosts});
  }
  catch {
    dispatch({type: GET_ERRORS, payload: {hosts: 'Error while saving new host',
      message: 'Error while reading hosts list'}});
  }
};

export const checkHost = (url) => dispatch => {
  axios.get(`${url}/wp-json/wp/v2/`)
    .then(() => dispatch({type: CHECK_HOST, payload: true}))
    .catch(err => {
      if(err?.response?.data?.status===401) {
        dispatch({type: CHECK_HOST, payload: false});
      }else { 
        dispatch({type: GET_ERRORS, payload: {hosts: err?.response?.data?.message ||
       'Error while checking the host',
        message: 'Error while reading hosts list'}});
      }
    }
    );
};

export const setHost = (id) => dispatch => {
  dispatch({type: SET_HOST, payload: id});
};
