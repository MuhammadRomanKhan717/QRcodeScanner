import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  ScrollView,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
import CameraRoll from '@react-native-camera-roll/camera-roll';
import {launchImageLibrary} from 'react-native-image-picker';

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
        console.log('User cancelled image selection');
      } else if (response.errorMessage) {
        console.error('Image Picker Error:', response.errorMessage);
      } else {
        setImageUri(response.assets[0].uri);
      }
    });
  };

  // Generate vCard String
  const generateVCard = () => {
    if (!firstName || !lastName || !mobile || !email) {
      Alert.alert('Missing Information', 'Please fill in required fields.');
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
      if (!viewShotRef.current)
        throw new Error('QR Code ViewShot reference is null.');
      const uri = await viewShotRef.current.capture();
      return uri || null;
    } catch (error) {
      Alert.alert('Error', 'Failed to capture QR Code.');
      return null;
    }
  };

  const shareQRCode = async () => {
    if (!qrGenerated) {
      Alert.alert('Error', 'Generate a valid QR Code first.');
      return;
    }
    try {
      const uri = await captureQR();
      if (!uri) return;
      await Share.open({
        title: 'Share QR Code',
        url: `file://${uri}`,
        type: 'image/png',
      });
    } catch (error) {
      console.error('Share error:', error);
    }
  };

  const downloadQRCode = async () => {
    if (!qrGenerated) {
      Alert.alert('Error', 'Generate a valid QR Code first.');
      return;
    }
    try {
      const uri = await captureQR();
      if (!uri) return;
      await CameraRoll.save(uri, {type: 'photo'});
      Alert.alert('Success', 'QR Code saved to Gallery!');
    } catch (error) {
      Alert.alert('Error', 'Failed to save QR Code.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>vCard QR Code Generator</Text>
      <Text style={styles.subheading}>Fill in the details below:</Text>

      {/* Image Selection */}
      <TouchableOpacity style={styles.imagePicker} onPress={selectImage}>
        {imageUri ? (
          <Image source={{uri: imageUri}} style={styles.profileImage} />
        ) : (
          <View style={styles.profileImageContainer}>
            <Image
              source={{
                uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAMAAABC4vDmAAAAMFBMVEXk5ueutLeor7Lf4ePn6eqrsbW5vsHIzM7a3d60ur3BxsjR1NbN0dPX2tzr7O29wsX2DjRMAAADaUlEQVR4nO2bW3LkIAwADYi3be5/25iZZB4bxyDZgqkt+ivZn+0SQgahTNNgMBgMBoPBYDAYDAaDwWCaAGBSG/mn3i53AFQMxt8xdpm6ewE466XU4getpZlVVy9YjHgKPcRE6Ke1KclfRnct2UkLprATpWe05g5W4PzfShmZVHOneGh0D1ZjK5j/yKZ3lpZLCPZ46R7Bcu2sKuN0i1Uzp1gXpxvN8qpeSQjTyMkgAiV0aJFWMGOctnrVpLZXJ/k3DRYQAi5Q2wJGdqkFqZThXj98oHKouK2wGZVhzqra78s/oXK8VobgxF2rHMVpY+WUipSU2goo5/pBoqTUtn6cZ+OV5sScVLTV4y0Kjhgp4fmOVajT3TuMUshTyxPG8kmr5xnGmnBCiu8C8b9JMS7fRyY6vSQwSi0fWDwn9YmfGaBKBUap1dOctGU8JVC3H29LaCGePHnvWKT104lVCgIpUMwXd1JR4KxSGcr+Y917NwhFXTIrTYQ7coNeHjhsVnFnVGZFtTyZL6IPFM7Js/YRfgBcWWduAz2sEN082e55prrPwV+iXii89T3i1NKp8tWhzWsDzqpxnDKlO6AW7J3q38BymFjSdHlvP3pu12LuYHRjdUHuaWlhew5xgApe6Fex7RffLUoPrWmxRkipM1KKNLv+IzjfuBjnuOTv3GcYAawvQN8Rqvy/K7dEG5L5Po4ak4KdF9dpvAtWtdhkvL5l02ue538RPoWoYG0oBpOKQUh9WNJz3pvZqSYRg9VZL3bL017B8iFyxwsmZ2uFniFLC2MpBYh7024VWt4yVQpQ9jiLDr1kYGhaHw+71WiJdHGTaosSMpP2kOnKWwTMlWfyAvq63ic4T+2//ta66L4M9iqju1Y6Xx+Kk5N4q9NTJhDP7bl9rZOZZS/Lple2S8UJJ+IYQhEt6ImF7EShoJasq1P8DeIjBGecMoRYAbeT0Ohsh8Cy797AdmjpT9gItEEtIL4vTULiPoTEx0YsGpHslLlJGr5eqs3iZRCN2tTKSVTPMNGnDwjoVPcgQX1SJ1pVherE7AhJqq6t3Wzr3amq67hHqvPImtMxceiVjimn+koaWT5DTaq3zahMcf2A8ucC5yhXdfqEG51UWrx23+InvphSLb97PxQz3cv2FN++VQeKyzcYDAaDwaA9XxcLKh2A6JUdAAAAAElFTkSuQmCC',
              }}
              style={styles.profileImage}
            />
            <Text style={styles.imageText}>Select Profile Image</Text>
          </View>
        )}
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Mobile"
        value={mobile}
        onChangeText={setMobile}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Company (optional)"
        value={company}
        onChangeText={setCompany}
      />
      <TextInput
        style={styles.input}
        placeholder="Job Title (optional)"
        value={jobTitle}
        onChangeText={setJobTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Street (optional)"
        value={street}
        onChangeText={setStreet}
      />
      <TextInput
        style={styles.input}
        placeholder="City"
        value={city}
        onChangeText={setCity}
      />
      <TextInput
        style={styles.input}
        placeholder="State"
        value={state}
        onChangeText={setState}
      />
      <TextInput
        style={styles.input}
        placeholder="ZIP Code"
        value={zip}
        onChangeText={setZip}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Country"
        value={country}
        onChangeText={setCountry}
      />
      <TextInput
        style={styles.input}
        placeholder="Website (optional)"
        value={website}
        onChangeText={setWebsite}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if (generateVCard()) {
            setQrGenerated(true);
          }
        }}>
        <Text style={styles.buttonText}>Generate QR Code</Text>
      </TouchableOpacity>

      {qrGenerated && (
        <>
          <View style={styles.qrContainer}>
            <ViewShot ref={viewShotRef} options={{format: 'png', quality: 1}}>
              <QRCode value={generateVCard()} size={200} />
            </ViewShot>
            <Text style={styles.qrText}>Scan to save vCard</Text>
          </View>

          <View style={styles.row}>
            <TouchableOpacity style={styles.button} onPress={downloadQRCode}>
              <Text style={styles.buttonText}>Download QR</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={shareQRCode}>
              <Text style={styles.buttonText}>Share QR</Text>
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
  profileImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default QRCodeForVCard;
