import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

import {RootStackParamList} from './appNavigation.type';
import BarCodeScreen from '../screens/BarCodeScreen';
import QRCodeScreen from '../screens/QRCodeScreen';
import HomeScreen from '../screens/HomeScreen';

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
          name="BarCodeScreen"
          component={BarCodeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="QRCodeScreen"
          component={QRCodeScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
