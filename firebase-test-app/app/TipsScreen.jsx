import React, { useRef } from 'react';
import { View, Text, Animated, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function TipsScreen() {
  const router = useRouter();
  const scrollY = useRef(new Animated.Value(0)).current;

  const imageScale = scrollY.interpolate({
    inputRange: [0, 300],
    outputRange: [1, 1.5],  // Zoom-in effect
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        {/* Top Section with Zoom-In Image */}
        <View style={styles.topSection}>
          <Animated.Image 
            source={{ uri: 'https://images.unsplash.com/photo-1492496913980-501348b61469?q=80&w=2070&auto=format&fit=crop' }} 
            style={[styles.topImage, { transform: [{ scale: imageScale }] }]}
          />

          {/* Curve Overlay */}
          <View style={styles.curve} />
          <Text style={styles.tipsText}>Tips</Text>
        </View>

        {/* Tips Content */}
        <View style={styles.content}>
          <Text style={styles.title}>Plant Care Tips</Text>

          <Text style={styles.tipTitle}>🌞 Light Requirements</Text>
          <Text style={styles.description}>
            Place your plants where they get enough sunlight, but avoid direct exposure for too long.
          </Text>

          <Text style={styles.tipTitle}>💧 Watering</Text>
          <Text style={styles.description}>
            Water your plants only when the soil is dry. Overwatering can lead to root rot.
          </Text>

          <Text style={styles.tipTitle}>🌱 Soil and Fertilizer</Text>
          <Text style={styles.description}>
            Use nutrient-rich soil and fertilize once a month for healthy growth.
          </Text>

          <Text style={styles.tipTitle}>🌿 Pruning and Maintenance</Text>
          <Text style={styles.description}>
            Trim dead or yellowing leaves regularly to keep your plants healthy.
          </Text>

          <Text style={styles.tipTitle}>🌡️ Temperature Control</Text>
          <Text style={styles.description}>
            Keep your plants in environments with consistent temperatures and avoid extreme fluctuations.
          </Text>
        </View>

        {/* Go Back Button */}
        <TouchableOpacity 
          style={styles.goBackButton} 
          onPress={() => router.back()}
        >
          <Icon name="arrow-back" size={24} color="#fff" />
          <Text style={styles.goBackText}>Go Back</Text>
        </TouchableOpacity>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  topSection: {
    position: 'relative',
    height: 300,
  },
  topImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  curve: {
    position: 'absolute',
    bottom: -1,  // Slight overlap to prevent gap
    width: '100%',
    height: 120,  // Slightly larger for a smooth transition
    backgroundColor: '#f5f5f5',
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    zIndex: 1,   // Ensure it renders above the image
  },
  tipsText: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4caf50',
    zIndex: 2,  // Render above the curve
  },
  content: {
    padding: 20,
    marginTop: -60,  // Pull content up to avoid a visible gap
    backgroundColor: '#f5f5f5',
    zIndex: 0,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 15,
  },
  tipTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#388E3C',
    marginTop: 20,
  },
  description: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    marginBottom: 15,
  },
  goBackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4caf50',
    paddingVertical: 12,
    borderRadius: 30,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  goBackText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  }
});
