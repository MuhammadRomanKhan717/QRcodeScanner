import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import Header from '../components/commonComponents/Header';
import {useNavigation} from '@react-navigation/native';
// import {useLanguage} from '../context'; // Import useLanguage hook
import {ContentLanguage} from '../i18n';
import {contents, useLanguage} from '../context';
import RNRestart from 'react-native-restart';

const languages = [
  {id: '1', name: 'English', code: ContentLanguage.English},
  {id: '2', name: '(Arabic)العربية', code: ContentLanguage.العربية},
  {id: '3', name: '(urdu)اردو', code: ContentLanguage.Urdu},
  {id: '4', name: '中文 (Chinese)', code: ContentLanguage.Chinese},
  {id: '5', name: 'हिन्दी (Hindi)', code: ContentLanguage.Hindi},
  {id: '6', name: 'Español (Spanish)', code: ContentLanguage.Spanish},
  {id: '7', name: 'Français (French)', code: ContentLanguage.French},
  {id: '8', name: 'Português (Portuguese)', code: ContentLanguage.Portuguese},
  {id: '9', name: 'Русский (Russian)', code: ContentLanguage.Russian}, // Change to 10
  {id: '10', name: 'বাংলা (Bengali)', code: ContentLanguage.Bengali},
  {
    id: '11',
    name: 'Bahasa Indonesia (Indonesian)',
    code: ContentLanguage.Indonesian,
  },
  {id: '12', name: '日本語 (Japanese)', code: ContentLanguage.Japanese},
  {id: '13', name: 'Deutsch (German)', code: ContentLanguage.German},
  {id: '14', name: '한국어 (Korean)', code: ContentLanguage.Korean},
  {id: '15', name: 'Türkçe (Turkish)', code: ContentLanguage.Turkish},
  {id: '16', name: 'Italiano (Italian)', code: ContentLanguage.Italian},
  {id: '17', name: 'Nigerian', code: ContentLanguage.Nigerian},
];

const LanguageScreen = () => {
  const navigation = useNavigation();
  const {language, setLanguageInApp} = useLanguage();
  const [selectedLanguage, setSelectedLanguage] = useState(language);

  const handleLanguageSelect = (langCode: ContentLanguage) => {
    setSelectedLanguage(langCode);
    setLanguageInApp(langCode);
    setTimeout(() => {
      RNRestart.restart();
    }, 100); // Add a small delay before restarting
  };

  return (
    <View style={styles.container}>
      <Header
        title={contents('changeLanguage')}
        onBackPress={() => navigation.goBack()}
        rightComponent={null}
      />
      <Text style={styles.heading}>{contents('selectLanguage')}</Text>
      <FlatList
        data={languages}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            style={[
              styles.languageItem,
              selectedLanguage === item.code && styles.selectedItem,
            ]}
            onPress={() => handleLanguageSelect(item.code)}>
            <Text
              style={[
                styles.languageText,
                selectedLanguage === item.code && styles.selectedText,
              ]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default LanguageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 10,
    color: '#333',
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  languageItem: {
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  languageText: {
    fontSize: 18,
    color: '#333',
  },
  selectedItem: {
    backgroundColor: '#2196F3',
  },
  selectedText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
