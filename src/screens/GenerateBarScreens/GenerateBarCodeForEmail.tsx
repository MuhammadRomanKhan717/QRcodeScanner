import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  ScrollView,
} from 'react-native';
import Barcode from 'react-native-barcode-svg';

const BarcodeGenerator = () => {
  const [barcodeValues, setBarcodeValues] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const generateBarcode = () => {
    if (inputValue.trim() !== '') {
      setBarcodeValues([...barcodeValues, inputValue]);
      setInputValue('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Barcode Generator</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter value"
        value={inputValue}
        onChangeText={setInputValue}
      />
      <Button title="Generate Barcode" onPress={generateBarcode} />
      <ScrollView style={styles.barcodeList}>
        {barcodeValues.map((value, index) => (
          <View key={index} style={styles.barcodeContainer}>
            <Barcode value={value} format="CODE128" />
            <Text>{value}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '80%',
  },
  barcodeList: {
    marginTop: 20,
    width: '100%',
  },
  barcodeContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 5,
    alignItems: 'center',
  },
});

export default BarcodeGenerator;
