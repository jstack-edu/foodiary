import { AuthService } from '@app/services/AuthService';
import { ErrorCode } from '@app/types/ErrorCode';
import { Button } from '@ui/components/Button';
import { FormGroup } from '@ui/components/FormGroup';
import { Input } from '@ui/components/Input';
import { isAxiosError } from 'axios';
import React, { useRef } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Alert, TextInput, View } from 'react-native';
import { Step, StepContent, StepFooter, StepHeader, StepSubtitle, StepTitle } from '../components/Step';
import { OnboardingSchema } from '../schema';

export function CreateAccountStep() {
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);

  const form = useFormContext<OnboardingSchema>();

  const handleSubmit = form.handleSubmit(async data => {
    try {
      const birthDate = data.birthDate.toISOString().split('T')[0];

      const response = await AuthService.signUp({
        account: {
          email: data.account.email,
          password: data.account.password,
        },
        profile: {
          name: data.account.name,
          activityLevel: data.activityLevel,
          birthDate,
          gender: data.gender,
          goal: data.goal,
          height: Number(data.height),
          weight: Number(data.weight),
        },
      });
      console.log(response);
    } catch (error) {
      if (isAxiosError(error) && error.response?.data?.error?.code === ErrorCode.EMAIL_ALREADY_IN_USE) {
        Alert.alert('Oops!', 'Este e-mail já está sendo usado por outro usuário.');
        return;
      }

      Alert.alert('Oops!', 'Ocorreu um erro ao criar a sua conta, tente novamente.');
    }
  });

  return (
    <Step>
      <StepHeader>
        <StepTitle>Crie sua conta</StepTitle>
        <StepSubtitle>Para poder visualizar seu progresso</StepSubtitle>
      </StepHeader>

      <StepContent>
        <View style={{ gap: 24 }}>
          <Controller
            control={form.control}
            name="account.name"
            render={({ field, fieldState }) => (
              <FormGroup label="Nome" error={fieldState.error?.message}>
                <Input
                  autoFocus
                  placeholder="João Silva"
                  autoCapitalize="words"
                  autoCorrect={false}
                  autoComplete="name"
                  returnKeyType="next"
                  onSubmitEditing={() => emailInputRef.current?.focus()}
                  value={field.value}
                  onChangeText={field.onChange}
                  disabled={form.formState.isSubmitting}
                />
              </FormGroup>
            )}
          />

          <Controller
            control={form.control}
            name="account.email"
            render={({ field, fieldState }) => (
              <FormGroup label="E-mail" error={fieldState.error?.message}>
                <Input
                  ref={emailInputRef}
                  placeholder="joaosilva@gmail.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="email"
                  returnKeyType="next"
                  onSubmitEditing={() => passwordInputRef.current?.focus()}
                  value={field.value}
                  onChangeText={field.onChange}
                  disabled={form.formState.isSubmitting}
                />
              </FormGroup>
            )}
          />

          <Controller
            control={form.control}
            name="account.password"
            render={({ field, fieldState }) => (
              <FormGroup label="Senha" error={fieldState.error?.message}>
                <Input
                  ref={passwordInputRef}
                  placeholder="Mínimo 8 caracteres"
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="new-password"
                  returnKeyType="next"
                  onSubmitEditing={() => confirmPasswordInputRef.current?.focus()}
                  value={field.value}
                  onChangeText={field.onChange}
                  disabled={form.formState.isSubmitting}
                />
              </FormGroup>
            )}
          />

          <Controller
            control={form.control}
            name="account.confirmPassword"
            render={({ field, fieldState }) => (
              <FormGroup label="Confirmar Senha" error={fieldState.error?.message}>
                <Input
                  ref={confirmPasswordInputRef}
                  placeholder="Mínimo 8 caracteres"
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="new-password"
                  returnKeyType="done"
                  onSubmitEditing={handleSubmit}
                  value={field.value}
                  onChangeText={field.onChange}
                  disabled={form.formState.isSubmitting}
                />
              </FormGroup>
            )}
          />
        </View>
      </StepContent>

      <StepFooter align="start">
        <Button
          onPress={handleSubmit}
          style={{ width: '100%' }}
          isLoading={form.formState.isSubmitting}
        >
          Criar conta
        </Button>
      </StepFooter>
    </Step>
  );
}
