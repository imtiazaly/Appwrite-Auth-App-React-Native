import React, { createContext, FC, PropsWithChildren, useState } from 'react';

import Appwrite from './servce';

type AppwriteContextType = {
  appwrite: Appwrite;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AppwriteContext = createContext<AppwriteContextType>(
  {} as AppwriteContextType,
);

export const AppwriteProvider: FC<PropsWithChildren> = ({ children }) => {
  const [appwrite] = useState(() => new Appwrite());
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AppwriteContext.Provider
      value={{
        appwrite,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </AppwriteContext.Provider>
  );
};

export default AppwriteContext;
