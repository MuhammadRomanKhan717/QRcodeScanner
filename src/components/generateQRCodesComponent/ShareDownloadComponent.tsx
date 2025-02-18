import React, {useRef} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
import QRCode from 'react-native-qrcode-svg';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {moderateScale} from '../../utils/dimensions';
import {colors} from '../../utils/LightTheme';
import {contents} from '../../context';

interface ShareDownloadComponentProps {
  downloadUrl: string | null;
}

const ShareDownloadComponent: React.FC<ShareDownloadComponentProps> = ({
  downloadUrl,
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
    Alert.alert(
      contents('DownloadQRCodeTitle'),
      contents('DownloadQRCodeMessage'),
    );
    // Implement actual QR download logic if needed
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
