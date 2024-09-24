import HeaderComponent from '@/components/Header';
import { getOneTamagorito, TamagoritoInterface } from '@/database/service';
import {
  addFood,
  addMedicine,
  addPlay,
  addSleep,
} from '@/functions/addAttribbutes';
import { MaterialIcons } from '@expo/vector-icons';
import {
  Link,
  useFocusEffect,
  useLocalSearchParams,
  useNavigation,
} from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Avatar, Card, ProgressBar, Button } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default function Details() {
  const navigation = useNavigation();
  const groudon = require('@/assets/images/groudon.png');
  const kyogre = require('@/assets/images/kyogre.png');
  const rayquaza = require('@/assets/images/rayquaza.png');
  const tamagoritoImages = [groudon, rayquaza, kyogre];

  const { tamagoritoId } = useLocalSearchParams<{ tamagoritoId: string }>();

  const [tamagorito, setTamagorito] = useState<TamagoritoInterface | undefined>(
    getOneTamagorito(tamagoritoId),
  );

  const fetchTamagorito = useCallback(() => {
    const foundTamagorito = getOneTamagorito(tamagoritoId);
    setTamagorito(foundTamagorito);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      fetchTamagorito();
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAddFoodButton = useCallback(() => {
    addFood(tamagoritoId);
  }, []);

  const handleAddSleepButton = useCallback(() => {
    addSleep(tamagoritoId);
  }, []);

  const handleAddPlayButton = useCallback(() => {
    addPlay(tamagoritoId);
  }, []);

  const handleAddMedicineButton = useCallback(() => {
    addMedicine(tamagoritoId);
  }, []);

  useEffect(() => {
    console.log(`AAAA`, tamagorito);
    if (!tamagorito) {
      alert('Tamagorito morreu');
      navigation.goBack();
      return;
    }
    if (
      tamagorito?.life <= 0 ||
      tamagorito?.hunger <= 0 ||
      tamagorito?.sleep <= 0
    ) {
      alert('Seu tamagorito morreu');
      navigation.goBack();
    }
  }, [tamagorito]);

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
        {/* supper play button */}
        <Link href={'/play'} asChild>
          <Button
            icon={() => <MaterialIcons name="games" size={24} />}
            onPress={handleAddPlayButton}
          >
            Jogar
          </Button>
        </Link>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginBottom: 40,
          }}
        >
          <Button
            icon={() => <MaterialIcons name="fastfood" size={24} />}
            onPress={handleAddFoodButton}
          >
            Comida
          </Button>
          <Button
            icon={() => <MaterialIcons name="hotel" size={24} />}
            onPress={handleAddSleepButton}
          >
            Dormir
          </Button>
          <Button
            icon={() => <MaterialIcons name="sports" size={24} />}
            onPress={handleAddPlayButton}
          >
            Brincar
          </Button>
          <Button
            icon={() => <MaterialIcons name="local-hospital" size={24} />}
            onPress={handleAddMedicineButton}
          >
            Remédio
          </Button>
        </View>
      </View>
    </>
  );
}
