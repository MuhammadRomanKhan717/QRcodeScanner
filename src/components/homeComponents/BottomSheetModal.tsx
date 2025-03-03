import React, {useCallback, useRef, useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useLanguage, contents} from '../../context';
import RNRestart from 'react-native-restart';
import {ContentLanguage} from '../../i18n';
import {fontSize} from '../../utils/LightTheme';

const languages = [
  {id: '1', name: 'English', code: ContentLanguage.English},
  {id: '2', name: '(Arabic)العربية', code: ContentLanguage.العربية},
  {id: '3', name: '(urdu)اردو', code: ContentLanguage.Urdu},
  {id: '4', name: '中文 (Chinese)', code: ContentLanguage.Chinese},
  {id: '5', name: 'हिन्दी (Hindi)', code: ContentLanguage.Hindi},
  {id: '6', name: 'Español (Spanish)', code: ContentLanguage.Spanish},
  {id: '7', name: 'Français (French)', code: ContentLanguage.French},
  {id: '8', name: 'Português (Portuguese)', code: ContentLanguage.Portuguese},
  {id: '9', name: 'Русский (Russian)', code: ContentLanguage.Russian},
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

const BottomSheetModal = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const {language, setLanguageInApp} = useLanguage();
  const [selectedLanguage, setSelectedLanguage] = useState(language);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const checkLanguage = async () => {
      const storedLanguage = await AsyncStorage.getItem('appLanguage');
      if (!storedLanguage) {
        setShowModal(true);
      }
    };
    checkLanguage();
  }, []);

  const handleLanguageSelect = async langCode => {
    setSelectedLanguage(langCode);
    setLanguageInApp(langCode);
    await AsyncStorage.setItem('appLanguage', langCode);
    setShowModal(false);
    setTimeout(() => {
      RNRestart.restart();
    }, 100);
  };

  return showModal ? (
    <GestureHandlerRootView style={styles.container}>
      <BottomSheet ref={bottomSheetRef} index={0} snapPoints={[200, '50%']}>
        <BottomSheetView style={styles.contentContainer}>
          <Text style={styles.heading}>{contents('selectLanguage')}</Text>
          <View>
            {languages.map(item => (
              <TouchableOpacity
                key={item.id}
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
            ))}
          </View>
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
  },
  contentContainer: {
    padding: 36,
    alignItems: 'center',
  },
  heading: {
    fontSize: fontSize.textSize20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
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
    fontSize: fontSize.textSize18,
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

export default BottomSheetModal;
