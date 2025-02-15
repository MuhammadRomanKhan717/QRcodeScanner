import React, {useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Camera, CameraType} from 'react-native-camera-kit';
import Header from '../components/commonComponents/Header';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {scaleHeight, scaleWidth} from '../utils/dimensions';

const ScanBarCodesScreen = () => {
  const navigation = useNavigation();
  const cameraRef = useRef(null);
  const [scannedData, setScannedData] = useState(null);
  const [showCamera, setShowCamera] = useState(true);
  const [flashMode, setFlashMode] = useState('auto');

  const handleBarcodeScan = event => {
    const barcodeValue = event.nativeEvent.codeStringValue;
    setScannedData({
      id: barcodeValue,
      image: 'https://via.placeholder.com/150',
    });
    setShowCamera(false);
  };

  const toggleFlash = () => {
    setFlashMode(prev => (prev === 'on' ? 'off' : 'on'));
  };

  const searchAmazon = () => {
    const url = `https://www.amazon.com/s?k=${scannedData.id}`;
    Alert.alert('Redirecting', `Searching for ${scannedData.id} on Amazon`);
  };

  const searchGoogle = () => {
    const url = `https://www.google.com/search?q=${scannedData.id}`;
    Alert.alert('Redirecting', `Searching for ${scannedData.id} on Google`);
  };

  return (
    <View style={styles.container}>
      <Header
        title="Scan Bar Code"
        onBackPress={() => navigation.goBack()}
        onBackLongPress={() =>
          Alert.alert('Long Press', 'You held the back button!')
        }
        rightComponent={
          !showCamera ? (
            <TouchableOpacity
              onPress={handleBarcodeScan}
              style={styles.iconButton}>
              <AntDesign name="barcode" size={30} color="black" />
            </TouchableOpacity>
          ) : null
        }
      />

      {showCamera ? (
        <View style={styles.cameraContainer}>
          <Camera
            ref={cameraRef}
            cameraType={CameraType.Back}
            flashMode={flashMode}
            onReadCode={handleBarcodeScan}
            showFrame={true}
            laserColor="red"
            frameColor="white"
            style={styles.camera}
            scanBarcode={true}
          />
          <TouchableOpacity style={styles.flashButton} onPress={toggleFlash}>
            <MaterialCommunityIcons
              name={flashMode === 'on' ? 'flashlight' : 'flashlight-off'}
              size={30}
              color="white"
            />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.resultContainer}>
          <Image source={{uri: scannedData.image}} style={styles.image} />
          <Text style={styles.barcodeText}>Barcode ID: {scannedData.id}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={searchAmazon}>
              <AntDesign name="shoppingcart" size={24} color="white" />
              <Text style={styles.buttonText}>Amazon</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={searchGoogle}>
              <AntDesign name="google" size={24} color="white" />
              <Text style={styles.buttonText}>Google</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default ScanBarCodesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  cameraContainer: {
    position: 'relative',
    width: '100%',
    height: '80%',
  },
  camera: {
    width: '100%',
    height: '100%',
  },
  flashButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 50,
  },
  resultContainer: {
    alignItems: 'center',
    paddingTop: scaleHeight(20),
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: scaleHeight(10),
  },
  barcodeText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: scaleHeight(10),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: scaleHeight(10),
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    width: scaleWidth(140),
    height: scaleHeight(50),
    borderRadius: scaleHeight(5),
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    paddingHorizontal: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  iconButton: {
    padding: 10,
  },
});
