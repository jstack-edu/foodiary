import { NavigationContainer } from '@react-navigation/native';
import { RootStack } from './RootStack';

export function Navigation() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}
