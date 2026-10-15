// Addizionali comunali IRPEF 2026 — fonte: delibere comunali / portale federalismo fiscale MEF.
// Superata la soglia di esenzione, l'addizionale si applica sull'intero imponibile.

import type { CityData, CityCode, Scaglione } from "@/types/calculator";

const flat = (aliquota: number): Scaglione[] => [{ limite: Infinity, aliquota }];

export const CITIES: Record<CityCode, CityData> = {
  milano: {
    name: "Milano",
    emoji: "🏙️",
    regione: "lombardia",
    addizionaleComunale: { scaglioni: flat(0.008), sogliaEsenzione: 23000 },
  },
  roma: {
    name: "Roma",
    emoji: "🏛️",
    regione: "lazio",
    addizionaleComunale: { scaglioni: flat(0.009), sogliaEsenzione: 14000 },
  },
  napoli: {
    name: "Napoli",
    emoji: "🍕",
    regione: "campania",
    addizionaleComunale: { scaglioni: flat(0.01), sogliaEsenzione: 12000 },
  },
  torino: {
    name: "Torino",
    emoji: "🏔️",
    regione: "piemonte",
    addizionaleComunale: {
      scaglioni: [
        { limite: 28000, aliquota: 0.008 },
        { limite: 50000, aliquota: 0.011 },
        { limite: Infinity, aliquota: 0.012 },
      ],
      sogliaEsenzione: 11790,
    },
  },
  bologna: {
    name: "Bologna",
    emoji: "🍝",
    regione: "emilia-romagna",
    addizionaleComunale: { scaglioni: flat(0.008), sogliaEsenzione: 12000 },
  },
  firenze: {
    name: "Firenze",
    emoji: "🎨",
    regione: "toscana",
    addizionaleComunale: { scaglioni: flat(0.002), sogliaEsenzione: 25000 },
  },
  genova: {
    name: "Genova",
    emoji: "⚓",
    regione: "liguria",
    addizionaleComunale: {
      scaglioni: [
        { limite: 28000, aliquota: 0.01 },
        { limite: 50000, aliquota: 0.011 },
        { limite: Infinity, aliquota: 0.012 },
      ],
      sogliaEsenzione: 14000,
    },
  },
  palermo: {
    name: "Palermo",
    emoji: "🌴",
    regione: "sicilia",
    addizionaleComunale: { scaglioni: flat(0.0101), sogliaEsenzione: 0 },
  },
  bari: {
    name: "Bari",
    emoji: "🌊",
    regione: "puglia",
    addizionaleComunale: { scaglioni: flat(0.008), sogliaEsenzione: 15000 },
  },
  catania: {
    name: "Catania",
    emoji: "🌋",
    regione: "sicilia",
    addizionaleComunale: { scaglioni: flat(0.008), sogliaEsenzione: 7500 },
  },
  venezia: {
    name: "Venezia",
    emoji: "🛶",
    regione: "veneto",
    addizionaleComunale: { scaglioni: flat(0.008), sogliaEsenzione: 10000 },
  },
  verona: {
    name: "Verona",
    emoji: "🏟️",
    regione: "veneto",
    addizionaleComunale: { scaglioni: flat(0.008), sogliaEsenzione: 12000 },
  },
  padova: {
    name: "Padova",
    emoji: "📚",
    regione: "veneto",
    addizionaleComunale: {
      scaglioni: [
        { limite: 28000, aliquota: 0.0078 },
        { limite: 50000, aliquota: 0.0079 },
        { limite: Infinity, aliquota: 0.008 },
      ],
      sogliaEsenzione: 15000,
    },
  },
  trieste: {
    name: "Trieste",
    emoji: "⛵",
    regione: "friuli-venezia-giulia",
    addizionaleComunale: { scaglioni: flat(0.008), sogliaEsenzione: 12500 },
  },
  cagliari: {
    name: "Cagliari",
    emoji: "🏖️",
    regione: "sardegna",
    addizionaleComunale: {
      scaglioni: [
        { limite: 15000, aliquota: 0.0066 },
        { limite: 28000, aliquota: 0.0072 },
        { limite: 50000, aliquota: 0.0078 },
        { limite: Infinity, aliquota: 0.008 },
      ],
      sogliaEsenzione: 10000,
    },
  },
  perugia: {
    name: "Perugia",
    emoji: "🍫",
    regione: "umbria",
    addizionaleComunale: { scaglioni: flat(0.008), sogliaEsenzione: 12500 },
  },
};

export const CITY_CODES = Object.keys(CITIES) as CityCode[];
