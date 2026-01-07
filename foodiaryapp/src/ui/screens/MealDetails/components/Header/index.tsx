import { Meal, MealInputType } from '@app/types/Meal';
import { useNavigation } from '@react-navigation/native';
import { AppText } from '@ui/components/AppText';
import { Button } from '@ui/components/Button';
import { theme } from '@ui/styles/theme';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronLeftIcon } from 'lucide-react-native';
import { Skeleton } from 'moti/skeleton';
import React, { useMemo } from 'react';
import { ImageBackground, StatusBar, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './styles';

interface IHeaderProps {
  isLoading: boolean;
  meal: Meal | undefined;
}

export function Header({ meal, isLoading }: IHeaderProps) {
  const { top } = useSafeAreaInsets();
  const { goBack } = useNavigation();

  const isPictureInput = meal?.inputType === MealInputType.PICTURE;

  const summary = useMemo(() => (
    (meal?.foods ?? []).reduce(
      (acc, food) => {
        const proteinsCalories = food.proteins * 4;
        const carbohydratesCalories = food.carbohydrates * 4;
        const fatsCalories = food.fats * 9;
        const totalCalories = Math.round(proteinsCalories + carbohydratesCalories + fatsCalories);

        return {
          calories: acc.calories + totalCalories,
          proteins: acc.proteins + food.proteins,
          carbohydrates: acc.carbohydrates + food.carbohydrates,
          fats: acc.fats + food.fats,
        };
      },
      { calories: 0, proteins: 0, carbohydrates: 0, fats: 0 },
    )
  ), [meal?.foods]);

  const percentages = useMemo(() => {
    const proteinsCalories = summary.proteins * 4;
    const carbohydratesCalories = summary.carbohydrates * 4;
    const fatsCalories = summary.fats * 9;

    if (summary.calories === 0) {
      return { proteins: 0, carbohydrates: 0, fats: 0 };
    }

    return {
      proteins: Math.round((proteinsCalories * 100) / summary.calories),
      carbohydrates: Math.round((carbohydratesCalories * 100) / summary.calories),
      fats: Math.round((fatsCalories * 100) / summary.calories),
    };
  }, [summary]);

  return (
    <>
      <StatusBar animated translucent barStyle="light-content" />

      <View style={[styles.container]}>
        {isPictureInput && (
          <ImageBackground
            style={styles.image}
            source={{ uri: meal.inputFileURL }}
          >
            <LinearGradient
              style={[styles.overlay, { paddingTop: top + 12 }]}
              colors={['rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0)']}
              start={{ y: 0.6, x: 0 }}
              end={{ y: 1, x: 0 }}
            >
              <BlurView style={styles.blurView}>
                <Button onPress={goBack} size="icon" variant="ghost">
                  <ChevronLeftIcon size={20} color={theme.colors.white} />
                </Button>
              </BlurView>
            </LinearGradient>
          </ImageBackground>
        )}

        <View
          style={[
            styles.content,
            { marginTop: !isPictureInput ? top : 0 },
          ]}
        >
          <View style={styles.pageTitleContainer}>
            <Button onPress={goBack} size="icon" variant="ghost">
              <ChevronLeftIcon size={20} color={theme.colors.white} />
            </Button>
            <AppText weight="medium" color={theme.colors.gray[300]}>
              Refeição
            </AppText>
          </View>

          <View style={styles.caloriesContainer}>
            <AppText color={theme.colors.gray[300]}>
              Calorias
            </AppText>
            <Skeleton width={61} height={24} colorMode="dark">
              {isLoading ? null : (
                <AppText color={theme.colors.white} weight="medium">
                  {summary.calories}kcal
                </AppText>
              )}
            </Skeleton>
          </View>
        </View>
      </View>

      <View style={styles.macrosContainer}>
        <View style={styles.macro}>
          <AppText color={theme.colors.gray[700]}>Proteínas</AppText>
          <Skeleton width={96} height={24} colorMode="light">
            {isLoading ? null : (
              <AppText weight="medium" color={theme.colors.support.teal}>
                {summary.proteins}g ({percentages.proteins}%)
              </AppText>
            )}
          </Skeleton>
        </View>

        <View style={styles.macro}>
          <AppText color={theme.colors.gray[700]}>Carboidratos</AppText>
          <Skeleton width={96} height={24} colorMode="light">
            {isLoading ? null : (
              <AppText weight="medium" color={theme.colors.support.yellow}>
                {summary.carbohydrates}g ({percentages.carbohydrates}%)
              </AppText>
            )}
          </Skeleton>
        </View>

        <View style={styles.macro}>
          <AppText color={theme.colors.gray[700]}>Gorduras</AppText>
          <Skeleton width={96} height={24} colorMode="light">
            {isLoading ? null : (
              <AppText weight="medium" color={theme.colors.support.orange}>
                {summary.fats}g ({percentages.fats}%)
              </AppText>
            )}
          </Skeleton>
        </View>
      </View>

      <View style={styles.macrosProgressContainer}>
        <Skeleton width="100%" height={4} colorMode="light">
          {isLoading ? null : (
            <View style={styles.macrosProgress}>
              <View
                style={[styles.proteinProgress, {
                  width: `${percentages.proteins}%`,
                }]}
              />
              <View
                style={[styles.carbohydratesProgress, {
                  width: `${percentages.carbohydrates}%`,
                }]}
              />
              <View
                style={[styles.fatsProgress, {
                  width: `${percentages.fats}%`,
                }]}
              />
            </View>
          )}
        </Skeleton>
      </View>

      <View style={styles.divider} />

      <View style={styles.mealNameContainer}>
        <Skeleton width="50%" height={24} colorMode="light">
          {isLoading ? null : (
            <AppText size="xl" weight="semiBold" style={styles.mealName}>
              {meal?.name}
            </AppText>
          )}
        </Skeleton>
      </View>

      <AppText
        weight="medium"
        style={styles.mealItemsHeader}
        color={theme.colors.gray[700]}
      >
        Itens
      </AppText>
    </>
  );
}
