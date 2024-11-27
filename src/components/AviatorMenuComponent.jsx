import React, {useContext, useEffect, useState, useCallback} from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppContext} from './AppContext';
import {COLORS, FONTS} from '../helpers/colors';

export default function ({item}) {
  const {shouldRefresh, toggleRefresh} = useContext(AppContext);
  const [added, setAdded] = useState(false);

  const updateCart = useCallback(async () => {
    const cartList = await AsyncStorage.getItem('cartList');
    const cartArray = cartList ? JSON.parse(cartList) : [];
    const isProductInCart = cartArray.some(cart => cart.name === item.name);
    setAdded(isProductInCart);
  }, [item.name]);

  const handleCartUpdate = async action => {
    const cartList = await AsyncStorage.getItem('cartList');
    let cartArray = cartList ? JSON.parse(cartList) : [];

    if (action === 'add') {
      if (!cartArray.some(cart => cart.name === item.name)) {
        cartArray.push({...item, count: 1});
      }
    } else if (action === 'remove') {
      cartArray = cartArray.filter(cart => cart.name !== item.name);
    }

    await AsyncStorage.setItem('cartList', JSON.stringify(cartArray));
    toggleRefresh(prev => !prev);
  };

  const toggleCart = () => {
    added ? handleCartUpdate('remove') : handleCartUpdate('add');
  };

  useEffect(() => {
    updateCart();
  }, [updateCart, shouldRefresh]);

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <Text style={styles.title}>{item?.name}</Text>
          <Text style={styles.description}>{item?.description}</Text>

          <View style={styles.row}>
            <Text style={styles.price}>{item?.price} $</Text>

            <TouchableOpacity
              style={styles.statusContainer}
              onPress={toggleCart}>
              <Text style={styles.status}>
                {added ? 'ДОБАВЛЕНО' : 'КУПИТЬ'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Image source={item?.image} style={styles.image} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    width: '95%',
    alignSelf: 'center',
    height: 150,
    marginTop: 20,
    borderRadius: 25,
    elevation: 5,
    backgroundColor: COLORS.white,
  },
  container: {
    width: '100%',
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    width: '30%',
    height: 130,
    objectFit: 'contain',
    borderRadius: 25,
    elevation: 5,
    backgroundColor: COLORS.white,
  },
  leftContainer: {
    width: '65%',
    marginLeft: 10,
  },
  title: {
    fontSize: 15,
    fontFamily: FONTS.medium,
    color: '#393939',
  },
  description: {
    fontSize: 12,
    fontFamily: FONTS.thin,
    color: '#393939',
  },
  row: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  statusContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.main,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 25,
    marginLeft: 20,
  },
  status: {
    color: COLORS.white,
    fontFamily: FONTS.bold,
  },
  priceContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 2,
  },
  price: {
    fontSize: 16,
    fontFamily: FONTS.bold,
    color: COLORS.main,
  },
});
