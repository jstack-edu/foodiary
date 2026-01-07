import { useMeal } from '@app/hooks/queries/useMeal';
import { AppStackRouteProps } from '@app/navigation/AppStack';
import { useRoute } from '@react-navigation/native';
import { AppText } from '@ui/components/AppText';
import { Skeleton } from 'moti/skeleton';
import { FlatList, View } from 'react-native';
import { Header } from './components/Header';
import { styles } from './styles';

export function MealDetails() {
  const { params } = useRoute<AppStackRouteProps<'MealDetails'>>();
  const { meal, isLoading } = useMeal(params.mealId);

  return (
    <View style={styles.container}>
      <FlatList
        data={meal?.foods ?? []}
        ListHeaderComponent={<Header meal={meal} isLoading={isLoading} />}
        ListEmptyComponent={(
          !isLoading ? null : (
            <>
              <View style={styles.food}>
                <Skeleton width="100%" height={24} colorMode="light" />
              </View>
              <View style={styles.food}>
                <Skeleton width="100%" height={24} colorMode="light" />
              </View>
              <View style={styles.food}>
                <Skeleton width="100%" height={24} colorMode="light" />
              </View>
            </>
          )
        )}
        renderItem={({ item: food }) => (
          <View style={styles.food}>
            <AppText>{food.quantity} {food.name}</AppText>
          </View>
        )}
      />
    </View>
  );
}
