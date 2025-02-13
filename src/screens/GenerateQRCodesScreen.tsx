import React from 'react';
import {View, FlatList, TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Animated, {
  SlideInLeft,
  SlideInRight,
  FadeIn,
} from 'react-native-reanimated';
import {moderateScale, scaleHeight, scaleWidth} from '../utils/dimensions';

// Define the type for navigation
type RootStackParamList = {
  Map: undefined;
  GenWifiQrCode: undefined;
  Audio: undefined;
};

// Define the type for the navigation prop
type NavigationProp = StackNavigationProp<RootStackParamList>;

// Define the data type
interface QRCodeItem {
  id: string;
  name: string;
  icon: string;
  screen: keyof RootStackParamList;
}

const data: QRCodeItem[] = [
  {id: '1', name: 'Map', icon: 'map-marker-outline', screen: 'QRcodeForMap'},
  {id: '2', name: 'Wi-Fi', icon: 'wifi', screen: 'GenWifiQrCode'},
  {
    id: '3',
    name: 'Audio',
    icon: 'music-note-outline',
    screen: 'QRCodeForAudio',
  },
  {id: '4', name: 'WhatsApp', icon: 'whatsapp', screen: 'QRcodeForWhatsApp'},
];

const GenerateQRCodesScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const renderItem = ({item, index}: {item: QRCodeItem; index: number}) => (
    <Animated.View
      entering={
        index % 2 === 0 ? SlideInLeft.duration(500) : SlideInRight.duration(500)
      }>
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate(item.screen)}>
        <Animated.View entering={FadeIn.duration(500)}>
          <Icon name={item.icon} size={24} color="#4CAF50" />
        </Animated.View>
        <Animated.Text entering={FadeIn.duration(500)} style={styles.text}>
          {item.name}
        </Animated.Text>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <Animated.Text entering={FadeIn.duration(500)} style={styles.heading}>
        All Types Of QR Codes
      </Animated.Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ddfee3',
    padding: moderateScale(10),
  },
  heading: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    marginBottom: moderateScale(15),
    color: '#333',
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: moderateScale(10),
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: moderateScale(12),
    paddingVertical: moderateScale(15),
    paddingHorizontal: moderateScale(20),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: moderateScale(10),
    shadowOffset: {width: 0, height: moderateScale(4)},
    elevation: 6,
    width: scaleWidth(130),
    minHeight: scaleHeight(25),
    margin: moderateScale(10),
  },
  text: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: '#4A4A4A',
    textAlign: 'center',
  },
  arrowIcon: {
    marginLeft: 'auto',
    backgroundColor: '#F3E5F5',
    padding: moderateScale(5),
    borderRadius: moderateScale(10),
  },
};

export default GenerateQRCodesScreen;
