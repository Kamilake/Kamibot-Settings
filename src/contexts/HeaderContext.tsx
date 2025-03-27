import React, { createContext, useState, useContext, ReactNode } from 'react';

interface HeaderContextType {
  title: string;
  setTitle: (title: string) => void;
  userAvatarUrl: string;
  setUserAvatarUrl: (url: string) => void;
}

const HeaderContext = createContext<HeaderContextType>({
  title: '',
  setTitle: () => {},
  userAvatarUrl: '',
  setUserAvatarUrl: () => {}
});

export const useHeader = () => useContext(HeaderContext);

interface HeaderProviderProps {
  children: ReactNode;
}

export const HeaderProvider: React.FC<HeaderProviderProps> = ({ children }) => {
  const [title, setTitle] = useState<string>('카미봇');
  const [userAvatarUrl, setUserAvatarUrl] = useState<string>('');

  return (
    <HeaderContext.Provider value={{ 
      title, 
      setTitle, 
      userAvatarUrl, 
      setUserAvatarUrl 
    }}>
      {children}
    </HeaderContext.Provider>
  );
};