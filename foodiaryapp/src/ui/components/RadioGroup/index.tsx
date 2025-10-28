import { createContext, use, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { theme } from '@ui/styles/theme';

import { AppText } from '../AppText';
import { styles } from './styles';

interface IRadioGroupContextValue {
  value: string | null;
  setValue: (value: string | null) => void;
  isHorizontal: boolean;
}

const RadioGroupContext = createContext({} as IRadioGroupContextValue);

interface IRadioGroupProps {
  children: React.ReactNode;
  initialValue?: string;
  orientation?: 'vertical' | 'horizontal';
}

export function RadioGroup({
  children,
  initialValue,
  orientation = 'vertical',
}: IRadioGroupProps) {
  const [value, setValue] = useState<string | null>(initialValue ?? null);

  const isHorizontal = orientation === 'horizontal';

  return (
    <RadioGroupContext.Provider value={{ value, setValue, isHorizontal }}>
      <View style={[styles.container, isHorizontal && styles.containerHorizontal]}>
        {children}
      </View>
    </RadioGroupContext.Provider>
  );
}

interface IRadioGroupItemProps {
  children: React.ReactNode;
  value: string;
}

const RadioGroupItemContext = createContext({ isSelected: false });

export function RadioGroupItem({ children, value }: IRadioGroupItemProps) {
  const { value: selectedValue, setValue, isHorizontal } = use(RadioGroupContext);
  const isSelected = value === selectedValue;

  return (
    <RadioGroupItemContext.Provider value={{ isSelected }}>
      <TouchableOpacity
        style={[
          styles.item,
          isSelected && styles.selectedItem,
          isHorizontal && styles.horizontalItem,
        ]}
        onPress={() => setValue(value)}
      >
        {children}
      </TouchableOpacity>
    </RadioGroupItemContext.Provider>
  );
}

export function RadioGroupIcon({ children }: { children: string }) {
  const { isSelected } = use(RadioGroupItemContext);

  return (
    <View style={[styles.icon, isSelected && styles.selectedIcon]}>
      <AppText>{children}</AppText>
    </View>
  );
}

export function RadioGroupLabel({ children }: { children: string }) {
  const { isHorizontal } = use(RadioGroupContext);

  return (
    <AppText weight="semiBold" style={[styles.label, isHorizontal && styles.textCenter]}>
      {children}
    </AppText>
  );
}

export function RadioGroupDescription({ children }: { children: string }) {
  const { isHorizontal } = use(RadioGroupContext);

  return (
    <AppText
      size="sm"
      color={theme.colors.gray[700]}
      style={[isHorizontal && styles.textCenter]}
    >
      {children}
    </AppText>
  );
}

export function RadioGroupItemInfo({ children }: { children: React.ReactNode }) {
  return (
    <View style={styles.itemInfo}>
      {children}
    </View>
  );
}
