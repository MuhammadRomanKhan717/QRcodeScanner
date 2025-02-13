import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
import CameraRoll from '@react-native-camera-roll/camera-roll';
import {useRoute} from '@react-navigation/native';
import {moderateScale} from '../../utils/dimensions';
import {colors} from '../../utils/LightTheme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Define the route params type
type RouteParams = {
  mode: string;
};

const QRcodeForSocialMedia: React.FC = () => {
  const route = useRoute();
  const {mode} = route.params as RouteParams; // Get selected social media platform
  const [link, setLink] = useState('');
  const [loading, setLoading] = useState(false);
  const viewShotRef = useRef<ViewShot | null>(null);

  // Request storage permission (Android only)
  const requestStoragePermission = async () => {
    if (Platform.OS === 'android' && Platform.Version < 33) {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn('Permission request error:', err);
        return false;
      }
    }
    return true;
  };

  // Capture QR Code as an image
  const captureQR = async () => {
    try {
      if (!viewShotRef.current) {
        throw new Error('QR Code ViewShot reference is null.');
      }

      const uri = await viewShotRef.current.capture();
      if (!uri) {
        throw new Error('Failed to capture QR Code.');
      }

      console.log('QR Code captured successfully:', uri);
      return uri;
    } catch (error) {
      console.error('Capture Error:', error);
      Alert.alert('Error', 'Failed to capture QR Code.');
      return null;
    }
  };

  // Share QR Code
  const shareQRCode = async () => {
    if (!link) {
      Alert.alert('Error', 'Enter a valid link to generate the QR code.');
      return;
    }

    try {
      const uri = await captureQR();
      if (!uri) return;

      const options = {
        title: 'Share QR Code',
        url: `file://${uri}`,
        type: 'image/png',
      };
      await Share.open(options);
    } catch (error) {
      console.error('Share error:', error);
    }
  };

  // Download QR Code and Save to Gallery
  const downloadQRCode = async () => {
    if (!link) {
      Alert.alert('Error', 'Enter a valid link to generate the QR code.');
      return;
    }

    try {
      console.log('Starting QR Code download process...');

      // Capture QR code image
      const uri = await captureQR();
      if (!uri) {
        throw new Error('Failed to capture QR Code image.');
      }

      console.log('Captured QR Code URI:', uri);

      // Request storage permission (Android only)
      if (Platform.OS === 'android' && Platform.Version < 33) {
        const hasPermission = await requestStoragePermission();
        if (!hasPermission) {
          Alert.alert(
            'Permission Denied',
            'Cannot save QR Code without storage permission.',
          );
          return;
        }
      }

      // Convert local file path format
      const fileUri = uri.startsWith('file://') ? uri : `file://${uri}`;

      console.log('Saving QR Code to gallery...');

      // Save image to gallery
      const savedUri = await CameraRoll.save(fileUri, {type: 'photo'});

      console.log('QR Code saved successfully:', savedUri);

      Alert.alert('Success', 'QR Code saved to Gallery!');
    } catch (error) {
      console.error('Error saving QR Code:', error);
      Alert.alert('Error', 'Failed to save QR Code.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{mode} QR Code Generator</Text>

      {/* Input for Social Media Link */}
      <TextInput
        style={styles.input}
        placeholder={`Enter your ${mode} link`}
        value={link}
        onChangeText={setLink}
      />

      {loading && <ActivityIndicator size="large" color={colors.primary} />}

      {link ? (
        <View style={styles.qrContainer}>
          <ViewShot ref={viewShotRef} options={{format: 'png', quality: 1}}>
            <QRCode value={link} size={200} />
          </ViewShot>
          <Text style={styles.qrText}>Scan to visit {mode}</Text>

          {/* Buttons for Download & Share */}
          <View style={styles.row}>
            <TouchableOpacity style={styles.button} onPress={downloadQRCode}>
              <Text style={styles.buttonText}>Download QR</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={shareQRCode}>
              <Text style={styles.buttonText}>Share QR</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default QRcodeForSocialMedia;

// Styles
const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: moderateScale(20),
  },
  heading: {
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    color: colors.blackText,
    marginBottom: moderateScale(20),
  },
  input: {
    width: '100%',
    padding: moderateScale(10),
    borderWidth: 1,
    borderColor: colors.grey500,
    borderRadius: moderateScale(10),
    marginBottom: moderateScale(15),
  },
  qrContainer: {
    marginTop: moderateScale(15),
    alignItems: 'center',
  },
  qrText: {
    marginTop: moderateScale(10),
    fontSize: moderateScale(14),
    color: colors.grey800,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: moderateScale(15),
  },
  button: {
    flex: 1,
    paddingVertical: moderateScale(15),
    borderRadius: moderateScale(10),
    backgroundColor: colors.primary,
    alignItems: 'center',
    marginHorizontal: moderateScale(5),
  },
  buttonText: {
    color: colors.black,
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  },
};
