import React from 'react';
import {View, FlatList, StyleSheet, TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../utils/LightTheme';
import {StackNavigationProp} from '@react-navigation/stack';

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
  {
    id: '4',
    name: 'WhatsApp',
    icon: 'whatsapp', // Correct WhatsApp icon
    iconSet: 'MaterialCommunityIcons', // Specify the icon set
    screen: 'QRcodeForWhatsApp',
  },
];

const GenerateQRCodesScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const renderItem = ({item}: {item: QRCodeItem}) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate(item.screen)}>
      <Icon name={item.icon} size={24} color={colors.primary} />
      <Text style={styles.text}>{item.name}</Text>
      <Icon
        name="arrow-right"
        size={20}
        color={colors.coralPink} // Fixed typo ("colors" instead of "colors")
        style={styles.arrowIcon}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>All Types Of QR Codes</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ddfee3',
    padding: 10,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    marginHorizontal: 5,
  },
  text: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  arrowIcon: {
    marginLeft: 'auto',
    backgroundColor: '#F3E5F5',
    padding: 5,
    borderRadius: 10,
  },
});

export default GenerateQRCodesScreen;
