import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  GestureResponderEvent,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {moderateScale, scaleWidth, scaleHeight} from '../../utils/dimensions';
import Animated, {
  FadeInDown,
  FadeInUp,
  SlideInLeft,
  SlideInRight,
} from 'react-native-reanimated';
import {colors} from '../../utils/LightTheme';

interface NavigationCardProps {
  onPress: (event: GestureResponderEvent) => void;
  icon?: React.ReactElement;
  iconSize?: number;
  iconColor?: string;
  text: string;
  index: number;
}

const NavigationCard: React.FC<NavigationCardProps> = ({
  onPress,
  icon,
  iconSize,
  iconColor,
  text,
  index,
}) => {
  const navigation = useNavigation();
  const animationType =
    index % 2 === 0 ? SlideInLeft.duration(1000) : SlideInRight.duration(1000);

  return (
    <Animated.View entering={animationType}>
      <TouchableOpacity style={styles.card} onPress={onPress}>
        <Animated.View
          entering={FadeInUp.duration(500)}
          style={styles.iconContainer}>
          {icon && React.cloneElement(icon, {size: iconSize, color: iconColor})}
        </Animated.View>
        <Animated.Text
          entering={FadeInDown.duration(500)}
          style={styles.cardText}>
          {text}
        </Animated.Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: moderateScale(12),
    paddingVertical: moderateScale(15),
    paddingHorizontal: moderateScale(20),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: moderateScale(5),
    shadowOffset: {width: 0, height: moderateScale(4)},
    elevation: 15,
    width: scaleWidth(130),
    minHeight: scaleHeight(5),
    margin: moderateScale(10),
  },
  iconContainer: {
    marginBottom: moderateScale(12),
  },
  cardText: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: colors.blackText,
    textAlign: 'center',
  },
});

export default NavigationCard;
