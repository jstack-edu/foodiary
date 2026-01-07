import { useAccount } from '@app/hooks/queries/useAccount';
import { useNavigation } from '@react-navigation/native';
import { AppHeader } from '@ui/components/AppHeader';
import { Button } from '@ui/components/Button';
import { FormGroup } from '@ui/components/FormGroup';
import { Input } from '@ui/components/Input';
import { Controller } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { styles } from './styles';
import { useEditGoalsController } from './useEditGoalsController';

export function EditGoals() {
  const { account } = useAccount();
  const { goBack } = useNavigation();
  const { top, bottom, form, handleSubmit, isSubmitting } = useEditGoalsController();

  if (!account) {
    return null;
  }

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <AppHeader title="Editar Metas" />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView style={styles.content}>
          <View style={styles.form}>
            <Controller
              control={form.control}
              name="calories"
              render={({ field, fieldState }) => (
                <FormGroup
                  label="Calorias"
                  error={fieldState.error?.message}
                >
                  <Input
                    placeholder="2000"
                    keyboardType="numeric"
                    value={field.value}
                    onChangeText={field.onChange}
                    suffix="kcal"
                  />
                </FormGroup>
              )}
            />

            <Controller
              control={form.control}
              name="carbohydrates"
              render={({ field, fieldState }) => (
                <FormGroup
                  label="Carboidratos"
                  error={fieldState.error?.message}
                >
                  <Input
                    placeholder="200"
                    keyboardType="numeric"
                    value={field.value}
                    onChangeText={field.onChange}
                    suffix="g"
                  />
                </FormGroup>
              )}
            />

            <Controller
              control={form.control}
              name="proteins"
              render={({ field, fieldState }) => (
                <FormGroup
                  label="Proteínas"
                  error={fieldState.error?.message}
                >
                  <Input
                    placeholder="175"
                    keyboardType="numeric"
                    value={field.value}
                    onChangeText={field.onChange}
                    suffix="g"
                  />
                </FormGroup>
              )}
            />

            <Controller
              control={form.control}
              name="fats"
              render={({ field, fieldState }) => (
                <FormGroup
                  label="Gorduras"
                  error={fieldState.error?.message}
                >
                  <Input
                    placeholder="56"
                    keyboardType="numeric"
                    value={field.value}
                    onChangeText={field.onChange}
                    suffix="g"
                  />
                </FormGroup>
              )}
            />
          </View>

        </ScrollView>
        <View style={[styles.footer, { paddingBottom: bottom }]}>
          <View style={{ flex: 1 }}>
            <Button
              onPress={goBack}
              isLoading={isSubmitting}
              variant="secondary"
            >
              Cancelar
            </Button>
          </View>

          <View style={{ flex: 1 }}>
            <Button
              onPress={handleSubmit}
              isLoading={isSubmitting}
            >
              Salvar Alterações
            </Button>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
