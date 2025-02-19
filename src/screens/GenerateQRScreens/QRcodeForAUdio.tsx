import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import DocumentPicker from 'react-native-document-picker';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../../components/commonComponents/Header';
import {moderateScale} from '../../utils/dimensions';
import {colors} from '../../utils/LightTheme';
import Animated, {FadeIn, FadeOut, BounceIn} from 'react-native-reanimated';
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
  const [error, setError] = useState('');

  const pickFile = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.audio, DocumentPicker.types.pdf],
      });
      setFileUri(res.uri);
      setError('');
      uploadFileToGoFile(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        Alert.alert(contents('Cancelled'), contents('FileSelectionCancelled'));
      } else {
        setError(contents('FilePickError'));
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
        setDownloadUrl(response.data.data.downloadPage);
        setError('');
      } else {
        throw new Error(contents('UploadFailed'));
      }
    } catch (error) {
      setError(contents('UploadError'));
      console.error(error);
    }
    setUploading(false);
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
      />

      <ScrollView contentContainerStyle={styles.wrapper}>
        <Animated.Text entering={FadeIn.duration(500)} style={styles.title}>
          {mode === 'Audio'
            ? contents('AudioQRCodeGenerator')
            : contents('PPTXQRCodeGenerator')}
        </Animated.Text>

        <TextInput
          style={styles.input}
          placeholder={contents('NameYourQR')}
          value={qrName}
          onChangeText={setQrName}
        />

        <TouchableOpacity style={styles.uploadButton} onPress={pickFile}>
          <Icon name="upload" size={20} color={colors.white} />
          <Text style={styles.uploadButtonText}>{contents('UploadFile')}</Text>
        </TouchableOpacity>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {uploading && <ActivityIndicator size="large" color={colors.primary} />}

        {downloadUrl && (
          <Animated.View entering={BounceIn.duration(700)}>
            <ShareDownloadComponent downloadUrl={downloadUrl} isActive={true} />
          </Animated.View>
        )}
      </ScrollView>
    </View>
  );
};

export default QRCodeForAudio;

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
    fontSize: moderateScale(21),
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: moderateScale(10),
  },
  input: {
    width: '100%',
    fontSize: moderateScale(18),
    padding: moderateScale(10),
    borderWidth: 1,
    borderColor: colors.grey800,
    borderRadius: moderateScale(5),
    marginBottom: moderateScale(15),
  },
  uploadButton: {
    flexDirection: 'row',
    backgroundColor: colors.highlightSelected,
    padding: moderateScale(12),
    borderRadius: moderateScale(5),
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  uploadButtonText: {
    color: colors.white,
    fontSize: moderateScale(16),
    marginLeft: moderateScale(5),
  },
  errorText: {
    color: 'red',
    fontSize: moderateScale(14),
    marginTop: moderateScale(5),
  },
});
