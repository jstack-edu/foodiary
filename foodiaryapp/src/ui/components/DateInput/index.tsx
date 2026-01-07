import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { theme } from '@ui/styles/theme';
import { CalendarIcon } from 'lucide-react-native';
import { useState } from 'react';
import { Platform, TouchableOpacity, View } from 'react-native';
import { AppText } from '../AppText';
import { inputStyles } from '../Input/styles';
import { styles } from './styles';

export interface IDateInputProps {
  value: Date;
  onChange: (date: Date) => void;
  error?: boolean;
  disabled?: boolean;
  placeholder?: string;
}

export function DateInput({
  value,
  onChange,
  error,
  disabled,
  placeholder = 'DD/MM/AAAA',
}: IDateInputProps) {
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

  function handleSelectDate(_event: DateTimePickerEvent, newDate?: Date) {
    if (Platform.OS === 'android') {
      setIsDatePickerVisible(false);
    }

    if (newDate) {
      onChange(newDate);
    }
  }

  function handlePress() {
    if (disabled) {
      return;
    }

    setIsDatePickerVisible(true);
  }

  function handleClosePicker() {
    setIsDatePickerVisible(false);
  }

  const formattedDate = formatDate(value);
  const hasValue = value !== undefined;

  return (
    <View>
      <TouchableOpacity
        onPress={handlePress}
        style={[
          inputStyles({
            status: error ? 'error' : 'default',
            disabled: disabled ? 'true' : 'false',
            hasSuffix: 'false',
          }),
          styles.inputContainer,
        ]}
        disabled={disabled}
      >
        <AppText
          style={[
            styles.text,
            !hasValue && styles.placeholder,
          ]}
        >
          {hasValue ? formattedDate : placeholder}
        </AppText>
        <CalendarIcon size={20} color={theme.colors.black[700]} />
      </TouchableOpacity>

      {isDatePickerVisible && Platform.OS === 'ios' && (
        <View style={styles.pickerContainer}>
          <View style={styles.pickerHeader}>
            <TouchableOpacity onPress={handleClosePicker}>
              <AppText color={theme.colors.lime[700]} weight="medium">
                Concluído
              </AppText>
            </TouchableOpacity>
          </View>
          <DateTimePicker
            mode="date"
            display="spinner"
            value={value}
            onChange={handleSelectDate}
            style={styles.picker}
          />
        </View>
      )}

      {isDatePickerVisible && Platform.OS === 'android' && (
        <DateTimePicker
          mode="date"
          display="calendar"
          value={value}
          onChange={handleSelectDate}
        />
      )}
    </View>
  );
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
}
