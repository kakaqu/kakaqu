import React from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import CustomTheme from '../../../shared/styles/CustomThems';

const { width } = Dimensions.get('window');

const PaginationDots = ({ scrollX, count }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => {
        const inputRange = [
          (index - 1) * width,
          index * width,
          (index + 1) * width,
        ];

        const animatedStyle = useAnimatedStyle(() => {
          const scale = interpolate(
            scrollX.value,
            inputRange,
            [1, 1.5, 1],
            Extrapolate.CLAMP
          );

          const isActive = Math.round(scrollX.value / width) === index;

          return {
            transform: [{ scale }],
            backgroundColor: isActive
              ? CustomTheme.colors.secondary
              : CustomTheme.colors.primary,
          };
        });

        return (
          <View key={index} style={styles.dotWrapper}>
            <Animated.View style={[styles.dot, animatedStyle]} />
          </View>
        );
      })}
    </>
  );
};

const styles = StyleSheet.create({
  dotWrapper: {
    paddingHorizontal: 5,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: CustomTheme.colors.primary, // fallback
  },
});

export default PaginationDots;
