import React from 'react';
import {ImageBackground, StyleSheet} from 'react-native';
import AviatorHeader from '../components/AviatorHeader';
import {height, width} from '../helpers/colors';

export default function ({route}) {
  const {image} = route.params;

  return (
    <ImageBackground style={styles.container} source={image}>
      <AviatorHeader />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
  },
});
