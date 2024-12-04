import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import axios from 'axios';

const UserInformationForm = ({ navigation }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleRegister = async () => {
    if (form.password !== form.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match!');
      return;
    }

    try {
      const response = await axios.post('http://10.0.2.2:8000/api/register', {
        name: form.name,
        email: form.email,
        password: form.password,
        password_confirmation: form.confirmPassword,
      });

      if (response.status === 201) {
        Alert.alert('Success', 'Registration successful!', [
          { text: 'OK', onPress: () => navigation.navigate('LoginScreen') },
        ]);
      }
    } catch (error) {
      console.error('Registration Error:', error);
      const errorMessage =
        error.response?.data?.message || 'Unable to register. Please try again.';
      Alert.alert('Error', errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={form.name}
        onChangeText={(text) => handleChange('name', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={form.email}
        onChangeText={(text) => handleChange('email', text)}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={form.password}
        onChangeText={(text) => handleChange('password', text)}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={form.confirmPassword}
        onChangeText={(text) => handleChange('confirmPassword', text)}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f8f8f8' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { height: 50, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, marginBottom: 15, paddingHorizontal: 10 },
  button: { backgroundColor: '#007BFF', padding: 15, borderRadius: 8 },
  buttonText: { color: '#fff', textAlign: 'center', fontSize: 16, fontWeight: 'bold' },
});

export default UserInformationForm;
