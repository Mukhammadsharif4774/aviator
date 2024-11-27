import React from 'react';
import {
  ImageBackground,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {COLORS, FONTS, height, width} from '../helpers/colors';
import AviatorHeader from '../components/AviatorHeader';
import Logo from '../assets/logo.png';
import EventImage from '../assets/event_image.png';
import FirstEvent from '../assets/event_1.png';
import SecondEvent from '../assets/event_2.png';
import ThirdEvent from '../assets/event_3.png';
import FourthEvent from '../assets/event_4.png';
import {useNavigation} from '@react-navigation/native';

export default function () {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.container}>
        <AviatorHeader />

        <View style={styles.logoContainer}>
          <Image source={Logo} style={styles.logo} />
        </View>

        <Text style={styles.title}>События ресторана</Text>

        <Image source={EventImage} style={styles.image} />

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate('DrawerNavigator', {
              screen: 'AviatorEventDetailScreen',
              params: {image: FirstEvent},
            })
          }>
          <Text style={styles.name}>Фестиваль Леденцов </Text>
          <Text style={styles.time}>17 февраля в 18:00</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate('DrawerNavigator', {
              screen: 'AviatorEventDetailScreen',
              params: {image: SecondEvent},
            })
          }>
          <Text style={styles.name}>День Шоколада </Text>
          <Text style={styles.time}>20 февраля в 15:00</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate('DrawerNavigator', {
              screen: 'AviatorEventDetailScreen',
              params: {image: ThirdEvent},
            })
          }>
          <Text style={styles.name}>Вечер Евро-футбола</Text>
          <Text style={styles.time}>1 февраля в 16:00</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate('DrawerNavigator', {
              screen: 'AviatorEventDetailScreen',
              params: {image: FourthEvent},
            })
          }>
          <Text style={styles.name}>Гольф-турниры </Text>
          <Text style={styles.time}>5 февраля в 18:00</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height,
    width: width,
    backgroundColor: COLORS.main,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: width * 0.8,
    height: 60,
    resizeMode: 'contain',
  },
  title: {
    textAlign: 'center',
    fontFamily: FONTS.light,
    color: COLORS.white,
    fontSize: 20,
    marginTop: 10,
    paddingVertical: 30,
  },
  image: {
    width: '100%',
    height: height * 0.5,
    objectFit: 'contain',
  },
  button: {
    width: width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'space-between',
    paddingHorizontal: 20,
    marginTop: 15,
  },
  name: {
    fontSize: 18,
    fontFamily: FONTS.black,
    color: COLORS.white,
  },
  time: {
    fontSize: 18,
    fontFamily: FONTS.regular,
    color: COLORS.white,
  },
});
