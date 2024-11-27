import React from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {COLORS, FONTS} from './helpers/colors';
import CloseIcon from './assets/close_icon.png';
import CartIcon from './assets/cart.png';
import Logo from './assets/logo.png';
import AviatorHomeScreen from './pages/AviatorHomeScreen';
import BackgroundImage from './assets/navigation_background.png';
import AviatorCartScreen from './pages/AviatorCartScreen';
import AviatorCartSuccessScreen from './pages/AviatorCartSuccessScreen';
import AviatorReservationScreen from './pages/AviatorReservationScreen';
import AviatorReserveSuccessScreen from './pages/AviatorReserveSuccessScreen';
import AviatorContactsScreen from './pages/AviatorContactsScreen';
import AviatorEventsScreen from './pages/AviatorEventsScreen';
import AviatorEventDetailScreen from './pages/AviatorEventDetailScreen';

// Screens
const {width, height} = Dimensions.get('window');
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          width,
          backgroundColor: COLORS.main,
        },
        headerShown: false,
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      {drawerScreens.map(({name, component}) => (
        <Drawer.Screen key={name} name={name} component={component} />
      ))}
    </Drawer.Navigator>
  );
}

function CustomDrawerContent(props) {
  const navigation = useNavigation();

  const drawerItems = [
    {label: 'Главная', screen: 'AviatorHomeScreen'},
    {label: 'Корзина', screen: 'AviatorCartScreen'},
    {label: 'Резерв столика', screen: 'AviatorReservationScreen'},
    {label: 'Контакты', screen: 'AviatorContactsScreen'},
    {label: 'События ресторана', screen: 'AviatorEventsScreen'},
  ];

  const navigateToScreen = screen => {
    navigation.navigate('DrawerNavigator', {screen});
  };

  return (
    <DrawerContentScrollView {...props} scrollEnabled={false}>
      <ImageBackground style={styles.container} source={BackgroundImage}>
        <View style={styles.closeIconContainer}>
          <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
            <Image source={CloseIcon} style={styles.closeIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.logoContainer}>
          <Image source={Logo} style={styles.logo} />
        </View>
        <View style={styles.mainContainer}>
          {drawerItems.map(({label, screen}) => (
            <TouchableOpacity
              key={screen}
              onPress={() => navigateToScreen(screen)}
              style={styles.drawerItem}>
              <Text style={styles.itemText}>{label}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity onPress={() => navigateToScreen('AviatorCartScreen')}>
          <Image source={CartIcon} style={styles.cartIcon} />
        </TouchableOpacity>
      </ImageBackground>
    </DrawerContentScrollView>
  );
}

const drawerScreens = [
  {name: 'AviatorHomeScreen', component: AviatorHomeScreen},
  {name: 'AviatorCartScreen', component: AviatorCartScreen},
  {name: 'AviatorCartSuccessScreen', component: AviatorCartSuccessScreen},
  {name: 'AviatorReservationScreen', component: AviatorReservationScreen},
  {name: 'AviatorReserveSuccessScreen', component: AviatorReserveSuccessScreen},
  {name: 'AviatorContactsScreen', component: AviatorContactsScreen},
  {name: 'AviatorEventsScreen', component: AviatorEventsScreen},
  {name: 'AviatorEventDetailScreen', component: AviatorEventDetailScreen},
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 60,
    height: height - height * 0.06,
  },
  closeIconContainer: {
    position: 'absolute',
    left: 20,
    bottom: 40,
  },
  closeIcon: {
    width: 40,
    height: 40,
  },
  logoContainer: {
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: width * 0.8,
    height: 150,
    resizeMode: 'contain',
  },
  mainContainer: {
    marginTop: 20,
    alignItems: 'flex-end',
    width: width,
  },
  drawerItem: {
    width: '75%',
    paddingVertical: 15,
    marginTop: 25,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  itemText: {
    fontSize: 18,
    fontFamily: FONTS.black,
    color: COLORS.black,
    textAlign: 'center',
  },
  cartIcon: {
    width: 60,
    height: 60,
  },
});
