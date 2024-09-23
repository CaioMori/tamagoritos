import HeaderComponent from '@/components/Header';
import TamagoritoCardComponent from '@/components/TamagoritoCard';
import {
  deleteAllTamagoritos,
  deleteTamagorito,
  getTamagoritos,
  TamagoritoInterface,
} from '@/database/service';
import { useLinkTo } from '@react-navigation/native';
import { Link, useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  FlatList,
} from 'react-native';
import { useMMKV, useMMKVString } from 'react-native-mmkv';
import {
  Avatar,
  Button,
  Card,
  Icon,
  IconButton,
  MD3Colors,
  ProgressBar,
} from 'react-native-paper';

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 8,
    paddingBottom: 40,
    gap: 16,
  },
  innerContainer: {
    padding: 8,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    marginVertical: 16,
  },
});

export default function List() {
  const linkTo = useLinkTo();

  const [tamagoritos, setTamagoritos] = useState<Array<TamagoritoInterface>>(
    [],
  );

  const fetchTamagoritos = useCallback(() => {
    const tamagoritos = getTamagoritos();
    setTamagoritos(tamagoritos);
  }, []);

  const handleSelectTamagorito = useCallback((id?: string) => {
    if (!id) return;
    linkTo(`/${id}`);
  }, []);

  const handleDeleteTamagorito = useCallback((id: string) => {
    deleteTamagorito(id);
    fetchTamagoritos();
  }, []);

  useFocusEffect(fetchTamagoritos);

  return (
    <>
      <HeaderComponent hideGoBack title="Lista de Tamagoritos" />
      <View style={style.container}>
        <FlatList
          data={tamagoritos}
          contentContainerStyle={style.innerContainer}
          renderItem={({ item }) => (
            <TamagoritoCardComponent
              item={item}
              onPress={() => handleSelectTamagorito(item.id)}
              onDelete={handleDeleteTamagorito}
            />
          )}
          ItemSeparatorComponent={() => <View style={style.divider} />}
          showsVerticalScrollIndicator={false}
        />
        <Link href="/register" asChild>
          <Button icon="plus" mode="contained">
            Novo Tamagorito
          </Button>
        </Link>
      </View>
    </>
  );
}
