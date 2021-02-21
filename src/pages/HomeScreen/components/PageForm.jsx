import React, {useState} from 'react';
import { StyleSheet, TouchableOpacity, Text, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { secondary, white } from '../../../config/colors';
import PropTypes from 'prop-types';

export default function PageForm({onSubmit}) {
  const [name, setName] = useState();
  const [url, setUrl] = useState();
  // TODO: Add some inputs for these variables
  const [favourite] = useState(false);
  const [notifications] = useState(false);

  return (
    <KeyboardAvoidingView style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Text style={styles.label}>Give this website a custom name:</Text>
        
      <TextInput
        style={styles.input}
        onChangeText={text => setName(text)}
        value={name}
        placeholder={'Enter name of website'}
        autoCompleteType={'off'}
      />

      <Text style={styles.label}>Enter the URL of the website:</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setUrl(text)}
        value={url}
        placeholder={'Enter URL'}
        autoCompleteType={'off'}
        autoCorrect={false}
        keyboardType={'url'}
      />
      <TouchableOpacity
        onPress={() => onSubmit({name, url, favourite, notifications})}
        style={styles.button}
      >
        <Text style={styles.text}>Add your page</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
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
    backgroundColor: white,
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    elevation: 5,
    padding: 10,
    paddingVertical: 40,
    paddingBottom: 90,
    shadowOffset: { width: 3, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 15,  
    width: '100%'
  },
  input: {
    borderColor: secondary,
    borderRadius: 50,
    borderWidth: 2,
    margin: 5,
    marginBottom: 30,
    paddingHorizontal: 25,
    paddingVertical: 15,
    width: '85%'
  },
  label: {
    alignSelf: 'baseline',
    color: secondary,
    fontWeight: 'bold',
    marginHorizontal: 40,
    margin: 0
  },
  text: {
    color: white,
  }
});

PageForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

