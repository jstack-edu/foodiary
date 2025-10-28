import { Button } from '@ui/components/Button';
import {
  RadioGroup,
  RadioGroupDescription,
  RadioGroupIcon,
  RadioGroupItem,
  RadioGroupItemInfo,
  RadioGroupLabel,
} from '@ui/components/RadioGroup';
import { theme } from '@ui/styles/theme';
import { ArrowRightIcon } from 'lucide-react-native';
import React from 'react';
import { Step, StepContent, StepFooter, StepHeader, StepTitle } from '../components/Step';
import { useOnboarding } from '../context/useOnboarding';

export enum ActivityLevel {
  SEDENTARY = 'SEDENTARY',
  LIGHT = 'LIGHT',
  MODERATE = 'MODERATE',
  HEAVY = 'HEAVY',
  ATHLETE = 'ATHLETE',
}

export function ActivityLevelStep() {
  const { nextStep } = useOnboarding();

  return (
    <Step>
      <StepHeader>
        <StepTitle>Qual seu nível de atividade?</StepTitle>
      </StepHeader>

      <StepContent>
        <RadioGroup>
          <RadioGroupItem value={ActivityLevel.SEDENTARY}>
            <RadioGroupIcon>🛋️</RadioGroupIcon>
            <RadioGroupItemInfo>
              <RadioGroupLabel>Sedentário</RadioGroupLabel>
              <RadioGroupDescription>Pouco ou nenhum exercício</RadioGroupDescription>
            </RadioGroupItemInfo>
          </RadioGroupItem>

          <RadioGroupItem value={ActivityLevel.LIGHT}>
            <RadioGroupIcon>🥬</RadioGroupIcon>
            <RadioGroupItemInfo>
              <RadioGroupLabel>Leve</RadioGroupLabel>
              <RadioGroupDescription>Exercício leve 1-2x por semana</RadioGroupDescription>
            </RadioGroupItemInfo>
          </RadioGroupItem>

          <RadioGroupItem value={ActivityLevel.MODERATE}>
            <RadioGroupIcon>⚡</RadioGroupIcon>
            <RadioGroupItemInfo>
              <RadioGroupLabel>Moderado</RadioGroupLabel>
              <RadioGroupDescription>Exercício moderado 3-5x por semana</RadioGroupDescription>
            </RadioGroupItemInfo>
          </RadioGroupItem>

          <RadioGroupItem value={ActivityLevel.HEAVY}>
            <RadioGroupIcon>🔥</RadioGroupIcon>
            <RadioGroupItemInfo>
              <RadioGroupLabel>Intenso</RadioGroupLabel>
              <RadioGroupDescription>Exercício intenso 6-7x por semana</RadioGroupDescription>
            </RadioGroupItemInfo>
          </RadioGroupItem>

          <RadioGroupItem value={ActivityLevel.ATHLETE}>
            <RadioGroupIcon>🏋️</RadioGroupIcon>
            <RadioGroupItemInfo>
              <RadioGroupLabel>Atleta</RadioGroupLabel>
              <RadioGroupDescription>Treino profissional diário</RadioGroupDescription>
            </RadioGroupItemInfo>
          </RadioGroupItem>
        </RadioGroup>
      </StepContent>

      <StepFooter>
        <Button size="icon" onPress={nextStep}>
          <ArrowRightIcon size={20} color={theme.colors.black[700]} />
        </Button>
      </StepFooter>
    </Step>
  );
}
