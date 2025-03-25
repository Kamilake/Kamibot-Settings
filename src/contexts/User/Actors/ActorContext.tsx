import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Actor } from './FetchActors';
interface ActorContextType {
  actorList: Actor[];
  setActor: (actor: Actor[]) => void;
  isActorLoaded: boolean;  // 새로운 상태 추가
  setIsActorLoaded: (loaded: boolean) => void;  // 새로운 설정 함수
}

const ActorContext = createContext<ActorContextType | undefined>(undefined);

export const ActorProvider = ({ children }: { children: ReactNode }) => {
  const [actorList, setActor] = useState<Actor[]>([
    {
      displayName: "로딩중...",
      id: "notset",
      gender: "f",
      language: "ko-KR",
      categoryName: "",
      disabled: true,
      hidden: false,
    }
  ]);
  const [isActorLoaded, setIsActorLoaded] = useState(false);

  return (
    <ActorContext.Provider value={{ actorList, setActor, isActorLoaded, setIsActorLoaded }}>
      {children}
    </ActorContext.Provider>
  );
};

export const useActor = (): ActorContextType => {
  const context = useContext(ActorContext);
  if (!context) {
    throw new Error('useActor must be used within a ActorProvider');
  }
  return context;
};