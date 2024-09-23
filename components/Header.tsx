import { Navigator, useNavigation } from 'expo-router';
import * as React from 'react';
import { Appbar } from 'react-native-paper';

export interface HeaderComponentProps {
  hideGoBack?: boolean;
  title: string;
}

const HeaderComponent = (headerComponentProps: HeaderComponentProps) => {
  const navigator = useNavigation();
  const _goBack = () => navigator.goBack();

  return (
    <Appbar.Header style={{ backgroundColor: 'rgb(75, 94, 235)' }}>
      {!headerComponentProps.hideGoBack ? (
        <Appbar.BackAction onPress={_goBack} color="white" />
      ) : null}
      <Appbar.Content title={headerComponentProps.title} color="white" />
    </Appbar.Header>
  );
};

export default HeaderComponent;
