import { CheckIcon, PauseIcon, PlayIcon, Trash2Icon } from 'lucide-react-native';
import { View } from 'react-native';

import { theme } from '@ui/styles/theme';
import { formatSeconds } from '@ui/utils/formatSeconds';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import React from 'react';
import { AppText } from '../AppText';
import { Button } from '../Button';
import { styles } from './styles';

interface IAudioPlayerProps {
  audioUri: string;
  onTryAgain: () => void;
  onConfirm: () => void;
}

export function AudioPlayer({ audioUri, onTryAgain, onConfirm }: IAudioPlayerProps) {
  const player = useAudioPlayer(audioUri);
  const { duration, playing, currentTime } = useAudioPlayerStatus(player);

  function handlePlayPause() {
    if (player.playing) {
      player.pause();
      return;
    }

    player.seekTo(0);
    player.play();
  }

  return (
    <>
      <View style={styles.actionsGroup}>
        <Button
          size="icon"
          variant="neutral"
          rippleStyle="light"
          onPress={onTryAgain}
        >
          <Trash2Icon
            size={20}
            color={theme.colors.gray[500]}
          />
        </Button>

        <Button
          size="icon"
          variant="neutral"
          rippleStyle="light"
          onPress={handlePlayPause}
        >
          {playing && (
            <PauseIcon
              size={20}
              color={theme.colors.lime[600]}
              fill={theme.colors.lime[600]}
            />
          )}

          {!playing && (
            <PlayIcon
              size={20}
              color={theme.colors.lime[600]}
              fill={theme.colors.lime[600]}
            />
          )}
        </Button>

        <Button
          size="icon"
          onPress={onConfirm}
        >
          <CheckIcon
            size={20}
            color={theme.colors.black[700]}
          />
        </Button>
      </View>

      <AppText
        color={theme.colors.gray[500]}
        style={styles.actionLabel}
        align="center"
      >
        {formatSeconds(currentTime)} / {formatSeconds(duration)}
      </AppText>
    </>
  );
}
