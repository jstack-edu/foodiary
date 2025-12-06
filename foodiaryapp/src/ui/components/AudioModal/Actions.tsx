import { theme } from '@ui/styles/theme';
import { formatSeconds } from '@ui/utils/formatSeconds';
import { MicIcon, SquareIcon } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { AppText } from '../AppText';
import { Button } from '../Button';
import { AudioPlayer } from './AudioPlayer';
import { styles } from './styles';
import { AudioModalState } from './useAudioModalController';

interface IActionsProps {
  state: AudioModalState;
  audioUri: string | null;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onTryAgain: () => void;
  onConfirm: () => void;
}

export function Actions({
  state,
  audioUri,
  onStartRecording,
  onStopRecording,
  onTryAgain,
  onConfirm,
}: IActionsProps) {
  const [recordingTimeInSeconds, setRecordingTimeInSeconds] = useState(0);

  useEffect(() => {
    if (state !== 'recording') {
      return;
    }

    const intervalId = setInterval(() => {
      setRecordingTimeInSeconds(prevState => prevState + 1);
    }, 1000);

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [state]);

  useEffect(() => {
    const MAX_AUDIO_DURATION = 30;

    if (recordingTimeInSeconds >= MAX_AUDIO_DURATION) {
      onStopRecording();
    }
  }, [recordingTimeInSeconds, onStopRecording]);

  function handleTryAgain() {
    setRecordingTimeInSeconds(0);
    onTryAgain();
  }

  if (state === 'idle') {
    return (
      <>
        <Button
          size="icon"
          variant="neutral"
          rippleStyle="light"
          onPress={onStartRecording}
        >
          <MicIcon size={20} color={theme.colors.lime[600]} />
        </Button>

        <AppText
          color={theme.colors.gray[500]}
          style={styles.actionLabel}
          align="center"
        >
          Clique no microfone para começar a gravar
        </AppText>
      </>
    );
  }

  if (state === 'recording') {
    return (
      <>
        <Button
          size="icon"
          variant="neutral"
          rippleStyle="light"
          onPress={onStopRecording}
        >
          <SquareIcon
            size={20}
            color={theme.colors.lime[600]}
            fill={theme.colors.lime[600]}
          />
        </Button>

        <AppText
          color={theme.colors.gray[500]}
          style={styles.actionLabel}
          align="center"
        >
          {formatSeconds(recordingTimeInSeconds)}
        </AppText>
      </>
    );
  }

  if (state === 'recorded' && audioUri) {
    return (
      <AudioPlayer
        audioUri={audioUri}
        onTryAgain={handleTryAgain}
        onConfirm={onConfirm}
      />
    );
  }

  return null;
}
