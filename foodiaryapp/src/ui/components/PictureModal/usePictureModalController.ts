import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';

export function usePictureModalController() {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const [photoUri, setPhotoUri] = useState<null | string>(null);

  async function handleTakePicture() {
    if (!cameraRef.current) {
      return;
    }

    const picture = await cameraRef.current.takePictureAsync({
      imageType: 'jpg',
    });

    setPhotoUri(picture.uri);
  }

  function handleTryAgain() {
    setPhotoUri(null);
  }

  function handleConfirm() {
    alert('Enviar para a API!');
  }

  return {
    isLoading: false,
    permission,
    cameraRef,
    photoUri,
    requestPermission,
    handleTryAgain,
    handleConfirm,
    handleTakePicture,
  };
}
