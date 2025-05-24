import React, { useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Car, User } from 'lucide-react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withTiming,
  interpolateColor
} from 'react-native-reanimated';
import { useUser } from '../context/UserContext';
import { COLORS, SPACING, BORDER_RADIUS } from '../constants/theme';

const ModeToggle = () => {
  const { mode, switchMode } = useUser();
  const offset = useSharedValue(mode === 'rider' ? 0 : 1);
  const [containerWidth, setContainerWidth] = useState(0);
  
  // Update offset when mode changes
  React.useEffect(() => {
    offset.value = withSpring(mode === 'rider' ? 0 : 1);
  }, [mode]);
  
  const handleToggle = () => {
    switchMode();
  };

  const onLayout = (event) => {
    const { width } = event.nativeEvent.layout;
    setContainerWidth(width);
  };

  const animatedStyles = useAnimatedStyle(() => {
    // Calculate position based on measured container width
    const halfWidth = containerWidth / 2;
    const translateX = offset.value * halfWidth;
    
    return {
      transform: [
        { translateX }
      ],
      backgroundColor: interpolateColor(
        offset.value,
        [0, 1],
        [COLORS.primary.yellow, COLORS.primary.yellowAlt]
      )
    };
  });

  return (
    <TouchableOpacity 
      onPress={handleToggle}
      style={styles.container}
      activeOpacity={0.9}
    >
      <View style={styles.toggleContainer} onLayout={onLayout}>
        <Animated.View style={[styles.indicator, animatedStyles]} />
        <View style={[styles.option, styles.leftOption]}>
          <User 
            size={16} 
            color={mode === 'rider' ? COLORS.primary.background : COLORS.primary.text} 
          />
          <Text style={[
            styles.optionText, 
            mode === 'rider' ? styles.activeText : styles.inactiveText
          ]}>
            Rider
          </Text>
        </View>
        <View style={[styles.option, styles.rightOption]}>
          <Car 
            size={16} 
            color={mode === 'driver' ? COLORS.primary.background : COLORS.primary.text} 
          />
          <Text style={[
            styles.optionText, 
            mode === 'driver' ? styles.activeText : styles.inactiveText
          ]}>
            Driver
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.sm,
  },
  toggleContainer: {
    position: 'relative',
    flexDirection: 'row',
    backgroundColor: COLORS.primary.card,
    borderRadius: BORDER_RADIUS.round,
    height: 36,
    width: 160,
  },
  indicator: {
    position: 'absolute',
    top: 4,
    left: 4,
    height: 28,
    width: 72,
    borderRadius: BORDER_RADIUS.round,
    zIndex: 1,
  },
  option: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  leftOption: {
    paddingLeft: SPACING.xs,
  },
  rightOption: {
    paddingRight: SPACING.xs,
  },
  optionText: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '600',
  },
  activeText: {
    color: COLORS.primary.background,
  },
  inactiveText: {
    color: COLORS.primary.text,
  },
});

export default ModeToggle;
