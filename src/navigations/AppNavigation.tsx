import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

import {RootStackParamList} from './appNavigation.type';
import HomeScreen from '../screens/HomeScreen';
import ScanBarCodesScreen from '../screens/ScanBarCodesScreen';
import GenerateQRCodesScreen from '../screens/GenerateQRCodesScreen';
import GenerateBarCodesScreen from '../screens/GenerateBarCodesScreen';
import ScanQRCodesScreen from '../screens/ScanQRCodesScreen';
import GenerateWifiCode from '../screens/GenerateQRScreens/GenerateWifiCode';
import QrcodeForMap from '../screens/GenerateQRScreens/QrcodeForMap';
import QRCodeForAudio from '../screens/GenerateQRScreens/QRcodeForAUdio';
import QRcodeForWhatsApp from '../screens/GenerateQRScreens/QRcodeForWhatsApp';
import QRcodeForEmail from '../screens/GenerateQRScreens/QRcodeForEmail';
import QRcodeForSocialMedia from '../screens/GenerateQRScreens/QRcodeForSocialMedia';
import QRCodeForVCard from '../screens/GenerateQRScreens/QRCodeForVCard';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="GenerateBarCodesScreen"
          component={GenerateBarCodesScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="GenerateQRCodesScreen"
          component={GenerateQRCodesScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ScanQRCodesScreen"
          component={ScanQRCodesScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ScanBarCodesScreen"
          component={ScanBarCodesScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="GenWifiQrCode"
          component={GenerateWifiCode}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="QRcodeForMap"
          component={QrcodeForMap}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="QRCodeForAudio"
          component={QRCodeForAudio}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="QRcodeForWhatsApp"
          component={QRcodeForWhatsApp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="QRcodeForEmail"
          component={QRcodeForEmail}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="QRcodeForSocialMedia"
          component={QRcodeForSocialMedia}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="QRCodeForVCard"
          component={QRCodeForVCard}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
