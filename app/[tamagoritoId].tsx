import HeaderComponent from '@/components/Header';
import { getOneTamagorito, TamagoritoInterface } from '@/database/service';
import { MaterialIcons } from '@expo/vector-icons';
import { Link, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useCallback, useState } from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import { Avatar, Card, ProgressBar } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default function Details() {
  const groudon = require('@/assets/images/groudon.png');
  const kyogre = require('@/assets/images/kyogre.png');
  const rayquaza = require('@/assets/images/rayquaza.png');
  const tamagoritoImages = [groudon, rayquaza, kyogre];

  const [tamagorito, setTamagorito] = useState<TamagoritoInterface>();

  const { tamagoritoId } = useLocalSearchParams<{ tamagoritoId: string }>();

  const fetchTamagorito = useCallback(() => {
    const foundTamagorito = getOneTamagorito(tamagoritoId);
    setTamagorito(foundTamagorito);
  }, []);

  useFocusEffect(fetchTamagorito);

  return (
    <>
      <HeaderComponent title={tamagorito?.name ?? ''} />
      <View style={styles.container}>
        <Card style={{ padding: 8, paddingBottom: 16 }}>
          <View style={{ gap: 8 }}>
            <View>
              <Text>Vida</Text>
              <ProgressBar
                progress={tamagorito?.life ? tamagorito.life / 100 : 0}
                color="red"
              />
            </View>
            <View>
              <Text>Fome</Text>
              <ProgressBar
                progress={tamagorito?.hunger ? tamagorito.hunger / 100 : 0}
                color="green"
              />
            </View>
            <View>
              <Text>Sono</Text>
              <ProgressBar
                progress={tamagorito?.sleep ? tamagorito.sleep / 100 : 0}
                color="blue"
              />
            </View>
          </View>
        </Card>
        <View style={{ flex: 1 }}>
          <Image
            style={{
              width: 300,
              height: 300,
              alignSelf: 'center',
            }}
            source={
              tamagoritoImages[tamagorito?.image ? tamagorito.image - 1 : 0]
            }
          />
        </View>
        <View style={{ alignItems: 'center' }}></View>
      </View>
    </>
  );
}
