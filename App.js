import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import store from './store';
import { NativeRouter, Route, BackButton } from 'react-router-native';

// pages
import Article from './src/pages/Article/Article';

// layout components
import Notification from './src/components/Notification';
import HomeScreen from './src/pages/HomeScreen/HomeScreen';


export default function App() {
  return (
    <Provider store={store}>
      <NativeRouter>
        <View style={styles.container}>
          <BackButton>
            <Route path="/" component={HomeScreen} />
            <Route path="/article/:id" component={Article} />
          </BackButton>
        </View>
        <Notification />
      </NativeRouter>
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
