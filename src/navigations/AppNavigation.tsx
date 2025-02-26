import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Screens
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

// Drawer Screens
import LanguageScreen from '../screens/LanguageScreen';
import TermsScreen from '../screens/TermsScreen';
import AboutScreen from '../screens/AboutScreen';
import PrivacyPolicyScreen from '../screens/PrivacyPolicyScreen';
import {contents} from '../context';
// import GenerateCustomQRCodeURL from '../screens/GenerateQRScreens/GenerateCustomQRCodeURL';
import BarcodeForProduct from '../screens/GenerateBarScreens/BarcodeForProduct';
import GenerateCustomQRCodeURL from '../screens/GenerateQRScreens/GenerateCustomQRCodeURL.tsx';
import GenerateCustomQRCode from '../screens/GenerateQRScreens/GenerateCustomQRCode.tsx';
import SplashScreen from '../screens/SplashScreen.tsx';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// 🔹 Stack Navigator (for Main App Screens)
const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{headerShown: false}}
      />
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
      <Stack.Screen
        name="BarcodeForProduct"
        component={BarcodeForProduct}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="GenerateCustomQRCodeURL"
        component={GenerateCustomQRCodeURL}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="GenerateCustomQRCode"
        component={GenerateCustomQRCode}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

// 🔹 Drawer Navigator with Icons
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="MainApp"
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: '#2196F3',
        drawerInactiveTintColor: '#666',
        drawerLabelStyle: {fontSize: 16},
      }}>
      <Drawer.Screen
        name="MainApp"
        component={StackNavigator}
        options={{
          title: contents('Home'),
          drawerIcon: ({color, size}) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Change Language"
        component={LanguageScreen}
        options={{
          title: contents('ChangeLanguage'),
          drawerIcon: ({color, size}) => (
            <Icon name="translate" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Terms & Conditions"
        component={TermsScreen}
        options={{
          title: contents('TermsAndConditions'),
          drawerIcon: ({color, size}) => (
            <Icon name="file-document-outline" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="About Us"
        component={AboutScreen}
        options={{
          title: contents('AboutUs'),
          drawerIcon: ({color, size}) => (
            <Icon name="information-outline" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Privacy Policy"
        component={PrivacyPolicyScreen}
        options={{
          title: contents('PrivacyPolicy'),
          drawerIcon: ({color, size}) => (
            <Icon name="lock-outline" color={color} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

// 🔹 Root Navigation
const AppNavigation = () => {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
};

export default AppNavigation;
