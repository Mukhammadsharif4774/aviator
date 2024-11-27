import React, {useContext} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import {AppContext} from '../components/AppContext';
import AviatorHeader from '../components/AviatorHeader';
import AviatorMenuComponent from '../components/AviatorMenuComponent';
import {COLORS, FONTS, height, width} from '../helpers/colors';
import {aviatorProducts} from '../helpers/aviatorProducts';
import Logo from '../assets/logo.png';

const AviatorCategoryButton = ({label, active, onPress}) => (
  <TouchableOpacity
    onPress={onPress}
    style={active ? styles.categoryItemActive : styles.categoryItem}>
    <Text style={styles.category}>{label}</Text>
    {active && <View style={styles.underline} />}
  </TouchableOpacity>
);

export default function AviatorHomeScreen() {
  const [category, setCategory] = React.useState(0);
  const {shouldRefresh, toggleRefresh} = useContext(AppContext);

  const handleCategoryChange = index => {
    setCategory(index);
    toggleRefresh(!shouldRefresh);
  };

  return (
    <View style={styles.container}>
      <AviatorHeader />

      <View style={styles.logoContainer}>
        <Image source={Logo} style={styles.logo} />
      </View>

      <View style={styles.categoryContainer}>
        {['Сладости', 'Торты', 'Конфеты'].map((label, index) => (
          <AviatorCategoryButton
            key={index}
            label={label}
            active={category === index}
            onPress={() => handleCategoryChange(index)}
          />
        ))}
      </View>

      <ScrollView style={styles.flex} contentContainerStyle={styles.main}>
        {aviatorProducts[category].map((product, index) => (
          <AviatorMenuComponent key={index} item={product} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    flex: 1,
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
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: width,
    paddingHorizontal: 40,
    marginVertical: 20,
  },
  categoryItemActive: {
    backgroundColor: '#EF7D97',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryItem: {
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  category: {
    fontFamily: FONTS.bold,
    color: COLORS.white,
    fontSize: 16,
  },
  main: {
    backgroundColor: COLORS.white,
    paddingBottom: 100,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
});
