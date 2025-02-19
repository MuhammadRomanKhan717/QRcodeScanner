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
  ScrollView,
} from 'react-native';
import Snackbar from 'react-native-snackbar';
import QRCode from 'react-native-qrcode-svg';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
import CameraRoll from '@react-native-camera-roll/camera-roll';
import {useNavigation, useRoute} from '@react-navigation/native';
import {moderateScale, scaleWidth} from '../../utils/dimensions';
import {colors} from '../../utils/LightTheme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated, {FadeIn, BounceIn} from 'react-native-reanimated';
import {contents} from '../../context';
import Header from '../../components/commonComponents/Header';

const QRcodeForSocialMedia = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {mode} = route.params || {mode: 'Facebook'};

  const [link, setLink] = useState('');
  const [name, setName] = useState('');
  const [qrGenerated, setQrGenerated] = useState(false);
  const viewShotRef = useRef(null);

  const showSnackbar = message => {
    Snackbar.show({
      text: contents(message),
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
        console.warn(contents('PermissionRequestError'), err);
        return false;
      }
    }
    return true;
  };

  const captureQR = async () => {
    try {
      if (!viewShotRef.current) throw new Error(contents('QRViewShotError'));
      const uri = await viewShotRef.current.capture();
      return uri || null;
    } catch (error) {
      Alert.alert(contents('Error'), contents('CaptureQRError'));
      return null;
    }
  };

  const shareQRCode = async () => {
    if (!qrGenerated || !link) {
      showSnackbar('GenerateValidQR');
      return;
    }
    try {
      const uri = await captureQR();
      if (!uri) return;
      await Share.open({
        title: contents('ShareQRCodeTitle'),
        url: `file://${uri}`,
        type: 'image/png',
      });
    } catch (error) {
      console.error(contents('ShareError'), error);
    }
  };

  const downloadQRCode = async () => {
    if (!qrGenerated || !link) {
      showSnackbar('GenerateValidQR');
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
      showSnackbar('QRCodeSaved');
    } catch (error) {
      Alert.alert(contents('Error'), contents('DownloadQRError'));
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title={`${mode} ${contents('QRCodeGenerator')}`}
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={styles.wrapper}>
        <Animated.Text entering={FadeIn.duration(500)} style={styles.title}>
          {contents('EnterDetailsToGenerateQR')}
        </Animated.Text>

        {/* Social Media Link Input */}
        <View style={styles.inputContainer}>
          <Icon name={mode.toLowerCase()} size={20} color={colors.grey600} />
          <TextInput
            style={styles.input}
            placeholder={contents('EnterLink')}
            value={link}
            onChangeText={setLink}
          />
        </View>

        {/* QR Name Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={contents('NameYourQR')}
            value={name}
            onChangeText={setName}
          />
        </View>
        {/* Generate QR Button */}
        {!qrGenerated && link && (
          <Animated.View entering={BounceIn.duration(700)}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                if (!link) {
                  showSnackbar('EnterValidLink');
                  return;
                }
                setQrGenerated(true);
                showSnackbar('QRGenerated');
              }}>
              <Text style={styles.buttonText}>{contents('GenerateQR')}</Text>
            </TouchableOpacity>
          </Animated.View>
        )}

        {/* Show QR Code */}
        {qrGenerated && link && (
          <>
            <View style={styles.qrContainer}>
              <ViewShot ref={viewShotRef} options={{format: 'png', quality: 1}}>
                <QRCode value={link} size={200} />
              </ViewShot>
              <Text style={styles.qrText}>
                {contents('ScanToVisit')} {mode}
              </Text>
            </View>
            <View style={styles.row}>
              <TouchableOpacity style={styles.button} onPress={downloadQRCode}>
                <Text style={styles.buttonText}>{contents('DownloadQR')}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={shareQRCode}>
                <Text style={styles.buttonText}>{contents('ShareQR')}</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default QRcodeForSocialMedia;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  wrapper: {
    padding: moderateScale(20),
    alignItems: 'center',
  },
  title: {
    fontSize: moderateScale(21),
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: moderateScale(10),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: moderateScale(10),
    paddingHorizontal: moderateScale(10),
    marginBottom: moderateScale(15),
    elevation: 15,
  },
  input: {
    height: moderateScale(50),
    flex: 1,
    fontSize: moderateScale(16),
    paddingLeft: moderateScale(10),
    color: colors.grey800,
  },
  button: {
    backgroundColor: colors.highlightSelected,
    padding: moderateScale(15),
    borderRadius: moderateScale(5),
    alignItems: 'center',
    width: scaleWidth(150),
  },
  buttonText: {
    color: '#fff',
    fontSize: moderateScale(18),
  },
  qrContainer: {alignItems: 'center', marginTop: moderateScale(20)},
  qrText: {
    fontSize: moderateScale(14),
    color: colors.grey800,
    marginTop: moderateScale(10),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: moderateScale(15),
  },
});
