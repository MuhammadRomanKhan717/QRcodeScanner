import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const LanguageScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Select your preferred language here.</Text>
    </View>
  );
};

export default LanguageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
  },
});
