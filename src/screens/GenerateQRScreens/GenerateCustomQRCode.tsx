import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Modal,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import QRCode from 'react-native-qrcode-svg';
import * as DocumentPicker from 'react-native-document-picker';
import {contents} from '../../context';
import {useNavigation} from '@react-navigation/native';
import {moderateScale, scaleWidth} from '../../utils/dimensions';
import {colors, fontSize} from '../../utils/LightTheme';
import Header from '../../components/commonComponents/Header';
import ShareDownloadComponent from '../../components/generateQRCodesComponent/ShareDownloadComponent';

const GenerateCustomQRCode = () => {
  const navigation = useNavigation();
  const [entries, setEntries] = useState<
    {type: 'text' | 'file'; value: string}[]
  >([]);
  const [qrCodeValue, setQrCodeValue] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const pickFile = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [
          DocumentPicker.types.audio,
          DocumentPicker.types.pdf,
          DocumentPicker.types.images,
        ],
      });

      setError('');
      setModalVisible(false);
      setEntries([...entries, {type: 'file', value: res.uri}]);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        Alert.alert(contents('Cancelled'), contents('FileSelectionCancelled'));
      } else {
        setError(contents('FilePickError'));
        console.error(err);
      }
    }
  };

  const addTextField = () => {
    setEntries([...entries, {type: 'text', value: ''}]);
    setModalVisible(false);
  };

  const handleTextChange = (text: string, index: number) => {
    const updatedEntries = [...entries];
    updatedEntries[index].value = text;
    setEntries(updatedEntries);
  };

  const removeField = (index: number) => {
    setEntries(entries.filter((_, i) => i !== index));
  };

  const getQRCodeData = () => {
    return entries
      .map(entry => entry.value)
      .join('\n')
      .trim();
  };

  const generateQRCode = () => {
    if (!getQRCodeData()) {
      Alert.alert(contents('Error'), contents('NoInputTextError'));
      return;
    }
    setQrCodeValue(getQRCodeData());
  };

  return (
    <View style={styles.container}>
      <Header
        title={contents('GenerateCustomQRCode')}
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={styles.contentContainer}>
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

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}>
          <MaterialIcons name="add-circle" size={24} color={colors.white} />
          <Text style={styles.addButtonText}>{contents('AddMore')}</Text>
        </TouchableOpacity>
      </ScrollView>

      <TouchableOpacity style={styles.generateButton} onPress={generateQRCode}>
        <Text style={styles.buttonText}>{contents('GenerateQRCode')}</Text>
      </TouchableOpacity>

      {qrCodeValue ? (
        <ShareDownloadComponent downloadUrl={qrCodeValue} />
      ) : (
        <Text style={styles.warningText}>{contents('NoInputTextError')}</Text>
      )}

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{contents('ChooseQRContent')}</Text>

            <TouchableOpacity style={styles.modalButton} onPress={pickFile}>
              <MaterialIcons
                name="file-upload"
                size={24}
                color={colors.white}
              />
              <Text style={styles.modalButtonText}>
                {contents('UploadFile')}
              </Text>
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
    fontSize: moderateScale(18),
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
    fontSize: moderateScale(16),
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
    fontSize: moderateScale(14),
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
    fontSize: moderateScale(18),
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
    fontSize: moderateScale(16),
    marginLeft: moderateScale(8),
  },
});
