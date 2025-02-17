import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
import CameraRoll from '@react-native-camera-roll/camera-roll';
import {launchImageLibrary} from 'react-native-image-picker';
import {contents} from '../../context';

const QRCodeForVCard = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [country, setCountry] = useState('');
  const [website, setWebsite] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [qrGenerated, setQrGenerated] = useState(false);
  const viewShotRef = useRef(null);

  // Function to select an image
  const selectImage = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.didCancel) {
        console.log(contents('ImageSelectionCancelled'));
      } else if (response.errorMessage) {
        console.error(contents('ImagePickerError'), response.errorMessage);
      } else {
        setImageUri(response.assets[0].uri);
      }
    });
  };

  // Generate vCard String
  const generateVCard = () => {
    if (!firstName || !lastName || !mobile || !email) {
      Alert.alert(contents('MissingInfoTitle'), contents('MissingInfoMessage'));
      return null;
    }

    let vcard = `BEGIN:VCARD
VERSION:3.0
FN:${firstName} ${lastName}
TEL;TYPE=mobile:${mobile}
EMAIL:${email}
ORG:${company}
TITLE:${jobTitle}
ADR:;;${street};${city};${state};${zip};${country}
URL:${website}`;

    if (imageUri) {
      vcard += `\nPHOTO;VALUE=URL:${imageUri}`;
    }

    vcard += `\nEND:VCARD`;
    return vcard;
  };

  const captureQR = async () => {
    try {
      if (!viewShotRef.current) throw new Error(contents('QRViewShotError'));
      const uri = await viewShotRef.current.capture();
      return uri || null;
    } catch (error) {
      Alert.alert(contents('Error'), contents('CaptureQRError'));
      return null;
    }
  };

  const shareQRCode = async () => {
    if (!qrGenerated) {
      Alert.alert(contents('Error'), contents('GenerateValidQR'));
      return;
    }
    try {
      const uri = await captureQR();
      if (!uri) return;
      await Share.open({
        title: contents('ShareQRCodeTitle'),
        url: `file://${uri}`,
        type: 'image/png',
      });
    } catch (error) {
      console.error(contents('ShareError'), error);
    }
  };

  const downloadQRCode = async () => {
    if (!qrGenerated) {
      Alert.alert(contents('Error'), contents('GenerateValidQR'));
      return;
    }
    try {
      const uri = await captureQR();
      if (!uri) return;
      await CameraRoll.save(uri, {type: 'photo'});
      Alert.alert(contents('Success'), contents('QRCodeSaved'));
    } catch (error) {
      Alert.alert(contents('Error'), contents('DownloadQRError'));
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>{contents('VCardQRGenerator')}</Text>
      <Text style={styles.subheading}>{contents('FillDetails')}</Text>

      {/* Image Selection */}
      <TouchableOpacity style={styles.imagePicker} onPress={selectImage}>
        {imageUri ? (
          <Image source={{uri: imageUri}} style={styles.profileImage} />
        ) : (
          <View style={styles.profileImageContainer}>
            <Text style={styles.imageText}>
              {contents('SelectProfileImage')}
            </Text>
          </View>
        )}
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder={contents('FirstName')}
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder={contents('LastName')}
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder={contents('Mobile')}
        value={mobile}
        onChangeText={setMobile}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder={contents('Email')}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder={contents('Company')}
        value={company}
        onChangeText={setCompany}
      />
      <TextInput
        style={styles.input}
        placeholder={contents('JobTitle')}
        value={jobTitle}
        onChangeText={setJobTitle}
      />
      <TextInput
        style={styles.input}
        placeholder={contents('Street')}
        value={street}
        onChangeText={setStreet}
      />
      <TextInput
        style={styles.input}
        placeholder={contents('City')}
        value={city}
        onChangeText={setCity}
      />
      <TextInput
        style={styles.input}
        placeholder={contents('State')}
        value={state}
        onChangeText={setState}
      />
      <TextInput
        style={styles.input}
        placeholder={contents('ZipCode')}
        value={zip}
        onChangeText={setZip}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder={contents('Country')}
        value={country}
        onChangeText={setCountry}
      />
      <TextInput
        style={styles.input}
        placeholder={contents('Website')}
        value={website}
        onChangeText={setWebsite}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if (generateVCard()) setQrGenerated(true);
        }}>
        <Text style={styles.buttonText}>{contents('GenerateQR')}</Text>
      </TouchableOpacity>

      {qrGenerated && (
        <>
          <View style={styles.qrContainer}>
            <ViewShot ref={viewShotRef} options={{format: 'png', quality: 1}}>
              <QRCode value={generateVCard()} size={200} />
            </ViewShot>
            <Text style={styles.qrText}>{contents('ScanToSaveVCard')}</Text>
          </View>

          <View style={styles.row}>
            <TouchableOpacity style={styles.button} onPress={downloadQRCode}>
              <Text style={styles.buttonText}>{contents('DownloadQR')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={shareQRCode}>
              <Text style={styles.buttonText}>{contents('ShareQR')}</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {padding: 20, alignItems: 'center'},
  heading: {fontSize: 22, fontWeight: 'bold'},
  subheading: {fontSize: 16, marginBottom: 20, color: '#555'},
  input: {
    width: '90%',
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderRadius: 8,
  },
  imagePicker: {alignItems: 'center', marginBottom: 10, padding: 10},
  profileImage: {width: 100, height: 100, borderRadius: 50, borderWidth: 1},
  imageText: {color: 'blue'},
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {color: '#fff'},
  qrContainer: {marginTop: 20, alignItems: 'center'},
  qrText: {marginTop: 10, fontSize: 14, color: '#555'},
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 15,
  },
});

export default QRCodeForVCard;
