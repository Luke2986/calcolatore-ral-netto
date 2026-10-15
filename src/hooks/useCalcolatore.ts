import { useState, useMemo } from "react";
import { calcolaNettoCompleto } from "@/utils/calculations";
import type { CalcoloResult, CityCode } from "@/types/calculator";

export type { CityCode };

export function useCalcolatore(initialRal: number = 35000, initialCitta: CityCode = "milano") {
  const [ral, setRal] = useState(initialRal);
  const [citta, setCitta] = useState<CityCode>(initialCitta);

  // Calcola risultati in tempo reale con memoization
  const risultati = useMemo<CalcoloResult>(() => {
    return calcolaNettoCompleto(ral, citta);
  }, [ral, citta]);

  return {
    ral,
    citta,
    risultati,
    setRal,
    setCitta,
  };
}
