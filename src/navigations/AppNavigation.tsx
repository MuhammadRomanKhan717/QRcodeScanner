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

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// 🔹 Stack Navigator (for Main App Screens)
const StackNavigator = () => {
  return (
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
  );
};

// 🔹 Drawer Navigator with Icons
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="MainApp"
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: '#2196F3', // Active item color
        drawerInactiveTintColor: '#666', // Inactive item color
        drawerLabelStyle: {fontSize: 16}, // Font styling
      }}>
      <Drawer.Screen
        name="MainApp"
        component={StackNavigator}
        options={{
          title: 'Home',
          drawerIcon: ({color, size}) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Change Language"
        component={LanguageScreen}
        options={{
          drawerIcon: ({color, size}) => (
            <Icon name="translate" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Terms & Conditions"
        component={TermsScreen}
        options={{
          drawerIcon: ({color, size}) => (
            <Icon name="file-document-outline" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="About Us"
        component={AboutScreen}
        options={{
          drawerIcon: ({color, size}) => (
            <Icon name="information-outline" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Privacy Policy"
        component={PrivacyPolicyScreen}
        options={{
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
