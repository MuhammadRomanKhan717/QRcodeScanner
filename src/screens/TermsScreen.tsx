import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import Header from '../components/commonComponents/Header';
import {useNavigation} from '@react-navigation/native';
import {colors, fontSize} from '../utils/LightTheme';
import {moderateScale, scaleHeight} from '../utils/dimensions';

const TermsAndConditionsScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header with Back Button */}
      <Header
        title="Terms & Conditions"
        onBackPress={() => navigation.goBack()}
        rightComponent={null}
      />

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Terms & Conditions</Text>
        <Text style={styles.text}>
          These Terms & Conditions govern your use of our app. By accessing or
          using the app, you agree to abide by these terms.
        </Text>

        <Text style={styles.subtitle}>1. Use of the App</Text>
        <Text style={styles.text}>
          You agree to use this app only for lawful purposes and in accordance
          with these terms. You must not use the app for any illegal activities
          or harm others.
        </Text>

        <Text style={styles.subtitle}>2. User Responsibilities</Text>
        <Text style={styles.text}>
          • You are responsible for any data you scan, generate, or share using
          the app.{'\n'}• You must not attempt to exploit vulnerabilities,
          reverse-engineer, or disrupt the app’s functionality.
        </Text>

        <Text style={styles.subtitle}>3. Privacy & Data Collection</Text>
        <Text style={styles.text}>
          Your privacy is important to us. Please refer to our{' '}
          <Text style={styles.bold}>Privacy Policy</Text> for information on how
          we collect, use, and protect your data.
        </Text>

        <Text style={styles.subtitle}>4. Intellectual Property</Text>
        <Text style={styles.text}>
          All content, trademarks, and software used in this app are owned by us
          or licensed to us. You may not copy, modify, or distribute any part of
          the app without permission.
        </Text>

        <Text style={styles.subtitle}>5. Limitation of Liability</Text>
        <Text style={styles.text}>
          We are not responsible for any loss, damage, or issues that arise from
          using the app. The app is provided "as is" without warranties of any
          kind.
        </Text>

        <Text style={styles.subtitle}>6. Changes to Terms</Text>
        <Text style={styles.text}>
          We may update these Terms & Conditions at any time. Your continued use
          of the app implies acceptance of any changes.
        </Text>

        <Text style={styles.subtitle}>7. Termination of Use</Text>
        <Text style={styles.text}>
          We reserve the right to terminate or suspend your access to the app if
          you violate these terms or engage in any unlawful activities.
        </Text>

        <Text style={styles.subtitle}>8. Contact Information</Text>
        <Text style={styles.text}>
          If you have any questions about these Terms & Conditions, please
          contact us at:{'\n'}
          <Text style={styles.bold}>support@yourapp.com</Text>
        </Text>

        <Text style={styles.footer}>
          By using this app, you agree to these Terms & Conditions.
        </Text>
      </ScrollView>
    </View>
  );
};

export default TermsAndConditionsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    padding: moderateScale(20),
  },
  title: {
    fontSize: fontSize.textSize22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: scaleHeight(2),
    color: colors.primary,
  },
  subtitle: {
    fontSize: fontSize.textSize20,
    fontWeight: 'bold',
    marginTop: scaleHeight(3),
    color: colors.secondary,
  },
  text: {
    fontSize: fontSize.textSize16,
    textAlign: 'left',
    color: colors.black,
    lineHeight: moderateScale(24),
    marginTop: scaleHeight(1),
  },
  bold: {
    fontWeight: 'bold',
  },
  footer: {
    fontSize: fontSize.textSize16,
    textAlign: 'center',
    marginTop: scaleHeight(5),
    fontWeight: 'bold',
    color: colors.AshGray,
  },
});
