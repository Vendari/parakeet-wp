import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import store from './store';

// layout components
import Notification from './src/components/Notification';

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
      </View>
      <Notification />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
