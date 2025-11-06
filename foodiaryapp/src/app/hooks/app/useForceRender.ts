import { useReducer } from 'react';

export function useForceRender() {
  return useReducer((a) => a + 1, 0)[1];
}
