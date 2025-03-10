import React, {useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
import {Camera, CameraType} from 'react-native-camera-kit';
import Header from '../components/commonComponents/Header';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {scaleHeight, scaleWidth} from '../utils/dimensions';
import {fontSize} from '../utils/LightTheme';

const ScanQRCodesScreen = () => {
  const navigation = useNavigation();
  const cameraRef = useRef(null);
  const [scannedData, setScannedData] = useState('');
  const [showCamera, setShowCamera] = useState(true);
  const [flashMode, setFlashMode] = useState('off');

  const handleBarcodeScan = event => {
    const qrCodeValue = event.nativeEvent.codeStringValue;
    setScannedData({
      id: qrCodeValue,
      image: 'https://via.placeholder.com/150', // Placeholder image
    });
    setShowCamera(false);
  };

  const toggleFlash = () => {
    setFlashMode(prev => (prev === 'on' ? 'off' : 'on'));
  };

  const searchAmazon = () => {
    const amazonSearchURL = `https://www.amazon.com/s?k=${encodeURIComponent(
      scannedData.id,
    )}`;
    Linking.openURL(amazonSearchURL).catch(err => {
      console.error('An error occurred while trying to open the URL:', err);
      Alert.alert('Error', 'Unable to open Amazon.');
    });
  };

  const searchGoogle = () => {
    const googleSearchURL = `https://www.google.com/search?q=${encodeURIComponent(
      scannedData.id,
    )}`;
    Linking.openURL(googleSearchURL).catch(err => {
      console.error('An error occurred while trying to open the URL:', err);
      Alert.alert('Error', 'Unable to open Google.');
    });
  };

  return (
    <View style={styles.container}>
      {/* Header Properly Positioned */}
      <View style={styles.headerContainer}>
        <Header title="Scan QR Code" onBackPress={() => navigation.goBack()} />
      </View>

      {/* Camera for QR Scanning */}
      {showCamera ? (
        <View style={styles.cameraContainer}>
          <Camera
            ref={cameraRef}
            cameraType={CameraType.Back}
            flashMode={flashMode}
            onReadCode={handleBarcodeScan}
            showFrame={true}
            laserColor="red"
            frameColor="green"
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
        /* QR Code Result Screen */
        <View style={styles.resultContainer}>
          <Image source={{uri: scannedData.image}} style={styles.image} />
          <Text style={styles.barcodeText}>QR Code: {scannedData.id}</Text>
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

export default ScanQRCodesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    width: '100%',
    paddingHorizontal: 15,
    paddingTop: 10,
    marginBottom: 10, // Ensure space between header and camera
  },
  cameraContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  camera: {
    width: '100%',
    height: '100%',
  },
  flashButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 12,
    borderRadius: 50,
  },
  resultContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: scaleHeight(10),
  },
  barcodeText: {
    fontSize: fontSize.textSize18,
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
    fontSize: fontSize.textSize14,
    marginLeft: 10,
    fontWeight: 'bold',
  },
});
