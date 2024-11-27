import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';
import {COLORS, FONTS, height, width} from '../helpers/colors';
import {useNavigation} from '@react-navigation/native';
import AviatorHeader from '../components/AviatorHeader';
import AviatorButtonComponent from '../components/AviatorButtonComponent';
import Logo from '../assets/logo.png';

const InputField = ({placeholder, value, onChangeText}) => (
  <TextInput
    style={styles.textInput}
    placeholderTextColor={COLORS.white}
    placeholder={placeholder}
    value={value}
    onChangeText={onChangeText}
  />
);

export default function () {
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    table: '',
    time: '',
    date: '',
  });

  const handleInputChange = (field, value) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleReservation = () => {
    // Additional validation and logic can be added here
    navigation.navigate('DrawerNavigator', {
      screen: 'AviatorReserveSuccessScreen',
    });
  };

  return (
    <View style={styles.container}>
      <AviatorHeader />

      <View style={styles.logoContainer}>
        <Image source={Logo} style={styles.logo} />
      </View>

      <Text style={styles.title}>Зарезервировать столик</Text>

      <ScrollView style={styles.flex} contentContainerStyle={styles.main}>
        <InputField
          placeholder={'Имя'}
          value={formData.name}
          onChangeText={text => handleInputChange('name', text)}
        />

        <InputField
          placeholder={'Номер телефона'}
          value={formData.phone}
          onChangeText={text => handleInputChange('phone', text)}
        />

        <InputField
          placeholder={'Столик'}
          value={formData.table}
          onChangeText={text => handleInputChange('table', text)}
        />

        <InputField
          placeholder={'Время'}
          value={formData.time}
          onChangeText={text => handleInputChange('time', text)}
        />

        <InputField
          placeholder={'Дата'}
          value={formData.date}
          onChangeText={text => handleInputChange('date', text)}
        />
      </ScrollView>

      <AviatorButtonComponent
        text={'Зарезервировать'}
        style={styles.button}
        onPress={handleReservation}
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
  flex: {flex: 1},
  title: {
    fontSize: 18,
    fontFamily: FONTS.light,
    color: COLORS.white,
    padding: 30,
    textAlign: 'center',
  },
  main: {
    paddingBottom: 100,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 60,
  },
  textInput: {
    height: 45,
    width: '95%',
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
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: width * 0.8,
    height: 60,
    resizeMode: 'contain',
  },
});
