import React, {useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, Text, View, Alert, TouchableOpacity} from 'react-native';
import {Camera, CameraType} from 'react-native-camera-kit';
import Header from '../components/commonComponents/Header';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {scaleHeight, scaleWidth} from '../utils/dimensions';

const ScanBarCodesScreen = () => {
  const navigation = useNavigation();
  const cameraRef = useRef(null);

  const handleBarcodeScan = event => {
    Alert.alert('Bar Code Found', event.nativeEvent.codeStringValue);
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
          <View>
            <TouchableOpacity onPress={handleBarcodeScan}>
              <AntDesign name="barcode" size={30} color="black" />
            </TouchableOpacity>
          </View>
        }
      />
      {/* <View style={{backgroundColor: 'red', flex: 1}}> */}
      <Camera
        ref={cameraRef}
        cameraType={CameraType.Back}
        flashMode="auto"
        onReadCode={handleBarcodeScan}
        showFrame={true}
        laserColor="red"
        frameColor="white"
        style={styles.camera}
        scanBarcode={true}
      />
      {/* </View> */}

      <View style={{paddingTop: scaleHeight(10)}}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log('Search button clicked')}>
          <AntDesign name="search1" size={24} color="white" />
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>
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
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  camera: {
    width: '100%',
    height: '80%',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    width: scaleWidth(300),
    height: scaleHeight(50),
    borderRadius: scaleHeight(5),
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 10,
    fontWeight: 'bold',
  },
});
