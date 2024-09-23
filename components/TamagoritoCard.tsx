import { TamagoritoInterface } from '@/database/service';
import { View, StyleSheet } from 'react-native';
import {
  Avatar,
  Card,
  IconButton,
  ProgressBar,
  Text,
} from 'react-native-paper';

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    gap: 16,
  },
  icon: {
    backgroundColor: 'white',
  },

  titleContainer: {
    marginBottom: -24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusContainer: {
    flex: 1,
    padding: 8,
  },
});

export interface TamagoritoCardProps {
  item: TamagoritoInterface;
  onPress: () => void;
  onDelete: (id: string) => void;
}

const TamagoritoCardComponent = (tamagoritoCardProps: TamagoritoCardProps) => {
  const groudon = require('../assets/images/groudon.png');
  const kyogre = require('@/assets/images/kyogre.png');
  const rayquaza = require('@/assets/images/rayquaza.png');
  const tamagoritoImages = [groudon, rayquaza, kyogre];

  return (
    <Card onPress={tamagoritoCardProps.onPress}>
      <Card.Title
        style={style.titleContainer}
        title={tamagoritoCardProps.item.name}
        titleStyle={style.title}
        right={() => (
          <IconButton
            onPress={() =>
              tamagoritoCardProps.onDelete(tamagoritoCardProps.item.id!)
            }
            icon="trash-can-outline"
            size={32}
            iconColor="red"
          />
        )}
      />
      <Card.Content style={style.cardContainer}>
        <Avatar.Image
          size={64}
          source={tamagoritoImages[tamagoritoCardProps.item.image - 1]}
          style={style.icon}
        />
        <View style={style.statusContainer}>
          <Text>Vida</Text>
          <ProgressBar
            progress={tamagoritoCardProps.item.life! / 100}
            color="red"
          />
          <Text>Fome</Text>
          <ProgressBar
            progress={tamagoritoCardProps.item.hunger! / 100}
            color="green"
          />
          <Text>Sono</Text>
          <ProgressBar
            progress={tamagoritoCardProps.item.sleep! / 100}
            color="blue"
          />
        </View>
      </Card.Content>
    </Card>
  );
};

export default TamagoritoCardComponent;
