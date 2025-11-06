import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useLayoutEffect, useState } from 'react';

import { useAccount } from '@app/hooks/queries/useAccount';
import { AuthTokensManager } from '@app/lib/AuthTokensManager';
import { AuthService } from '@app/services/AuthService';
import { Service } from '@app/services/Service';

import { useForceRender } from '@app/hooks/app/useForceRender';
import { useQueryClient } from '@tanstack/react-query';
import { AuthContext } from '.';

SplashScreen.preventAutoHideAsync();

interface ISetupAuthParams {
  accessToken: string;
  refreshToken: string;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);

  const { account, loadAccount } = useAccount({ enabled: false });
  const queryClient = useQueryClient();
  const forceRender = useForceRender();

  const setupAuth = useCallback(async (tokens: ISetupAuthParams) => {
    Service.setAccessToken(tokens.accessToken);

    await loadAccount();

    SplashScreen.hideAsync();
    setIsReady(true);
  }, []);

  useLayoutEffect(() => {
    async function load() {
      const tokens = await AuthTokensManager.load();

      if (!tokens) {
        setIsReady(true);
        SplashScreen.hideAsync();
        return;
      }

      await setupAuth(tokens);
    }

    load();
  }, [loadAccount]);

  const signIn = useCallback(async (payload: AuthService.SignInPayload) => {
    const tokens = await AuthService.signIn(payload);
    await AuthTokensManager.save(tokens);
    await setupAuth(tokens);
  }, []);

  const signUp = useCallback(async (payload: AuthService.SignUpPayload) => {
    const tokens = await AuthService.signUp(payload);
    await AuthTokensManager.save(tokens);
    await setupAuth(tokens);
  }, []);

  const signOut = useCallback(async () => {
    Service.removeAccessToken();

    queryClient.clear();
    forceRender();

    await AsyncStorage.clear();
  }, [queryClient]);

  if (!isReady) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ signedIn: !!account, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
