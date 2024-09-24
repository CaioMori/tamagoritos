import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Animated, Dimensions } from 'react-native';
import { Gyroscope } from 'expo-sensors';
import { Button } from 'react-native-paper';
import HeaderComponent from '@/components/Header';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  ball: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'blue',
    position: 'absolute',
  },
  button: {
    margin: 16,
  },
});

const Play = () => {
  const [data, setData] = useState({ x: 0, y: 0, z: 0 });

  const [subscription, setSubscription] = useState<any>(null);

  const screenWidth = Dimensions.get('window').width;

  const screenHeight = Dimensions.get('window').height;

  const [position, setPosition] = useState(
    new Animated.ValueXY({
      x: screenWidth / 2 - 20,
      y: screenHeight / 2 - 120,
    }),
  );

  const _subscribe = () => {
    setSubscription(
      Gyroscope.addListener((gyroscopeData) => {
        setData(gyroscopeData);

        let newX = position.x._value + gyroscopeData.y * 60;
        let newY = position.y._value + gyroscopeData.x * 60;

        newX = Math.max(0, Math.min(newX, screenWidth - 60));
        newY = Math.max(0, Math.min(newY, screenHeight - 60));

        Animated.timing(position, {
          toValue: { x: newX, y: newY },
          duration: 100,
          useNativeDriver: false,
        }).start();
      }),
    );

    Gyroscope.setUpdateInterval(100);
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();

    return () => {
      _unsubscribe();
    };
  }, [position]);

  const resetPosition = () => {
    position.setValue({ x: screenWidth / 2 - 20, y: screenHeight / 2 - 120 });
  };

  return (
    <>
      <HeaderComponent hideGoBack title="tamagorito" />
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <Animated.View
            style={[
              styles.ball,
              {
                transform: position.getTranslateTransform(),
              },
            ]}
          />
        </View>
        <Button mode="contained" onPress={resetPosition} style={styles.button}>
          Reiniciar
        </Button>
      </View>
    </>
  );
};

export default Play;
