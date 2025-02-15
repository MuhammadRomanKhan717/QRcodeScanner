import React, {useRef} from 'react';
import {StyleSheet, Text, View, Alert} from 'react-native';
import {Camera, CameraType} from 'react-native-camera-kit';

const ScanQRCodesScreen = () => {
  const cameraRef = useRef(null);

  const handleBarcodeScan = event => {
    Alert.alert('QR Code Found', event.nativeEvent.codeStringValue);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Scan QR Code</Text>
      <Camera
        ref={cameraRef}
        cameraType={CameraType.Back}
        flashMode="auto"
        scanBarcode={false}
        onReadCode={handleBarcodeScan}
        showFrame={true}
        laserColor="red"
        frameColor="white"
        style={styles.camera}
      />
    </View>
  );
};

export default ScanQRCodesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  camera: {
    width: '100%',
    height: '80%',
  },
});
