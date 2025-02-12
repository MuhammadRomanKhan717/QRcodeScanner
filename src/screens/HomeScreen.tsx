import {StyleSheet, Text, View, FlatList} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BarIcon from 'react-native-vector-icons/FontAwesome';
import NavigationCard from '../components/homeComponents/NavigationCard';

const HomeScreen = () => {
  const navigation = useNavigation();

  const cardsData = [
    {
      id: '1',
      screen: 'GenerateQRCodesScreen',
      icon: <Icon name="qr-code" />,
      iconSize: 50,
      iconColor: '#4CAF50',
      text: 'Generate QR Codes',
    },
    {
      id: '2',
      screen: 'GenerateBarCodesScreen',
      icon: <BarIcon name="barcode" />,
      iconSize: 50,
      iconColor: '#2196F3',
      text: 'Generate Bar Codes',
    },
    {
      id: '3',
      screen: 'ScanQRCodesScreen',
      icon: <Icon name="camera-alt" />,
      iconSize: 50,
      iconColor: '#FF9800',
      text: 'Scan QR Codes',
    },
    {
      id: '4',
      screen: 'ScanBarCodesScreen',
      icon: <Icon name="camera-enhance" />,
      iconSize: 50,
      iconColor: '#FF5722',
      text: 'Scan Bar Codes',
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
      <Text style={styles.title}>HomeScreen</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333',
  },
  cardListContainer: {
    width: '100%',
  },
});
