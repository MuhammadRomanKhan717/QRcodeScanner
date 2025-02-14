import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import DocumentPicker from 'react-native-document-picker';
import QRCode from 'react-native-qrcode-svg';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
import CameraRoll from '@react-native-camera-roll/camera-roll';
import axios from 'axios';
import {moderateScale, scaleHeight} from '../../utils/dimensions';
import {colors} from '../../utils/LightTheme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const QRCodeForAudio = () => {
  const route = useRoute();
  const mode = route?.params?.mode;
  const [fileUri, setFileUri] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [qrName, setQrName] = useState('');
  const viewShotRef = useRef(null);

  const pickFile = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles],
      });
      console.log('File selected:', res);
      setFileUri(res.uri);
      uploadFileToGoFile(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        Alert.alert('Cancelled', 'File selection was cancelled');
      } else {
        Alert.alert('Error', 'An error occurred while picking the file');
        console.error(err);
      }
    }
  };

  const uploadFileToGoFile = async file => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', {
        uri: file.uri,
        name: file.name,
        type: file.type,
      });

      const response = await axios.post(
        'https://store1.gofile.io/uploadFile',
        formData,
        {headers: {'Content-Type': 'multipart/form-data'}},
      );

      if (response.data.status === 'ok') {
        const fileUrl = response.data.data.downloadPage;
        console.log('Uploaded successfully:', fileUrl);
        setDownloadUrl(fileUrl);
      } else {
        throw new Error('Failed to upload file');
      }
    } catch (error) {
      Alert.alert('Error', 'File upload failed.');
      console.error(error);
    }
    setUploading(false);
  };

  const shareQRCode = async () => {
    if (!downloadUrl) {
      Alert.alert('Error', 'Upload a file first to generate QR code.');
      return;
    }

    try {
      const uri = await viewShotRef.current.capture();
      if (!uri) return;

      const options = {
        title: 'Share QR Code',
        url: `file://${uri}`,
        type: 'image/png',
      };
      await Share.open(options);
    } catch (error) {
      console.error('Share error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        {' '}
        {mode === 'Audio' ? 'AudioQR Code Generator' : 'PPTX QR Code Generator'}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Name your QR (optional)"
        value={qrName}
        onChangeText={setQrName}
      />

      <TouchableOpacity style={styles.uploadButton} onPress={pickFile}>
        <Icon name="upload" size={20} color={colors.primary} />
        <Text style={styles.uploadButtonText}>Upload File</Text>
      </TouchableOpacity>

      {uploading && <ActivityIndicator size="large" color={colors.primary} />}

      {downloadUrl && (
        <View style={styles.qrContainer}>
          <ViewShot ref={viewShotRef} options={{format: 'png', quality: 1}}>
            <QRCode value={downloadUrl} size={200} />
          </ViewShot>
          <Text style={styles.qrText}>Scan to download the file</Text>

          <TouchableOpacity style={styles.button} onPress={shareQRCode}>
            <Text style={styles.buttonText}>Share QR Code</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => {}}>
            <Text style={styles.buttonText}>Download QR Code</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default QRCodeForAudio;

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: moderateScale(20),
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
    elevation: 4,
  },
  uploadButton: {
    backgroundColor: colors.highlightSelected,
    paddingVertical: moderateScale(5),
    borderRadius: moderateScale(10),
    width: '100%',
    alignItems: 'center',
    elevation: 6,
  },
  uploadButtonText: {
    color: colors.whiteText,
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  },
  qrContainer: {
    marginTop: moderateScale(15),
    alignItems: 'center',
  },
  qrText: {
    marginTop: moderateScale(10),
    fontSize: moderateScale(14),
    color: colors.grey800,
  },
  button: {
    backgroundColor: colors.highlightSelected,
    paddingVertical: moderateScale(15),
    borderRadius: moderateScale(10),
    width: moderateScale(320),
    alignItems: 'center',
    elevation: 6,
    marginTop: moderateScale(15),
  },
  buttonText: {
    color: colors.whiteText,
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  },
};
