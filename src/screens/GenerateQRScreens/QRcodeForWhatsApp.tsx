import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
import RNFS from 'react-native-fs';
import CountryPicker from 'react-native-country-picker-modal';
import {moderateScale, scaleHeight} from '../../utils/dimensions';
import {colors} from '../../utils/LightTheme';
import {useRoute} from '@react-navigation/native';
import {contents} from '../../context';

const QRcodeForWhatsApp = () => {
  const route = useRoute();
  const mode = route.params?.mode || 'whatsapp'; // Default mode is WhatsApp

  const [countryCode, setCountryCode] = useState('US');
  const [callingCode, setCallingCode] = useState('1');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [qrValue, setQrValue] = useState('');
  const viewShotRef = useRef(null);

  const generateQRCode = () => {
    if (!phoneNumber) {
      Alert.alert(contents('Error'), contents('EnterPhoneNumber'));
      return;
    }

    const formattedPhone = `+${callingCode}${phoneNumber.replace(/\D/g, '')}`;

    if (mode === 'whatsapp') {
      const whatsappLink = `https://wa.me/${formattedPhone}${
        message ? `?text=${encodeURIComponent(message)}` : ''
      }`;
      setQrValue(whatsappLink);
    } else {
      const smsLink = `SMSTO:${formattedPhone}:${message}`;
      setQrValue(smsLink);
    }
  };

  const shareQRCode = async () => {
    if (!qrValue) {
      Alert.alert(contents('Error'), contents('GenerateQRCodeFirst'));
      return;
    }
    try {
      const uri = await captureQR();
      const options = {
        title: contents('ShareQRCodeTitle'),
        url: `file://${uri}`,
        type: 'image/png',
      };
      await Share.open(options);
    } catch (error) {
      console.error(error);
    }
  };

  const captureQR = async () => {
    return new Promise((resolve, reject) => {
      if (viewShotRef.current) {
        viewShotRef.current.capture().then(uri => {
          const newPath = `${RNFS.DocumentDirectoryPath}/QRCode.png`;
          RNFS.moveFile(uri, newPath)
            .then(() => resolve(newPath))
            .catch(reject);
        });
      } else {
        reject(contents('ViewShotRefNotFound'));
      }
    });
  };

  const downloadQRCode = async () => {
    if (!qrValue) {
      Alert.alert(contents('Error'), contents('GenerateQRCodeFirst'));
      return;
    }
    try {
      const uri = await captureQR();
      Alert.alert(contents('Success'), `${contents('QRCodeSaved')}: ${uri}`);
    } catch (error) {
      console.error(contents('DownloadQRError'), error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        {mode === 'sms'
          ? contents('SMSQRCodeGenerator')
          : contents('WhatsAppQRCodeGenerator')}
      </Text>

      <View style={styles.phoneContainer}>
        <CountryPicker
          withCallingCode
          withFlag
          withFilter
          withModal
          withAlphaFilter
          countryCode={countryCode}
          onSelect={country => {
            setCountryCode(country.cca2);
            setCallingCode(country.callingCode[0]);
          }}
        />
        <Text style={styles.callingCode}>+{callingCode}</Text>
        <TextInput
          style={styles.phoneInput}
          placeholder={contents('EnterPhoneNumber')}
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
      </View>

      <TextInput
        style={styles.input}
        placeholder={
          mode === 'sms'
            ? contents('EnterSMSMessage')
            : contents('EnterWhatsAppMessage')
        }
        value={message}
        onChangeText={setMessage}
      />

      <TouchableOpacity style={styles.button} onPress={generateQRCode}>
        <Text style={styles.buttonText}>{contents('GenerateQRCode')}</Text>
      </TouchableOpacity>

      {qrValue ? (
        <View style={styles.qrContainer}>
          <ViewShot ref={viewShotRef} options={{format: 'png', quality: 1}}>
            <QRCode value={qrValue} size={200} />
          </ViewShot>

          <TouchableOpacity style={styles.button} onPress={shareQRCode}>
            <Text style={styles.buttonText}>{contents('ShareQRCode')}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={downloadQRCode}>
            <Text style={styles.buttonText}>{contents('DownloadQRCode')}</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

export default QRcodeForWhatsApp;

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
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: moderateScale(10),
    paddingHorizontal: moderateScale(10),
    marginBottom: moderateScale(15),
    elevation: 4,
  },
  callingCode: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: colors.inputText,
    marginRight: moderateScale(5),
  },
  phoneInput: {
    flex: 1,
    height: scaleHeight(50),
    fontSize: moderateScale(16),
    paddingLeft: moderateScale(10),
    color: colors.grey800,
  },
  input: {
    width: '100%',
    height: scaleHeight(50),
    backgroundColor: colors.white,
    borderRadius: moderateScale(10),
    paddingHorizontal: moderateScale(15),
    marginBottom: moderateScale(15),
    elevation: 4,
  },
  button: {
    backgroundColor: colors.highlightSelected,
    paddingVertical: moderateScale(15),
    borderRadius: moderateScale(10),
    width: '100%',
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
});
