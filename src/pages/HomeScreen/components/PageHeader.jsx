import React from 'react';
import { StyleSheet, Text, Image, View } from 'react-native';
import { primary, secondary, white } from '../../../config/colors';
import { LinearGradient } from 'expo-linear-gradient';

const PageHeader = () => (
  <LinearGradient colors={[secondary, primary, secondary]} style={styles.container}>
    <View style={styles.left}>
      <Text style={styles.text}>for all your favourite WordPress websites.</Text>
    </View>
    <Image style={styles.img} source={{uri: 'https://pngimg.com/uploads/parrot/parrot_PNG96586.png'}}/>
  </LinearGradient>
);

export default PageHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: secondary,
    height: 270,
    padding: 20,
    position: 'relative',
    width: '100%'
  },
  img: {
    height: 200,
    position: 'absolute',
    resizeMode: 'contain',
    right: -30,
    top: 20,
    width: 200,
  },
  text: {
    color: white,
    fontSize: 36,
    fontWeight: 'bold',
    letterSpacing: 1.2,
    maxWidth: '75%',
    paddingHorizontal: 15,
    paddingVertical: 25
  }
});
