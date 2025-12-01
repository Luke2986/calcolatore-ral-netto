// Configurazione città con addizionali regionali e comunali 2025

import type { CityData, CityCode } from "@/types/calculator";

export const CITIES: Record<CityCode, CityData> = {
  milano: {
    name: "Milano",
    emoji: "🏙️",
    regione: "Lombardia",
    addizionaleRegionale: {
      scaglioni: [
        { limite: 15000, aliquota: 0.0123 },
        { limite: 28000, aliquota: 0.0158 },
        { limite: 50000, aliquota: 0.0172 },
        { limite: Infinity, aliquota: 0.0173 },
      ],
    },
    addizionaleComunale: {
      aliquota: 0.008,
      sogliaEsenzione: 23000,
    },
  },
  
  bologna: {
    name: "Bologna",
    emoji: "🍝",
    regione: "Emilia-Romagna",
    addizionaleRegionale: {
      scaglioni: [
        { limite: 15000, aliquota: 0.0183 },
        { limite: 28000, aliquota: 0.0243 },
        { limite: 50000, aliquota: 0.0343 },
        { limite: Infinity, aliquota: 0.0333 },
      ],
    },
    addizionaleComunale: {
      aliquota: 0.008,
      sogliaEsenzione: 12000,
    },
  },
  
  roma: {
    name: "Roma",
    emoji: "🏛️",
    regione: "Lazio",
    addizionaleRegionale: {
      scaglioni: [
        { limite: 15000, aliquota: 0.0173 },
        { limite: 28000, aliquota: 0.0173 },
        { limite: 50000, aliquota: 0.0333 },
        { limite: Infinity, aliquota: 0.0333 },
      ],
      maggiorazione: {
        soglia: 28000,
        importo: 30,
      },
      detrazione: {
        soglia: 35000,
        importo: 60,
      },
    },
    addizionaleComunale: {
      aliquota: 0.009,
      sogliaEsenzione: 14000,
    },
  },
  
  napoli: {
    name: "Napoli",
    emoji: "🍕",
    regione: "Campania",
    addizionaleRegionale: {
      scaglioni: [
        { limite: 15000, aliquota: 0.0173 },
        { limite: 28000, aliquota: 0.0296 },
        { limite: 50000, aliquota: 0.032 },
        { limite: Infinity, aliquota: 0.0333 },
      ],
    },
    addizionaleComunale: {
      aliquota: 0.01,
      sogliaEsenzione: 12000,
    },
  },
};
