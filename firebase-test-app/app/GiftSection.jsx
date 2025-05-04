import React, { useRef } from 'react';
import { View, Text, Image, Dimensions, StyleSheet, Animated, FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.5;
const SPACING = 15;
const SIDE_VISIBLE = (width - ITEM_WIDTH) / 2;


const data = [
  { id: '1', image: { uri: 'https://img.freepik.com/free-photo/closeup-shot-cute-wild-plant-growing-middle-forest_181624-14278.jpg?t=st=1742927530~exp=1742931130~hmac=64c30fc9e6db3714d5a1490def68b18862e6c17e544679ba6685e3501a6c3c8d&w=1380' }, title: 'Fresh Basil' },
  { id: '2', image: { uri: 'https://img.freepik.com/free-photo/close-up-purple-flowers-tree_23-2147924825.jpg?t=st=1742927557~exp=1742931157~hmac=29178dbf2ad84973901df55455e6637668a7fe25b5986c31691a46de4778631e&w=1380' }, title: 'Mint Delight' },
  { id: '3', image: { uri: 'https://img.freepik.com/free-photo/young-green-corn-growing-field-background-texture-from-young-plants-corn-green-background_169016-14123.jpg?t=st=1742927579~exp=1742931179~hmac=1128904e40159fef94443fa6fc6b3bb4f8c4204c51266c2f31e0904c689ddbe9&w=1380' }, title: 'Rosemary Bliss' },
  { id: '4', image: { uri: 'https://img.freepik.com/free-photo/blooming-succulents-closeup-idea-decorating-space-improving-environment-decorating-balcony-patio-loggia-with-fresh-flowers_166373-3011.jpg?t=st=1742927627~exp=1742931227~hmac=16d97adccb8cb7ca26e8680874af9994a3e86c7b5b320da74faa85b9375f589a&w=1380' }, title: 'Lavender Dream' }
];

const ParallaxCarousel = () => {
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <Animated.FlatList
      data={data}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      pagingEnabled
      snapToAlignment="center"
      snapToInterval={ITEM_WIDTH + SPACING}
      decelerationRate="fast"
      contentContainerStyle={{ paddingHorizontal: SIDE_VISIBLE }}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        { useNativeDriver: true }
      )}
      scrollEventThrottle={16}
      renderItem={({ item, index }) => {
        const inputRange = [
          (index - 1) * (ITEM_WIDTH + SPACING),
          index * (ITEM_WIDTH + SPACING),
          (index + 1) * (ITEM_WIDTH + SPACING)
        ];

        // Opposite parallax effect by reversing the image movement
        const translateX = scrollX.interpolate({
          inputRange,
          outputRange: [30, 0, -30],  // Opposite direction
          extrapolate: 'clamp'
        });

        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0.9, 1, 0.9],  // Subtle scaling effect
          extrapolate: 'clamp'
        });

        return (
          <Animated.View style={[styles.shadowContainer, { transform: [{ scale }] }]}>
            <View style={styles.carouselItemContainer}>
              <Animated.Image
                source={item.image}
                style={[
                  styles.carouselImage, 
                  { transform: [{ translateX }] }  // Apply opposite parallax effect
                ]}
              />
              <View style={styles.borderContainer}>
                <Text style={styles.carouselTitle}>{item.title}</Text>
              </View>
            </View>
          </Animated.View>
        );
      }}
    />
  );
};

const GiftSection = () => {
  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: 'https://via.placeholder.com/600' }} style={styles.heroImage} />
      <Text style={styles.title}>My Plants</Text>
      <Text style={styles.subtitle}>Smart plant towers for a greener future.</Text>
      <ParallaxCarousel />
    </ScrollView>
  );
};
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5'
    },
    heroImage: {
      width: '100%',
      height: 300
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#333',
      textAlign: 'center',
      marginTop: 20
    },
    subtitle: {
      fontSize: 18,
      color: '#666',
      textAlign: 'center',
      marginBottom: 20
    },
    shadowContainer: {
      width: ITEM_WIDTH,
      marginHorizontal: SPACING / 2,
      shadowColor: '#000',
      shadowOpacity: 0.3,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 5 },
      backgroundColor: '#fff',
      borderRadius: 10,
      overflow: 'hidden',  // Prevent overflow
    },
    carouselItemContainer: {
      overflow: 'hidden',  // Prevent any white space overflow
      borderRadius: 10,
    },
    carouselImage: {
      width: ITEM_WIDTH + 30,  // Slightly larger for parallax but no overflow
      height: 250,
      resizeMode: 'cover',
    },
    borderContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      padding: 10
    },
    carouselTitle: {
      fontSize: 20,
      color: '#fff',
      fontWeight: 'bold'
    }
  });
  
  export default GiftSection;
  
  