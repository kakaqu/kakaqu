import React, { useRef, useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, Image, FlatList } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  withTiming,
} from "react-native-reanimated";
import supabase from '../../../supabase';
import CustomButton from "../../components/CustomButton";
import CustomTheme from "../../styles/CustomThems";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

export default function OnboardingScreen() {
  const scrollX = useSharedValue(0);
  const flatListRef = useRef(null);
  const [screens, setScreens] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showStartButton, setShowStartButton] = useState(false); // Yeni state

  const navigation = useNavigation();

  useEffect(() => {
    const fetchScreens = async () => {
      try {
        const { data, error } = await supabase
          .from("onboarding_tbl")
          .select("*")
          .eq("status", true)
          .eq("delete_status", false);
  
        if (error) throw error;
  
        const formattedData = data.map((item) => ({
          ...item,
          details: typeof item.details === 'string'
            ? item.details.split('\n').filter(line => line.trim() !== '')
            : [],
        }));
  
        setScreens(formattedData);
        setIsLoading(false);
      } catch (error) {
        console.error("Supabase verisi çekilemedi:", error);
        setIsLoading(false);
      }
    };
    fetchScreens();
  }, []);
  
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const renderScreen = ({ item }) => (
    <View style={styles.screen}>
      <Image source={{ uri: item.image_url }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <FlatList
        data={item.details || []}
        keyExtractor={(detail, idx) => `${detail}-${idx}`}
        renderItem={({ item: detail }) => (
          <Text style={styles.detailText}>• {detail}</Text>
        )}
      />
    </View>
  );

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

  const animatedPaginationDotsStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollX.value,
      [(screens.length - 2) * width, (screens.length - 1) * width],
      [1, 0],
      Extrapolate.CLAMP
    );
    return {
      opacity,
    };
  });

  const animatedSikipStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollX.value,
      [(screens.length - 2) * width, (screens.length - 1) * width],
      [1, 0],
      Extrapolate.CLAMP
    );
    return {
      opacity,
    };
  });

  const PaginationDots = () => (
    <Animated.View style={[styles.paginationContainer, animatedPaginationDotsStyle]}>
      {screens.map((_, index) => {
        const animatedDotStyle = useAnimatedStyle(() => {
          const backgroundColor =
            Math.round(scrollX.value / width) === index
              ? CustomTheme.colors.secondary
              : CustomTheme.colors.primary;
  
          const scale = interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [1, 1.5, 1],
            Extrapolate.CLAMP
          );
  
          return {
            backgroundColor,
            transform: [{ scale }],
          };
        });
  
        return <Animated.View key={index} style={[styles.paginationDot, animatedDotStyle]} />;
      })}
    </Animated.View>
  );

  const handlePress = () => {
    navigation.navigate('AddOnboarding');
    console.log("handlePress triggered");
  };

  const handleSikipPress = () => {
    flatListRef.current?.scrollToIndex({ index: screens.length - 1 }); // Son sayfaya kaydır
  };

  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={flatListRef}
        data={screens}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        pagingEnabled
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        renderItem={renderScreen}
      />

      <Animated.View style={[styles.sikipTextContainer, animatedSikipStyle]}>
        <Text style={styles.sikipText} onPress={handleSikipPress}>Sikip</Text>
      </Animated.View>
      


      <PaginationDots />

      {!isLoading && (
        <Animated.View style={[styles.startButton, animatedStartButtonStyle]}>
          <CustomButton buttonText="Başla ->" onPress={handlePress} />
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CustomTheme.colors.bacgournd,
  },
  screen: {
    width,
    padding: 20,
    alignItems: "center",
  },
  image: {
    width: 280,
    height: 280,
    marginBottom: 30,
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: CustomTheme.colors.primary,
    textAlign: "center",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    fontWeight: "bold",
    color: CustomTheme.colors.black,
    textAlign: "center",
    marginBottom: 20,
  },
  detailText: {
    fontSize: 14,
    color: CustomTheme.colors.black,
    textAlign: "right",
    marginVertical: 5,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    width: "100%",
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  startButton: {
    justifyContent: 'center',
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  sikipTextContainer: {
    position: 'absolute',
    bottom: 15,
    right: 20, // Sol tarafa hizalamak için biraz daha düşük bir değer
    alignItems: 'flex-end', // Yazıyı tam ortaya hizalar
    width: '100%', // Container'ı ekran genişliği kadar genişletir
    paddingHorizontal: 20, // Yazıyı biraz içeriden başlatır
  },
  sikipText: {
    fontSize: 16,
    color: CustomTheme.colors.primary,
    fontWeight: "bold",
    textAlign: 'left', // Yazıyı sola hizalar
  },  
});
