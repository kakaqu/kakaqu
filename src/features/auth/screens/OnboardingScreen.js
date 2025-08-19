import React, { useEffect, useRef, useState } from 'react';
import { View, Dimensions, FlatList, TouchableOpacity, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

import styles from '../styles/onboardingStyles';
import CustomButton from '../../../shared/components/buttons/CustomButton';
import PaginationDots from '../components/PaginationDots';
import OnboardingItem from '../components/OnboardingItem';
import { fetchOnboardingScreens } from '../services/fetchOnboardingScreens';
import appIcon from '../../../assets/logo/app_logo_icon.png';
import { useTranslation } from 'react-i18next';
import { loginSuccess } from '../slices/authSlice';
import { useDispatch } from 'react-redux';
import { updateIsOnboarded } from '../services/updateIsOnboarded';
import { setIsOnboarded } from '../../user/slices/userSlice';



const { width } = Dimensions.get('window');

const OnboardingScreen = () => {
  const scrollX = useSharedValue(0);
  const flatListRef = useRef(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [screens, setScreens] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { t, i18n } = useTranslation();
  

  useEffect(() => {
  const loadData = async () => {
    try {
      const lang = i18n.language || 'fa'; // veya Redux’tan
      const data = await fetchOnboardingScreens(lang);

      const manualLastScreen = {
        id: 'custom-last',
        title: t('onboardingItem.title'),
        description: t('onboardingItem.description'),
        details: t('onboardingItem.details'),
        image_url: appIcon,
      };

      setScreens([...data, manualLastScreen]);
    } catch (err) {
      console.error('Veri alınamadı:', err);
    } finally {
      setIsLoading(false);
    }
  };

  loadData();
}, []);


  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });
  

    // ✅ BAŞLA butonuna basıldığında:
  const handlePress = async () => {
    try {
     // await updateIsOnboarded(user.id);        // Supabase güncelle
      dispatch(setIsOnboarded(true));          // Redux güncelle
      navigation.reset({
        index: 0,
        routes: [{ name: 'Main' }],
      });
    } catch (e) {
      console.error('Onboarding güncelleme hatası:', e.message || e);
    }
  };


  // const handleSikipPress = () => {
  //   flatListRef.current?.scrollToIndex({ index: screens.length - 1 });
  // };
  const handleSikipPress = () => {
  setTimeout(() => {
    flatListRef.current?.scrollToIndex({ index: screens.length - 1 });
  }, 50);
};


  // 🎯 Başla butonu sadece son sayfada görünür
  const animatedStartButtonStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollX.value,
      [(screens.length - 2) * width, (screens.length - 1) * width],
      [0, 1],
      Extrapolate.CLAMP
    );
    const translateY = interpolate(
      scrollX.value,
      [(screens.length - 2) * width, (screens.length - 1) * width],
      [50, 0],
      Extrapolate.CLAMP
    );
    return {
      opacity,
      transform: [{ translateY }],
    };
  });

  // ⛔ Sikip (atla) butonu son sayfada kaybolur
  const animatedSikipStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollX.value,
      [(screens.length - 2) * width, (screens.length - 1) * width],
      [1, 0],
      Extrapolate.CLAMP
    );
    return { opacity };
  });

  // ⛔ Dotlar son sayfada kaybolur
  const animatedPaginationDotsStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollX.value,
      [(screens.length - 2) * width, (screens.length - 1) * width],
      [1, 0],
      Extrapolate.CLAMP
    );
    return { opacity };
  });

  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={flatListRef}
        data={screens}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        renderItem={({ item }) => <OnboardingItem item={item} />}
      />

      {/* Geç Butonu (PaginationDots hizasında, sol alt) */}
      {!isLoading && (
        <Animated.View style={[styles.skipTextWrapper, animatedSikipStyle]}>
          <TouchableOpacity onPress={handleSikipPress}>
            <Text style={styles.skipText}>{t("onboardingItem.sikip")}</Text>
          </TouchableOpacity>
        </Animated.View>
      )}

      {/* Pagination Dots */}
      {!isLoading && (
        <Animated.View
          style={[styles.paginationContainer, animatedPaginationDotsStyle]}
        >
          <PaginationDots scrollX={scrollX} count={screens.length} />
        </Animated.View>
      )}

      {/* Başla Butonu */}
      {!isLoading && (
        <Animated.View style={[styles.startButton, animatedStartButtonStyle]}>
          <CustomButton
            style={styles.button}
            buttonText={t("onboardingItem.button_text")}
            onPress={handlePress}
            type="primary"
          />
        </Animated.View>
      )}
    </View>
  );
};

export default OnboardingScreen;
