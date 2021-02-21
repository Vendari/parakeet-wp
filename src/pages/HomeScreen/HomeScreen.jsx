import React, { useEffect, useState } from 'react';
import { StyleSheet, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { getHosts, addHost, removeHost, checkHost, setHost } from '../../actions/hosts';
import PagesList from './components/PagesList';
import PageForm from './components/PageForm';
import PageHeader from './components/PageHeader';
import { withRouter } from 'react-router-native';
import HideWithKeyboard from 'react-native-hide-with-keyboard';

import PropTypes from 'prop-types';

import { secondary } from '../../config/colors';
import { ScrollView } from 'react-native-gesture-handler';

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
    <ScrollView contentContainerStyle={styles.containerLayout} style={styles.container}>
      <PageHeader />
      <PageForm onSubmit={(page) => {
        dispatch(checkHost(page.url));
        setPageToAdd(page);
      }}
      namePlaceholder={'Enter name of website'}
      urlPlaceholder={'Enter'}
      />
      <HideWithKeyboard>
        <PagesList
          hosts={hosts}
          onDelete={(id) => dispatch(removeHost(id))}
          onSelect={(id) => {
            dispatch(setHost(id));
            history.push('/categories');
          }}
        />
      </HideWithKeyboard>

    </ScrollView>  
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: secondary,
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 80 : 80,
    width: '100%'
  },
  containerLayout: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  }
});


HomeScreen.propTypes = {
  history: PropTypes.object.isRequired
};

export default withRouter(HomeScreen);
