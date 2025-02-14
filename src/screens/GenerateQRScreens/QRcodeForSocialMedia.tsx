import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  PermissionsAndroid,
  Platform,
  StyleSheet,
} from 'react-native';
import Snackbar from 'react-native-snackbar';
import QRCode from 'react-native-qrcode-svg';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
import CameraRoll from '@react-native-camera-roll/camera-roll';
import {useRoute} from '@react-navigation/native';
import {moderateScale} from '../../utils/dimensions';
import {colors} from '../../utils/LightTheme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const QRcodeForSocialMedia = () => {
  const route = useRoute();
  const {mode} = route.params || {mode: 'Facebook'};
  const [link, setLink] = useState('');
  const [name, setName] = useState('');
  const [qrGenerated, setQrGenerated] = useState(false);
  const viewShotRef = useRef(null);

  const showSnackbar = message => {
    Snackbar.show({
      text: message,
      duration: Snackbar.LENGTH_SHORT,
    });
  };

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

  const captureQR = async () => {
    try {
      if (!viewShotRef.current)
        throw new Error('QR Code ViewShot reference is null.');
      const uri = await viewShotRef.current.capture();
      return uri || null;
    } catch (error) {
      Alert.alert('Error', 'Failed to capture QR Code.');
      return null;
    }
  };

  const shareQRCode = async () => {
    if (!qrGenerated || !link) {
      showSnackbar('Generate a valid QR Code first.');
      return;
    }
    try {
      const uri = await captureQR();
      if (!uri) return;
      await Share.open({
        title: 'Share QR Code',
        url: `file://${uri}`,
        type: 'image/png',
      });
    } catch (error) {
      console.error('Share error:', error);
    }
  };

  const downloadQRCode = async () => {
    if (!qrGenerated || !link) {
      showSnackbar('Generate a valid QR Code first.');
      return;
    }
    try {
      const uri = await captureQR();
      if (!uri) return;
      if (Platform.OS === 'android' && Platform.Version < 33) {
        const hasPermission = await requestStoragePermission();
        if (!hasPermission) return;
      }
      await CameraRoll.save(uri, {type: 'photo'});
      showSnackbar('QR Code saved to Gallery!');
    } catch (error) {
      Alert.alert('Error', 'Failed to save QR Code.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{mode} QR Code Generator</Text>
      <View style={styles.inputContainer}>
        <Icon name={mode.toLowerCase()} size={20} color={colors.grey600} />

        <TextInput
          style={styles.input}
          placeholder={`${mode} Link`}
          value={link}
          onChangeText={setLink}
        />
      </View>
      <View
        style={{
          alignItems: 'center',
          width: '100%',
          backgroundColor: colors.white,
          borderRadius: moderateScale(10),
          paddingHorizontal: moderateScale(10),
          marginBottom: moderateScale(15),
          elevation: 4,
        }}>
        <TextInput
          style={styles.input}
          placeholder="Name your QR (optional)"
          value={name}
          onChangeText={setName}
        />
      </View>
      {!qrGenerated && link && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (!link) {
              showSnackbar('Please enter a link to generate QR Code.');
              return;
            }
            setQrGenerated(true);
            showSnackbar('QR Code Generated!');
          }}>
          <Text style={styles.buttonText}>Generate QR Code</Text>
        </TouchableOpacity>
      )}
      {qrGenerated && link && (
        <>
          <View style={styles.qrContainer}>
            <ViewShot ref={viewShotRef} options={{format: 'png', quality: 1}}>
              <QRCode value={link} size={200} />
            </ViewShot>
            <Text style={styles.qrText}>Scan to visit {mode}</Text>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.button} onPress={downloadQRCode}>
              <Text style={styles.buttonText}>Download QR</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={shareQRCode}>
              <Text style={styles.buttonText}>Share QR</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: moderateScale(20),
    backgroundColor: colors.grey100,
  },
  heading: {
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    color: colors.blackText,
    marginBottom: moderateScale(20),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: moderateScale(10),
    paddingHorizontal: moderateScale(10),
    marginBottom: moderateScale(15),
    elevation: 4,
  },
  input: {
    // flex: 1,
    height: moderateScale(50),
    width: moderateScale(300),
    fontSize: moderateScale(16),
    paddingLeft: moderateScale(10),
    color: colors.grey800,
  },
  button: {
    backgroundColor: colors.highlightSelected,
    paddingVertical: moderateScale(15),
    borderRadius: moderateScale(10),
    width: '48%',
    alignItems: 'center',
    elevation: 6,
  },
  buttonText: {
    color: colors.whiteText,
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  },
  qrContainer: {
    alignItems: 'center',
    marginTop: moderateScale(20),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: moderateScale(15),
  },
});

export default QRcodeForSocialMedia;
