// import React, { useRef, useEffect } from "react";
// import { Animated, StyleSheet, View, Image } from "react-native";

// const LogoAnimation = () => {
//   const rotateValue = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     Animated.loop(
//       Animated.timing(rotateValue, {
//         toValue: 1,
//         duration: 2000,
//         useNativeDriver: true,
//       })
//     ).start();
//   }, [rotateValue]);

//   const rotate = rotateValue.interpolate({
//     inputRange: [0, 1],
//     outputRange: ["0deg", "360deg"],
//   });

//   return (
//     <View style={styles.container}>
//       <Animated.Image
//         source={require("../../assets/bLogo.png")} // Logonuzun dosya yolunu buraya ekleyin
//         style={[styles.logo, { transform: [{ rotate }] }]}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#ffffff",
//   },
//   logo: {
//     width: 150,
//     height: 150,
//   },
// });

// export default LogoAnimation;



import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedPath = Animated.createAnimatedComponent(Path);

export default function App() {
  const scale = useSharedValue(1);

  // Animasyonu başlat
  useEffect(() => {
    scale.value = withRepeat(withTiming(1.2, { duration: 1000 }), -1, true);
  }, []);

  // Animasyonlu SVG özellikleri
  const animatedProps = useAnimatedProps(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <View style={styles.container}>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        xmlSpace="preserve"
        width="200"
        height="200"
        viewBox="0 0 1998.3 1986.12"
      >
        {/* Arka plan dairesi */}
        <AnimatedCircle
          animatedProps={animatedProps}
          cx="1005.24"
          cy="993.06"
          r="993.06"
          fill="#FEFEFE"
        />
        {/* Ana şekiller */}
        <AnimatedPath
          animatedProps={animatedProps}
          d="M1704.63 919.3l-9.83 -103.16c-4.24,-44.54 -41.72,-77.91 -85.58,-77.91 -2.74,0 -5.49,0.13 -8.27,0.4 -47.32,4.51 -82.02,46.51 -77.51,93.83l9.83 103.17c1.4,14.76 2.02,29.41 2.21,43.99 2.27,182.18 -89.34,347.5 -232.91,444.89 -71.1,48.24 -154.89,79.84 -246.29,88.55 -17.02,1.63 -33.87,2.41 -50.63,2.41 -66.73,0 -131.08,-12.63 -190.57,-35.76 -56.66,-22.02 -108.83,-53.64 -154.45,-92.93l-14.56 41.84c-12.9,37.06 -46.61,61.01 -85.87,61.01 -37.74,0 -70.98,-22.74 -84.68,-57.93l-30.87 -79.34 -52.36 -26.51c66.03,118.7 165.22,215.44 283.84,278.9 24.3,-18.34 53.14,-29.83 84.2,-32.79 5.27,-0.51 10.63,-0.76 15.91,-0.76l0 0c72.87,0 134.84,46.37 157.24,112.58 23.73,2.45 47.75,3.83 72.02,3.83 22.19,0 44.57,-1.05 67.09,-3.19 53.45,-5.1 104.83,-16.28 153.77,-32.47 4.71,-28.71 16.75,-55.82 35.76,-78.83 28.32,-34.27 68.27,-55.47 112.53,-59.69 5.27,-0.5 10.63,-0.76 15.91,-0.76l0 0c22.59,0 44.1,4.55 63.76,12.66 172.14,-143.46 273.09,-366.62 250.28,-606.03z"
          fill="#01A89E"
        />
        <AnimatedPath
          animatedProps={animatedProps}
          d="M1704.63 919.3l-9.83 -103.16c-4.24,-44.54 -41.72,-77.91 -85.58,-77.91 -2.74,0 -5.49,0.13 -8.27,0.4 -47.32,4.51 -82.02,46.51 -77.51,93.83l9.83 103.17c1.4,14.76 2.02,29.41 2.21,43.99 2.27,182.18 -89.34,347.5 -232.91,444.89 -71.1,48.24 -154.89,79.84 -246.29,88.55 -17.02,1.63 -33.87,2.41 -50.63,2.41 -66.73,0 -131.08,-12.63 -190.57,-35.76 -56.66,-22.02 -108.83,-53.64 -154.45,-92.93l-14.56 41.84c-12.9,37.06 -46.61,61.01 -85.87,61.01 -37.74,0 -70.98,-22.74 -84.68,-57.93l-30.87 -79.34 -52.36 -26.51c66.03,118.7 165.22,215.44 283.84,278.9 24.3,-18.34 53.14,-29.83 84.2,-32.79 5.27,-0.51 10.63,-0.76 15.91,-0.76l0 0c72.87,0 134.84,46.37 157.24,112.58 23.73,2.45 47.75,3.83 72.02,3.83 22.19,0 44.57,-1.05 67.09,-3.19 53.45,-5.1 104.83,-16.28 153.77,-32.47 4.71,-28.71 16.75,-55.82 35.76,-78.83 28.32,-34.27 68.27,-55.47 112.53,-59.69 5.27,-0.5 10.63,-0.76 15.91,-0.76l0 0c22.59,0 44.1,4.55 63.76,12.66 172.14,-143.46 273.09,-366.62 250.28,-606.03z"
          fill="#FE893C"
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
