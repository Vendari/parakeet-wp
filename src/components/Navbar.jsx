import React from 'react';
import {StyleSheet, View, Text, Image, Dimensions, Platform} from 'react-native';
import { withRouter } from 'react-router-native';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { secondary, white } from '../config/colors';

let { width } = Dimensions.get('window');

export default withRouter(({location, history}) => 
  <View style={styles.container} >
    {(location.pathname!=='/' && Platform.OS === 'ios') && 
          <TouchableOpacity onPress={() => history.goBack()}>
            <Ionicons style={styles.title} name="arrow-back-circle" size={25} color="black" />
          </TouchableOpacity>}
    <Text style={styles.title}>Parakeet</Text>
    <Image />
    <TouchableOpacity onPress={() => { if (location.pathname!=='/settings') history.push('/settings');}}>
      <Ionicons style={styles.title} name="color-palette-outline" size={25} color="black" />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: secondary,
    elevation: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    left: 0,
    paddingTop: Platform.OS === 'ios' ? 40 : 20,
    padding: Platform.OS === 'ios' ? 10 : 0,
    position: 'absolute',
    top: 0,
    width,
    zIndex: 1,
  },
  title: {
    color: white,
    fontSize: 30,
    fontWeight: 'bold',
  }
});
