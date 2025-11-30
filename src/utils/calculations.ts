/**
 * Italian Tax Calculation Utilities (2025)
 * Calculates net salary from RAL (Retribuzione Annua Lorda)
 */

export interface CalcoloResult {
  ralLorda: number;
  contributiINPS: number;
  imponibileFiscale: number;
  irpefLorda: number;
  detrazioniLavoro: number;
  detrazioneCuneoFiscale: number;
  detrazioniTotali: number;
  irpefNetta: number;
  addizionaleRegionale: number;
  addizionaleComunale: number;
  totaleImposta: number;
  totaleTrattenute: number;
  bonusCuneoFiscale: number;
  trattamentoIntegrativo: number;
  totaleBonusNetti: number;
  nettoAnnuale: number;
  nettoMensile: number;
  aliquotaEffettiva: number;
  hasBonusCuneo: boolean;
  hasDetrazioneCuneo: boolean;
  hasTrattamentoIntegrativo: boolean;
}

export interface CityData {
  name: string;
  emoji: string;
  region: string;
  addRegMin: number;
  addRegMax: number;
  addCom: number;
  soglia: number;
}

export const CITIES: Record<string, CityData> = {
  milano: {
    name: "Milano",
    emoji: "🏙️",
    region: "Lombardia",
    addRegMin: 1.23,
    addRegMax: 1.73,
    addCom: 0.8,
    soglia: 23000,
  },
  bologna: {
    name: "Bologna",
    emoji: "🍝",
    region: "Emilia-Romagna",
    addRegMin: 1.83,
    addRegMax: 3.33,
    addCom: 0.8,
    soglia: 12000,
  },
  roma: {
    name: "Roma",
    emoji: "🏛️",
    region: "Lazio",
    addRegMin: 1.73,
    addRegMax: 3.33,
    addCom: 0.9,
    soglia: 14000,
  },
  napoli: {
    name: "Napoli",
    emoji: "🍕",
    region: "Campania",
    addRegMin: 1.73,
    addRegMax: 3.33,
    addCom: 1.0,
    soglia: 12000,
  },
};

/**
 * Calcola contributi INPS (previdenza sociale)
 * 9,19% fino a €55.448, poi +1% sulla parte eccedente
 */
export function calcContributiINPS(ral: number): number {
  const soglia = 55448;
  const aliquotaBase = 0.0919;
  const aliquotaAggiuntiva = 0.01;

  if (ral <= soglia) {
    return ral * aliquotaBase;
  } else {
    const baseINPS = soglia * aliquotaBase;
    const eccedenza = ral - soglia;
    const aggiuntiva = eccedenza * (aliquotaBase + aliquotaAggiuntiva);
    return baseINPS + aggiuntiva;
  }
}

/**
 * Calcola IRPEF lorda (imposta sul reddito)
 * Scaglioni 2025: 23% fino a €28k, 35% fino a €50k, 43% oltre
 */
export function calcIRPEFLorda(imponibile: number): number {
  const scaglioni = [
    { limite: 28000, aliquota: 0.23 },
    { limite: 50000, aliquota: 0.35 },
    { limite: Infinity, aliquota: 0.43 },
  ];

  let irpef = 0;
  let base = 0;

  for (const scaglione of scaglioni) {
    const imponibileScaglione = Math.min(imponibile, scaglione.limite) - base;
    if (imponibileScaglione > 0) {
      irpef += imponibileScaglione * scaglione.aliquota;
      base += imponibileScaglione;
    }
    if (imponibile <= scaglione.limite) break;
  }

  return irpef;
}

/**
 * Calcola detrazioni per lavoro dipendente
 * Decrescono all'aumentare del reddito
 */
export function calcDetrazioniLavoro(reddito: number): number {
  if (reddito <= 15000) {
    return 1955;
  } else if (reddito <= 28000) {
    return 1910 + (1955 - 1910) * (28000 - reddito) / (28000 - 15000);
  } else if (reddito <= 50000) {
    return 1910 * (50000 - reddito) / (50000 - 28000);
  } else {
    return 0;
  }
}

/**
 * Calcola addizionale regionale IRPEF
 * Varia per regione e aumenta con il reddito
 */
export function calcAddizionaleRegionale(imponibile: number, citta: string): number {
  const city = CITIES[citta] || CITIES.milano;
  
  // Semplificazione: uso aliquota media tra min e max
  const aliquotaMedia = (city.addRegMin + city.addRegMax) / 2;
  return imponibile * (aliquotaMedia / 100);
}

/**
 * Calcola addizionale comunale IRPEF
 * Varia per comune con soglia di esenzione
 */
export function calcAddizionaleComunale(imponibile: number, citta: string): number {
  const city = CITIES[citta] || CITIES.milano;
  
  if (imponibile <= city.soglia) {
    return 0;
  }
  
  return imponibile * (city.addCom / 100);
}

/**
 * Calcola il Bonus Cuneo Fiscale per redditi ≤ €20.000
 * Normativa: L. 207/2024, Art. 1, comma 4
 */
export function calcBonusCuneoFiscale(reddito: number): number {
  if (reddito > 20000) return 0;
  if (reddito <= 8500) return reddito * 0.071;
  if (reddito <= 15000) return reddito * 0.053;
  return reddito * 0.048; // €15.001-€20.000
}

/**
 * Calcola detrazione aggiuntiva per redditi €20.001-€40.000
 * Normativa: L. 207/2024, Art. 1, comma 6
 */
export function calcDetrazioneCuneoFiscale(reddito: number): number {
  if (reddito <= 20000 || reddito > 40000) return 0;
  if (reddito <= 32000) return 1000;
  return 1000 * (40000 - reddito) / 8000; // Décalage progressivo
}

/**
 * Calcola Trattamento Integrativo (ex Bonus Renzi)
 * Normativa: D.L. 3/2020 + L. 207/2024
 */
export function calcTrattamentoIntegrativo(
  reddito: number, 
  irpefLorda: number, 
  detrazioneLavoro: number, 
  detrazioneCuneo: number
): number {
  if (reddito > 28000) return 0;
  
  if (reddito <= 15000) {
    const sogliaCapienza = detrazioneLavoro - 75;
    return irpefLorda > sogliaCapienza ? 1200 : 0;
  }
  
  const detrazioniTotali = detrazioneLavoro + detrazioneCuneo;
  if (detrazioniTotali > irpefLorda) {
    return Math.min(1200, detrazioniTotali - irpefLorda);
  }
  return 0;
}

/**
 * Calcola tutto: da RAL a netto completo con breakdown dettagliato
 */
export function calcolaNettoCompleto(ral: number, citta: string): CalcoloResult {
  // Gestione edge cases
  if (ral < 0) ral = 0;
  if (ral > 10000000) ral = 10000000; // Cap massimo

  // 1. Contributi INPS
  const contributiINPS = calcContributiINPS(ral);
  
  // 2. Imponibile fiscale (RAL - INPS)
  const imponibileFiscale = ral - contributiINPS;
  
  // 3. IRPEF lorda
  const irpefLorda = calcIRPEFLorda(imponibileFiscale);
  
  // 4. Detrazioni lavoro dipendente
  const detrazioniLavoro = calcDetrazioniLavoro(imponibileFiscale);
  
  // 5. Detrazione Cuneo Fiscale (NUOVO 2025)
  const detrazioneCuneoFiscale = calcDetrazioneCuneoFiscale(imponibileFiscale);
  
  // 6. Detrazioni totali
  const detrazioniTotali = detrazioniLavoro + detrazioneCuneoFiscale;
  
  // 7. IRPEF netta (dopo detrazioni totali)
  const irpefNetta = Math.max(0, irpefLorda - detrazioniTotali);
  
  // 8. Addizionali regionali e comunali
  const addizionaleRegionale = calcAddizionaleRegionale(imponibileFiscale, citta);
  const addizionaleComunale = calcAddizionaleComunale(imponibileFiscale, citta);
  
  // 9. Totale imposte
  const totaleImposta = irpefNetta + addizionaleRegionale + addizionaleComunale;
  
  // 10. Bonus fiscali 2025
  const bonusCuneoFiscale = calcBonusCuneoFiscale(imponibileFiscale);
  const trattamentoIntegrativo = calcTrattamentoIntegrativo(
    imponibileFiscale,
    irpefLorda,
    detrazioniLavoro,
    detrazioneCuneoFiscale
  );
  const totaleBonusNetti = bonusCuneoFiscale + trattamentoIntegrativo;
  
  // 11. Totale trattenute (INPS + imposte)
  const totaleTrattenute = contributiINPS + totaleImposta;
  
  // 12. Netto annuale (RAL - trattenute + bonus)
  const nettoAnnuale = ral - totaleTrattenute + totaleBonusNetti;
  const nettoMensile = nettoAnnuale / 13; // 13 mensilità
  
  // 13. Aliquota effettiva
  const aliquotaEffettiva = ral > 0 ? (totaleTrattenute / ral) * 100 : 0;

  return {
    ralLorda: Math.round(ral * 100) / 100,
    contributiINPS: Math.round(contributiINPS * 100) / 100,
    imponibileFiscale: Math.round(imponibileFiscale * 100) / 100,
    irpefLorda: Math.round(irpefLorda * 100) / 100,
    detrazioniLavoro: Math.round(detrazioniLavoro * 100) / 100,
    detrazioneCuneoFiscale: Math.round(detrazioneCuneoFiscale * 100) / 100,
    detrazioniTotali: Math.round(detrazioniTotali * 100) / 100,
    irpefNetta: Math.round(irpefNetta * 100) / 100,
    addizionaleRegionale: Math.round(addizionaleRegionale * 100) / 100,
    addizionaleComunale: Math.round(addizionaleComunale * 100) / 100,
    totaleImposta: Math.round(totaleImposta * 100) / 100,
    totaleTrattenute: Math.round(totaleTrattenute * 100) / 100,
    bonusCuneoFiscale: Math.round(bonusCuneoFiscale * 100) / 100,
    trattamentoIntegrativo: Math.round(trattamentoIntegrativo * 100) / 100,
    totaleBonusNetti: Math.round(totaleBonusNetti * 100) / 100,
    nettoAnnuale: Math.round(nettoAnnuale * 100) / 100,
    nettoMensile: Math.round(nettoMensile * 100) / 100,
    aliquotaEffettiva: Math.round(aliquotaEffettiva * 10) / 10,
    hasBonusCuneo: bonusCuneoFiscale > 0,
    hasDetrazioneCuneo: detrazioneCuneoFiscale > 0,
    hasTrattamentoIntegrativo: trattamentoIntegrativo > 0,
  };
}

/**
 * Calcola il netto mensile per diverse mensilità (12, 13, 14)
 * Dipende dal tipo di contratto
 */
export function calcolaMensilitaMultiple(nettoAnnuale: number): {
  netto12: number;
  netto13: number;
  netto14: number;
} {
  return {
    netto12: nettoAnnuale / 12,
    netto13: nettoAnnuale / 13,
    netto14: nettoAnnuale / 14,
  };
}

/**
 * Formatta un numero in formato euro italiano
 */
export function formatEuro(value: number): string {
  return new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Genera messaggi ironici basati sull'aliquota effettiva
 */
export function getAliquotaMessage(aliquota: number): string {
  if (aliquota < 20) return "Non male! Lo Stato ti vuole bene oggi 💚";
  if (aliquota < 25) return "Nella media. Poteva andare peggio 😐";
  if (aliquota < 30) return "Ouch. Inizia a far male 😬";
  if (aliquota < 35) return "RIP portafoglio 💀";
  return "F in chat per il tuo stipendio 🪦";
}

/**
 * Easter eggs per RAL particolari
 */
export function getEasterEgg(ral: number): string | null {
  if (ral === 0) return "Stai cercando uno stage? 😅";
  if (ral === 69420) return "Nice. 😏";
  if (ral >= 100000 && ral < 150000) return "Mica male! Offri tu il pranzo?";
  if (ral >= 200000 && ral < 1000000) return "CEO vibes. Possiamo essere amici?";
  if (ral >= 1000000) return "Ok Paperon de' Paperoni, sei nel posto sbagliato";
  if (ral < 0) return "Devi pagare tu per lavorare? Houston, abbiamo un problema 🚀";
  return null;
}
