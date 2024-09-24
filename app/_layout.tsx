import {
  TamagoritoInterface,
  getTamagoritos,
  updateTamagorito,
} from '@/database/service';
import updateAttributes from '@/functions/updateAttriutes';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useState } from 'react';
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
  const fetchTamagorito = useCallback(() => {
    return getTamagoritos();
  }, []);

  const updateTamagoritos = useCallback(
    (tamagoritos: TamagoritoInterface[]) => {
      const updatedTamagoritos = updateAttributes(tamagoritos);
      updatedTamagoritos.forEach((tamagorito) => {
        updateTamagorito(tamagorito);
      });
    },
    [],
  );

  const handleUpdateTamagoritos = useCallback(() => {
    const tamagoritos = fetchTamagorito();
    console.log(tamagoritos);
    updateTamagoritos(tamagoritos);
  }, [fetchTamagorito, updateTamagoritos]);

  useEffect(() => {
    const interval = setInterval(() => {
      handleUpdateTamagoritos();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <PaperProvider>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="index"
          options={{ headerTitle: 'Lista de Tamagoritos' }}
        />
        <Stack.Screen name="register" />
        <Stack.Screen name="play" />
      </Stack>
    </PaperProvider>
  );
}
