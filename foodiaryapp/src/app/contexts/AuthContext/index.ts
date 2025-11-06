import { AuthService } from '@app/services/AuthService';
import { createContext } from 'react';

interface IAuthContextValue {
  signedIn: boolean;
  signIn: (payload: AuthService.SignInPayload) => Promise<void>;
  signUp: (payload: AuthService.SignUpPayload) => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext({} as IAuthContextValue);
