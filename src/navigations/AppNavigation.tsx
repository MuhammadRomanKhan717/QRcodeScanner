import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

import {RootStackParamList} from './appNavigation.type';
import BarCodeScreen from '../screens/BarCodeScreen';
import QRCodeScreen from '../screens/QRCodeScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="BarCodeScreen">
        <Stack.Screen
          name="BarCodeScreen"
          component={BarCodeScreen}
          options={{headerShown: false}} // Hide header for BarCodeScreen
        />
        <Stack.Screen
          name="QRCodeScreen"
          component={QRCodeScreen}
          options={{headerShown: false}} // Hide header for QRCodeScreen
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
