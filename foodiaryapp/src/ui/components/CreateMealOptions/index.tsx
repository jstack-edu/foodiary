import { theme } from '@ui/styles/theme';
import { CameraIcon, LucideIcon, MicIcon } from 'lucide-react-native';
import { useState } from 'react';
import { Platform, Pressable, View } from 'react-native';
import { AppText } from '../AppText';
import { AudioModal } from '../AudioModal';
import { PictureModal } from '../PictureModal';
import { styles } from './styles';

interface ICreateMealOptionsProps {
  disabled?: boolean;
}

export function CreateMealOptions({ disabled = false }: ICreateMealOptionsProps) {
  const [
    currentVisibleModal,
    setCurrentVisibleModal,
  ] = useState<null | 'audio' | 'picture'>('picture');

  function handleOpenModal(modal: 'audio' | 'picture') {
    setCurrentVisibleModal(modal);
  }

  function handleCloseModal() {
    setCurrentVisibleModal(null);
  }

  return (
    <View style={styles.container}>
      <AudioModal
        visible={currentVisibleModal === 'audio'}
        onClose={handleCloseModal}
      />
      <PictureModal
        visible={currentVisibleModal === 'picture'}
        onClose={handleCloseModal}
      />

      <OptionButton
        icon={MicIcon}
        label="Áudio"
        disabled={disabled}
        onPress={() => handleOpenModal('audio')}
      />
      <OptionButton
        icon={CameraIcon}
        label="Foto"
        disabled={disabled}
        onPress={() => handleOpenModal('picture')}
      />
    </View>
  );
}

interface IOptionButtonProps {
  icon: LucideIcon;
  label: string;
  onPress: () => void;
  disabled?: boolean;
}

export function OptionButton({ icon: Icon, label, disabled, onPress }: IOptionButtonProps) {
  return (
    <View style={styles.buttonWrapper}>
      <Pressable
        onPress={onPress}
        disabled={disabled}
        android_ripple={{ color: 'rgba(0, 0, 0, 0.1)', foreground: true }}
        style={({ pressed }) => [
          styles.button,
          (disabled || (pressed && Platform.OS === 'ios')) && { opacity: 0.5 },
        ]}
      >
        <View style={styles.icon}>
          <Icon color={theme.colors.black[700]} size={24} />
        </View>

        <AppText weight="semiBold" style={styles.buttonLabel}>
          {label}
        </AppText>
      </Pressable>
    </View>
  );
}
