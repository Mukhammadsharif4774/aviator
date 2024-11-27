import React from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {width} from '../helpers/colors';
import Burger from '../assets/burger.png';
import Cart from '../assets/cart.png';
import {useNavigation} from '@react-navigation/native';
export default function () {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Image source={Burger} style={styles.image} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('AviatorCartScreen')}>
        <Image source={Cart} style={styles.image} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 25,
  },
  image: {
    width: 30,
    height: 30,
    objectFit: 'contain',
  },
});
