import { View, Text, Button, StyleSheet, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function HomeScreen({ navigation }) {
  const handleLogout = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Home Page!</Text>
      <Text style={styles.subtitle}>You are now logged in.</Text>
      <Button title="Logout" onPress={handleLogout} />
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
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    color: '#333',
  },
});