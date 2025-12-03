import { use } from 'react';
import { HomeContext } from '.';

export function useHomeContext() {
  return use(HomeContext);
}
