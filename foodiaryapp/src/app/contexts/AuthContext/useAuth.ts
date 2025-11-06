import { use } from 'react';

import { AuthContext } from '.';

export function useAuth() {
  return use(AuthContext);
}
