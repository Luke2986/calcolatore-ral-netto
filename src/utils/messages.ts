// Microcopy, messaggi e easter eggs

/**
 * Genera messaggio in base all'aliquota effettiva
 */
export function getAliquotaMessage(aliquota: number): string {
  if (aliquota < 0.20) return "Non male per niente! 🎉";
  if (aliquota < 0.25) return "Accettabile, tutto sommato 👍";
  if (aliquota < 0.30) return "Lo Stato ti ringrazia 🫡";
  if (aliquota < 0.35) return "Un bel sacrificio... 😅";
  if (aliquota < 0.40) return "Ahi ahi, quasi metà via 😰";
  return "Houston, abbiamo un problema 🚀";
}

/**
 * Easter eggs per valori RAL speciali
 */
export function getEasterEgg(ral: number): string | null {
  if (ral === 0) return "Stai cercando uno stage? 😅";
  if (ral === 69420) return "Nice. 😏";
  if (ral >= 100000 && ral < 150000) return "Mica male! Offri tu il pranzo?";
  if (ral >= 200000 && ral < 500000) return "CEO vibes. Possiamo essere amici?";
  if (ral >= 500000) return "Ok Paperon de' Paperoni, sei nel posto sbagliato";
  if (ral < 0) return "Devi pagare tu per lavorare? Houston, abbiamo un problema 🚀";
  return null;
}

/**
 * Label e descrizioni per il breakdown delle trattenute
 */
export const BREAKDOWN_LABELS = {
  inps: {
    label: "INPS",
    icon: "💼",
    description: "Per la pensione che forse vedremo",
  },
  irpef: {
    label: "IRPEF",
    icon: "🏛️",
    description: "L'imposta che finanzia lo Stato",
  },
  detrazioni: {
    label: "Detrazioni lavoro dipendente",
    icon: "✨",
    description: "Quello che lo Stato ti ridà (un po')",
  },
  detrazioneCuneo: {
    label: "Detrazione cuneo fiscale",
    icon: "🎁",
    description: "Novità 2025: sconto per redditi €20k-€40k",
  },
  addRegionale: {
    label: "Addizionale Regionale",
    icon: "🗺️",
    description: "La regione vuole la sua parte",
  },
  addComunale: {
    label: "Addizionale Comunale",
    icon: "🏘️",
    description: "Anche il comune vuole qualcosa",
  },
  bonusCuneo: {
    label: "Bonus cuneo fiscale",
    icon: "💰",
    description: "Novità 2025: bonus netto per redditi ≤€20k",
  },
  trattamentoIntegrativo: {
    label: "Trattamento integrativo",
    icon: "🎯",
    description: "Ex Bonus Renzi per redditi ≤€28k",
  },
} as const;

/**
 * Motivi per cui un bonus NON si applica (per trasparenza)
 */
export const BONUS_NOT_APPLICABLE_REASONS = {
  bonusCuneo: {
    overThreshold: "Non spetta: il tuo reddito supera €20.000",
    eligible: "Attivo per redditi ≤ €20.000",
  },
  detrazioneCuneo: {
    underThreshold: "Non spetta: il tuo reddito è ≤ €20.000 (hai il Bonus Cuneo)",
    overThreshold: "Non spetta: il tuo reddito supera €40.000",
    eligible: "Attivo per redditi €20.001 - €40.000",
  },
  trattamentoIntegrativo: {
    overThreshold: "Non spetta: il tuo reddito supera €28.000",
    incapiente: "Non spetta: IRPEF insufficiente (incapienza fiscale)",
    eligible: "Attivo per redditi ≤ €28.000 (se capiente)",
  },
} as const;

/**
 * Testi informativi per i tooltip (riferimenti normativi)
 */
export const BONUS_TOOLTIP_TEXTS = {
  bonusCuneo: {
    title: "Bonus Cuneo Fiscale 2025",
    description: "Somma integrativa netta (non tassata) che aumenta direttamente lo stipendio netto. Si applica a redditi da lavoro dipendente fino a €20.000.",
    percentuali: "• Fino a €8.500: 7,1% del reddito\n• Da €8.501 a €15.000: 5,3%\n• Da €15.001 a €20.000: 4,8%",
    normativa: "Riferimento: Art. 1, comma 5, D.L. 2/2024 convertito in L. 21/2024",
  },
  detrazioneCuneo: {
    title: "Ulteriore Detrazione Cuneo Fiscale 2025",
    description: "Detrazione IRPEF che riduce l'imposta dovuta. Introdotta dalla Legge di Bilancio 2025 per la fascia di reddito €20.000-€40.000.",
    importo: "• Da €20.001 a €32.000: €1.000 fisso\n• Da €32.001 a €40.000: décalage lineare",
    normativa: "Riferimento: Art. 1, L. 207/2024 (Legge di Bilancio 2025)",
  },
  trattamentoIntegrativo: {
    title: "Trattamento Integrativo 2025 (Ex Bonus Renzi)",
    description: "Credito d'imposta erogato direttamente in busta paga per lavoratori dipendenti con reddito fino a €28.000 e sufficiente capienza IRPEF.",
    importo: "Fino a €1.200 annui (€100 al mese) se il lavoratore ha sufficiente IRPEF da cui sottrarre le detrazioni.",
    normativa: "Riferimento: Art. 13, comma 1-bis e 2-bis, TUIR (D.P.R. 917/1986)",
  },
};
