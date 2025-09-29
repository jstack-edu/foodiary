import { RouteProp } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import { Greetings } from '@ui/screens/Greetings';
import { Onboarding } from '@ui/screens/Onboarding';

type AuthStackParamList = {
  Greetings: undefined;
  Onboarding: undefined;
};

export type AuthStackNavigationProps = NativeStackNavigationProp<AuthStackParamList>;

export type AuthStackScreenProps<
  TRouteName extends keyof AuthStackParamList,
> = NativeStackScreenProps<AuthStackParamList, TRouteName>;

export type AuthStackRouteProps<
  TRouteName extends keyof AuthStackParamList,
> = RouteProp<AuthStackParamList, TRouteName>;

const Stack = createNativeStackNavigator<AuthStackParamList>();

export function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Greetings" component={Greetings} />
      <Stack.Screen name="Onboarding" component={Onboarding} />
    </Stack.Navigator>
  );
}
