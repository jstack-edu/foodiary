import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useImperativeHandle, useRef } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AuthService } from '@app/services/AuthService';
import { useForm } from 'react-hook-form';
import { Alert } from 'react-native';
import { ISignInBottomSheet } from './ISignInBottomSheet';
import { signInSchema } from './schema';

export function useSignInBottomSheetController(ref: React.Ref<ISignInBottomSheet>) {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const { bottom } = useSafeAreaInsets();
  const passwordInputRef = useRef<TextInput>(null);

  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useImperativeHandle(ref, () => ({
    open: () => bottomSheetModalRef.current?.present(),
  }), []);

  const handleSubmit = form.handleSubmit(async data => {
    try {
      const response = await AuthService.signIn(data);
      console.log(response);
    } catch {
      Alert.alert('Oops!', 'As credenciais informadas são inválidas');
    }
  });

  return {
    bottom,
    bottomSheetModalRef,
    passwordInputRef,
    form,
    handleSubmit,
  };
}
