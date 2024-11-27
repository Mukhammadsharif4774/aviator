import React from 'react';
import {
  ImageBackground,
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {COLORS, FONTS, height, width} from '../helpers/colors';
import QRCode from 'react-native-qrcode-svg';
import {useNavigation} from '@react-navigation/native';
import AviatorHeader from '../components/AviatorHeader';
import AviatorButtonComponent from '../components/AviatorButtonComponent';

export default function () {
  const navigation = useNavigation();

  const handleNavigateHome = () => {
    navigation.navigate('DrawerNavigator', {screen: 'AviatorHomeScreen'});
  };

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.container}>
        <AviatorHeader />

        <Text style={styles.title}>
          <Text style={{fontSize: 50}}>Спасибо!</Text>
          {'\n'}за заказ!
        </Text>

        <View style={styles.qrContainer}>
          <QRCode
            value="https://www.tripadvisor.co.uk/Attraction_Review-g2305759-d5900557-Reviews-The_Aviator_Sports_Bar-Santiago_de_la_Ribera.html"
            size={Dimensions.get('window').width / 2.5}
            color={COLORS.main}
          />
        </View>

        <AviatorButtonComponent
          text="Главная"
          style={styles.button}
          onPress={handleNavigateHome}
          buttonStyle={{backgroundColor: COLORS.white}}
          textStyle={{color: COLORS.main}}
        />
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
  title: {
    textAlign: 'center',
    fontFamily: FONTS.black,
    color: COLORS.white,
    fontSize: 36,
    marginTop: Dimensions.get('window').height * 0.1,
    paddingVertical: 30,
  },
  qrContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  button: {
    position: 'absolute',
    bottom: 50,
  },
});
