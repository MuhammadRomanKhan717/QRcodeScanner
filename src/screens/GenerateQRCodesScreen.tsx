import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import QrCodeForWifiComp from '../components/generateQRCodesComponent/QrCodeForWifiComp';

const GenerateQRCodesScreen = () => {
  return (
    <View style={{flex: 1}}>
      <Text>hello</Text>
      <QrCodeForWifiComp />
    </View>
  );
};

export default GenerateQRCodesScreen;
