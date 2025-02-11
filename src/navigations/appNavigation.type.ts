// navigation/appNavigation.type.ts
import type {RouteProp} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';

export enum Screen {
  BarCodeScreen = 'BarCodeScreen',
  QRCodeScreen = 'QRCodeScreen',
}

export type NavStackParams = {
  [Screen.BarCodeScreen]: undefined;
  [Screen.QRCodeScreen]: undefined;
};

export type AppNavigationProp = NativeStackNavigationProp<NavStackParams>;

export type BarCodeScreenRoute = RouteProp<
  NavStackParams,
  Screen.BarCodeScreen
>;
export type QRCodeScreenRoute = RouteProp<NavStackParams, Screen.QRCodeScreen>;
