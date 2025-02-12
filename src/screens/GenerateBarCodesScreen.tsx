import React from 'react';
import {View, Text, Button} from 'react-native';

const GenerateBarCodesScreen = ({navigation}: any) => {
  return (
    <View>
      <Text>BarCode Screen</Text>
      <Button
        title="Go to QRCode Screen"
        onPress={() => navigation.navigate('QRCodeScreen')}
      />
    </View>
  );
};

export default GenerateBarCodesScreen;
