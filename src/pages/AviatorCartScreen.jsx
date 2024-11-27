import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Dimensions,
  ImageBackground,
  Image,
} from 'react-native';
import {COLORS, FONTS, height, width} from '../helpers/colors';
import {useNavigation} from '@react-navigation/native';
import {AppContext} from '../components/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AviatorCartItemComponent from '../components/AviatorCartItemComponent';
import AviatorButtonComponent from '../components/AviatorButtonComponent';
import CartIcon from '../assets/png.png';
import AviatorHeader from '../components/AviatorHeader';

export default function () {
  const navigation = useNavigation();
  const {shouldRefresh} = useContext(AppContext);
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      const storedCart = await AsyncStorage.getItem('cartList');
      setCart(storedCart ? JSON.parse(storedCart) : []);
    };

    fetchCart();
  }, [shouldRefresh]);

  useEffect(() => {
    if (cart.length) {
      const calculatedPrice = cart.reduce(
        (sum, item) => sum + item.price * item.count,
        0,
      );
      setTotalPrice(calculatedPrice);
    } else {
      setTotalPrice(0);
    }
  }, [cart]);

  const handleOrder = () => {
    const destinationScreen = cart.length
      ? 'AviatorCartSuccessScreen'
      : 'AviatorHomeScreen';
    navigation.navigate('DrawerNavigator', {screen: destinationScreen});
  };

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.container}>
        <AviatorHeader />

        {cart.length ? (
          <ScrollView style={styles.flex} contentContainerStyle={styles.main}>
            {cart.map((item, index) => (
              <AviatorCartItemComponent item={item} key={index} />
            ))}

            <View style={[styles.row, styles.summaryContainer]}>
              <Text style={styles.sumTitle}>Итого:</Text>
              <Text style={styles.sum}>{totalPrice} $</Text>
            </View>
          </ScrollView>
        ) : (
          <Image style={styles.empty} source={CartIcon} />
        )}

        <AviatorButtonComponent
          text={cart?.length ? 'Завершить заказ' : 'Главная'}
          style={styles.orderButton}
          buttonStyle={
            cart?.length
              ? {backgroundColor: COLORS.main}
              : {backgroundColor: COLORS.white}
          }
          textStyle={
            cart?.length ? {color: COLORS.white} : {color: COLORS.main}
          }
          onPress={handleOrder}
        />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
    backgroundColor: COLORS.main,
  },
  flex: {
    flex: 1,
  },
  main: {
    paddingBottom: 100,
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
    height: '100%',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingTop: 40,
  },
  empty: {
    marginTop: Dimensions.get('window').height * 0.2,
    width: Dimensions.get('window').width * 0.4,
    height: Dimensions.get('window').width * 0.4,
    objectFit: 'contain',
    alignSelf: 'center',
  },
  summaryContainer: {
    justifyContent: 'space-between',
    marginTop: 40,
    paddingHorizontal: 40,
    flexDirection: 'row',
    alignItems: 'center',
    width: width,
  },
  sumTitle: {
    fontSize: 24,
    fontFamily: FONTS.bold,
    color: COLORS.main,
    textAlign: 'center',
  },
  sum: {
    fontSize: 30,
    fontFamily: FONTS.bold,
    color: COLORS.main,
    textAlign: 'center',
    marginLeft: 20,
  },
  orderButton: {
    position: 'absolute',
    bottom: 50,
  },
});
