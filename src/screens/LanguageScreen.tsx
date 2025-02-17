import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import Header from '../components/commonComponents/Header';
import {useNavigation} from '@react-navigation/native';

const languages = [
  {id: '1', name: 'English'},
  {id: '10', name: 'Chinese'},
  {id: '3', name: 'Hindi'},
  {id: '4', name: 'Spanish'},
  {id: '9', name: 'Arabic'},
  {id: '7', name: 'French'},
  {id: '14', name: 'Portuguese'},
  {id: '6', name: 'Russian'},
  {id: '13', name: 'Bengali'},
  {id: '2', name: 'Urdu'},
  {id: '15', name: 'Indonesian'},
  {id: '11', name: 'Japanese'},
  {id: '5', name: 'German'},
  {id: '12', name: 'Korean'},
  {id: '17', name: 'Turkish'},
  {id: '8', name: 'Italian'},
  {id: '16', name: 'Nigerian'},
];

const LanguageScreen = () => {
  const navigation = useNavigation();
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(
    'English',
  );

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
  };

  return (
    <View style={styles.container}>
      <Header
        title="Change Language"
        onBackPress={() => navigation.goBack()}
        rightComponent={null}
      />
      <Text style={styles.heading}>Select Your Preferred Language:</Text>
      <FlatList
        data={languages}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            style={[
              styles.languageItem,
              selectedLanguage === item.name && styles.selectedItem,
            ]}
            onPress={() => handleLanguageSelect(item.name)}>
            <Text
              style={[
                styles.languageText,
                selectedLanguage === item.name && styles.selectedText,
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
