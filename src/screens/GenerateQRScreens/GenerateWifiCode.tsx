import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  PermissionsAndroid,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import QRCode from 'react-native-qrcode-svg';
import RNFS from 'react-native-fs';
import {Picker} from '@react-native-picker/picker';
import Header from '../../components/commonComponents/Header';
import {moderateScale} from '../../utils/dimensions';
import {colors} from '../../utils/LightTheme';
import Animated, {FadeIn, FadeOut, BounceIn} from 'react-native-reanimated';

const GenerateWifiCode: React.FC = () => {
  const navigation = useNavigation();
  const [ssid, setSsid] = useState('');
  const [password, setPassword] = useState('');
  const [encryptionType, setEncryptionType] = useState<
    'WPA' | 'WEP' | 'NONE' | 'RAW'
  >('WPA');
  const [isActive, setIsActive] = useState(false);
  const [error, setError] = useState('');
  const qrRef = useRef<QRCode | null>(null);

  const generateQRCode = () => {
    if (!ssid || !password) {
      setError('Please enter both SSID and password!');
      return;
    }
    setError('');
    setIsActive(true);
  };

  const clearInput = () => {
    setSsid('');
    setPassword('');
    setEncryptionType('WPA');
    setIsActive(false);
    setError('');
  };

  const getWiFiQRValue = () =>
    `WIFI:T:${encryptionType};S:${ssid};P:${password};;`;

  const downloadQRCode = async () => {
    if (qrRef.current) {
      try {
        qrRef.current.toDataURL((qrDataUrl: string) => {
          const path = `${RNFS.DownloadDirectoryPath}/wifi-qr-code.png`;
          const base64Data = qrDataUrl.split(',')[1];
          RNFS.writeFile(path, base64Data, 'base64')
            .then(() => Alert.alert('Success', 'QR Code saved to Downloads!'))
            .catch(error => Alert.alert('Error', 'Failed to save QR Code'));
        });
      } catch (error) {
        Alert.alert('Error', 'Failed to save QR Code');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title="Generate Wifi Codes"
        onBackPress={() => navigation.goBack()}
        rightComponent={null}
      />
      <ScrollView>
        <View style={styles.wrapper}>
          <Animated.Text entering={FadeIn.duration(500)} style={styles.title}>
            Wi-Fi QR Code Generator
          </Animated.Text>
          <TextInput
            style={styles.input}
            placeholder="Enter SSID"
            value={ssid}
            onChangeText={setSsid}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Password"
            value={password}
            secureTextEntry
            onChangeText={setPassword}
          />
          <Picker
            selectedValue={encryptionType}
            style={styles.picker}
            onValueChange={itemValue => setEncryptionType(itemValue)}>
            <Picker.Item label="WPA/WPA2" value="WPA" />
            <Picker.Item label="WEP" value="WEP" />
            <Picker.Item label="None" value="NONE" />
            <Picker.Item label="RAW" value="RAW" />
          </Picker>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <Animated.View entering={BounceIn.duration(700)}>
            <TouchableOpacity style={styles.button} onPress={generateQRCode}>
              <Text style={styles.buttonText}>Generate QR Code</Text>
            </TouchableOpacity>
          </Animated.View>

          {isActive && (
            <Animated.View
              entering={FadeIn.duration(800)}
              exiting={FadeOut.duration(500)}
              style={styles.qrCode}>
              <QRCode ref={qrRef} value={getWiFiQRValue()} size={200} />
            </Animated.View>
          )}

          <TouchableOpacity style={styles.clearButton} onPress={clearInput}>
            <Text style={styles.clearButtonText}>Clear</Text>
          </TouchableOpacity>

          {isActive && (
            <TouchableOpacity
              style={styles.downloadButton}
              onPress={downloadQRCode}>
              <Text style={styles.downloadButtonText}>Download QR Code</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default GenerateWifiCode;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  wrapper: {
    padding: moderateScale(20),
  },
  title: {
    fontSize: moderateScale(21),
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: moderateScale(10),
  },
  input: {
    fontSize: moderateScale(18),
    padding: moderateScale(10),
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: moderateScale(5),
    marginBottom: moderateScale(15),
  },
  button: {
    backgroundColor: '#3498DB',
    padding: moderateScale(15),
    borderRadius: moderateScale(5),
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: moderateScale(18),
  },
  qrCode: {
    marginTop: moderateScale(20),
    alignItems: 'center',
  },
  clearButton: {
    backgroundColor: '#e74c3c',
    padding: moderateScale(10),
    borderRadius: moderateScale(5),
    marginTop: moderateScale(20),
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#fff',
    fontSize: moderateScale(18),
  },
  downloadButton: {
    backgroundColor: '#2ecc71',
    padding: moderateScale(10),
    borderRadius: moderateScale(5),
    marginTop: moderateScale(20),
    alignItems: 'center',
  },
  downloadButtonText: {
    color: '#fff',
    fontSize: moderateScale(18),
  },
});
