import { WelcomeModal } from '@ui/components/WelcomeModal';
import React from 'react';
import { FlatList, RefreshControl, View } from 'react-native';

import { theme } from '@ui/styles/theme';
import { HomeProvider } from '../../../HomeProvider';
import { EmptyState } from './components/EmptyState';
import { FullScreenLoader } from './components/FullScreenLoader';
import { Header } from './components/Header';
import { ItemSeparatorComponent } from './components/ItemSeparatorComponent';
import { MealCard } from './components/MealCard';
import { styles } from './styles';
import { useHomeController } from './useHomeController';

export function Home() {
  const {
    bottom,
    date,
    isInitialLoading,
    isRefreshig,
    meals,
    top,
    isLoading,
    handleNextDay,
    handlePreviousDay,
    handleRefresh,
  } = useHomeController();

  if (isInitialLoading) {
    return <FullScreenLoader />;
  }

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <WelcomeModal />

      <HomeProvider
        date={date}
        meals={meals}
        isLoading={isLoading}
        nextDay={handleNextDay}
        previousDay={handlePreviousDay}
      >
        <FlatList
          data={meals}
          keyExtractor={item => item.id}
          contentContainerStyle={[styles.content, { paddingBottom: bottom + 24 }]}
          ListHeaderComponent={Header}
          ListEmptyComponent={EmptyState}
          ItemSeparatorComponent={ItemSeparatorComponent}
          refreshControl={(
            <RefreshControl
              refreshing={isRefreshig}
              onRefresh={handleRefresh}
              tintColor={theme.colors.lime[900]}
              colors={[theme.colors.lime[700]]}
            />
          )}
          renderItem={({ item: meal }) => (
            <MealCard meal={meal} />
          )}
        />
      </HomeProvider>
    </View>
  );
}
