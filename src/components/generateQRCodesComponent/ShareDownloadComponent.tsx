import React, {useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
import QRCode from 'react-native-qrcode-svg';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {moderateScale} from '../../utils/dimensions';
import {colors} from '../../utils/LightTheme';
import {contents} from '../../context';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import RNFS from 'react-native-fs';
interface ShareDownloadComponentProps {
  downloadUrl: string | null;
}

const ShareDownloadComponent: React.FC<ShareDownloadComponentProps> = ({
  downloadUrl,
  isActive,
}) => {
  const viewShotRef = useRef<ViewShot>(null);

  const shareQRCode = async () => {
    if (!downloadUrl) {
      Alert.alert(contents('Error'), contents('UploadFirstError'));
      return;
    }

    try {
      const uri = await viewShotRef.current?.capture();
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

  const downloadQRCode = async () => {
    if (!viewShotRef.current) {
      Alert.alert(contents('Error'), contents('DownloadQRCodeError'));
      return;
    }

    try {
      // Capture the QR code image
      const uri = await viewShotRef?.current?.capture();
      if (!uri) {
        Alert.alert(contents('Error'), contents('QRGenerationFailed'));
        return;
      }

      // Define the path where the file should be saved
      const filePath = `${RNFS.PicturesDirectoryPath}/QRCode_${Date.now()}.png`;

      // Move the file to the desired location
      await RNFS.moveFile(uri, filePath);

      if (Platform.OS === 'android') {
        // Request permission to save to gallery
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        );

        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert(
            contents('PermissionDenied'),
            contents('StoragePermissionError'),
          );
          return;
        }
      }

      // Save to the user's gallery
      await CameraRoll.save(filePath, {type: 'photo'});

      Alert.alert(contents('Success'), contents('DownloadQRCodeSuccess'));
    } catch (error) {
      console.error(contents('DownloadError'), error);
      Alert.alert(contents('Error'), contents('DownloadQRCodeError'));
    }
  };

  return (
    <View style={styles.qrContainer}>
      <ViewShot ref={viewShotRef} options={{format: 'png', quality: 1}}>
        <QRCode value={downloadUrl || ''} size={200} />
      </ViewShot>
      <Text style={styles.qrText}>{contents('ScanToDownload')}</Text>

      <TouchableOpacity style={styles.button} onPress={shareQRCode}>
        <Icon name="share" size={20} color={colors.whiteText} />
        <Text style={styles.buttonText}>{contents('ShareQRCode')}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={downloadQRCode}>
        <Icon name="download" size={20} color={colors.whiteText} />
        <Text style={styles.buttonText}>{contents('DownloadQRCode')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ShareDownloadComponent;

const styles = {
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
    flexDirection: 'row',
    backgroundColor: colors.highlightSelected,
    paddingVertical: moderateScale(15),
    borderRadius: moderateScale(10),
    width: moderateScale(320),
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    marginTop: moderateScale(15),
  },
  buttonText: {
    color: colors.whiteText,
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    marginLeft: moderateScale(5),
  },
};
