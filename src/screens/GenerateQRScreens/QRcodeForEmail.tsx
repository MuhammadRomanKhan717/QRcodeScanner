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
import {colors} from '../../utils/LightTheme';
import Header from '../../components/commonComponents/Header';

const QRcodeForEmail = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState(''); // Default email is empty
  const [subject, setSubject] = useState(''); // Default subject
  const [body, setBody] = useState(''); // Default body text
  const [qrValue, setQrValue] = useState('');
  const viewShotRef = useRef(null);

  // Generate QR Code
  const generateQRCode = () => {
    if (!email) {
      Alert.alert('Error', 'Please enter an email recipient.');
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
      Alert.alert('Error', 'Generate the QR code first.');
      return;
    }

    try {
      const uri = await captureQR();
      const options = {
        title: 'Share QR Code',
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
        reject('ViewShot ref not found');
      }
    });
  };

  // Download QR Code
  const downloadQRCode = async () => {
    if (!qrValue) {
      Alert.alert('Error', 'Generate the QR code first.');
      return;
    }

    try {
      const uri = await captureQR();
      Alert.alert('Success', `QR Code saved to: ${uri}`);
    } catch (error) {
      console.error('Error saving QR Code:', error);
    }
  };

  return (
    <View>
      <Header
        title="generate the QR code"
        onBackPress={() => navigation.goBack()}
        onBackLongPress={() =>
          Alert.alert('Long Press', 'You held the back button!')
        }
        rightComponent={null}
      />
      {/* Email Input */}
      <ScrollView style={{}}>
        <View style={styles.container}>
          <Text style={styles.heading}>Email QR Code Generator</Text>
          <TextInput
            style={styles.input}
            placeholder="E-mail recipient"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          {/* Subject Input */}
          <TextInput
            style={styles.input}
            placeholder="Subject"
            value={subject}
            onChangeText={setSubject}
          />

          {/* Body Input */}
          <TextInput
            style={styles.textArea}
            placeholder="Body Text"
            value={body}
            onChangeText={setBody}
            multiline={true}
            numberOfLines={4}
          />

          {/* Generate Button */}
          <TouchableOpacity style={styles.button} onPress={generateQRCode}>
            <Text style={styles.buttonText}>Generate QR Code</Text>
          </TouchableOpacity>

          {/* QR Code Display */}
          {qrValue ? (
            <View style={styles.qrContainer}>
              <ViewShot ref={viewShotRef} options={{format: 'png', quality: 1}}>
                <QRCode value={qrValue} size={200} />
              </ViewShot>

              {/* Share Button */}
              <TouchableOpacity
                style={styles.shareButton}
                onPress={shareQRCode}>
                <Text style={styles.shareButtonText}>Share QR Code</Text>
              </TouchableOpacity>

              {/* Download Button */}
              <TouchableOpacity
                style={styles.downloadButton}
                onPress={downloadQRCode}>
                <Text style={styles.downloadButtonText}>Download QR Code</Text>
              </TouchableOpacity>
            </View>
          ) : null}
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
    fontSize: moderateScale(20),
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
    shadowColor: colors.black,
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(5),
    shadowOffset: {width: 0, height: moderateScale(2)},
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
    shadowColor: colors.black,
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(5),
    shadowOffset: {width: 0, height: moderateScale(2)},
    elevation: 4,
  },
  button: {
    backgroundColor: colors.highlightSelected,
    paddingVertical: moderateScale(15),
    borderRadius: moderateScale(10),
    width: '100%',
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOpacity: 0.2,
    shadowRadius: moderateScale(10),
    shadowOffset: {width: 0, height: moderateScale(4)},
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
    fontSize: moderateScale(16),
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
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  },
});
