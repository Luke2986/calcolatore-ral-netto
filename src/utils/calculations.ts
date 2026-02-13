// Funzioni di calcolo RAL → Netto 2025

import type { CalcoloResult, CityCode } from "@/types/calculator";
import { SCAGLIONI_IRPEF_2025, INPS, DETRAZIONI, SOGLIE_BONUS, PERCENTUALI_BONUS_CUNEO } from "@/data/fiscalData2025";
import { CITIES } from "@/data/cityConfig";
import { MENSILITA, ORE_LAVORATIVE } from "@/data/constants";

/**
 * Calcola i contributi INPS
 * Base: 9,19% + 1% aggiuntivo oltre €55.448
 */
export function calcContributiINPS(ral: number): number {
  if (ral <= INPS.soglia) {
    return ral * INPS.aliquotaBase;
  }
  return INPS.soglia * INPS.aliquotaBase + (ral - INPS.soglia) * (INPS.aliquotaBase + INPS.aliquotaAggiuntiva);
}

/**
 * Calcola IRPEF lorda progressiva per scaglioni
 */
export function calcIRPEFLorda(imponibile: number): number {
  let irpef = 0;
  let imponibileResiduo = imponibile;
  let limiteInferiore = 0;

  for (const scaglione of SCAGLIONI_IRPEF_2025) {
    const limiteSuperiore = scaglione.limite;
    const imponibileScaglione = Math.min(imponibileResiduo, limiteSuperiore - limiteInferiore);
    
    if (imponibileScaglione <= 0) break;
    
    irpef += imponibileScaglione * scaglione.aliquota;
    imponibileResiduo -= imponibileScaglione;
    limiteInferiore = limiteSuperiore;
    
    if (imponibileResiduo <= 0) break;
  }

  return irpef;
}

/**
 * Calcola detrazioni per lavoro dipendente
 */
export function calcDetrazioniLavoro(reddito: number): number {
  if (reddito <= 15000) {
    return Math.max(DETRAZIONI.lavoroMax, DETRAZIONI.lavoroBonusMin);
  }
  
  if (reddito <= 28000) {
    const detrazione = DETRAZIONI.lavoroBase + (DETRAZIONI.lavoroIncremento * (28000 - reddito)) / 13000;
    const bonus = (reddito >= DETRAZIONI.bonusExtraMin && reddito <= DETRAZIONI.bonusExtraMax) ? DETRAZIONI.bonusExtra : 0;
    return detrazione + bonus;
  }
  
  if (reddito <= 50000) {
    return DETRAZIONI.lavoroBase * ((50000 - reddito) / 22000);
  }
  
  return 0;
}

/**
 * Calcola addizionale regionale progressiva
 */
export function calcAddizionaleRegionale(imponibile: number, citta: CityCode): number {
  const cityData = CITIES[citta];
  const scaglioni = cityData.addizionaleRegionale.scaglioni;
  
  let addizionale = 0;
  let imponibileResiduo = imponibile;
  let limiteInferiore = 0;

  for (const scaglione of scaglioni) {
    const limiteSuperiore = scaglione.limite;
    const imponibileScaglione = Math.min(imponibileResiduo, limiteSuperiore - limiteInferiore);
    
    if (imponibileScaglione <= 0) break;
    
    addizionale += imponibileScaglione * scaglione.aliquota;
    imponibileResiduo -= imponibileScaglione;
    limiteInferiore = limiteSuperiore;
    
    if (imponibileResiduo <= 0) break;
  }

  // Maggiorazione Lazio
  if (cityData.addizionaleRegionale.maggiorazione && imponibile > cityData.addizionaleRegionale.maggiorazione.soglia) {
    addizionale += cityData.addizionaleRegionale.maggiorazione.importo;
  }

  // Detrazione Lazio
  if (cityData.addizionaleRegionale.detrazione && imponibile <= cityData.addizionaleRegionale.detrazione.soglia) {
    addizionale = Math.max(0, addizionale - cityData.addizionaleRegionale.detrazione.importo);
  }

  return addizionale;
}

/**
 * Calcola addizionale comunale
 */
export function calcAddizionaleComunale(imponibile: number, citta: CityCode): number {
  const cityData = CITIES[citta];
  
  if (imponibile <= cityData.addizionaleComunale.sogliaEsenzione) {
    return 0;
  }
  
  return imponibile * cityData.addizionaleComunale.aliquota;
}

/**
 * Calcola bonus cuneo fiscale (somma netta) per redditi ≤€20k
 */
export function calcBonusCuneoFiscale(reddito: number): number {
  if (reddito > SOGLIE_BONUS.cuneoFiscale) {
    return 0;
  }

  for (const fascia of PERCENTUALI_BONUS_CUNEO) {
    if (reddito <= fascia.limite) {
      return reddito * fascia.percentuale;
    }
  }

  return 0;
}

/**
 * Calcola detrazione cuneo fiscale per redditi €20k-€40k
 */
export function calcDetrazioneCuneoFiscale(reddito: number): number {
  const { min, max, flat, importoMax } = SOGLIE_BONUS.detrazioneCuneo;
  
  if (reddito <= min || reddito > max) {
    return 0;
  }
  
  if (reddito <= flat) {
    return importoMax;
  }
  
  // Décalage lineare tra €32k e €40k
  return importoMax * ((max - reddito) / (max - flat));
}

/**
 * Calcola trattamento integrativo (ex Bonus Renzi)
 */
export function calcTrattamentoIntegrativo(
  reddito: number,
  irpefLorda: number,
  detrazioneLavoro: number,
  detrazioneCuneo: number
): number {
  const { soglia1, soglia2, importoMax } = SOGLIE_BONUS.trattamentoIntegrativo;
  
  if (reddito > soglia2) {
    return 0;
  }

  const detrazioniTotali = detrazioneLavoro + detrazioneCuneo;

  if (reddito <= soglia1) {
    const capienzaMinima = detrazioneLavoro - 75;
    if (irpefLorda > capienzaMinima) {
      return importoMax;
    }
    return 0;
  }

  // Fascia €15.001 - €28.000
  if (detrazioniTotali > irpefLorda) {
    return Math.min(importoMax, detrazioniTotali - irpefLorda);
  }

  return 0;
}

/**
 * Calcola netto mensile per diverse mensilità
 */
export function calcolaMensilitaMultiple(nettoAnnuale: number): { 
  netto12: number; 
  netto13: number; 
  netto14: number; 
} {
  return {
    netto12: nettoAnnuale / MENSILITA.min,
    netto13: nettoAnnuale / MENSILITA.standard,
    netto14: nettoAnnuale / MENSILITA.max,
  };
}

/**
 * FUNZIONE PRINCIPALE: Calcola tutto il breakdown RAL → Netto
 */
export function calcolaNettoCompleto(ral: number, citta: CityCode): CalcoloResult {
  // Clamp RAL to safe range to prevent calculation errors
  ral = Math.max(0, Math.min(ral, 1_000_000));
  const cityData = CITIES[citta];

  // Step 1: INPS
  const contributiINPS = calcContributiINPS(ral);

  // Step 2: Imponibile IRPEF
  const imponibileIRPEF = ral - contributiINPS;

  // Step 3: IRPEF Lorda
  const irpefLorda = calcIRPEFLorda(imponibileIRPEF);

  // Step 4: Detrazioni lavoro dipendente
  const detrazioneLavoroDipendente = calcDetrazioniLavoro(imponibileIRPEF);

  // Step 5: Detrazione cuneo fiscale (€20k-€40k)
  const detrazioneCuneoFiscale = calcDetrazioneCuneoFiscale(imponibileIRPEF);

  // Step 6: IRPEF Netta
  const detrazioniTotali = detrazioneLavoroDipendente + detrazioneCuneoFiscale;
  const irpefNetta = Math.max(0, irpefLorda - detrazioniTotali);

  // Step 7: Addizionale Regionale
  const addizionaleRegionale = calcAddizionaleRegionale(imponibileIRPEF, citta);

  // Step 8: Addizionale Comunale
  const addizionaleComunale = calcAddizionaleComunale(imponibileIRPEF, citta);

  // Step 9: Bonus cuneo fiscale (≤€20k)
  const bonusCuneoFiscale = calcBonusCuneoFiscale(imponibileIRPEF);
  const bonusCuneoReason: 'eligible' | 'over_threshold' = 
    imponibileIRPEF <= SOGLIE_BONUS.cuneoFiscale ? 'eligible' : 'over_threshold';

  // Step 10: Trattamento integrativo
  const trattamentoIntegrativo = calcTrattamentoIntegrativo(
    imponibileIRPEF,
    irpefLorda,
    detrazioneLavoroDipendente,
    detrazioneCuneoFiscale
  );
  
  // Calcola motivo per trattamento integrativo
  let trattamentoIntegrativoReason: 'eligible' | 'over_threshold' | 'incapiente' = 'over_threshold';
  if (imponibileIRPEF <= SOGLIE_BONUS.trattamentoIntegrativo.soglia2) {
    if (trattamentoIntegrativo > 0) {
      trattamentoIntegrativoReason = 'eligible';
    } else {
      // Se reddito ≤ €28k ma bonus = 0, è per incapienza
      trattamentoIntegrativoReason = 'incapiente';
    }
  }

  // Calcola motivo per detrazione cuneo
  let detrazioneCuneoReason: 'eligible' | 'under_threshold' | 'over_threshold' = 'under_threshold';
  if (imponibileIRPEF > SOGLIE_BONUS.detrazioneCuneo.min && imponibileIRPEF <= SOGLIE_BONUS.detrazioneCuneo.max) {
    detrazioneCuneoReason = 'eligible';
  } else if (imponibileIRPEF > SOGLIE_BONUS.detrazioneCuneo.max) {
    detrazioneCuneoReason = 'over_threshold';
  }

  // Step 11: Totali
  const totaleTrattenute = contributiINPS + irpefNetta + addizionaleRegionale + addizionaleComunale;
  const totaleBonus = bonusCuneoFiscale + trattamentoIntegrativo;
  const nettoAnnuale = ral - totaleTrattenute + totaleBonus;
  const nettoMensile = nettoAnnuale / MENSILITA.standard;

  // Calcoli aggiuntivi
  const nettoGiornaliero = nettoAnnuale / ORE_LAVORATIVE.giorniAnno;
  const nettoOrario = nettoAnnuale / (ORE_LAVORATIVE.giorniAnno * ORE_LAVORATIVE.oreGiorno);

  const aliquotaEffettiva = (totaleTrattenute - totaleBonus) / ral;
  const percentualeNetto = nettoAnnuale / ral;

  return {
    input: {
      ral,
      citta: cityData.name,
      cittaCodice: citta,
      regione: cityData.regione,
    },
    imponibili: {
      imponibileIRPEF,
      redditoComplessivo: imponibileIRPEF,
      redditoLavoroDipendente: imponibileIRPEF,
    },
    trattenute: {
      contributiINPS,
      irpefLorda,
      detrazioneLavoroDipendente,
      detrazioneCuneoFiscale,
      detrazioniTotali,
      irpefNetta,
      addizionaleRegionale,
      addizionaleComunale,
      totale: totaleTrattenute,
    },
    bonus: {
      bonusCuneoFiscale,
      trattamentoIntegrativo,
      totale: totaleBonus,
    },
    netto: {
      annuale: nettoAnnuale,
      mensile: nettoMensile,
      giornaliero: nettoGiornaliero,
      orario: nettoOrario,
    },
    percentuali: {
      aliquotaEffettiva,
      percentualeNetto,
      percentualeINPS: contributiINPS / ral,
      percentualeIRPEF: irpefNetta / ral,
      percentualeAddizionali: (addizionaleRegionale + addizionaleComunale) / ral,
    },
    flags: {
      hasBonusCuneo: bonusCuneoFiscale > 0,
      hasDetrazioneCuneo: detrazioneCuneoFiscale > 0,
      hasTrattamentoIntegrativo: trattamentoIntegrativo > 0,
      bonusCuneoReason,
      detrazioneCuneoReason,
      trattamentoIntegrativoReason,
    },
  };
}
