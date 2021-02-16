import React, { Component } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import { pushNotification } from '../../actions/notification';
import PropTypes from 'prop-types';

class Homepage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
      error: false
    };
  }

  render() {
    return (
      <View>
        <TextInput
          style={styles.input}
          onChangeText={text => this.setState({message: text})}
          value={this.state.message}
        />
        <TouchableOpacity 
          onPress={
            () => {
              this.props.pushNotification({message: this.state.message});
            }
          }
        >
          <Text>Send notification</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

Homepage.propTypes = {
  pushNotification: PropTypes.func.isRequired,
};


const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    height: 40 ,
    width: 100
  }
});

export default connect(
  null, {pushNotification}
)(Homepage);
