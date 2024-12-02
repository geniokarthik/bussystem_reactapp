// screens/PasswordRecoveryScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

export default function PasswordRecoveryScreen({ navigation }) {
  const [email, setEmail] = useState('');

  const handlePasswordRecovery = () => {
    // Implement password recovery functionality here
    Alert.alert(
      'Password Recovery',
      `Instructions sent to ${email}`,
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Password Recovery</Text>
      <Text style={styles.instructions}>
        Enter your email address to receive password recovery instructions.
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Button title="Send Instructions" onPress={handlePasswordRecovery} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  instructions: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 24,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
});
