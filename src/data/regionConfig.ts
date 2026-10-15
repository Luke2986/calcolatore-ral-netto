// Addizionali regionali IRPEF 2026 — fonte: MEF, portale del federalismo fiscale
// (addregirpef.php?reg=NN), consultato il 15/10/2026. Non sono modellate le detrazioni
// legate a figli a carico o disabilità.

import type { RegioneCode, RegioneData } from "@/types/calculator";

const flat = (aliquota: number) => [{ limite: Infinity, aliquota }];

export const REGIONI: Record<RegioneCode, RegioneData> = {
  piemonte: {
    name: "Piemonte",
    scaglioni: [
      { limite: 15000, aliquota: 0.0162 },
      { limite: 28000, aliquota: 0.0268 },
      { limite: 50000, aliquota: 0.0331 },
      { limite: Infinity, aliquota: 0.0333 },
    ],
  },

  "valle-d-aosta": {
    name: "Valle d'Aosta",
    scaglioni: flat(0.0123),
    // L.R. 23/12/2025 n. 29, art. 1: esenti fino a 15.000 €, oltre 1,23% sull'intero imponibile
    aliquotaAgevolata: { soglia: 15000, aliquota: 0 },
  },

  lombardia: {
    name: "Lombardia",
    scaglioni: [
      { limite: 15000, aliquota: 0.0123 },
      { limite: 28000, aliquota: 0.0158 },
      { limite: 50000, aliquota: 0.0172 },
      { limite: Infinity, aliquota: 0.0173 },
    ],
  },

  bolzano: {
    name: "Trentino-Alto Adige",
    // L.P. Bolzano 11/8/1998 n. 9, art. 21/sexiesdecies: 1,23% fino a 50.000 €, 1,73% oltre,
    // con detrazione di 125 € × (imponibile − 50.000) / 25.000 (max 125 €). È esattamente
    // equivalente all'1,23% fino a 75.000 € e all'1,73% oltre.
    scaglioni: [
      { limite: 75000, aliquota: 0.0123 },
      { limite: Infinity, aliquota: 0.0173 },
    ],
    detrazione: { min: 0, max: 90000, importo: 430.5 },
  },

  trento: {
    name: "Trentino-Alto Adige",
    scaglioni: [
      { limite: 50000, aliquota: 0.0123 },
      { limite: Infinity, aliquota: 0.0173 },
    ],
    // L.P. Trento 23/12/2019 n. 13, art. 1 c. 2-quater: deduzione di 30.000 € fino a 30.000 €
    aliquotaAgevolata: { soglia: 30000, aliquota: 0 },
  },

  veneto: {
    name: "Veneto",
    scaglioni: flat(0.0123),
  },

  "friuli-venezia-giulia": {
    name: "Friuli Venezia Giulia",
    scaglioni: flat(0.0123),
    // L.R. FVG 25/7/2012 n. 14, art. 1 c. 5: oltre 15.000 € l'1,23% vale sull'intero imponibile
    aliquotaAgevolata: { soglia: 15000, aliquota: 0.007 },
  },

  liguria: {
    name: "Liguria",
    scaglioni: [
      { limite: 28000, aliquota: 0.0123 },
      { limite: 50000, aliquota: 0.0318 },
      { limite: Infinity, aliquota: 0.0323 },
    ],
  },

  "emilia-romagna": {
    name: "Emilia-Romagna",
    scaglioni: [
      { limite: 15000, aliquota: 0.0133 },
      { limite: 28000, aliquota: 0.0193 },
      { limite: 50000, aliquota: 0.0278 },
      { limite: Infinity, aliquota: 0.0333 },
    ],
  },

  toscana: {
    name: "Toscana",
    scaglioni: [
      { limite: 15000, aliquota: 0.0142 },
      { limite: 28000, aliquota: 0.0143 },
      { limite: 50000, aliquota: 0.0332 },
      { limite: Infinity, aliquota: 0.0333 },
    ],
  },

  umbria: {
    name: "Umbria",
    scaglioni: [
      { limite: 15000, aliquota: 0.0173 },
      { limite: 28000, aliquota: 0.0302 },
      { limite: 50000, aliquota: 0.0312 },
      { limite: Infinity, aliquota: 0.0333 },
    ],
    // L.R. Umbria 11/4/2025 n. 2, art. 1: fino a 28.000 € niente maggiorazioni (1,23% su tutto),
    // detrazione di 150 € tra 28.001 e 50.000 €
    aliquotaAgevolata: { soglia: 28000, aliquota: 0.0123 },
    detrazione: { min: 28000, max: 50000, importo: 150 },
  },

  marche: {
    name: "Marche",
    scaglioni: [
      { limite: 15000, aliquota: 0.0123 },
      { limite: 28000, aliquota: 0.0153 },
      { limite: 50000, aliquota: 0.017 },
      { limite: Infinity, aliquota: 0.0173 },
    ],
  },

  lazio: {
    name: "Lazio",
    scaglioni: [
      { limite: 15000, aliquota: 0.0173 },
      { limite: Infinity, aliquota: 0.0333 },
    ],
    // L.R. Lazio 31/12/2025 n. 20, art. 2 commi 2-3
    aliquotaAgevolata: { soglia: 28000, aliquota: 0.0173 },
    detrazione: { min: 28000, max: 30000, importo: 60 },
  },

  abruzzo: {
    name: "Abruzzo",
    scaglioni: [
      { limite: 28000, aliquota: 0.0167 },
      { limite: 50000, aliquota: 0.0287 },
      { limite: Infinity, aliquota: 0.0333 },
    ],
  },

  molise: {
    name: "Molise",
    // Rideterminazione 2026 per il disavanzo sanitario (art. 1 c. 174 L. 311/2004), pubbl. 19/06/2026
    scaglioni: [
      { limite: 15000, aliquota: 0.0203 },
      { limite: 28000, aliquota: 0.0223 },
      { limite: Infinity, aliquota: 0.0363 },
    ],
  },

  campania: {
    name: "Campania",
    scaglioni: [
      { limite: 15000, aliquota: 0.0173 },
      { limite: 28000, aliquota: 0.0296 },
      { limite: 50000, aliquota: 0.032 },
      { limite: Infinity, aliquota: 0.0333 },
    ],
  },

  puglia: {
    name: "Puglia",
    // Decreto commissariale n. 3 del 28/05/2026 (art. 1 c. 174 L. 311/2004)
    scaglioni: [
      { limite: 15000, aliquota: 0.0133 },
      { limite: 28000, aliquota: 0.0213 },
      { limite: 50000, aliquota: 0.0323 },
      { limite: Infinity, aliquota: 0.0333 },
    ],
  },

  basilicata: {
    name: "Basilicata",
    scaglioni: flat(0.0123),
  },

  calabria: {
    name: "Calabria",
    scaglioni: flat(0.0173),
  },

  sicilia: {
    name: "Sicilia",
    scaglioni: flat(0.0123),
  },

  sardegna: {
    name: "Sardegna",
    scaglioni: flat(0.0123),
  },
};
