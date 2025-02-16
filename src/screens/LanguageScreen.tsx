import React from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import Header from '../components/commonComponents/Header';
import {contents, useLanguage} from '../context';

const languages = [
  {id: 'en', name: contents('english')},
  {id: 'ur', name: contents('urdu')},
  {id: 'es', name: contents('spanish')},
  {id: 'fr', name: contents('french')},
];

const LanguageScreen = () => {
  const {language, setLanguage} = useLanguage();

  return (
    <View style={styles.container}>
      <Header title={contents('ChangeLaguage')} showBackButton={true} />

      <Text style={styles.heading}>{contents('selectLaguage')}</Text>

      <FlatList
        data={languages}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            style={[
              styles.languageItem,
              language === item.id && styles.selectedItem,
            ]}
            onPress={() => setLanguage(item.id)}>
            <Text
              style={[
                styles.languageText,
                language === item.id && styles.selectedText,
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
