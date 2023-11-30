import { useEffect, useState } from 'react';

export function useLocalStorageState(initialState, key,) {
  const [state, setState] = useState(() => {
    // 1. Ladda från LS
    const stringState = localStorage.getItem(key);
    if (!stringState) return initialState;
    return JSON.parse(stringState);
  });

  // 2. Spara till LS
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state]);

  return [state, setState] ;
}