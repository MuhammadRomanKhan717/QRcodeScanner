import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import DocumentPicker from 'react-native-document-picker';
import QRCode from 'react-native-qrcode-svg';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
import axios from 'axios';
import {moderateScale, scaleHeight} from '../../utils/dimensions';
import {colors} from '../../utils/LightTheme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../../components/commonComponents/Header';
import {useNavigation} from '@react-navigation/native';
import {contents} from '../../context';
import ShareDownloadComponent from '../../components/generateQRCodesComponent/ShareDownloadComponent';

const QRCodeForAudio = () => {
  const navigation = useNavigation();
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
      console.log(contents('FileSelected'), res);
      setFileUri(res.uri);
      uploadFileToGoFile(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        Alert.alert(contents('Cancelled'), contents('FileSelectionCancelled'));
      } else {
        Alert.alert(contents('Error'), contents('FilePickError'));
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
        console.log(contents('UploadSuccess'), fileUrl);
        setDownloadUrl(fileUrl);
      } else {
        throw new Error(contents('UploadFailed'));
      }
    } catch (error) {
      Alert.alert(contents('Error'), contents('UploadError'));
      console.error(error);
    }
    setUploading(false);
  };

  const shareQRCode = async () => {
    if (!downloadUrl) {
      Alert.alert(contents('Error'), contents('UploadFirstError'));
      return;
    }

    try {
      const uri = await viewShotRef.current.capture();
      if (!uri) return;

      const options = {
        title: contents('ShareQRCodeTitle'),
        url: `file://${uri}`,
        type: 'image/png',
      };
      await Share.open(options);
    } catch (error) {
      console.error(contents('ShareError'), error);
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title={
          mode === 'Audio'
            ? contents('GenerateQRaudio')
            : contents('GenerateQRcodeforPPTX')
        }
        onBackPress={() => navigation.goBack()}
        onBackLongPress={() => Alert.alert(contents('LongPressbutton'))}
        rightComponent={null}
      />
      <Text style={styles.heading}>
        {mode === 'Audio'
          ? contents('AudioQRCodeGenerator')
          : contents('PPTXQRCodeGenerator')}
      </Text>

      <TextInput
        style={styles.input}
        placeholder={contents('NameYourQR')}
        value={qrName}
        onChangeText={setQrName}
      />

      <TouchableOpacity style={styles.uploadButton} onPress={pickFile}>
        <Icon name="upload" size={20} color={colors.primary} />
        <Text style={styles.uploadButtonText}>{contents('UploadFile')}</Text>
      </TouchableOpacity>

      {uploading && <ActivityIndicator size="large" color={colors.primary} />}
      {downloadUrl && <ShareDownloadComponent downloadUrl={downloadUrl} />}
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
