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

const QRcodeForWhatsApp = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [qrValue, setQrValue] = useState('');
  const viewShotRef = useRef(null);

  // Generate QR Code
  const generateQRCode = () => {
    if (!phoneNumber) {
      Alert.alert('Error', 'Please enter a phone number.');
      return;
    }
    const formattedPhone = phoneNumber.replace(/\D/g, ''); // Remove non-numeric characters
    const whatsappLink = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(
      message,
    )}`;
    setQrValue(whatsappLink);
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
          const newPath = `${RNFS.DocumentDirectoryPath}/QRCode.png`;
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
    <View style={styles.container}>
      <Text style={styles.heading}>WhatsApp QR Code Generator</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter phone number"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter message (optional)"
        value={message}
        onChangeText={setMessage}
      />
      <TouchableOpacity style={styles.button} onPress={generateQRCode}>
        <Text style={styles.buttonText}>Generate QR Code</Text>
      </TouchableOpacity>

      {qrValue ? (
        <View style={styles.qrContainer}>
          <ViewShot ref={viewShotRef} options={{format: 'png', quality: 1}}>
            <QRCode value={qrValue} size={200} />
          </ViewShot>

          <TouchableOpacity style={styles.button} onPress={shareQRCode}>
            <Text style={styles.buttonText}>Share QR Code</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={downloadQRCode}>
            <Text style={styles.buttonText}>Download QR Code</Text>
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
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    elevation: 3,
  },
  button: {
    backgroundColor: '#25D366',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  qrContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
});
