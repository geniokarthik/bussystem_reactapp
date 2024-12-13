import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomHeader = ({ title, onMenuPress, navigation }) => {

  // Move the logout function inside the component
  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yes',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('authToken'); // Clear token
              navigation.replace('LoginScreen'); // Navigate to Login
            } catch (error) {
              console.error('Error during logout:', error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };
// Determine if the current screen is the Dashboard
const isDashboard = navigation.getState().routes.slice(-1)[0].name === 'Dashboard';
  return (
    <View style={styles.header}>
      {/* Hamburger Menu */}
      <TouchableOpacity onPress={isDashboard ? onMenuPress : () => navigation.goBack()}>
        <Icon
          name={isDashboard ? 'menu' : 'arrow-back-outline'}
          size={28}
          color="white"
        />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>{title}</Text>

      {/* Logout Button */}
      <TouchableOpacity onPress={handleLogout}>
        <Icon name="log-out-outline" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: '#007BFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default CustomHeader;
