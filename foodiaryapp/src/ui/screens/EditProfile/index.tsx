import { useAccount } from '@app/hooks/queries/useAccount';
import { Gender } from '@app/types/Gender';
import { AppHeader } from '@ui/components/AppHeader';
import { Button } from '@ui/components/Button';
import { DateInput } from '@ui/components/DateInput';
import { FormGroup } from '@ui/components/FormGroup';
import { Input } from '@ui/components/Input';
import { RadioGroup, RadioGroupIcon, RadioGroupItem, RadioGroupLabel } from '@ui/components/RadioGroup';
import { formatDecimal } from '@ui/utils/formatDecimal';
import { Controller } from 'react-hook-form';
import { Image, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { styles } from './styles';
import { useEditProfileController } from './useEditProfileController';

export function EditProfile() {
  const { account } = useAccount();
  const { top, bottom, form, handleSubmit, isSubmitting } = useEditProfileController();

  if (!account) {
    return null;
  }

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <AppHeader title="Perfil" />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView style={styles.content}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: 'https://github.com/maateusilva.png' }}
              style={styles.avatar}
            />
          </View>

          <View style={styles.form}>
            <Controller
              control={form.control}
              name="name"
              render={({ field, fieldState }) => (
                <FormGroup
                  label="Nome"
                  error={fieldState.error?.message}
                >
                  <Input
                    placeholder="Mateus Silva"
                    value={field.value}
                    onChangeText={field.onChange}
                  />
                </FormGroup>
              )}
            />

            <Controller
              control={form.control}
              name="birthDate"
              render={({ field, fieldState }) => (
                <FormGroup
                  label="Data de Nascimento"
                  error={fieldState.error?.message}
                >
                  <DateInput
                    value={field.value}
                    onChange={field.onChange}
                    error={!!fieldState.error}
                  />
                </FormGroup>
              )}
            />

            <Controller
              control={form.control}
              name="height"
              render={({ field, fieldState }) => (
                <FormGroup
                  label="Altura"
                  error={fieldState.error?.message}
                >
                  <Input
                    placeholder="175"
                    keyboardType="numeric"
                    value={field.value}
                    onChangeText={field.onChange}
                    suffix="cm"
                    formatter={formatDecimal}
                  />
                </FormGroup>
              )}
            />

            <Controller
              control={form.control}
              name="weight"
              render={({ field, fieldState }) => (
                <FormGroup
                  label="Peso"
                  error={fieldState.error?.message}
                >
                  <Input
                    placeholder="80"
                    keyboardType="numeric"
                    value={field.value}
                    onChangeText={field.onChange}
                    suffix="kg"
                    formatter={formatDecimal}
                  />
                </FormGroup>
              )}
            />

            <Controller
              control={form.control}
              name="gender"
              render={({ field, fieldState }) => (
                <FormGroup
                  label="Sexo"
                  error={fieldState.error?.message}
                >
                  <RadioGroup
                    orientation="horizontal"
                    value={field.value}
                    onChangeValue={field.onChange}
                    error={!!fieldState.error}
                  >
                    <RadioGroupItem value={Gender.MALE}>
                      <RadioGroupIcon>🧔‍♂️</RadioGroupIcon>
                      <RadioGroupLabel>Masculino</RadioGroupLabel>
                    </RadioGroupItem>
                    <RadioGroupItem value={Gender.FEMALE}>
                      <RadioGroupIcon>👩‍🦰</RadioGroupIcon>
                      <RadioGroupLabel>Feminino</RadioGroupLabel>
                    </RadioGroupItem>
                  </RadioGroup>
                </FormGroup>
              )}
            />
          </View>
        </ScrollView>

        <View style={[styles.footer, { paddingBottom: bottom }]}>
          <Button
            onPress={handleSubmit}
            isLoading={isSubmitting}
          >
            Salvar
          </Button>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
