import React, { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { getHosts, addHost, removeHost, checkHost, setHost } from '../../actions/hosts';
import PagesList from './components/PagesList';
import PageForm from './components/PageForm';
import { ScrollView } from 'react-native-gesture-handler';
// import PropTypes from 'prop-types';

import { white, primary, secondary } from '../../config/colors';

export default function HomeScreen() {
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
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Parakeet {'\n'}🦜</Text>
      <Text style={styles.text}>For all of your favourite Wordpress websites.</Text>
      <PageForm onSubmit={(page) => {
        dispatch(checkHost(page.url));
        setPageToAdd(page);
      }}/>
      <PagesList
        hosts={hosts} 
        onDelete={(id) => dispatch(removeHost(id))}
        onSelect={(id) => dispatch(setHost(id))}
      />
    </ScrollView>      
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: white,
    width: '100%'
  },
  text: {
    fontSize: 26,
    marginBottom: 50,
    textAlign: 'center'
  },
  title: {
    backgroundColor: secondary,
    color: primary,
    fontSize: 50,
    fontWeight: 'bold',
    margin: 15,
    padding: 15,
    textAlign: 'center'
  }
});
