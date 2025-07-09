import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import CustomTheme from '../../styles/CustomThems';

const DotLoader = () => {
  const rotateOuter = useRef(new Animated.Value(0)).current;
  const rotateInner = useRef(new Animated.Value(0)).current;
  const fadeInner = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Dış katman: hızlı dönüş
    Animated.loop(
      Animated.timing(rotateOuter, {
        toValue: 1,
        duration: 1500, // yavaşlatıldı
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    // İç katman: daha yavaş dönüş + geç başlama
    setTimeout(() => {
      Animated.loop(
        Animated.timing(rotateInner, {
          toValue: 1,
          duration: 3000, // çok daha yavaş
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();

      // İç katman: yavaşça kaybolup yavaşça görünür
      Animated.loop(
        Animated.sequence([
          Animated.timing(fadeInner, {
            toValue: 0,
            duration: 1000, // yavaşça kaybol
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.delay(1000), // uzun gizlenme
          Animated.timing(fadeInner, {
            toValue: 1,
            duration: 1000, // yavaşça geri gel
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.delay(500), // biraz görünür kal
        ])
      ).start();
    }, 200);
  }, []);

  const rotationOuter = rotateOuter.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const rotationInner = rotateInner.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      {/* İç katman */}
      <Animated.View style={[styles.ring, { transform: [{ rotate: rotationInner }] }]}>
        <Animated.View style={[styles.dot, styles.top, styles.inner, { opacity: fadeInner }]} />
        <Animated.View style={[styles.dot, styles.bottom, styles.inner, { opacity: fadeInner }]} />
        <Animated.View style={[styles.dot, styles.left, styles.inner, { opacity: fadeInner }]} />
        <Animated.View style={[styles.dot, styles.right, styles.inner, { opacity: fadeInner }]} />
      </Animated.View>

      {/* Dış katman */}
      <Animated.View style={[styles.ring, { transform: [{ rotate: rotationOuter }] }]}>
        <View style={[styles.dot, styles.top, styles.outer]} />
        <View style={[styles.dot, styles.bottom, styles.outer]} />
        <View style={[styles.dot, styles.left, styles.outer]} />
        <View style={[styles.dot, styles.right, styles.outer]} />
      </Animated.View>
    </View>
  );
};

const dotSizeOuter = 16;
const dotSizeInner = 10;

const styles = StyleSheet.create({
  container: {
    width: 55,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ring: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  dot: {
    position: 'absolute',
    borderRadius: 50,
  },
  outer: {
    width: dotSizeOuter,
    height: dotSizeOuter,
    backgroundColor: CustomTheme.colors.primary,
    opacity: 1,
  },
  inner: {
    width: dotSizeInner,
    height: dotSizeInner,
    backgroundColor: CustomTheme.colors.secondary,
  },
  top: { top: 0, left: '50%', marginLeft: -dotSizeOuter / 2 },
  bottom: { bottom: 0, left: '50%', marginLeft: -dotSizeOuter / 2 },
  left: { left: 0, top: '50%', marginTop: -dotSizeOuter / 2 },
  right: { right: 0, top: '50%', marginTop: -dotSizeOuter / 2 },
});

export default DotLoader;
