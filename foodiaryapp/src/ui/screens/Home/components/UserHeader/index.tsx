import { useAccount } from '@app/hooks/queries/useAccount';
import { AppStackNavigationProps } from '@app/navigation/AppStack';
import { useNavigation } from '@react-navigation/native';
import { AppText } from '@ui/components/AppText';
import { Button } from '@ui/components/Button';
import { theme } from '@ui/styles/theme';
import { TargetIcon } from 'lucide-react-native';
import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';

export function UserHeader() {
  const { account } = useAccount();
  const { navigate } = useNavigation<AppStackNavigationProps>();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.userInfo}
        onPress={() => navigate('EditProfile')}
      >
        <Image
          source={{ uri: 'https://github.com/maateusilva.png' }}
          style={styles.avatar}
        />

        <View style={styles.greetings}>
          <AppText size="sm" color={theme.colors.gray[700]}>Olá, 👋</AppText>
          <AppText weight="semiBold">
            {account!.profile.name}
          </AppText>
        </View>
      </TouchableOpacity>

      <Button
        variant="ghost"
        leftIcon={TargetIcon}
        onPress={() => navigate('EditGoals')}
      >
        Metas
      </Button>
    </View>
  );
}
