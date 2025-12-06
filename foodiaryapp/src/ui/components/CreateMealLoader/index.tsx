import { View } from 'react-native';

import { theme } from '@ui/styles/theme';
import { AppText } from '../AppText';
import { Logo } from '../Logo';
import { styles } from './styles';

import { useVideoPlayer, VideoView } from 'expo-video';
import video from './ai-animation.mp4';

interface ICreateMealLoaderProps {
  type: 'audio' | 'picture';
}

export function CreateMealLoader({ type }: ICreateMealLoaderProps) {
  const player = useVideoPlayer(video, player => {
    player.loop = true;
    player.play();
  });

  return (
    <View style={styles.container}>
      <VideoView
        player={player}
        style={styles.video}
        nativeControls={false}
      />

      <View style={styles.content}>
        <Logo width={75} height={24} />
        <AppText color={theme.colors.gray[300]} align="center">
          {type === 'audio' && 'Estou ouvindo o seu áudio...'}
          {type === 'picture' && 'Estou analisando a sua foto...'}
        </AppText>
      </View>
    </View>
  );
}
