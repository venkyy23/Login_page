import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';

export default function SignUpScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!name || !email || !password || !confirmPassword) {
      const errorMessage = 'Please fill in all fields';
      if (Platform.OS === 'web') {
        window.alert(`Error: ${errorMessage}`);
      } else {
        Alert.alert('Error', errorMessage);
      }
      return;
    }

    if (password !== confirmPassword) {
      const errorMessage = 'Passwords do not match';
      if (Platform.OS === 'web') {
        window.alert(`Error: ${errorMessage}`);
      } else {
        Alert.alert('Error', errorMessage);
      }
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:3000/adduser',
        { name, email, password },
        {
          headers: {
            Authorization: 'Bearer my-secret-token',
          },
        }
      );
      setLoading(false);

      if (response.status === 201) {
        const successMessage = `Account created for ${email}`;
        if (Platform.OS === 'web') {
          window.alert(`Sign Up: ${successMessage}`);
        } else {
          Alert.alert('Sign Up', successMessage);
        }
        navigation.navigate('Login');
      } else {
        throw new Error('Unexpected response from server');
      }
    } catch (error) {
      setLoading(false);
      const errorMessage = error.response?.data?.message || 'Failed to create account';
      if (Platform.OS === 'web') {
        window.alert(`Error: ${errorMessage}`);
      } else {
        Alert.alert('Error', errorMessage);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
        editable={!loading}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        editable={!loading}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        editable={!loading}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        editable={!loading}
      />
      <Button
        title={loading ? 'Signing Up...' : 'Sign Up'}
        onPress={handleSignUp}
        disabled={loading}
      />
      <TouchableOpacity onPress={() => navigation.navigate('Login')} disabled={loading}>
        <Text style={styles.link}>Already have an account? Login</Text>
      </TouchableOpacity>
      {Platform.OS !== 'web' && <StatusBar style="auto" />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
    maxWidth: Platform.OS === 'web' ? 600 : '100%',
    marginHorizontal: Platform.OS === 'web' ? 'auto' : 0,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  link: {
    marginTop: 20,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});