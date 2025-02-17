import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import Header from '../components/commonComponents/Header';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../utils/LightTheme';
import {moderateScale, scaleHeight} from '../utils/dimensions';

const AboutScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header with Back Button */}
      <Header
        title="About Us"
        onBackPress={() => navigation.goBack()}
        rightComponent={null}
      />

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>About Our App</Text>
        <Text style={styles.text}>
          Welcome to our <Text style={styles.bold}>QR Code & Barcode</Text> app.
          This app is designed to help you **scan, generate, and share** QR
          codes and barcodes effortlessly. Whether you need a QR code for
          **WiFi, maps, contact details, or social media**, this app provides
          all the features you need in one place.
        </Text>

        <Text style={styles.subtitle}>Key Features</Text>

        <Text style={styles.feature}>Scan QR Codes & Barcodes</Text>
        <Text style={styles.text}>
          Easily scan any QR code or barcode using your phone's camera.
        </Text>

        <Text style={styles.feature}>Generate Custom QR Codes</Text>
        <Text style={styles.text}>
          Create QR codes for WiFi, maps, documents, social media, and more.
        </Text>

        <Text style={styles.feature}>Create Barcodes</Text>
        <Text style={styles.text}>
          Generate barcodes for product labeling, payments, and inventory
          tracking.
        </Text>

        <Text style={styles.feature}>Save & Share Effortlessly</Text>
        <Text style={styles.text}>
          Save QR codes and barcodes for later use, or share them instantly.
        </Text>

        <Text style={styles.subtitle}>Why Choose This App?</Text>
        <Text style={styles.text}>
          • <Text style={styles.bold}>User-Friendly</Text> – Simple and
          intuitive design{'\n'}•{' '}
          <Text style={styles.bold}>Fast & Reliable</Text> – Quick scanning and
          generation{'\n'}• <Text style={styles.bold}>Secure</Text> – Generates
          and scans with privacy in mind{'\n'}•{' '}
          <Text style={styles.bold}>Versatile</Text> – Supports various QR &
          barcode formats
        </Text>

        <Text style={styles.footer}>
          Thank you for choosing our app! Enjoy scanning and generating with
          ease.
        </Text>
      </ScrollView>
    </View>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    padding: moderateScale(20),
  },
  title: {
    fontSize: moderateScale(22),
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: scaleHeight(2),
    color: colors.primary,
  },
  subtitle: {
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    marginTop: scaleHeight(3),
    color: colors.secondary,
  },
  feature: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    marginTop: scaleHeight(2),
    color: colors.black,
  },
  text: {
    fontSize: moderateScale(16),
    textAlign: 'left',
    color: colors.black,
    lineHeight: moderateScale(24),
    marginTop: scaleHeight(1),
  },
  bold: {
    fontWeight: 'bold',
  },
  footer: {
    fontSize: moderateScale(16),
    textAlign: 'center',
    marginTop: scaleHeight(5),
    fontWeight: 'bold',
    color: colors.AshGray,
  },
});
