import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function AboutScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Top Section with Image and Curved White Bottom */}
        <View style={styles.topSection}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1483794344563-d27a8d18014e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }} 
            style={styles.topImage}
          />
          <View style={styles.curve} />
          <Text style={styles.aboutText}>About</Text>
        </View>

        {/* About Content */}
        <View style={styles.content}>
          <Text style={styles.title}>Welcome to Our App</Text>
          <Text style={styles.paragraph}>
            Our app helps you manage and care for your plants with ease. 
            You can monitor their status, receive tips, and track their growth journey. 
            Stay connected with your green buddies!
          </Text>
          
          <Text style={styles.title}>Features</Text>
          <Text style={styles.paragraph}>
            🌿 Real-time plant status monitoring{'\n'}
            🌿 Care tips and reminders{'\n'}
            🌿 Add and manage multiple plants{'\n'}
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
      </ScrollView>
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
    bottom: 0,
    width: '100%',
    height: 100,
    backgroundColor: '#f5f5f5',
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
  },
  aboutText: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4caf50',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#388E3C',
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    marginBottom: 20,
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
