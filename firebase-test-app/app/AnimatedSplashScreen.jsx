import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet, Text } from "react-native";
import LottieView from "lottie-react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function AnimationSplashScreen({ onFinish }) {
  const letters = "Smart Plant Tower".split("");
  const animations = letters.map(() => useRef(new Animated.Value(0)).current);

  useEffect(() => {
    const bounceAnimations = letters.map((_, index) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(animations[index], {
            toValue: -10,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(animations[index], {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
        ])
      )
    );

    Animated.stagger(100, bounceAnimations).start();

    const timer = setTimeout(() => {
      onFinish();
    }, 3000); // Splash duration

    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient
      colors={["#d4fc79", "#96e6a1", "#c9ffd5"]} // Lighter gradient colors
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <LottieView
        source={require("../assets/animations/AnimationSplashScreen.json")}
        autoPlay
        loop={false}
        style={styles.animation}
      />

      {/* Bouncing letters */}
      <View style={styles.textContainer}>
        {letters.map((letter, index) => (
          <Animated.Text
            key={index}
            style={[
              styles.letter,
              { transform: [{ translateY: animations[index] }] },
            ]}
          >
            {letter}
          </Animated.Text>
        ))}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  animation: {
    width: 300,
    height: 300,
  },
  textContainer: {
    flexDirection: "row",
    flexWrap: "nowrap",
    marginTop: 20,
  },
  letter: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2E7D32",   
    marginHorizontal: 2,
  },
});
