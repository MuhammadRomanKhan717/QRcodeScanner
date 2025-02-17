import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import Header from '../components/commonComponents/Header';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../utils/LightTheme';
import {moderateScale, scaleHeight} from '../utils/dimensions';

const PrivacyPolicyScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header with Back Button */}
      <Header
        title="Privacy Policy"
        onBackPress={() => navigation.goBack()}
        rightComponent={null}
      />

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Privacy Policy</Text>
        <Text style={styles.text}>
          Your privacy is important to us. This Privacy Policy explains how we
          collect, use, and protect your information when you use our app.
        </Text>

        <Text style={styles.subtitle}>1. Information We Collect</Text>
        <Text style={styles.text}>
          We may collect certain types of information, including:{'\n'}• Device
          Information (such as device model, OS version){'\n'}• QR and Barcode
          scan history (only if you enable saving){'\n'}• Files or links you
          choose to generate into QR codes{'\n'}• App usage data (for improving
          performance)
        </Text>

        <Text style={styles.subtitle}>2. How We Use Your Information</Text>
        <Text style={styles.text}>
          We use the collected data to:{'\n'}• Provide core functionalities like
          scanning & generating QR codes{'\n'}• Improve app performance and user
          experience{'\n'}• Ensure security and prevent unauthorized access
        </Text>

        <Text style={styles.subtitle}>3. Data Security</Text>
        <Text style={styles.text}>
          We take appropriate measures to secure your information and prevent
          unauthorized access. Your data is never sold or shared with third
          parties.
        </Text>

        <Text style={styles.subtitle}>4. Permissions</Text>
        <Text style={styles.text}>
          Our app may request access to your camera (for scanning QR codes),
          storage (for saving generated QR codes), and internet (for online QR
          generation). You have full control over granting or denying these
          permissions.
        </Text>

        <Text style={styles.subtitle}>5. Third-Party Services</Text>
        <Text style={styles.text}>
          Some features may use third-party APIs, such as online QR generation.
          These services have their own privacy policies, which we recommend
          reviewing.
        </Text>

        <Text style={styles.subtitle}>6. Changes to This Policy</Text>
        <Text style={styles.text}>
          We may update this policy periodically. Any changes will be
          communicated through the app. Continued use of the app implies
          acceptance of the updated policy.
        </Text>

        <Text style={styles.subtitle}>7. Contact Us</Text>
        <Text style={styles.text}>
          If you have any questions regarding our Privacy Policy, please contact
          us at:
          {'\n'}
          <Text style={styles.bold}>support@yourapp.com</Text>
        </Text>

        <Text style={styles.footer}>
          By using this app, you agree to our Privacy Policy.
        </Text>
      </ScrollView>
    </View>
  );
};

export default PrivacyPolicyScreen;

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
