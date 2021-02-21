import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { getHosts, addHost, removeHost, checkHost, setHost } from '../../actions/hosts';
import PagesList from './components/PagesList';
import PageForm from './components/PageForm';
import { withRouter } from 'react-router-native';

import PropTypes from 'prop-types';

import { white } from '../../config/colors';

function HomeScreen({history}) {
  const [pageToAdd, setPageToAdd] = useState({name: '', url: '', favourite: false, notifications: false});

  const dispatch = useDispatch();

  const hosts = useSelector(state =>
    state.hosts?.hosts);
  const hostOk = useSelector(state =>
    state.hosts?.hostOk);

  useEffect(() => {
    dispatch(getHosts());
    if(hostOk?.status)
      dispatch(addHost(pageToAdd));
  }, [getHosts, hostOk]);

  return (
    <View style={styles.container}>
      <PageForm onSubmit={(page) => {
        dispatch(checkHost(page.url));
        setPageToAdd(page);
      }}/>
      <PagesList
        hosts={hosts} 
        onDelete={(id) => dispatch(removeHost(id))}
        onSelect={(id) => {
          dispatch(setHost(id));
          history.push('/categories');
        }}
      />
    </View>      
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    backgroundColor: white,
    flex: 1,
    justifyContent: 'flex-start',
    marginTop: Platform.OS === 'ios' ? 95 : 100,
    width: '100%',
  },
});


HomeScreen.propTypes = {
  history: PropTypes.object.isRequired
};

export default withRouter(HomeScreen);
