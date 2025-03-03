import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
import RNFS from 'react-native-fs';
import CountryPicker from 'react-native-country-picker-modal';
import {moderateScale} from '../../utils/dimensions';
import {colors, fontSize} from '../../utils/LightTheme';
import {useNavigation, useRoute} from '@react-navigation/native';
import Animated, {FadeIn, BounceIn} from 'react-native-reanimated';
import {contents} from '../../context';
import Header from '../../components/commonComponents/Header';
import ShareDownloadComponent from '../../components/generateQRCodesComponent/ShareDownloadComponent';

const QRcodeForWhatsApp = () => {
  const navigation = useNavigation();
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

  return (
    <View style={styles.container}>
      <Header
        title={
          mode === 'sms'
            ? contents('SMSQRCodeGenerator')
            : contents('WhatsAppQRCodeGenerator')
        }
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={styles.wrapper}>
        <Animated.Text entering={FadeIn.duration(500)} style={styles.title}>
          {mode === 'sms'
            ? contents('SMSQRCodeGenerator')
            : contents('WhatsAppQRCodeGenerator')}
        </Animated.Text>

        {/* Country Picker & Phone Number */}
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

        {/* Message Input */}
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

        {/* Generate QR Button */}
        <Animated.View entering={BounceIn.duration(700)}>
          <TouchableOpacity style={styles.button} onPress={generateQRCode}>
            <Text style={styles.buttonText}>{contents('GenerateQRCode')}</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Display QR Code */}
        {qrValue && (
          <Animated.View entering={BounceIn.duration(700)}>
            <ShareDownloadComponent downloadUrl={qrValue} isActive={true} />
          </Animated.View>
        )}
      </ScrollView>
    </View>
  );
};

export default QRcodeForWhatsApp;

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
    fontSize: fontSize.textSize21,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: moderateScale(10),
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
    fontSize: fontSize.textSize18,
    fontWeight: 'bold',
    color: colors.inputText,
    marginRight: moderateScale(5),
  },
  phoneInput: {
    flex: 1,
    fontSize: fontSize.textSize16,
    padding: moderateScale(10),
    color: colors.grey800,
  },
  input: {
    width: '100%',
    fontSize: fontSize.textSize18,
    padding: moderateScale(10),
    borderWidth: 1,
    borderColor: colors.grey800,
    borderRadius: moderateScale(5),
    marginBottom: moderateScale(15),
  },
  button: {
    backgroundColor: colors.highlightSelected,
    padding: moderateScale(15),
    borderRadius: moderateScale(5),
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: fontSize.textSize18,
  },
});
