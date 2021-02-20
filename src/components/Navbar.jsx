import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Dimensions, Platform} from 'react-native';
import { withRouter } from 'react-router-native';
import { Ionicons } from '@expo/vector-icons';

import {primary, secondary} from '../config/colors';

let { width } = Dimensions.get('window');


export default withRouter(({location, history}) => 
  <View style={styles.container} >
    {location.pathname!=='/' && 
          <TouchableOpacity onPress={() => history.goBack()}>
            <Ionicons style={styles.title} name="arrow-back-circle" size={30} color="black" />
          </TouchableOpacity>}
    <Text style={styles.title}>Parakeet 🦜</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: secondary,
    elevation: 1,
    flexDirection: 'row',
    height: 80,
    justifyContent: 'space-around',
    left: 0,
    paddingTop: Platform.OS === 'ios' ? 15 : 20,
    padding: 10,
    position: 'absolute',
    top: 0,
    width,
    zIndex: 6,
  },
  title: {
    color: primary,
    fontSize: 25,
    fontWeight: 'bold',
    padding: 15,
    textAlign: 'center'
  },
});
