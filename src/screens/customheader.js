import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const CustomHeader = ({ title, onMenuPress, onLogoutPress }) => {
  return (
    <View style={styles.header}>
      {/* Hamburger Menu */}
      <TouchableOpacity onPress={onMenuPress}>
        <Icon name="menu" size={28} color="white" />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>{title}</Text>

      {/* Logout Button */}
      <TouchableOpacity onPress={onLogoutPress}>
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
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CustomHeader;
