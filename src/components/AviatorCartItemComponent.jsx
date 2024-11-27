import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppContext} from './AppContext';
import {COLORS, FONTS} from '../helpers/colors';
import TrashIcon from '../assets/delete_icon.png';
import PlusIcon from '../assets/plus_icon.png';
import MinusIcon from '../assets/minus_icon.png';
import {aviatorAllProducts} from '../helpers/aviatorProducts';

const AviatorCartItemComponent = ({item}) => {
  const {shouldRefresh, toggleRefresh} = useContext(AppContext);
  const [carts, setCarts] = useState([]);

  const updateCart = async updatedCarts => {
    await AsyncStorage.setItem('cartList', JSON.stringify(updatedCarts));
    setCarts(updatedCarts);
    toggleRefresh(!shouldRefresh);
  };
  const increment = () => {
    const updatedCarts = carts.map(product =>
      product.name === item.name
        ? {...product, count: product.count + 1}
        : product,
    );
    updateCart(updatedCarts);
  };

  const decrement = () => {
    const updatedCarts = carts
      .map(product => {
        if (product.name === item.name) {
          const newCount = Math.max(product.count - 1, 0);
          return {...product, count: newCount};
        }
        return product;
      })
      .filter(product => product.count > 0); // Remove item if count is zero
    updateCart(updatedCarts);
  };

  const deleteItem = () => {
    const updatedCarts = carts.filter(product => product.name !== item.name);
    updateCart(updatedCarts);
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      const cartList = await AsyncStorage.getItem('cartList');
      setCarts(cartList ? JSON.parse(cartList) : []);
    };
    fetchCartItems();
  }, [shouldRefresh]);

  const productImage = aviatorAllProducts.find(
    p => p.name === item.name,
  )?.image;

  return (
    <View style={styles.container}>
      <Image source={productImage} style={styles.image} />

      <View style={styles.details}>
        <Text style={styles.title}>{item.name}</Text>

        <View style={styles.countContainer}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() =>
              carts.find(product => product.name === item.name)?.count > 1
                ? decrement()
                : deleteItem()
            }>
            <Image source={MinusIcon} style={styles.icon} />
          </TouchableOpacity>

          <Text style={styles.count}>
            {carts.find(product => product.name === item.name)?.count || 0}
          </Text>

          <TouchableOpacity style={styles.actionButton} onPress={increment}>
            <Image source={PlusIcon} style={styles.icon} />
          </TouchableOpacity>
        </View>

        <Text style={styles.currencyText}>{`${item.price} $`}</Text>

        <TouchableOpacity style={styles.deleteButton} onPress={deleteItem}>
          <Image source={TrashIcon} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  image: {
    width: Dimensions.get('window').width * 0.3,
    height: 100,
    resizeMode: 'contain',
  },
  details: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 15,
    fontFamily: FONTS.black,
    color: COLORS.black,
    width: '70%',
  },
  currencyText: {
    fontSize: 20,
    fontFamily: FONTS.medium,
    color: COLORS.main,
    marginTop: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  countContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '40%',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  count: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    marginHorizontal: 10,
  },
  actionButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButton: {
    marginLeft: 10,
    position: 'absolute',
    right: 10,
    top: 10,
  },
  icon: {
    width: 20,
    height: 20,
  },
});

export default AviatorCartItemComponent;
