import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Header from '../components/commonComponents/Header';
import {useNavigation} from '@react-navigation/native';

const TermsScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Header
        title="Terms & Conditions"
        onBackPress={() => navigation.goBack()}
        rightComponent={null}
      />
      <Text style={styles.text}>Terms & Conditions content here.</Text>
    </View>
  );
};

export default TermsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});
