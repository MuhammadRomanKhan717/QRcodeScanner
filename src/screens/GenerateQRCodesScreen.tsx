import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
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
  QRCodeForVCard: undefined;
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
  // QRcodeForMap
  {
    id: '1',
    name: 'Map',
    icon: 'map-marker-outline',
    screen: 'QRcodeForMap',
    mode: '',
  },

  // GenWifiQrCode
  {id: '2', name: 'Wi-Fi', icon: 'wifi', screen: 'GenWifiQrCode', mode: ''},

  // QRCodeForAudio
  {
    id: '3',
    name: 'Audio',
    icon: 'music-note-outline',
    screen: 'QRCodeForAudio',
    mode: 'Audio',
  },
  {
    id: '7',
    name: 'PPTX',
    icon: 'presentation-play',
    screen: 'QRCodeForAudio',
    mode: 'PPTX',
  },
  {
    id: '26',
    name: 'Excel',
    icon: 'microsoft-excel',
    screen: 'QRCodeForAudio',
    mode: 'excel',
  },
  {
    id: '27',
    name: 'File',
    icon: 'file-2',
    screen: 'QRCodeForAudio',
    mode: 'file',
  },

  // QRcodeForWhatsApp
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

  // QRCodeForVCard
  {
    id: '6',
    name: 'vCard',
    icon: 'card-account-details-outline',
    screen: 'QRCodeForVCard',
    mode: 'vCard',
  },

  // QRcodeForSocialMedia
  {
    id: '8',
    name: 'Facebook',
    icon: 'facebook',
    screen: 'QRcodeForSocialMedia',
    mode: 'facebook',
  },
  {
    id: '9',
    name: 'Instagram',
    icon: 'instagram',
    screen: 'QRcodeForSocialMedia',
    mode: 'instagram',
  },
  {
    id: '10',
    name: 'Twitter',
    icon: 'twitter',
    screen: 'QRcodeForSocialMedia',
    mode: 'twitter',
  },
  {
    id: '11',
    name: 'LinkedIn',
    icon: 'linkedin',
    screen: 'QRcodeForSocialMedia',
    mode: 'linkedIn',
  },
  {
    id: '12',
    name: 'YouTube',
    icon: 'youtube',
    screen: 'QRcodeForSocialMedia',
    mode: 'youTube',
  },
  {
    id: '13',
    name: 'Telegram',
    icon: 'telegram',
    screen: 'QRcodeForSocialMedia',
    mode: 'telegram',
  },
  {
    id: '14',
    name: 'TikTok',
    icon: 'tiktok',
    screen: 'QRcodeForSocialMedia',
    mode: 'tiktok',
  },
  {
    id: '15',
    name: 'Video',
    icon: 'video',
    screen: 'QRcodeForSocialMedia',
    mode: 'video',
  },
  {
    id: '16',
    name: 'Google Forms',
    icon: 'file-document-outline',
    screen: 'QRcodeForSocialMedia',
    mode: 'googleForms',
  },
  {
    id: '17',
    name: 'Snapchat',
    icon: 'snapchat',
    screen: 'QRcodeForSocialMedia',
    mode: 'snapchat',
  },
  {
    id: '18',
    name: 'Spotify',
    icon: 'spotify',
    screen: 'QRcodeForSocialMedia',
    mode: 'spotify',
  },
  {
    id: '19',
    name: 'Google Docs',
    icon: 'file-document-outline',
    screen: 'QRcodeForSocialMedia',
    mode: 'googleDoc',
  },
  {
    id: '20',
    name: 'Google Review',
    icon: 'star-outline',
    screen: 'QRcodeForSocialMedia',
    mode: 'googleReview',
  },
  {
    id: '21',
    name: 'Payment',
    icon: 'credit-card-outline',
    screen: 'QRcodeForSocialMedia',
    mode: 'payment',
  },
  {
    id: '22',
    name: 'Logo',
    icon: 'image-outline',
    screen: 'QRcodeForSocialMedia',
    mode: 'logo',
  },
  {
    id: '23',
    name: 'Office365',
    icon: 'microsoft-office',
    screen: 'QRcodeForSocialMedia',
    mode: 'office',
  },
  {
    id: '24',
    name: 'Paypal',
    icon: 'paypal',
    screen: 'QRcodeForSocialMedia',
    mode: 'paypal',
  },
  {
    id: '25',
    name: 'Etsy',
    icon: 'etsy',
    screen: 'QRcodeForSocialMedia',
    mode: 'etsy',
  },
];

// Function to dynamically select the correct icon component
const getIconComponent = (iconName: string) => {
  const fontistoIcons = ['telegram', 'facebook', 'twitter', 'file-2'];
  const materialIcons = [
    'map-marker-outline',
    'wifi',
    'tiktok',
    'music-note-outline',
    'whatsapp',
    'message-text-outline',
    'presentation-play',
    'instagram',
    'linkedin',
    'youtube',
    'credit-card-outline',
    'microsoft-office',
    'star-outline',
    'file-document-outline',
    'image-outline',
    'snapchat',
    'spotify',
    'paypal',
    'etsy',
    'card-account-details-outline',
    'microsoft-excel',
  ];
  if (iconName === 'paypal') {
    return <FontAwesome name="paypal" size={24} color="#4CAF50" />;
  } else if (iconName === 'etsy') {
    return <FontAwesome name="etsy" size={24} color="#4CAF50" />;
  } else if (iconName === 'video') {
    return <Octicons name="video" size={24} color="#4CAF50" />;
  } else if (iconName === 'tiktok') {
    return <MaterialIcons name="tiktok" size={24} color="#4CAF50" />;
  } else if (fontistoIcons.includes(iconName)) {
    return <Fontisto name={iconName} size={24} color="#4CAF50" />;
  } else if (materialIcons.includes(iconName)) {
    return <Icon name={iconName} size={24} color="#4CAF50" />;
  } else {
    console.warn(`Icon "${iconName}" not found!`);
    return <Icon name="help-circle" size={24} color="red" />;
  }
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
        showsVerticalScrollIndicator={false}
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
