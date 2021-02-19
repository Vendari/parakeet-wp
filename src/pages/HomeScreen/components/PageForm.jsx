import React, {useState} from 'react';
import { StyleSheet, TouchableOpacity, Text, TextInput, View } from 'react-native';
import { secondary } from '../../../config/colors';
import PropTypes from 'prop-types';

export default function PageForm({onSubmit}) {
  const [name, setName] = useState('Your custom name of the page');
  const [url, setUrl] = useState('Url of the page');
  // TODO: Add some inputs for these variables
  const [favourite] = useState(false);
  const [notifications] = useState(false);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={text => setName(text)}
        value={name}
      />
      <TextInput
        style={styles.input}
        onChangeText={text => setUrl(text)}
        value={url}
      />
      <TouchableOpacity
        onPress={() => onSubmit({name, url, favourite, notifications})}
        style={styles.button}
      >
        <Text>Add your page</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: secondary,
    margin: 10,
    padding: 10
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
    width: '100%'
  },
  input: { borderColor: secondary, borderWidth: 1, height: 40, margin: 10 },
});

PageForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

