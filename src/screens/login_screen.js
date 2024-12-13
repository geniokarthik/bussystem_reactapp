import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { getDatabase } from '../services/database';
import { generateToken } from '../services/jwt_generate';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    try {
      const db = await getDatabase();

      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM users WHERE email = ? AND password = ?;',
          [email, password],
          async (tx, results) => {
            if (results.rows.length > 0) {
              console.log('Login query results:', results.rows);
              const user = results.rows.item(0);
              const token = await generateToken(user);
              try {
                await AsyncStorage.setItem('authToken', token);
                
                Alert.alert('Success', 'Login Successful!', [
                  { text: 'OK', onPress: () => navigation.navigate('ProfileDetail', { user })},
                ]);
              } catch (e) {
                console.error('AsyncStorage Error:', e);
                Alert.alert('Error', 'Failed to save session. Please try again.');
              }
            } else {
              Alert.alert('Login Failed', 'Invalid email or password.');
            }
          },
          error => {
            console.error('Login Error:', error);
            Alert.alert('Error', 'Failed to execute query.');
          }
        );
      });
    } catch (error) {
      console.error('Database Error:', error);
      Alert.alert('Error', 'Failed to access database.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
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

export default LoginScreen;
