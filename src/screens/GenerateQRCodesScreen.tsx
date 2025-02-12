import React from 'react';
import {View, Text, Button} from 'react-native';

const GenerateQRCodesScreen = ({navigation}: any) => {
  return (
    <View>
      <Text>QRCode Screen</Text>
      <Button
        title="Go to BarCode Screen"
        onPress={() => navigation.navigate('BarCodeScreen')}
      />
    </View>
  );
};

export default GenerateQRCodesScreen;
