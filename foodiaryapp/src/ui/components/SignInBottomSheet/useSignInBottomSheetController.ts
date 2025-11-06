import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useImperativeHandle, useRef, useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useAuth } from '@app/contexts/AuthContext/useAuth';
import { useForm } from 'react-hook-form';
import { Alert } from 'react-native';
import { ISignInBottomSheet } from './ISignInBottomSheet';
import { signInSchema } from './schema';

export function useSignInBottomSheetController(ref: React.Ref<ISignInBottomSheet>) {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const { bottom } = useSafeAreaInsets();
  const passwordInputRef = useRef<TextInput>(null);
  const { signIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: 'mateus@jstack.com.br',
      password: '12345678',
    },
  });

  useImperativeHandle(ref, () => ({
    open: () => bottomSheetModalRef.current?.present(),
  }), []);

  const handleSubmit = form.handleSubmit(async data => {
    try {
      setIsLoading(true);
      await signIn(data);
    } catch {
      setIsLoading(false);
      Alert.alert('Oops!', 'As credenciais informadas são inválidas');
    }
  });

  return {
    bottom,
    bottomSheetModalRef,
    passwordInputRef,
    form,
    handleSubmit,
    isLoading,
  };
}
