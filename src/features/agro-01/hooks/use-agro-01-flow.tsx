import { createContext, useContext, useState, type ReactNode } from 'react';

import type {
    Agro01Prediction,
    PreRegistrationValues,
} from '@/features/agro-01/types/agro-01';

type Agro01FlowContextValue = {
  preregistro?: PreRegistrationValues;
  prediction?: Agro01Prediction;
  setPreregistro: (values: PreRegistrationValues) => void;
  setPrediction: (prediction: Agro01Prediction) => void;
  resetFlow: () => void;
};

const Agro01FlowContext = createContext<Agro01FlowContextValue | undefined>(undefined);

export function Agro01FlowProvider({ children }: { children: ReactNode }) {
  const [preregistro, setPreregistro] = useState<PreRegistrationValues>();
  const [prediction, setPrediction] = useState<Agro01Prediction>();

  function resetFlow() {
    setPreregistro(undefined);
    setPrediction(undefined);
  }

  return (
    <Agro01FlowContext.Provider value={{ preregistro, prediction, setPreregistro, setPrediction, resetFlow }}>
      {children}
    </Agro01FlowContext.Provider>
  );
}

export function useAgro01Flow() {
  const context = useContext(Agro01FlowContext);
  if (!context) {
    throw new Error('useAgro01Flow debe usarse dentro de Agro01FlowProvider.');
  }
  return context;
}
