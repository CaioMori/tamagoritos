import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { PaperProvider } from 'react-native-paper';

const style = StyleSheet.create({
  headerContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    backgroundColor: '#244555',
  },
  headerTitle: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
  },
});

export default function RootLayout() {
  return (
    <PaperProvider>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="index"
          options={{ headerTitle: 'Lista de Tamagoritos' }}
        />
        <Stack.Screen name="register" />
      </Stack>
    </PaperProvider>
  );
}
