import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Barcode from 'react-native-barcode-svg';
import Animated, {FadeIn} from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {moderateScale} from '../utils/dimensions';
import {contents} from '../context';
import Header from '../components/commonComponents/Header';
import {colors, fontSize} from '../utils/LightTheme';

// Navigation type definition
type RootStackParamList = {
  BarcodeScreen: undefined;
  MakePDFfileScreen: undefined;
};
type NavigationProp = StackNavigationProp<RootStackParamList>;

const barcodeData = [
  {
    id: '1',
    name: 'Product Code',
    icon: 'barcode',
    screen: 'BarcodeForProduct',
  },
  {
    id: '2',
    name: 'Inventory Code',
    icon: 'barcode',
    screen: 'MakePDFfileScreen',
  },
  // {id: '3', name: 'Shipping Label', icon: 'barcode', screen: 'BarcodeScreen'},
];

const GenerateBarCodesScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [barcodeValues, setBarcodeValues] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

  const generateBarcode = () => {
    if (inputValue.trim() !== '') {
      setBarcodeValues([...barcodeValues, inputValue]);
      setInputValue('');
    }
  };

  const renderBarcodeItem = ({item}: {item: any}) => (
    <Animated.View entering={FadeIn.duration(500)}>
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate(item.screen)}>
        <Icon name={item.icon} size={24} color="#4CAF50" />
        <Text style={styles.text}>{item.name}</Text>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <Header
        title={contents('GenerateBarcodes')}
        onBackPress={() => navigation.goBack()}
        rightComponent={null}
      />
      <FlatList
        data={barcodeData}
        renderItem={renderBarcodeItem}
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
    backgroundColor: colors.white,
    padding: moderateScale(10),
  },
  heading: {
    fontSize: fontSize.textSize18,
    fontWeight: 'bold',
    marginBottom: moderateScale(15),
    color: '#333',
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: moderateScale(10),
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: moderateScale(12),
    paddingVertical: moderateScale(15),
    paddingHorizontal: moderateScale(20),
    alignItems: 'center',
    elevation: 15,
    width: 130,
    margin: moderateScale(10),
  },
  text: {
    fontSize: fontSize.textSize14,
    fontWeight: '600',
    color: '#4A4A4A',
    textAlign: 'center',
  },
  title: {
    fontSize: fontSize.textSize18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '80%',
  },
  barcodeList: {
    marginTop: 20,
    width: '100%',
  },
  barcodeContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 5,
    alignItems: 'center',
  },
});

export default GenerateBarCodesScreen;
