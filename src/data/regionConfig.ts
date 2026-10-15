import type { RegioneCode, RegioneData } from "@/types/calculator";

export const REGIONI: Record<RegioneCode, RegioneData> = {
  lombardia: {
    name: "Lombardia",
    scaglioni: [
      { limite: 15000, aliquota: 0.0123 },
      { limite: 28000, aliquota: 0.0158 },
      { limite: 50000, aliquota: 0.0172 },
      { limite: Infinity, aliquota: 0.0173 },
    ],
  },

  lazio: {
    name: "Lazio",
    scaglioni: [
      { limite: 15000, aliquota: 0.0173 },
      { limite: 28000, aliquota: 0.0273 },
      { limite: 50000, aliquota: 0.0293 },
      { limite: Infinity, aliquota: 0.0333 },
    ],
    maggiorazione: { soglia: 28000, importo: 30 },
    detrazione: { soglia: 35000, importo: 60 },
  },

  campania: {
    name: "Campania",
    scaglioni: [
      { limite: 15000, aliquota: 0.0203 },
      { limite: 28000, aliquota: 0.0213 },
      { limite: 50000, aliquota: 0.0233 },
      { limite: Infinity, aliquota: 0.0333 },
    ],
  },

  "emilia-romagna": {
    name: "Emilia-Romagna",
    scaglioni: [
      { limite: 15000, aliquota: 0.0133 },
      { limite: 28000, aliquota: 0.0193 },
      { limite: 50000, aliquota: 0.0203 },
      { limite: Infinity, aliquota: 0.0233 },
    ],
  },

  piemonte: {
    name: "Piemonte",
    scaglioni: [
      { limite: 15000, aliquota: 0.0162 },
      { limite: 28000, aliquota: 0.0268 },
      { limite: 50000, aliquota: 0.0331 },
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

  liguria: {
    name: "Liguria",
    scaglioni: [
      { limite: 28000, aliquota: 0.0123 },
      { limite: 50000, aliquota: 0.0318 },
      { limite: Infinity, aliquota: 0.0323 },
    ],
  },

  sicilia: {
    name: "Sicilia",
    scaglioni: [
      { limite: Infinity, aliquota: 0.0123 },
    ],
  },

  puglia: {
    name: "Puglia",
    scaglioni: [
      { limite: 15000, aliquota: 0.0133 },
      { limite: 28000, aliquota: 0.0213 },
      { limite: 50000, aliquota: 0.0323 },
      { limite: Infinity, aliquota: 0.0333 },
    ],
  },

  veneto: {
    name: "Veneto",
    scaglioni: [
      { limite: Infinity, aliquota: 0.0123 },
    ],
  },

  "friuli-venezia-giulia": {
    name: "Friuli Venezia Giulia",
    scaglioni: [
      { limite: 15000, aliquota: 0.007 },
      { limite: Infinity, aliquota: 0.0123 },
    ],
  },

  sardegna: {
    name: "Sardegna",
    scaglioni: [
      { limite: Infinity, aliquota: 0.0123 },
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
  },
};
