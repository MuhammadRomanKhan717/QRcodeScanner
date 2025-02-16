import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Header from '../components/commonComponents/Header';
import {useNavigation} from '@react-navigation/native';

const PrivacyPolicyScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Header
        title="Privacy Policy"
        onBackPress={() => navigation.goBack()}
        rightComponent={null}
      />
      <Text style={styles.text}>Privacy Policy content here.</Text>
    </View>
  );
};

export default PrivacyPolicyScreen;

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
