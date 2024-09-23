import HeaderComponent from '@/components/Header';
import { createTamagorito } from '@/database/service';
import { useNavigation } from 'expo-router';
import { useCallback, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar, Button, Card, Snackbar, TextInput } from 'react-native-paper';

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  cardContainer: {
    gap: 16,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  icon: {
    borderRadius: 99,
    borderWidth: 8,
    borderColor: 'purple',
    padding: 3,
    backgroundColor: 'white',
  },
});

export default function Register() {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [tamagorito, setTamagorito] = useState(0);
  const [visible, setVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleChooseTamagorito = useCallback((tamagorito: number) => {
    setTamagorito(tamagorito);
  }, []);

  const handleCreateTamagorito = useCallback(() => {
    setVisible(false);
    if (!name || !tamagorito || name.length === 0) {
      setSnackbarMessage('Preencha todos os campos!');
      setVisible(true);
      return;
    }

    createTamagorito({ name, image: tamagorito });
    navigation.goBack();
  }, [name, tamagorito]);

  return (
    <>
      <HeaderComponent title="Registrar Tamagorito" />
      <View style={style.container}>
        <Card>
          <Card.Title title="Escolha um dos tamagoritos disponíveis" />
          <Card.Content style={style.cardContainer}>
            <View style={style.iconContainer}>
              <TouchableOpacity
                style={[
                  style.icon,
                  tamagorito === 1 && { borderColor: 'green' },
                ]}
                onPress={() => handleChooseTamagorito(1)}
              >
                <Avatar.Image
                  size={80}
                  source={require('../assets/images/groudon.png')}
                  style={{ backgroundColor: 'transparent' }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  style.icon,
                  tamagorito === 2 && { borderColor: 'green' },
                ]}
                onPress={() => handleChooseTamagorito(2)}
              >
                <Avatar.Image
                  size={80}
                  source={require('../assets/images/rayquaza.png')}
                  style={{ backgroundColor: 'transparent' }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  style.icon,
                  tamagorito === 3 && { borderColor: 'green' },
                ]}
                onPress={() => handleChooseTamagorito(3)}
              >
                <Avatar.Image
                  size={80}
                  source={require('../assets/images/kyogre.png')}
                  style={{ backgroundColor: 'transparent' }}
                />
              </TouchableOpacity>
            </View>
            <TextInput
              mode="outlined"
              label="Nome"
              value={name}
              onChangeText={setName}
              maxLength={20}
            />
            <Button mode="contained" onPress={handleCreateTamagorito}>
              Criar
            </Button>
          </Card.Content>
        </Card>
        <Snackbar visible={visible} onDismiss={() => setVisible(false)}>
          {snackbarMessage}
        </Snackbar>
      </View>
    </>
  );
}
