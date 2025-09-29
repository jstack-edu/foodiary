import { BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { useImperativeHandle, useRef } from 'react';
import { Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ISignInBottomSheet } from './ISignInBottomSheet';

export function useSignInBottomSheetController(ref: React.Ref<ISignInBottomSheet>) {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const { bottom } = useSafeAreaInsets();
  const passwordInputRef = useRef<TextInput>(null);

  useImperativeHandle(ref, () => ({
    open: () => bottomSheetModalRef.current?.present(),
  }), []);

  function handleSubmit() {
    Alert.alert('Enviando o form...');
  }

  return {
    bottom,
    bottomSheetModalRef,
    passwordInputRef,
    handleSubmit,
  };
}
