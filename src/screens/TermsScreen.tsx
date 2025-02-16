import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const TermsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Terms & Conditions content here.</Text>
    </View>
  );
};

export default TermsScreen;

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
