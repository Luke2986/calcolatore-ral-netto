// Tipi e interfacce per il calcolatore RAL → Netto

export type CityCode = "milano" | "bologna" | "roma" | "napoli";

export interface CalcoloResult {
  input: {
    ral: number;
    citta: string;
    cittaCodice: string;
    regione: string;
  };
  
  imponibili: {
    imponibileIRPEF: number;
    redditoComplessivo: number;
    redditoLavoroDipendente: number;
  };
  
  trattenute: {
    contributiINPS: number;
    irpefLorda: number;
    detrazioneLavoroDipendente: number;
    detrazioneCuneoFiscale: number;
    detrazioniTotali: number;
    irpefNetta: number;
    addizionaleRegionale: number;
    addizionaleComunale: number;
    totale: number;
  };
  
  bonus: {
    bonusCuneoFiscale: number;
    trattamentoIntegrativo: number;
    totale: number;
  };
  
  netto: {
    annuale: number;
    mensile: number;
    giornaliero: number;
    orario: number;
  };
  
  percentuali: {
    aliquotaEffettiva: number;
    percentualeNetto: number;
    percentualeINPS: number;
    percentualeIRPEF: number;
    percentualeAddizionali: number;
  };
  
  flags: {
    hasBonusCuneo: boolean;
    hasDetrazioneCuneo: boolean;
    hasTrattamentoIntegrativo: boolean;
  };
}

export interface CityData {
  name: string;
  emoji: string;
  regione: string;
  addizionaleRegionale: {
    scaglioni: Array<{
      limite: number;
      aliquota: number;
    }>;
    maggiorazione?: {
      soglia: number;
      importo: number;
    };
    detrazione?: {
      soglia: number;
      importo: number;
    };
  };
  addizionaleComunale: {
    aliquota: number;
    sogliaEsenzione: number;
  };
}
