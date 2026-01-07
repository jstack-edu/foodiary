import { useNavigation } from '@react-navigation/native';
import { AppText } from '@ui/components/AppText';
import { Button } from '@ui/components/Button';
import { theme } from '@ui/styles/theme';
import { ChevronLeftIcon } from 'lucide-react-native';
import { View } from 'react-native';
import { styles } from './styles';

interface IAppHeaderProps {
  title: string;
  rightAction?: React.ReactNode;
}

export function AppHeader({ title, rightAction }: IAppHeaderProps) {
  const { goBack } = useNavigation();

  return (
    <View style={styles.container}>
      <Button onPress={goBack} size="icon" variant="ghost">
        <ChevronLeftIcon size={20} color={theme.colors.black[700]} />
      </Button>

      <AppText size="sm" align="center" style={styles.title}>
        {title}
      </AppText>

      <View style={styles.rightAction}>
        {rightAction}
      </View>
    </View>
  );
}
