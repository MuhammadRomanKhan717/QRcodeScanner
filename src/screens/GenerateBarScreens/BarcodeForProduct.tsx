import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Barcode from 'react-native-barcode-svg'; // Barcode library
import {launchImageLibrary} from 'react-native-image-picker';
import FastImage from 'react-native-fast-image';
import {moderateScale, scaleHeight, scaleWidth} from '../../utils/dimensions';
import {colors} from '../../utils/LightTheme';
import Header from '../../components/commonComponents/Header';
import ShareDownloadComponent from '../../components/generateQRCodesComponent/ShareDownloadComponent'; // Assuming this component is reusable

const BarcodeForProduct = () => {
  const navigation = useNavigation();
  const [barcodeValues, setBarcodeValues] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [imageUris, setImageUris] = useState<string[]>([]); // To store image URIs
  const [isActive, setIsActive] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string>('');

  // Function to generate Barcode
  const generateBarcode = () => {
    if (inputValue.trim() !== '') {
      setBarcodeValues([inputValue]);
      setInputValue('');
      setIsActive(true);
      setDownloadUrl(`https://example.com/barcode-download-url/${inputValue}`); // Dynamic download URL based on input
    } else {
      Alert.alert('Please enter text before generating barcode!');
    }
  };

  // Function to pick an image
  const pickImage = () => {
    if (imageUris.length >= 5) {
      alert('You can only upload 5 images');
      return; // Stop if 5 images are already uploaded
    }

    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.assets && response.assets.length > 0) {
        const newImageUri = response.assets[0].uri || null;
        if (newImageUri && !imageUris.includes(newImageUri)) {
          setImageUris(prevUris => [...prevUris, newImageUri]);
        }
      }
    });
  };

  const renderImageItem = ({item}: {item: string}) => (
    <View style={styles.imageContainer}>
      <FastImage
        source={{uri: item}}
        style={styles.uploadedImage}
        resizeMode={FastImage.resizeMode.contain}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Header
        onBackPress={() => navigation.goBack()}
        title="Barcode Generator"
      />

      {/* Image Picker Button */}
      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        <Text style={styles.imagePickerText}>Pick Image</Text>
      </TouchableOpacity>

      {/* Display Uploaded Images */}
      {imageUris.length > 0 && (
        <FlatList
          data={imageUris}
          renderItem={renderImageItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          style={styles.imageList}
        />
      )}

      {/* Text Input for Barcode Generation */}
      <TextInput
        style={styles.input}
        placeholder="Enter text for barcode"
        value={inputValue}
        onChangeText={setInputValue}
      />

      {/* Button to generate barcode */}
      <Button title="Generate Barcode" onPress={generateBarcode} />
      {/* Display barcode */}
      <ScrollView style={styles.barcodeList}>
        {barcodeValues.length > 0 ? (
          barcodeValues.map((value, index) => {
            const {width, height} = {
              width: scaleWidth(2.0),
              height: scaleHeight(50),
            };

            return (
              <View key={index} style={styles.barcodeContainer}>
                <Barcode
                  value={value}
                  format="CODE39"
                  width={width}
                  height={height}
                />
                <Text style={styles.barcodeText}>{value}</Text>
              </View>
            );
          })
        ) : (
          <Text style={styles.emptyText}>No Barcodes Generated</Text>
        )}
      </ScrollView>
      {/* Display ShareDownloadComponent if barcode is generated */}
      {isActive && downloadUrl && (
        <ShareDownloadComponent downloadUrl={downloadUrl} isActive={true} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: moderateScale(20),
  },
  imagePicker: {
    backgroundColor: '#007bff',
    paddingVertical: moderateScale(12),
    paddingHorizontal: moderateScale(20),
    borderRadius: moderateScale(5),
    marginBottom: scaleHeight(10),
  },
  imagePickerText: {
    color: colors.white,
    fontSize: moderateScale(16),
    textAlign: 'center',
  },
  imageList: {
    marginTop: scaleHeight(10),
    width: '100%',
  },
  imageContainer: {
    marginRight: scaleWidth(10),
    width: scaleWidth(100),
    height: scaleHeight(100),
    borderRadius: moderateScale(10),
    overflow: 'hidden',
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
    borderRadius: moderateScale(10),
  },
  input: {
    height: scaleHeight(50),
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: moderateScale(5),
    paddingHorizontal: moderateScale(15),
    marginBottom: scaleHeight(15),
    fontSize: moderateScale(16),
    width: scaleWidth(250),
  },
  barcodeList: {
    marginTop: scaleHeight(20),
    width: '100%',
  },
  barcodeContainer: {
    marginTop: scaleHeight(10),
    padding: moderateScale(10),
    backgroundColor: '#f8f8f8',
    borderRadius: moderateScale(5),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
  },
  barcodeText: {
    marginTop: scaleHeight(5),
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: colors.black,
  },
  emptyText: {
    fontSize: moderateScale(18),
    color: '#888',
    textAlign: 'center',
  },
});

export default BarcodeForProduct;
