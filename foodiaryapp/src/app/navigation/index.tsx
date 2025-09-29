import { NavigationContainer } from '@react-navigation/native';
import { AuthStack } from './AuthStack';

export function Navigation() {
  return (
    <NavigationContainer>
      <AuthStack />
    </NavigationContainer>
  );
}
