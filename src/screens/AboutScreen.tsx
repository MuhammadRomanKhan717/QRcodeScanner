import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Header from '../components/commonComponents/Header';
import {useNavigation} from '@react-navigation/native';
const AboutScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Header
        title="About Us"
        onBackPress={() => navigation.goBack()}
        rightComponent={null}
      />
      <Text style={styles.text}>About Us content here.</Text>
    </View>
  );
};

export default AboutScreen;

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
