import React, {useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, Text, View, Alert, TouchableOpacity} from 'react-native';
import {Camera, CameraType} from 'react-native-camera-kit';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../components/commonComponents/Header';

const ScanQRCodesScreen = () => {
  const navigation = useNavigation();
  const cameraRef = useRef(null);
  const [flashMode, setFlashMode] = useState('off');
  const [scannedData, setScannedData] = useState('');
  const [showCamera, setShowCamera] = useState(true);

  const handleBarcodeScan = event => {
    setScannedData({id: event.nativeEvent.codeStringValue});
    setShowCamera(false);
    Alert.alert('QR Code Found', event.nativeEvent.codeStringValue);
  };

  const toggleFlash = () => {
    setFlashMode(prev => (prev === 'on' ? 'off' : 'on'));
  };

  const resetScanner = () => {
    setScannedData(null);
    setShowCamera(true);
  };

  return (
    <View style={styles.container}>
      {/* Properly Positioned Header */}
      <View style={styles.headerContainer}>
        <Header title="Scan QR Code" onBackPress={() => navigation.goBack()} />
      </View>

      {/* Camera or QR Code Result */}
      {showCamera ? (
        <View style={styles.cameraContainer}>
          <Camera
            ref={cameraRef}
            cameraType={CameraType.Back}
            flashMode={flashMode}
            scanBarcode={true}
            onReadCode={handleBarcodeScan}
            showFrame={true}
            laserColor="red"
            frameColor="green"
            style={styles.camera}
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
          <Text style={styles.barcodeText}>QR Code: {scannedData?.id}</Text>
          <TouchableOpacity style={styles.button} onPress={resetScanner}>
            <AntDesign name="scan1" size={24} color="white" />
            <Text style={styles.buttonText}>Scan Again</Text>
          </TouchableOpacity>
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
  barcodeText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    width: 180,
    height: 50,
    borderRadius: 5,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    paddingHorizontal: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
    fontWeight: 'bold',
  },
});
