import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import QRCode from 'react-native-qrcode-svg';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {Header} from 'react-native/Libraries/NewAppScreen';

const QrcodeForMap = () => {
  const navigation = useNavigation();
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [locationLoaded, setLocationLoaded] = useState(false);

  // Function to check and request location permission
  const requestLocationPermission = async () => {
    try {
      let permissionResult;
      if (Platform.OS === 'android') {
        permissionResult = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
      } else {
        permissionResult = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      }

      if (
        permissionResult === PermissionsAndroid.RESULTS.GRANTED ||
        permissionResult === RESULTS.GRANTED
      ) {
        getCurrentLocation();
      } else {
        Alert.alert(
          'Permission Denied',
          'Location permission is required to get coordinates.',
        );
      }
    } catch (error) {
      console.error('Permission error:', error);
    }
  };

  // Function to get current location
  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        setLocationLoaded(true);
      },
      error => {
        console.error('Location error:', error);
        Alert.alert('Error', 'Could not fetch location.');
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  // Generate Google Maps Link
  const googleMapsLink =
    latitude && longitude
      ? `https://www.google.com/maps?q=${latitude},${longitude}`
      : '';

  return (
    <View style={styles.container}>
      <Header
        title="Generate Wifi Codes"
        onBackPress={() => navigation.goBack()}
        onBackLongPress={() =>
          Alert.alert('Long Press', 'You held the back button!')
        }
        rightComponent={null}
      />
      <Text style={styles.header}>Your Current Location</Text>

      {locationLoaded ? (
        <>
          {/* Map View */}
          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: latitude!,
                longitude: longitude!,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
              }}>
              {latitude && longitude && (
                <Marker coordinate={{latitude, longitude}} />
              )}
            </MapView>
          </View>

          {/* Latitude & Longitude Display */}
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>Latitude: {latitude}</Text>
            <Text style={styles.infoText}>Longitude: {longitude}</Text>
          </View>

          {/* QR Code Display */}
          {googleMapsLink && (
            <View style={styles.qrContainer}>
              <QRCode value={googleMapsLink} size={150} />
              <Text style={styles.qrText}>Scan QR to Open in Google Maps</Text>
            </View>
          )}
        </>
      ) : (
        <Text style={styles.loadingText}>Fetching location...</Text>
      )}

      {/* Refresh Location Button */}
      <TouchableOpacity style={styles.button} onPress={getCurrentLocation}>
        <Text style={styles.buttonText}>Refresh Location</Text>
      </TouchableOpacity>
    </View>
  );
};

export default QrcodeForMap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  mapContainer: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  map: {
    flex: 1,
  },
  infoContainer: {
    marginVertical: 15,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  qrContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  qrText: {
    marginTop: 10,
    fontSize: 14,
    color: '#333',
  },
  loadingText: {
    fontSize: 16,
    color: 'gray',
    marginTop: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#6200EA',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
