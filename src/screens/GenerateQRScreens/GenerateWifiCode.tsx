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

const GenerateWifiCode: React.FC = () => {
  const navigation = useNavigation();
  const [ssid, setSsid] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [encryptionType, setEncryptionType] = useState<
    'WPA' | 'WEP' | 'NONE' | 'RAW'
  >('WPA');
  const [isActive, setIsActive] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const qrRef = useRef<QRCode | null>(null);

  const generateQRCode = () => {
    if (!ssid || !password) {
      setError('Please enter both SSID and password!');
      return;
    }
    setError('');
    setIsActive(true);
  };

  const handleInputChange = (field: 'ssid' | 'password', value: string) => {
    if (field === 'ssid') setSsid(value);
    if (field === 'password') setPassword(value);
  };

  const clearInput = () => {
    setSsid('');
    setPassword('');
    setEncryptionType('WPA');
    setIsActive(false);
    setError('');
  };

  const getWiFiQRValue = (): string => {
    return `WIFI:T:${encryptionType};S:${ssid};P:${password};;`;
  };

  // Request write permission for Android
  const requestWritePermission = async (): Promise<boolean> => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'App needs access to your storage to save the QR code.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const downloadQRCode = async () => {
    if (qrRef.current) {
      const hasPermission = await requestWritePermission();
      if (!hasPermission) {
        Alert.alert(
          'Permission Denied',
          'Storage permission is required to save the QR code.',
        );
        return;
      }

      try {
        qrRef.current.toDataURL((qrDataUrl: string) => {
          const path = `${RNFS.DownloadDirectoryPath}/wifi-qr-code.png`;
          const base64Data = qrDataUrl.split(',')[1]; // Get the base64 part

          RNFS.writeFile(path, base64Data, 'base64')
            .then(() => Alert.alert('Success', 'QR Code saved to Downloads!'))
            .catch(error => {
              console.error('Error saving QR code:', error);
              Alert.alert('Error', 'Failed to save QR Code');
            });
        });
      } catch (error) {
        console.error('Error saving QR code:', error);
        Alert.alert('Error', 'Failed to save QR Code');
      }
    }
  };

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
      <ScrollView>
        <View style={styles.wrapper}>
          <Text style={styles.title}>Wi-Fi QR Code Generator</Text>
          <Text style={styles.description}>
            Enter your Wi-Fi details to generate a QR code
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter SSID"
            value={ssid}
            onChangeText={text => handleInputChange('ssid', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Password"
            value={password}
            secureTextEntry
            onChangeText={text => handleInputChange('password', text)}
          />

          {/* Picker for selecting encryption type */}
          <Picker
            selectedValue={encryptionType}
            style={styles.picker}
            onValueChange={itemValue =>
              setEncryptionType(itemValue as 'WPA' | 'WEP' | 'NONE' | 'RAW')
            }>
            <Picker.Item label="WPA/WPA2" value="WPA" />
            <Picker.Item label="WEP" value="WEP" />
            <Picker.Item label="None" value="NONE" />
            <Picker.Item label="RAW" value="RAW" />
          </Picker>

          {error && <Text style={styles.errorText}>{error}</Text>}

          <TouchableOpacity style={styles.button} onPress={generateQRCode}>
            <Text style={styles.buttonText}>Generate QR Code</Text>
          </TouchableOpacity>

          {isActive && (
            <View style={styles.qrCode}>
              <QRCode
                ref={qrRef}
                value={getWiFiQRValue()}
                size={200}
                color="black"
                backgroundColor="white"
              />
            </View>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  wrapper: {
    maxWidth: moderateScale(300),
    backgroundColor: colors.white,
    borderRadius: moderateScale(7),
    padding: moderateScale(20),
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: {width: 0, height: moderateScale(10)},
    shadowOpacity: 1,
    shadowRadius: moderateScale(30),
  },
  title: {
    fontSize: moderateScale(21),
    fontWeight: '500',
    marginBottom: moderateScale(10),
  },
  description: {
    color: '#575757',
    fontSize: moderateScale(16),
    marginBottom: moderateScale(20),
  },
  input: {
    fontSize: moderateScale(18),
    padding: moderateScale(17),
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: moderateScale(5),
    marginBottom: moderateScale(20),
  },
  picker: {
    height: moderateScale(50),
    width: moderateScale(200),
    marginBottom: moderateScale(20),
  },
  button: {
    backgroundColor: '#3498DB',
    borderRadius: moderateScale(5),
    padding: moderateScale(15),
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
  errorText: {
    color: 'red',
    marginBottom: moderateScale(10),
    textAlign: 'center',
  },
  clearButton: {
    backgroundColor: '#e74c3c',
    borderRadius: moderateScale(5),
    padding: moderateScale(10),
    marginTop: moderateScale(20),
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#fff',
    fontSize: moderateScale(18),
  },
  downloadButton: {
    backgroundColor: '#2ecc71',
    borderRadius: moderateScale(5),
    padding: moderateScale(10),
    marginTop: moderateScale(20),
    alignItems: 'center',
  },
  downloadButtonText: {
    color: '#fff',
    fontSize: moderateScale(18),
  },
});
