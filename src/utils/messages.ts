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
