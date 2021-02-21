import React, {useState} from 'react';
import { StyleSheet, TouchableOpacity, Text, TextInput, View } from 'react-native';
import { secondary, white } from '../../../config/colors';
import PropTypes from 'prop-types';

export default function PageForm({onSubmit}) {
  const [name, setName] = useState('Give this page a name');
  const [url, setUrl] = useState('Enter the URL');
  // TODO: Add some inputs for these variables
  const [favourite] = useState(false);
  const [notifications] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Give this website a custom name:</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setName(text)}
        value={name}
      />

      <Text style={styles.label}>Enter the URL of the website:</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setUrl(text)}
        value={url}
      />
      <TouchableOpacity
        onPress={() => onSubmit({name, url, favourite, notifications})}
        style={styles.button}
      >
        <Text style={styles.text}>Add your page</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: secondary,
    borderRadius: 50,
    justifyContent: 'center',
    marginHorizontal: 10,
    marginTop: 15,
    padding: 15,
    width: '50%'
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
    width: '100%'
  },
  input: {
    borderColor: secondary,
    borderRadius: 50,
    borderWidth: 1,
    margin: 10,
    padding: 15,
    width: '85%'
  },
  label: {
    alignSelf: 'baseline',
    color: secondary,
    marginHorizontal: 40
  },
  text: {
    color: white,
  }
});

PageForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

