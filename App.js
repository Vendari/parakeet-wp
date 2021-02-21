import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import store from './store';
import { NativeRouter, Route, BackButton } from 'react-router-native';

// pages
import Article from './src/pages/Article/Article';
import HomeScreen from './src/pages/HomeScreen/HomeScreen';
import CategoriesScreen from './src/pages/CategoriesScreen/CategoriesScreen';
import ArticlesList from './src/pages/ArticlesList/ArticlesList';
import SettingsScreen from './src/pages/SettingsScreen/SettingsScreen';

// layout components
import Notification from './src/components/Notification';
import Navbar from './src/components/Navbar';

export default function App() {
  return (
    <Provider store={store}>
      <NativeRouter>
        <View style={styles.container}>
          <Navbar/>
          <BackButton>
            <Route exact path="/" component={HomeScreen} />
            <Route path="/article/:id" component={Article} />
            <Route path="/categories" component={CategoriesScreen} />
            <Route path='/articles-list/:category' component={ArticlesList} />
            <Route path='/settings' component={SettingsScreen} />
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
