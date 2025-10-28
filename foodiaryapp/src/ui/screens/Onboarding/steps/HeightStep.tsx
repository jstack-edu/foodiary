import { ArrowRightIcon } from 'lucide-react-native';
import React, { useState } from 'react';

import { Button } from '@ui/components/Button';
import { theme } from '@ui/styles/theme';

import { FormGroup } from '@ui/components/FormGroup';
import { Input } from '@ui/components/Input';
import { formatDecimal } from '@ui/utils/formatDecimal';
import { Step, StepContent, StepFooter, StepHeader, StepSubtitle, StepTitle } from '../components/Step';
import { useOnboarding } from '../context/useOnboarding';

export function HeightStep() {
  const { nextStep } = useOnboarding();

  const [value, setValue] = useState('');

  return (
    <Step>
      <StepHeader>
        <StepTitle>Qual é sua altura?</StepTitle>
        <StepSubtitle>Você pode inserir uma estimativa</StepSubtitle>
      </StepHeader>

      <StepContent position="center">
        <FormGroup label="Altura" style={{ width: '100%' }}>
          <Input
            placeholder="175"
            keyboardType="numeric"
            formatter={formatDecimal}
            value={value}
            onChangeText={setValue}
            autoFocus
          />
        </FormGroup>
      </StepContent>

      <StepFooter>
        <Button size="icon" onPress={nextStep}>
          <ArrowRightIcon size={20} color={theme.colors.black[700]} />
        </Button>
      </StepFooter>
    </Step>
  );
}
