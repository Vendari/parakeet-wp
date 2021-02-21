import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ColorPicker, fromHsv } from 'react-native-color-picker';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { setBackgroundColor, setTextColor } from '../../actions/colors';

import {third} from '../../config/colors';

export default function SettingsScreen() {

  const dispatch = useDispatch();

  const backgroundColor = useSelector(state =>
    state.colors.backgroundColor);
  const textColor = useSelector(state =>
    state.colors.textColor);

  return (
    <View style={[styles.container, {backgroundColor}]}>
      <View style={styles.section}>
        <Text style={[styles.title, {color: textColor}]}>Background Color</Text>
        <ColorPicker
          onColorChange={color => dispatch(setBackgroundColor(fromHsv(color)))}
          style={styles.colorPicker}
          defaultColor={backgroundColor}
        />
      </View>
      <View style={styles.section}>
        <Text style={[styles.title, {color: textColor}]}>Text Color</Text>
        <ColorPicker
          onColorChange={color => dispatch(setTextColor(fromHsv(color)))}
          style={styles.colorPicker}
          defaultColor={textColor}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  colorPicker: {
    flex: 1,
  },
  container: {
    flex: 1,
    height: '100%',
    paddingTop: 80,
    width: '100%'
  },
  section: {
    height: '45%',
    margin: 10
  },
  title: {
    color: third,
    fontSize: 25,
    fontWeight: 'bold',
    padding: 15,
    textAlign: 'center'
  }
});


SettingsScreen.propTypes = {
  history: PropTypes.object.isRequired
};
