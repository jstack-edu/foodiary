import React from 'react';
import { ImageBackground, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import greetingsBg from '@ui/assets/greetings-bg/image.jpg';

import { AppText } from '@ui/components/AppText';
import { Button } from '@ui/components/Button';
import { Logo } from '@ui/components/Logo';
import { theme } from '@ui/styles/theme';

import { styles } from './styles';

export function Greetings() {
  return (
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
            <Button>
              Criar conta
            </Button>

            <View style={styles.signInContainer}>
              <AppText color={theme.colors.white}>
                Já tem conta?
              </AppText>
              <TouchableOpacity>
                <AppText color={theme.colors.lime[500]} weight="medium">
                  Acesse a sua conta
                </AppText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
