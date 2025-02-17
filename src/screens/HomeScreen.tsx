import React from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NavigationCard from '../components/homeComponents/NavigationCard';
import {moderateScale} from '../utils/dimensions';
import {contents} from '../context';
import {colors} from '../utils/LightTheme';

const HomeScreen = () => {
  const navigation = useNavigation();

  const cardsData = [
    {
      id: '1',
      screen: 'GenerateQRCodesScreen',
      icon: <Icon name="qr-code" />,
      iconSize: 50,
      iconColor: '#4CAF50',
      text: contents('generateQRCodes'),
    },
    {
      id: '2',
      screen: 'GenerateBarCodesScreen',
      icon: <MaterialCommunityIcons name="barcode" />,
      iconSize: 50,
      iconColor: '#2196F3',
      text: contents('generateBarCodes'),
    },
    {
      id: '3',
      screen: 'ScanQRCodesScreen',
      icon: <MaterialCommunityIcons name="qrcode-scan" />,
      iconSize: 50,
      iconColor: '#FF9800',
      text: contents('scanQRCodes'),
    },
    {
      id: '4',
      screen: 'ScanBarCodesScreen',
      icon: <MaterialCommunityIcons name="barcode-scan" />,
      iconSize: 50,
      iconColor: '#FF5722',
      text: contents('scanBarCodes'),
    },
  ];

  const renderItem = ({item}) => (
    <NavigationCard
      onPress={() => navigation.navigate(item.screen)}
      icon={item.icon}
      iconSize={item.iconSize}
      iconColor={item.iconColor}
      text={item.text}
    />
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          style={styles.menuButton}>
          <MaterialCommunityIcons name="menu" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{contents('home')}</Text>
      </View>

      {/* Welcome Text */}
      <Text style={styles.title}>{contents('welcome')}</Text>

      {/* Navigation Grid */}
      <FlatList
        data={cardsData}
        numColumns={2}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.cardListContainer}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.white,
    // paddingTop: moderateScale(40),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: moderateScale(10),
    backgroundColor: colors.white,
    elevation: 3,
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  menuButton: {
    position: 'absolute',
    left: moderateScale(15),
    padding: moderateScale(10),
  },
  headerTitle: {
    fontSize: moderateScale(22),
    fontWeight: 'bold',
    color: colors.blackText,
  },
  title: {
    fontSize: moderateScale(30),
    fontWeight: 'bold',
    marginTop: moderateScale(30),
    marginBottom: moderateScale(30),
    color: colors.blackText,
  },
});
