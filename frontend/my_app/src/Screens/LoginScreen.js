import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email && password) {
      if (Platform.OS === 'web') {
        window.alert(`Login: Logging in with ${email}`);
      } else {
        Alert.alert('Login', `Logging in with ${email}`);
      }
      navigation.navigate('Home');
    } else {
      if (Platform.OS === 'web') {
        window.alert('Error: Please fill in all fields');
      } else {
        Alert.alert('Error', 'Please fill in all fields');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title="Login" onPress={handleLogin} />

      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.link}>Don't have an account? Sign Up</Text>
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
    backgroundColor: '#ff5f5f',
    maxWidth: Platform.OS === 'web' ? 600 : '100%',
    marginHorizontal: Platform.OS === 'web' ? 'auto' : 0,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
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
