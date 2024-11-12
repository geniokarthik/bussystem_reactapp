// screens/ProfileScreen.js
import React, { useState } from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';

export default function ProfileScreen({ navigation }) {
  // Track login status (this could come from a context in a larger app)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Mock profile image
  const profileImageUri = 'https://via.placeholder.com/150';

  // Handle Login - navigating to Login screen
  const handleLogin = () => {
    navigation.navigate('Login');
  };

  // Handle Logout - resetting login state
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      
      {/* Profile Image */}
      <Image source={{ uri: profileImageUri }} style={styles.profileImage} />

      {/* Login or Logout Button */}
      {isLoggedIn ? (
        <Button title="Logout" onPress={handleLogout} color="#FF6347" />
      ) : (
        <Button title="Login" onPress={handleLogin} color="#1E90FF" />
      )}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 24,
  },
});
