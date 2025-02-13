import React from 'react';
import {View, FlatList, TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
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
  QRCodeForAudio: undefined;
  QRcodeForWhatsApp: undefined;
  QRcodeForEmail: undefined;
  QRcodeForMap: undefined;
  QRcodeForSocialMedia: undefined;
};

// Define the type for the navigation prop
type NavigationProp = StackNavigationProp<RootStackParamList>;

// Define the data type
interface QRCodeItem {
  id: string;
  name: string;
  icon: string;
  mode: string;
  screen: keyof RootStackParamList;
}

const data: QRCodeItem[] = [
  {
    id: '1',
    name: 'Map',
    icon: 'map-marker-outline',
    screen: 'QRcodeForMap',
    mode: '',
  },
  {id: '2', name: 'Wi-Fi', icon: 'wifi', screen: 'GenWifiQrCode', mode: ''},
  {
    id: '3',
    name: 'Audio',
    icon: 'music-note-outline',
    screen: 'QRCodeForAudio',
    mode: 'Audio',
  },
  {
    id: '4',
    name: 'WhatsApp',
    icon: 'whatsapp',
    screen: 'QRcodeForWhatsApp',
    mode: 'whatsapp',
  },
  {
    id: '5',
    name: 'Message',
    icon: 'message-text-outline',
    screen: 'QRcodeForWhatsApp',
    mode: 'sms',
  },
  {
    id: '6',
    name: 'PPTX',
    icon: 'presentation-play',
    screen: 'QRcodeForSocialMedia',
    mode: 'PPTX',
  },
  {
    id: '7',
    name: 'Facebook',
    icon: 'facebook',
    screen: 'QRcodeForSocialMedia',
    mode: 'facebook',
  },
  {
    id: '8',
    name: 'Instagram',
    icon: 'instagram',
    screen: 'QRcodeForSocialMedia',
    mode: 'instagram',
  },
  {
    id: '9',
    name: 'Twitter',
    icon: 'twitter',
    screen: 'QRcodeForSocialMedia',
    mode: 'twitter',
  },
  {
    id: '10',
    name: 'LinkedIn',
    icon: 'linkedin',
    screen: 'QRcodeForSocialMedia',
    mode: 'linkedIn',
  },
  {
    id: '11',
    name: 'YouTube',
    icon: 'youtube',
    screen: 'QRcodeForSocialMedia',
    mode: 'youTube',
  },
  {
    id: '12',
    name: 'Telegram',
    icon: 'telegram',
    screen: 'QRcodeForSocialMedia',
    mode: 'telegram',
  },
];

// Function to dynamically select the correct icon component
const getIconComponent = (iconName: string) => {
  const fontistoIcons = ['telegram', 'facebook', 'twitter'];
  const materialIcons = [
    'map-marker-outline',
    'wifi',
    'music-note-outline',
    'whatsapp',
    'message-text-outline',
    'presentation-play',
    'instagram',
    'linkedin',
    'youtube',
  ];

  if (fontistoIcons.includes(iconName)) {
    return <Fontisto name={iconName} size={24} color="#4CAF50" />;
  } else if (materialIcons.includes(iconName)) {
    return <Icon name={iconName} size={24} color="#4CAF50" />;
  }

  return <Icon name="help-circle" size={24} color="red" />; // Fallback icon if no match
};

const GenerateQRCodesScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const renderItem = ({item, index}: {item: QRCodeItem; index: number}) => (
    <Animated.View
      entering={
        index % 2 === 0
          ? SlideInLeft.duration(1000)
          : SlideInRight.duration(1000)
      }>
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate(item.screen, {mode: item.mode})}>
        <Animated.View entering={FadeIn.duration(500)}>
          {getIconComponent(item.icon)}
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
};

export default GenerateQRCodesScreen;
