import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';

export type RootStackParamList = {
  list: undefined;
  register: undefined;
  details: undefined;
};

export default function RootLayout() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#244555' }}>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="list" />
        <Stack.Screen name="register" />
        <Stack.Screen name="details" />
      </Stack>
    </SafeAreaView>
  );
}
