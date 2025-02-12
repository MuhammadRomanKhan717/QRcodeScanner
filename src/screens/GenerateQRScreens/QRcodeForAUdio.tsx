import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import QRCode from 'react-native-qrcode-svg';

const QRCodeForAudio = () => {
  const [audioUri, setAudioUri] = useState<string | null>(null);

  const pickAudioFile = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.audio],
      });
      console.log('File picked:', res);
      setAudioUri(res.uri);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        Alert.alert('Cancelled', 'Audio selection was cancelled');
      } else {
        Alert.alert('Error', 'An error occurred while picking the audio file');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Generate QR Code for Audio</Text>
      <TouchableOpacity style={styles.button} onPress={pickAudioFile}>
        <Text style={styles.buttonText}>Upload Audio File</Text>
      </TouchableOpacity>
      {audioUri && (
        <View style={styles.qrContainer}>
          <QRCode value={audioUri} size={200} />
          <Text style={styles.qrText}>Scan to play the audio</Text>
        </View>
      )}
    </View>
  );
};

export default QRCodeForAudio;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#6C63FF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  qrContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  qrText: {
    marginTop: 10,
    fontSize: 14,
    color: '#333',
  },
});
