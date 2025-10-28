import { theme } from '@ui/styles/theme';
import { NativeSyntheticEvent, TextInput, TextInputFocusEventData, TextInputProps } from 'react-native';

import { useState } from 'react';
import { inputStyles } from './styles';

type BaseTextInputProps = Omit<React.ComponentProps<typeof TextInput>, 'readOnly'>;

export interface IInputProps extends BaseTextInputProps {
  error?: boolean;
  disabled?: boolean;
  InputComponent?: React.ComponentType<TextInputProps>;
  ref?: React.Ref<TextInput>;
  formatter?: (value: string) => string;
}

export function Input({
  style,
  onFocus,
  onBlur,
  error,
  disabled,
  InputComponent = TextInput,
  onChangeText,
  formatter,
  ...props
}: IInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  function handleFocus(event: NativeSyntheticEvent<TextInputFocusEventData>) {
    setIsFocused(true);
    onFocus?.(event);
  }

  function handleBlur(event: NativeSyntheticEvent<TextInputFocusEventData>) {
    setIsFocused(false);
    onBlur?.(event);
  }

  function handleChangeText(value: string) {
    const formattedValue = formatter?.(value) ?? value;

    onChangeText?.(formattedValue);
  }

  return (
    <InputComponent
      style={[
        inputStyles({
          status: error ? 'error' : (isFocused ? 'focus' : 'default'),
          disabled: disabled ? 'true' : 'false',
        }),
        style,
      ]}
      placeholderTextColor={theme.colors.gray[700]}
      onFocus={handleFocus}
      onBlur={handleBlur}
      readOnly={disabled}
      onChangeText={handleChangeText}
      {...props}
    />
  );
}
