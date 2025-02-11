// navigation/appNavigation.type.ts
import type {RouteProp} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';

export enum Screen {
  BarCodeScreen = 'BarCodeScreen',
  QRCodeScreen = 'QRCodeScreen',
  HomeScreen = 'HomeScreen',
}

export type NavStackParams = {
  [Screen.BarCodeScreen]: undefined;
  [Screen.QRCodeScreen]: undefined;
  [Screen.HomeScreen]: undefined;
};

export type AppNavigationProp = NativeStackNavigationProp<NavStackParams>;

export type BarCodeScreenRoute = RouteProp<
  NavStackParams,
  Screen.BarCodeScreen
>;
export type QRCodeScreenRoute = RouteProp<NavStackParams, Screen.QRCodeScreen>;
export type HomeScreenRoute = RouteProp<NavStackParams, Screen.HomeScreen>;
