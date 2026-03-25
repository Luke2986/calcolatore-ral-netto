// Funzioni di calcolo RAL → Netto 2026

import type { CalcoloResult, CityCode } from "@/types/calculator";
import { SCAGLIONI_IRPEF_2026, INPS, DETRAZIONI, SOGLIE_BONUS, PERCENTUALI_BONUS_CUNEO } from "@/data/fiscalData2026";
import { CITIES } from "@/data/cityConfig";
import { MENSILITA, ORE_LAVORATIVE } from "@/data/constants";

/**
 * Calcola i contributi INPS a carico del dipendente
 * Formula 2026: 9,19% su tutta la RAL + 1% aggiuntivo sulla quota eccedente €56.224
 * Fonte: Circolare INPS 6/2026
 */
export function calcContributiINPS(ral: number): number {
  const base = ral * INPS.aliquotaBase;
  const aggiuntivo = ral > INPS.soglia ? (ral - INPS.soglia) * INPS.aliquotaAggiuntiva : 0;
  return base + aggiuntivo;
}

/**
 * Calcola IRPEF lorda progressiva per scaglioni 2026
 * Novità 2026: 2° scaglione al 33% (era 35%)
 */
export function calcIRPEFLorda(imponibile: number): number {
  let irpef = 0;
  let imponibileResiduo = imponibile;
  let limiteInferiore = 0;

  for (const scaglione of SCAGLIONI_IRPEF_2026) {
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
 * Calcola detrazioni per lavoro dipendente (Art. 13 TUIR)
 * Inclusa maggiorazione €65 (comma 1.1) per redditi €25.001-€35.000
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
    const base = DETRAZIONI.lavoroBase * ((50000 - reddito) / 22000);
    // Maggiorazione €65 per redditi €25.001-€35.000 (comma 1.1 art. 13 TUIR)
    // In questo branch copriamo la fascia 28.001-35.000
    const bonus = (reddito >= DETRAZIONI.bonusExtraMin && reddito <= DETRAZIONI.bonusExtraMax) ? DETRAZIONI.bonusExtra : 0;
    return base + bonus;
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
 * Fonte: Art. 1, commi 4-5, L. 207/2024, confermato per il 2026
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
 * Calcola ulteriore detrazione cuneo fiscale per redditi €20k-€40k
 * Fonte: Art. 1, commi 6-7, L. 207/2024, confermato per il 2026
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
 * Fonte: Art. 1, DL 3/2020, modificato da L. 207/2024, confermato per il 2026
 * Semplificazione prototipo: solo redditi ≤ €15.000
 * Condizione capienza: IRPEF lorda > detrazione art.13 diminuita di €75
 */
export function calcTrattamentoIntegrativo(
  reddito: number,
  irpefLorda: number,
  detrazioneLavoro: number
): number {
  const { soglia, importoMax, riduzione_capienza } = SOGLIE_BONUS.trattamentoIntegrativo;

  if (reddito > soglia) {
    return 0;
  }

  const capienzaMinima = detrazioneLavoro - riduzione_capienza;
  if (irpefLorda > capienzaMinima) {
    return importoMax;
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
 * FUNZIONE PRINCIPALE: Calcola tutto il breakdown RAL → Netto 2026
 */
export function calcolaNettoCompleto(ral: number, citta: CityCode): CalcoloResult {
  // Clamp RAL to safe range to prevent calculation errors
  ral = Math.max(0, Math.min(ral, 1_000_000));
  const cityData = CITIES[citta];

  // Step 1: INPS (9,19% su tutta la RAL + 1% sull'eccedente €56.224)
  const contributiINPS = calcContributiINPS(ral);

  // Step 2: Imponibile IRPEF = RAL - contributi INPS
  const imponibileIRPEF = ral - contributiINPS;

  // Step 3: IRPEF Lorda (scaglioni 2026: 23%, 33%, 43%)
  const irpefLorda = calcIRPEFLorda(imponibileIRPEF);

  // Step 4: Detrazioni lavoro dipendente (Art. 13 TUIR)
  const detrazioneLavoroDipendente = calcDetrazioniLavoro(imponibileIRPEF);

  // Step 5: Ulteriore detrazione cuneo fiscale (€20k-€40k)
  const detrazioneCuneoFiscale = calcDetrazioneCuneoFiscale(imponibileIRPEF);

  // Step 6: IRPEF Netta = max(0, lorda - detrazioni)
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

  // Step 10: Trattamento integrativo (solo ≤€15k — semplificazione prototipo)
  const trattamentoIntegrativo = calcTrattamentoIntegrativo(
    imponibileIRPEF,
    irpefLorda,
    detrazioneLavoroDipendente
  );

  // Motivo per trattamento integrativo
  let trattamentoIntegrativoReason: 'eligible' | 'over_threshold' | 'incapiente' = 'over_threshold';
  if (imponibileIRPEF <= SOGLIE_BONUS.trattamentoIntegrativo.soglia) {
    trattamentoIntegrativoReason = trattamentoIntegrativo > 0 ? 'eligible' : 'incapiente';
  }

  // Motivo per ulteriore detrazione cuneo
  let detrazioneCuneoReason: 'eligible' | 'under_threshold' | 'over_threshold' = 'under_threshold';
  if (imponibileIRPEF > SOGLIE_BONUS.detrazioneCuneo.min && imponibileIRPEF <= SOGLIE_BONUS.detrazioneCuneo.max) {
    detrazioneCuneoReason = 'eligible';
  } else if (imponibileIRPEF > SOGLIE_BONUS.detrazioneCuneo.max) {
    detrazioneCuneoReason = 'over_threshold';
  }

  // Step 11: Totali e netto
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
