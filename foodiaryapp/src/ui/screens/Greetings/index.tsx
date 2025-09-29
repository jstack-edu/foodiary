import { useNavigation } from '@react-navigation/native';
import React, { useRef } from 'react';
import { ImageBackground, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import greetingsBg from '@ui/assets/greetings-bg/image.jpg';

import { AppText } from '@ui/components/AppText';
import { Button } from '@ui/components/Button';
import { Logo } from '@ui/components/Logo';
import { theme } from '@ui/styles/theme';

import { AuthStackNavigationProps } from '@app/navigation/AuthStack';
import { SignInBottomSheet } from '@ui/components/SignInBottomSheet';
import { ISignInBottomSheet } from '@ui/components/SignInBottomSheet/ISignInBottomSheet';
import { styles } from './styles';

export function Greetings() {
  const signInBottomSheetRef = useRef<ISignInBottomSheet>(null);
  const navigation = useNavigation<AuthStackNavigationProps>();

  return (
    <>
      <ImageBackground
        source={greetingsBg}
        resizeMode="cover"
        style={styles.container}
      >
        <SafeAreaView style={styles.content}>
          <Logo />

          <View style={styles.ctaContainer}>
            <AppText
              color={theme.colors.white}
              weight="semiBold"
              size="3xl"
              style={styles.heading}
            >
              Controle sua dieta de forma simples
            </AppText>

            <View style={styles.ctaContent}>
              <Button onPress={() => navigation.navigate('Onboarding')}>
                Criar conta
              </Button>

              <View style={styles.signInContainer}>
                <AppText color={theme.colors.white}>
                  Já tem conta?
                </AppText>
                <TouchableOpacity onPress={() => signInBottomSheetRef.current?.open()}>
                  <AppText color={theme.colors.lime[500]} weight="medium">
                    Acesse a sua conta
                  </AppText>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>

      <SignInBottomSheet ref={signInBottomSheetRef} />
    </>
  );
}
