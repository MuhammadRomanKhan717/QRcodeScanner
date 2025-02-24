import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import Barcode from 'react-native-barcode-svg';
import {launchImageLibrary} from 'react-native-image-picker';
import FastImage from 'react-native-fast-image';
import {moderateScale, scaleHeight, scaleWidth} from '../../utils/dimensions';
import {colors} from '../../utils/LightTheme';

const BarcodeForProduct = () => {
  const [barcodeValues, setBarcodeValues] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);

  // Function to generate barcode
  const generateBarcode = () => {
    if (inputValue.trim() !== '') {
      setBarcodeValues([...barcodeValues, inputValue]);
      setInputValue('');
    }
  };

  // Function to pick an image
  const pickImage = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.assets && response.assets.length > 0) {
        setImageUri(response.assets[0].uri || null);
      }
    });
  };

  // Function to determine barcode size dynamically
  const getBarcodeSize = (text: string) => {
    if (text.length <= 10) {
      return {width: scaleWidth(2.5), height: scaleHeight(80)}; // Large Barcode
    } else if (text.length <= 20) {
      return {width: scaleWidth(2.0), height: scaleHeight(50)}; // Medium Barcode
    } else {
      return {width: scaleWidth(1.5), height: scaleHeight(30)}; // Small Barcode
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Barcode Generator</Text>

      {/* Image Picker Button */}
      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        <Text style={styles.imagePickerText}>Pick an Image</Text>
      </TouchableOpacity>

      {/* Display Selected Image */}
      {imageUri && (
        <FastImage
          source={{uri: imageUri}}
          style={styles.image}
          resizeMode="contain"
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="Enter text or URL"
        value={inputValue}
        onChangeText={setInputValue}
      />
      <Button title="Generate Barcode" onPress={generateBarcode} />

      <ScrollView style={styles.barcodeList}>
        {barcodeValues.map((value, index) => {
          const {width, height} = getBarcodeSize(value);
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
        })}
      </ScrollView>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: moderateScale(20),
  },
  title: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    marginBottom: scaleHeight(20),
  },
  imagePicker: {
    backgroundColor: '#007bff',
    padding: moderateScale(10),
    borderRadius: moderateScale(5),
    marginBottom: scaleHeight(10),
  },
  imagePickerText: {
    color: colors.white,
    fontSize: moderateScale(14),
    textAlign: 'center',
  },
  image: {
    width: scaleWidth(150),
    height: scaleHeight(150),
    borderRadius: moderateScale(10),
    marginBottom: scaleHeight(10),
  },
  input: {
    height: scaleHeight(40),
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: scaleHeight(10),
    paddingHorizontal: moderateScale(10),
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
  },
  barcodeText: {
    marginTop: scaleHeight(5),
    fontSize: moderateScale(14),
  },
});

export default BarcodeForProduct;
