import React, { Component } from 'react';
import {Animated, StyleSheet, Dimensions, Text, View} from 'react-native';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import {TouchableOpacity} from 'react-native-gesture-handler';

import PropTypes from 'prop-types';

import { error, info } from '../config/colors';

let { height } = Dimensions.get('window');

class Notification extends Component {
  constructor(props) {
    super(props);

    this.state = {
      springAnim: new Animated.Value(-height),
      variant: false, // false for error | true for notification
      content: 'There was an error!'
    };
  }

  componentDidUpdate(prevProps) {
    if(prevProps.errors!==this.props.errors && this.props.errors?.message) {
      this.setState({
        variant: false,
        content: this.props.errors.message
      });
      this.show();
    }
    else if (prevProps.notification!==this.props.notification) {
      this.setState({
        variant: true,
        content: this.props.notification.message,
        link: this.props.notification?.link
      });
      this.show();
    }
  }
  
  show = () => {
    Animated.spring(this.state.springAnim, {toValue: 100, useNativeDriver: false}).start();
  };

  hide = () => {
    Animated.spring(this.state.springAnim, {toValue: -height, useNativeDriver: false}).start();
  };

  render() {
    const {variant, content} = this.state;
    return (
      <Animated.View
        style={[
          styles.container,
          {bottom: this.state.springAnim,
            backgroundColor: variant ? info : error}
        ]}
      >
        <TouchableOpacity style={styles.button}
          onPress={() => {this.hide();}}>
          <Ionicons color="black" size={40} name="close-circle"/>
        </TouchableOpacity>
        <View style={styles.content}>
          <Text style={styles.text}>
            {content}
          </Text>
        </View>
      </Animated.View>
    );
  }
}

Notification.propTypes = {
  errors: PropTypes.object,
  notification: PropTypes.object
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: 20,
    height: 80,
    justifyContent: 'center',
    margin: 15,
    width: 80,

  },
  container: {
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 3,
    elevation: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: -height/2,
    zIndex: 10,
    width: '90%',
    left:'5%',
  },
  content: {
    flex: 1,
    padding: 15,
  },
  text: {
    fontSize: 17,
  }
});

const mapStateToProps = state => ({
  errors: state.errors,
  notification: state.notification
});

export default connect(
  mapStateToProps, {}
)(Notification);
