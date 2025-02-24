import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
  Modal,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import DocumentPicker from 'react-native-document-picker';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Header from '../../components/commonComponents/Header';
import {moderateScale} from '../../utils/dimensions';
import {colors, fontSize} from '../../utils/LightTheme';
import Animated, {FadeIn, BounceIn} from 'react-native-reanimated';
import {contents} from '../../context';
import ShareDownloadComponent from '../../components/generateQRCodesComponent/ShareDownloadComponent';

const GenerateCustomQRCode = () => {
  const navigation = useNavigation();
  const [entries, setEntries] = useState<
    {type: 'text' | 'file'; value: string}[]
  >([]);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState('');

  // Pick file function
  const pickFile = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [
          DocumentPicker.types.audio,
          DocumentPicker.types.pdf,
          DocumentPicker.types.images,
          DocumentPicker.types.video,
          DocumentPicker.types.allFiles,
          DocumentPicker.types.zip,
          DocumentPicker.types.xls,
        ],
      });

      if (!res || !res.uri) {
        setError(contents('FilePickError'));
        return;
      }

      setError('');
      setEntries([...entries, {type: 'file', value: res.uri}]);
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

  // Upload file function
  const uploadFileToGoFile = async file => {
    setLoading(true);
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
    setLoading(false);
  };

  // Add new text field
  const addTextField = () => {
    setEntries([...entries, {type: 'text', value: ''}]);
    setModalVisible(false);
  };

  // Handle text input change
  const handleTextChange = (text: string, index: number) => {
    const updatedEntries = [...entries];
    updatedEntries[index].value = text;
    setEntries(updatedEntries);
  };

  // Remove field
  const removeField = (index: number) => {
    setEntries(entries.filter((_, i) => i !== index));
  };

  return (
    <View style={styles.container}>
      <Header
        title={contents('GenerateCustomQRCode')}
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={styles.wrapper}>
        <Animated.Text entering={FadeIn.duration(500)} style={styles.title}>
          {contents('UploadFileOrEnterText')}
        </Animated.Text>

        {/* Display added text fields and files */}
        {entries.map((entry, index) => (
          <View key={index} style={styles.entryContainer}>
            {entry.type === 'text' ? (
              <TextInput
                style={styles.input}
                placeholder={contents('EnterTextForQR')}
                placeholderTextColor={colors.grey600}
                value={entry.value}
                onChangeText={text => handleTextChange(text, index)}
              />
            ) : (
              <Text style={styles.fileText}>{contents('FileUploaded')}</Text>
            )}
            <TouchableOpacity
              onPress={() => removeField(index)}
              style={styles.deleteButton}>
              <MaterialIcons name="close" size={24} color={colors.error} />
            </TouchableOpacity>
          </View>
        ))}

        {/* Button to open modal for adding text or uploading file */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}>
          <MaterialIcons name="add-circle" size={24} color={colors.white} />
          <Text style={styles.addButtonText}>{contents('AddMore')}</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Show QR code download component if file is uploaded */}
      {downloadUrl && (
        <Animated.View entering={BounceIn.duration(700)}>
          <ShareDownloadComponent downloadUrl={downloadUrl} isActive={true} />
        </Animated.View>
      )}

      {/* Modal for adding text or uploading file */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{contents('ChooseQRContent')}</Text>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={pickFile}
              disabled={loading}>
              {loading ? (
                <ActivityIndicator size="small" color={colors.white} />
              ) : (
                <>
                  <MaterialIcons
                    name="file-upload"
                    size={24}
                    color={colors.white}
                  />
                  <Text style={styles.modalButtonText}>
                    {contents('UploadFile')}
                  </Text>
                </>
              )}
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalButton} onPress={addTextField}>
              <MaterialIcons
                name="text-fields"
                size={24}
                color={colors.white}
              />
              <Text style={styles.modalButtonText}>
                {contents('EnterTextForQR')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalButtonClose}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.modalButtonText}>{contents('Close')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default GenerateCustomQRCode;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: moderateScale(20),
    backgroundColor: colors.white,
  },
  wrapper: {
    padding: moderateScale(20),
  },
  title: {
    fontSize: fontSize.textSize21,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: moderateScale(10),
  },
  contentContainer: {paddingBottom: moderateScale(20)},
  entryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: moderateScale(10),
    backgroundColor: colors.grey100,
    padding: moderateScale(10),
    borderRadius: 10,
  },
  input: {
    flex: 1,
    fontSize: fontSize.textSize18,
    padding: moderateScale(10),
    color: colors.blackText,
  },
  deleteButton: {marginLeft: 10},
  addButton: {
    flexDirection: 'row',
    backgroundColor: colors.success,
    padding: moderateScale(12),
    borderRadius: moderateScale(10),
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: moderateScale(10),
  },
  addButtonText: {
    color: colors.whiteText,
    fontSize: fontSize.textSize16,
    marginLeft: moderateScale(5),
  },
  generateButton: {
    backgroundColor: colors.highlightSelected,
    paddingVertical: moderateScale(15),
    borderRadius: moderateScale(8),
    alignItems: 'center',
    marginTop: moderateScale(20),
  },
  buttonText: {
    color: colors.white,
    fontSize: fontSize.textSize16,
    fontWeight: 'bold',
  },
  warningText: {
    color: colors.warning,
    fontSize: fontSize.textSize14,
    marginTop: moderateScale(10),
    textAlign: 'center',
  },
  qrCodeContainer: {alignItems: 'center', marginTop: moderateScale(20)},
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '85%',
    backgroundColor: colors.white,
    padding: moderateScale(20),
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  modalTitle: {
    fontSize: fontSize.textSize18,
    fontWeight: '600',
    color: colors.blackText,
    marginBottom: moderateScale(10),
    textAlign: 'center',
  },
  modalButton: {
    flexDirection: 'row',
    backgroundColor: colors.tabSelected,
    padding: moderateScale(12),
    borderRadius: 10,
    marginVertical: 8,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalButtonText: {
    color: colors.whiteText,
    fontSize: fontSize.textSize16,
    marginLeft: moderateScale(8),
  },
  modalButtonClose: {
    flexDirection: 'row',
    backgroundColor: colors.warning,
    padding: moderateScale(12),
    borderRadius: 10,
    marginVertical: 8,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
