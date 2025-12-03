import { HomeContext, IHomeContextValue } from '@ui/screens/Home/context';

interface IHomeProviderProps extends IHomeContextValue {
  children: React.ReactElement;
}

export function HomeProvider({ children, ...ctxValue }: IHomeProviderProps) {
  return (
    <HomeContext.Provider value={ctxValue}>
      {children}
    </HomeContext.Provider>
  );
}
