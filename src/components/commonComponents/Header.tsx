import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface HeaderProps {
  title: string;
  onBackPress?: () => void;
  onBackLongPress?: () => void;
  rightComponent?: React.ReactNode;
  showBackButton?: boolean; // New prop
}

const Header: React.FC<HeaderProps> = ({
  title,
  onBackPress,
  onBackLongPress,
  rightComponent,
  showBackButton = true, // Default is true
}) => {
  return (
    <View style={styles.headerContainer}>
      {/* Back Button (conditionally rendered) */}
      {showBackButton ? (
        <TouchableOpacity
          onPress={onBackPress}
          onLongPress={onBackLongPress}
          style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      ) : (
        <View style={styles.placeholder} /> // Placeholder for alignment
      )}

      {/* Title */}
      <Text style={styles.title}>{title}</Text>

      {/* Right Component (optional) */}
      <View style={styles.rightComponent}>{rightComponent}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  backButton: {
    padding: 8,
  },
  placeholder: {
    width: 32, // Ensures alignment when the back button is hidden
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  rightComponent: {
    width: 40, // Ensures alignment when no right component is passed
    alignItems: 'center',
  },
});

export default Header;
