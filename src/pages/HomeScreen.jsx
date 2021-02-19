import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
// import PropTypes from 'prop-types';

import { primary, third } from '../config/colors';

export default class HomeScreen extends Component {
  render() {
    // const [expanded, setExpanded] = useState(false);
    // hooks don't work inside classes :(
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Parakeet 🦜 </Text>
        <Text style={styles.text}>For all of your favourite Wordpress websites.</Text>
        {/* <TouchableOpacity
          onPress={() => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
            setExpanded(!expanded);
          }}>
          <Text>Add new site</Text>
        </TouchableOpacity>
        {expanded && (
          <View style={styles.tile}>
            <Text>I disappear sometimes!</Text>
          </View>
        )} */}

      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: primary,
    flex: 1,
    overflow: 'hidden',
    paddingTop: 30

  },
  text: {
    fontSize: 16,
  },
  title: {
    color: third,
    fontSize: 32,
    paddingTop: 15,
    textAlign: 'center'
  }
});
