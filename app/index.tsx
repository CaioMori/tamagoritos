import { MaterialIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function List() {
  return (
    <View style={styles.container}>
      <Text>List</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
