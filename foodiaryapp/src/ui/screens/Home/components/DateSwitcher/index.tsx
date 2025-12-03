import { AppText } from '@ui/components/AppText';
import { Button } from '@ui/components/Button';
import { theme } from '@ui/styles/theme';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react-native';
import React from 'react';
import { View } from 'react-native';
import { useHomeContext } from '../../context/useHomeContext';
import { styles } from './styles';

export function DateSwitcher() {
  const { isLoading, date, nextDay, previousDay } = useHomeContext();

  return (
    <View style={[styles.container, { opacity: isLoading ? 0.5 : 1 }]}>
      <Button
        size="icon"
        variant="ghost"
        onPress={previousDay}
        disabled={isLoading}
      >
         <ChevronLeftIcon />
      </Button>

      <AppText
        color={theme.colors.gray[700]}
        style={styles.selectedDate}
        weight="medium"
      >
        {formatDate(date)}
      </AppText>

      <Button
        size="icon"
        variant="ghost"
        onPress={nextDay}
        disabled={isLoading}
      >
        <ChevronRightIcon />
      </Button>
    </View>
  );
}

function formatDate(date: Date) {
  const now = new Date();
  const isToday = now.toDateString() === date.toDateString();

  const formattedDate = Intl.DateTimeFormat('pt-BR', {
    weekday: isToday ? undefined : 'long',
    day: '2-digit',
    month: 'long',
  }).format(date);

  return `${isToday ? 'HOJE, ' : ''}${formattedDate}`.toUpperCase();
}
