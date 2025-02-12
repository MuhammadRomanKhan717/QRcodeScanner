import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

import {RootStackParamList} from './appNavigation.type';
import HomeScreen from '../screens/HomeScreen';
import ScanBarCodesScreen from '../screens/ScanBarCodesScreen';
import GenerateQRCodesScreen from '../screens/GenerateQRCodesScreen';
import GenerateBarCodesScreen from '../screens/GenerateBarCodesScreen';
import ScanQRCodesScreen from '../screens/ScanQRCodesScreen';

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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
