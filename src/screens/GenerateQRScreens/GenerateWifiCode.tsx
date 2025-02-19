import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import QRCode from 'react-native-qrcode-svg';
import {Picker} from '@react-native-picker/picker';
import Header from '../../components/commonComponents/Header';
import {moderateScale} from '../../utils/dimensions';
import {colors} from '../../utils/LightTheme';
import Animated, {FadeIn, FadeOut, BounceIn} from 'react-native-reanimated';
import {contents} from '../../context';
import ShareDownloadComponent from '../../components/generateQRCodesComponent/ShareDownloadComponent';

const GenerateWifiCode: React.FC = () => {
  const navigation = useNavigation();
  const [ssid, setSsid] = useState('');
  const [password, setPassword] = useState('');
  const [encryptionType, setEncryptionType] = useState<
    'WPA' | 'WEP' | 'NONE' | 'RAW'
  >('WPA');
  const [isActive, setIsActive] = useState(false);
  const [error, setError] = useState('');
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null); // ✅ FIXED ERROR
  const qrRef = useRef<QRCode | null>(null);

  const generateQRCode = () => {
    if (!ssid || !password) {
      setError(contents('PleaseEnterPassword'));
      return;
    }
    setError('');
    setIsActive(true);

    // Generate QR Code URL
    const qrCodeValue = `WIFI:T:${encryptionType};S:${ssid};P:${password};;`;
    setDownloadUrl(qrCodeValue); // ✅ FIXED ERROR
  };

  const clearInput = () => {
    setSsid('');
    setPassword('');
    setEncryptionType('WPA');
    setIsActive(false);
    setError('');
    setDownloadUrl(null); // ✅ FIXED ERROR
  };

  return (
    <View style={styles.container}>
      <Header
        title={contents('GenerateWifiCodes')}
        onBackPress={() => navigation.goBack()}
        rightComponent={null}
      />
      <ScrollView>
        <View style={styles.wrapper}>
          <Animated.Text entering={FadeIn.duration(500)} style={styles.title}>
            {contents('EnterDetailGenerateCode')}
          </Animated.Text>

          <TextInput
            style={styles.input}
            placeholder={contents('EnterSSID')}
            value={ssid}
            onChangeText={setSsid}
          />
          <TextInput
            style={styles.input}
            placeholder={contents('EnterPassword')}
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
              <Text style={styles.buttonText}>
                {contents('GenerateQRCode')}
              </Text>
            </TouchableOpacity>
          </Animated.View>

          {isActive &&
            downloadUrl && ( // ✅ FIXED ERROR
              <ShareDownloadComponent
                downloadUrl={downloadUrl}
                isActive={true}
              />
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
    backgroundColor: colors.highlightSelected,
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
});
