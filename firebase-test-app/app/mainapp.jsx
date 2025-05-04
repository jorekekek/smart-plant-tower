import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, Image, ScrollView, TouchableOpacity, StyleSheet,Animated, Dimensions, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialIcons';
import GiftSection from './GiftSection';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const  { width } = Dimensions.get('window');  
const ITEM_WIDTH = width * 0.7;      // Width of the main card (center)
const SPACING = 10;                   // Space between cards
const SIDE_VISIBLE = (width - ITEM_WIDTH) / 2;
export default function MainApp() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('home');
  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef(null);


  const headerBackgroundColor = scrollY.interpolate({
    inputRange: [0, 150], // Transition point
    outputRange: ['#ffffff', '#8bc34a'], // From white to yellow-green
    extrapolate: 'clamp',
  });
  const sensorData = [
    { id: 1, name: "Moisture", value: "45%", icon: "opacity", color: "#4CAF50" },
    { id: 2, name: "pH Level", value: "6.8", icon: "science", color: "#2196F3" },
    { id: 3, name: "Temperature", value: "24°C", icon: "thermostat", color: "#FF9800" }
  ];

  const infiniteData = [...sensorData];

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const nextOffset = scrollX._value + ITEM_WIDTH + SPACING;

        // Check if it reaches the end, reset to the beginning seamlessly
        if (nextOffset >= infiniteData.length * (ITEM_WIDTH + SPACING)) {
          scrollRef.current.scrollTo({ x: 0, animated: false });
        } else {
          scrollRef.current.scrollTo({ x: nextOffset, animated: true });
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [infiniteData]);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );
  const MainApp = () => {
    return (
      <View style={styles.container}>
        <GiftSection />
      </View>
    );
  };

  
  return (
    <GestureHandlerRootView style={styles.container}>
<View style={styles.container}>
      <Animated.View style={[styles.header, { backgroundColor: headerBackgroundColor }]}>
        <View style={styles.topRow}>
          <TouchableOpacity onPress={() => console.log('Profile tapped')}>
            <Image 
              source={{ uri: 'https://scontent.fmnl30-1.fna.fbcdn.net/v/t39.30808-6/482033249_4013790165567606_6860011654686317204_n.jpg' }} 
              style={styles.profilePic} 
            />
            <Text style={styles.welcomeText}>Welcome, Jorrik</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => console.log('Notifications tapped')} style={styles.iconContainer}>
            <Icon name="notifications" size={28} color="#757575" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => console.log('Filter tapped')} style={styles.filterIcon}>
          <View style={styles.filterBackground}>
            <Icon name="filter-list" size={28} color="#757575" />
          </View>
        </TouchableOpacity>

        <View style={styles.searchRow}>
          <View style={styles.searchBarContainer}>
            <Icon name="search" size={24} color="#aaa" style={styles.searchIcon} />
            <TextInput
              style={styles.searchBar}
              placeholder="Type name here..."
              placeholderTextColor="#aaa"
            />
          </View>
        </View>
      </Animated.View>

      
      {/* Green Gift Section */}
      <View style={styles.giftSection}>
        <Image source={{ uri: 'https://www.pngarts.com/files/10/Flower-Pot-Transparent-Background-PNG.png' }} style={styles.giftImage} />
        <View style={styles.giftTextContainer}>
          <Text style={styles.giftTitle}>Give a gift that grows and thrives.</Text>
          <TouchableOpacity style={styles.giftButton}>
            <Text style={styles.giftButtonText}>Add plants</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView 
      
  style={styles.content} 
  contentContainerStyle={{ flexGrow: 1 }} 
  showsVerticalScrollIndicator={false} 
>         
          <GiftSection />
          

      {/* All My Plants Section */}
      <Text style={styles.sectionTitle}>All My Plants</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {[
          { id: 1, name: 'Aloe Vera', img: 'https://miro.medium.com/v2/resize:fit:1400/0*A_U0cNmqW_QkdatI' },
          { id: 2, name: 'Snake Plant', img: 'https://images.unsplash.com/photo-1509069575671-3df40ce5307c?q=80&w=2070&auto=format&fit=crop' },
          { id: 3, name: 'Cactus', img: 'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?q=80&w=1974&auto=format&fit=crop' },
          { id: 4, name: 'Peace Lily', img: 'https://images.unsplash.com/photo-1586817100452-0b6defc0d2b5?q=80&w=1974&auto=format&fit=crop' }
        ].map((plant) => (
          <TouchableOpacity key={plant.id} style={styles.plantCard}>
            <View style={styles.imageContainer}>
              <Image 
                source={{ uri: plant.img }} 
                style={styles.plantImage} 
              />
            </View>
            {/* Plant Info */}
            <View style={styles.plantInfo}>
              <Text style={styles.plantName}>{plant.name}</Text>
              <TouchableOpacity 
                onPress={() => console.log(`Next arrow clicked for ${plant.name}`)} 
                style={styles.arrowButton}
              >
                <Icon name="arrow-forward-ios" size={16} color="#9ACD32" />  
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Learn More Section */}
      <Text style={styles.sectionTitle}>Learn More</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <TouchableOpacity 
          style={styles.largeWidget} 
          onPress={() => router.push('/AboutScreen')}
        >
          <Icon name="info" size={60} color="#689F38" />
          <Text style={styles.largeWidgetTitle}>About</Text>
          <Text style={styles.largeWidgetText}>
            Learn about plant care, watering schedules, and more.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.largeWidget} 
          onPress={() => router.push('/TipsScreen')}
        >
          <Icon name="lightbulb" size={60} color="#FFB300" />
          <Text style={styles.largeWidgetTitle}>Tips</Text>
          <Text style={styles.largeWidgetText}>
            Get helpful tips on plant maintenance and growth.
          </Text>
        </TouchableOpacity>
      </ScrollView>

    </ScrollView>

      {/* Floating Bottom Navigation Bar */}
      <View style={styles.navBarContainer}>
        <View style={styles.navBar}>
          {['home', 'search', 'spa', 'local-florist', 'settings'].map((icon, index) => (
            <TouchableOpacity 
              key={index} 
              style={[styles.navItem, activeTab === icon ? styles.activeNavItem : null]}
              onPress={() => setActiveTab(icon)}
            >
              <View style={[styles.navCircle, activeTab === icon ? styles.activeNavCircle : null]}>
                <Icon 
                  name={icon} 
                  size={28} 
                  color={activeTab === icon ? '#ffffff' : '#757575'} 
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  welcomeText: {
    marginLeft: 50,
    marginTop: -27,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  iconContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    padding: 8,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    borderRadius: 20,
    paddingLeft: 10,
    marginTop: 10,
    marginBottom: 5,
    width: '80%',
  },
  searchIcon: {
    marginRight: 5,
  },
  searchBar: {
    flex: 1,
    paddingVertical: 10,
  },
  filterIcon: {
    position: 'absolute',
    top: 78,
    right: 15,
  },
  filterBackground: {
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    padding: 8,
  },
  content: {
    padding: 20,
  },
  sampleText: {
    fontSize: 18,
    marginBottom: 20,
  },
  listItem: {
    fontSize: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  horizontalScroll: {
    marginBottom: 20,
  },
  giftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8bc34a',
    margin: 15,
    padding: 15,
    borderRadius: 10,
    overflow: 'visible',
    zIndex: 1,
  },
  giftImage: {
    width: 180,
    height: 150,
    position: 'absolute',
    top: -30,
    left: -15,
    zIndex: 2,
  },
  giftTextContainer: {
    flex: 1,
    marginLeft: 130,
  },
  giftTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  giftButton: {
    marginTop: 10,
    backgroundColor: '#689F38',
    opacity: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  giftButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    opacity: 1,
  },
  senscontainer: {
    flex: 1,
    backgroundColor: '#f5f5f5', 
    paddingTop: 50
  },
  senstitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  sensorCard: {
    width: ITEM_WIDTH,
    height: 200,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: SPACING / 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8
  },
  sensorTitle: {
    fontSize: 22,
    color: '#FFF',
    fontWeight: 'bold'
  },
  sensorValue: {
    fontSize: 18,
    color: '#FFF'
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginVertical: 10,
  },
  largeWidget: {
    width: 280,         // Wider than the plant cards
    height: 180,        // Taller for a more prominent look
    marginRight: 20,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  largeWidgetTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginVertical: 10,
  },
  largeWidgetText: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginTop: 5,
  },  
  plantCard: {
    width: 160,
    height: 220,
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    marginRight: 15,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#eee',
  },
  
  imageContainer: {
    width: '100%',
    height: 130,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  
  plantImage: {
    width: '90%',
    height: '90%',
    resizeMode: 'cover',
    borderRadius: 8, 
  },
  
  plantInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  
  plantName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },  
  plantCard: {
    width: 160,                           // Keeps consistent card width
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    marginRight: 15,
    backgroundColor: 'transparent',
    overflow: 'hidden',                   // Ensures clean borders
  },
  
  plantImage: {
    width: '100%',
    height: 140,                         // Image height only (no extra space)
    resizeMode: 'cover',
    borderRadius: 12,
    borderWidth: 6,                       // White border around image
    borderColor: '#fff',
    marginBottom: -6,                     // Hides bottom border for a seamless look
  },
  
  plantInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,                    // Reduced padding for tighter fit
    backgroundColor: '#fff',               // Background for visibility
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  
  plantName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  
  arrowButton: {
    width: 32,                             // Circular size
    height: 32,
    borderRadius: 16,                      // Makes it a circle
    borderWidth: 2,                        // Circle border thickness
    borderColor: '#9ACD32',                // Yellow-green color
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  navBarContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'transparent',
    elevation: 10,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 30,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  navCircle: {
    backgroundColor: '#f0f0f0',
    borderRadius: 30,
    padding: 10,
  },
  activeNavCircle: {
    backgroundColor: '#8bc34a',
    paddingHorizontal: 20,
  }
});
