import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileDetail = ({ navigation, route }) => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Check if user data is passed through route params
    if (route.params?.user) {
      setUserName(route.params.user.name || 'Guest'); // Use the name field from the user object or fallback to "Guest"
    } else {
      // Fallback to fetching from AsyncStorage if route.params.user is not available
      const fetchUserData = async () => {
        try {
          const name = await AsyncStorage.getItem('userName');
          setUserName(name || 'Guest');
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      fetchUserData();
    }
  }, [route.params]);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('authToken'); // Clear stored token
      navigation.reset({
        index: 0,
        routes: [{ name: 'LoginScreen' }], // Reset stack to LoginScreen
      });
    } catch (error) {
      console.error('Error during logout:', error);
      Alert.alert('Error', 'Unable to log out. Try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeMessage}>Welcome, {userName}!</Text>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#f8f8f8' },
  welcomeMessage: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#333' },
  logoutButton: {
    backgroundColor: '#FF0000',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  logoutButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
});

export default ProfileDetail;
