export type CityCode =
  | "milano" | "bologna" | "roma" | "napoli"
  | "torino" | "firenze" | "genova" | "palermo"
  | "bari" | "catania" | "venezia" | "verona"
  | "padova" | "trieste" | "cagliari" | "perugia";

export type RegioneCode =
  | "lombardia" | "emilia-romagna" | "lazio" | "campania"
  | "piemonte" | "toscana" | "liguria" | "sicilia"
  | "puglia" | "veneto" | "friuli-venezia-giulia" | "sardegna"
  | "umbria";

export interface Scaglione {
  limite: number;
  aliquota: number;
}

export interface RegioneData {
  name: string;
  scaglioni: Scaglione[];
  maggiorazione?: {
    soglia: number;
    importo: number;
  };
  detrazione?: {
    soglia: number;
    importo: number;
  };
}

export interface CityData {
  name: string;
  emoji: string;
  regione: RegioneCode;
  addizionaleComunale: {
    scaglioni: Scaglione[];
    sogliaEsenzione: number;
  };
}

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
    bonusCuneoReason: 'eligible' | 'over_threshold';
    detrazioneCuneoReason: 'eligible' | 'under_threshold' | 'over_threshold';
    trattamentoIntegrativoReason: 'eligible' | 'over_threshold' | 'incapiente';
  };
}
