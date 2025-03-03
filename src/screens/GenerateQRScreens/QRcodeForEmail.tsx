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
import {useNavigation} from '@react-navigation/native';
import QRCode from 'react-native-qrcode-svg';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
import RNFS from 'react-native-fs';
import {moderateScale, scaleHeight} from '../../utils/dimensions';
import {colors, fontSize} from '../../utils/LightTheme';
import Header from '../../components/commonComponents/Header';
import {contents} from '../../context';
import ShareDownloadComponent from '../../components/generateQRCodesComponent/ShareDownloadComponent';

const QRcodeForEmail = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [qrValue, setQrValue] = useState('');
  const viewShotRef = useRef(null);

  // Generate QR Code
  const generateQRCode = () => {
    if (!email) {
      Alert.alert(contents('Error'), contents('EnterEmailRecipient'));
      return;
    }
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setQrValue(mailtoLink);
  };

  // Share QR Code
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

  // Capture QR Code for Download
  const captureQR = async () => {
    return new Promise((resolve, reject) => {
      if (viewShotRef.current) {
        viewShotRef.current.capture().then(uri => {
          const newPath = `${RNFS.DocumentDirectoryPath}/EmailQRCode.png`;
          RNFS.moveFile(uri, newPath)
            .then(() => resolve(newPath))
            .catch(reject);
        });
      } else {
        reject(contents('ViewShotRefNotFound'));
      }
    });
  };

  // Download QR Code
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
    <View>
      <Header
        title={contents('GenerateQRCode')}
        onBackPress={() => navigation.goBack()}
        onBackLongPress={() => Alert.alert(contents('LongPressbutton'))}
        rightComponent={null}
      />
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.heading}>{contents('EmailQRCodeGenerator')}</Text>
          <TextInput
            style={styles.input}
            placeholder={contents('EmailRecipient')}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <TextInput
            style={styles.input}
            placeholder={contents('EmailSubject')}
            value={subject}
            onChangeText={setSubject}
          />

          <TextInput
            style={styles.textArea}
            placeholder={contents('EmailBody')}
            value={body}
            onChangeText={setBody}
            multiline={true}
            numberOfLines={4}
          />

          <TouchableOpacity style={styles.button} onPress={generateQRCode}>
            <Text style={styles.buttonText}>{contents('GenerateQRCode')}</Text>
          </TouchableOpacity>
          {qrValue && <ShareDownloadComponent downloadUrl={qrValue} />}
        </View>
      </ScrollView>
    </View>
  );
};

export default QRcodeForEmail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: moderateScale(20),
    backgroundColor: colors.white,
  },
  heading: {
    fontSize: fontSize.textSize20,
    fontWeight: 'bold',
    color: colors.blackText,
    marginBottom: moderateScale(20),
  },
  input: {
    width: '100%',
    height: scaleHeight(50),
    backgroundColor: colors.white,
    borderRadius: moderateScale(10),
    paddingHorizontal: moderateScale(15),
    marginBottom: moderateScale(15),
    color: colors.inputText,
    elevation: 4,
  },
  textArea: {
    width: '100%',
    height: scaleHeight(100),
    backgroundColor: colors.white,
    borderRadius: moderateScale(10),
    paddingHorizontal: moderateScale(15),
    paddingVertical: moderateScale(10),
    marginBottom: moderateScale(15),
    color: colors.inputText,
    textAlignVertical: 'top',
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
    fontSize: fontSize.textSize16,
    fontWeight: 'bold',
  },
  qrContainer: {
    alignItems: 'center',
    marginTop: moderateScale(20),
  },
  shareButton: {
    backgroundColor: colors.success,
    paddingVertical: moderateScale(15),
    borderRadius: moderateScale(10),
    width: '100%',
    alignItems: 'center',
    marginTop: moderateScale(10),
    elevation: 6,
  },
  shareButtonText: {
    color: colors.whiteText,
    fontSize: fontSize.textSize16,
    fontWeight: 'bold',
  },
  downloadButton: {
    backgroundColor: colors.warning,
    paddingVertical: moderateScale(15),
    borderRadius: moderateScale(10),
    width: '100%',
    alignItems: 'center',
    marginTop: moderateScale(10),
    elevation: 6,
  },
  downloadButtonText: {
    color: colors.whiteText,
    fontSize: fontSize.textSize16,
    fontWeight: 'bold',
  },
});
