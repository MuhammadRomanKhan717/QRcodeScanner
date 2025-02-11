import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BarIcon from 'react-native-vector-icons/FontAwesome';

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>HomeScreen</Text>

      <View style={styles.cardContainer}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('QRCodeScreen')}>
          <Icon name="qr-code" size={50} color="#4CAF50" />
          <Text style={styles.cardText}>Generate QR Codes</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardContainer}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('BarCodeScreen')}>
          <BarIcon name="barcode" size={50} color="#2196F3" />

          <Text style={styles.cardText}>Generate Bar Codes</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardContainer}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('ScanQRCodes')}>
          <Icon name="camera-alt" size={50} color="#FF9800" />
          <Text style={styles.cardText}>Scan QR Codes</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardContainer}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('ScanBarCodes')}>
          <Icon name="camera-enhance" size={50} color="#FF5722" />
          <Text style={styles.cardText}>Scan Bar Codes</Text>
        </TouchableOpacity>
      </View>
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
  cardContainer: {
    width: '100%',
    marginBottom: 20, // Space between cards
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 2},
    elevation: 3,
  },
  cardText: {
    fontSize: 18,
    marginTop: 10,
    color: '#333',
  },
});
