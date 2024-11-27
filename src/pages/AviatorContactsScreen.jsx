import React from 'react';
import {View, StyleSheet, Text, TextInput, Image} from 'react-native';
import {COLORS, FONTS, height, width} from '../helpers/colors';
import {useNavigation} from '@react-navigation/native';
import AviatorHeader from '../components/AviatorHeader';
import AviatorButtonComponent from '../components/AviatorButtonComponent';
import Logo from '../assets/logo.png';

export default function () {
  const navigation = useNavigation();

  const handleNavigateHome = () => {
    navigation.navigate('DrawerNavigator', {screen: 'AviatorHomeScreen'});
  };

  const renderTextInput = placeholder => (
    <View style={styles.textInputContainer}>
      <Text style={styles.placeholder}>{placeholder}</Text>
      <TextInput
        style={styles.textInput}
        placeholderTextColor={COLORS.white}
        editable={false}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <AviatorHeader />

      <View style={styles.logoContainer}>
        <Image source={Logo} style={styles.logo} />
      </View>

      <Text style={styles.title}>Контакты</Text>

      <View style={styles.main}>
        {renderTextInput('Номер')}
        {renderTextInput('Адрес')}
        {renderTextInput('Данные')}
        {renderTextInput('Индекс')}
      </View>

      <AviatorButtonComponent
        text="Главная"
        style={styles.button}
        onPress={handleNavigateHome}
        buttonStyle={{backgroundColor: COLORS.white}}
        textStyle={{color: COLORS.main}}
      />
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
  flex: {flex: 1},
  title: {
    fontSize: 25,
    fontFamily: FONTS.black,
    color: COLORS.main,
    paddingTop: 30,
    textAlign: 'center',
  },
  main: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 40,
  },
  textInputContainer: {
    width: '95%',
  },
  textInput: {
    height: 45,
    width: '100%',
    marginVertical: 10,
    fontSize: 12,
    fontFamily: FONTS.light,
    borderWidth: 1,
    borderColor: COLORS.white,
    borderRadius: 25,
    textAlign: 'center',
    color: COLORS.white,
  },
  button: {
    position: 'absolute',
    bottom: 50,
  },
  placeholder: {
    marginLeft: 10,
    color: COLORS.white,
    fontFamily: FONTS.light,
  },
});
