import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  ReactNode,
} from 'react';
import { getAlertLevel } from '../api/chartApi';
import { getThresholdValue } from '../api/sensorApi';

type WarningLevel = {
  id: number;
  code: string;
  name: string;
  colorCode: string;
};

type WarningLevelContextType = {
  warningLevels: WarningLevel[];
  setWarningLevels: (data: WarningLevel[]) => void;
  refreshWarningLevels: () => Promise<void>;
  thresholdValue: any[];
  setThresholdValue: (data: any[]) => void;
  getAllThresholdValue: () => Promise<void>;
};

const WarningLevelContext = createContext<WarningLevelContextType | null>(null);

export function WarningLevelProvider({ children }: { children: ReactNode }) {
  const [warningLevels, setWarningLevels] = useState<WarningLevel[]>([]);
  const [thresholdValue, setThresholdValue] = useState<any[]>([]);

  const refreshWarningLevels = useCallback(async () => {
    const res = await getAlertLevel();
    setWarningLevels(res.data || []);
  }, []);

  const getAllThresholdValue = useCallback(async () => {
    const res = await getThresholdValue({ page: 1, pageSize: 500 });
    setThresholdValue(res.data || []);
  }, []);

  const value = useMemo(
    () => ({
      warningLevels,
      setWarningLevels,
      refreshWarningLevels,
      thresholdValue,
      setThresholdValue,
      getAllThresholdValue,
    }),
    [warningLevels, refreshWarningLevels, getAllThresholdValue, thresholdValue],
  );

  return (
    <WarningLevelContext.Provider value={value}>
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
