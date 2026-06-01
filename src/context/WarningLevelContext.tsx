import React, { createContext, useContext, useState, ReactNode } from 'react';

type WarningLevel = {
  id: number;
  code: string;
  name: string;
  colorCode: string;
};

type WarningLevelContextType = {
  warningLevels: WarningLevel[];
  setWarningLevels: (data: WarningLevel[]) => void;
};

const WarningLevelContext = createContext<WarningLevelContextType | null>(null);

export function WarningLevelProvider({ children }: { children: ReactNode }) {
  const [warningLevels, setWarningLevels] = useState<WarningLevel[]>([]);

  return (
    <WarningLevelContext.Provider
      value={{
        warningLevels,
        setWarningLevels,
      }}
    >
      {children}
    </WarningLevelContext.Provider>
  );
}

export function useWarningLevels() {
  const context = useContext(WarningLevelContext);

  if (!context) {
    throw new Error(
      'useWarningLevels must be used inside WarningLevelProvider',
    );
  }

  return context;
}
