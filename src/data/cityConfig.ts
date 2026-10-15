// Addizionali comunali IRPEF 2026 dei 109 capoluoghi di provincia (elenco ISTAT).
// Fonte: MEF, portale del federalismo fiscale, consultato il 15/10/2026. Senza delibera 2026
// vale l'ultima pubblicata. Superata la soglia di esenzione, l'addizionale si applica sull'intero
// imponibile.

import type { CityData, Scaglione } from "@/types/calculator";

const flat = (aliquota: number): Scaglione[] => [{ limite: Infinity, aliquota }];

export const CITIES = {
  torino: {
    name: "Torino",
    emoji: "🏔️",
    regione: "piemonte",
    // delib. 195 del 29/03/2022
    addizionaleComunale: {
      scaglioni: [
        { limite: 28000, aliquota: 0.008 },
        { limite: 50000, aliquota: 0.011 },
        { limite: Infinity, aliquota: 0.012 },
      ],
      sogliaEsenzione: 11790,
    },
  },
  vercelli: {
    name: "Vercelli",
    emoji: "📍",
    regione: "piemonte",
    // delib. 93 del 27/11/2025
    addizionaleComunale: { scaglioni: flat(0.008), sogliaEsenzione: 12500 },
  },
  novara: {
    name: "Novara",
    emoji: "📍",
    regione: "piemonte",
    // delib. 12 del 26/02/2018
    addizionaleComunale: { scaglioni: flat(0.008), sogliaEsenzione: 12500 },
  },
  cuneo: {
    name: "Cuneo",
    emoji: "📍",
    regione: "piemonte",
    // delib. 36 del 28/04/2022
    addizionaleComunale: {
      scaglioni: [
        { limite: 15000, aliquota: 0.007 },
        { limite: 28000, aliquota: 0.0073 },
        { limite: 50000, aliquota: 0.0076 },
        { limite: Infinity, aliquota: 0.008 },
      ],
      sogliaEsenzione: 0,
    },
  },
  asti: {
    name: "Asti",
    emoji: "📍",
    regione: "piemonte",
    // delib. 4 del 03/04/2025
    addizionaleComunale: {
      scaglioni: [
        { limite: 28000, aliquota: 0.0054 },
        { limite: 50000, aliquota: 0.0078 },
        { limite: Infinity, aliquota: 0.0079 },
      ],
      sogliaEsenzione: 7500,
    },
  },
  alessandria: {
    name: "Alessandria",
    emoji: "📍",
    regione: "piemonte",
    // delib. 166 del 27/11/2025
    addizionaleComunale: {
      scaglioni: [
        { limite: 28000, aliquota: 0.008 },
        { limite: 50000, aliquota: 0.011 },
        { limite: Infinity, aliquota: 0.012 },
      ],
      sogliaEsenzione: 0,
    },
  },
  biella: {
    name: "Biella",
    emoji: "📍",
    regione: "piemonte",
    // delib. 65 del 19/12/2025
    addizionaleComunale: { scaglioni: flat(0.008), sogliaEsenzione: 0 },
  },
  verbania: {
    name: "Verbania",
    emoji: "📍",
    regione: "piemonte",
    // delib. 16 del 07/03/2025
    addizionaleComunale: {
      scaglioni: [
        { limite: 28000, aliquota: 0.0055 },
        { limite: 50000, aliquota: 0.0064 },
        { limite: Infinity, aliquota: 0.008 },
      ],
      sogliaEsenzione: 15000,
    },
  },
  aosta: {
    name: "Aosta",
    emoji: "📍",
    regione: "valle-d-aosta",
    // delib. 32 del 17/03/2021
    addizionaleComunale: { scaglioni: flat(0.005), sogliaEsenzione: 9999.99 },
  },
  varese: {
    name: "Varese",
    emoji: "📍",
    regione: "lombardia",
    // delib. 30 del 25/06/2012
    addizionaleComunale: { scaglioni: flat(0.008), sogliaEsenzione: 8000 },
  },
  como: {
    name: "Como",
    emoji: "📍",
    regione: "lombardia",
    // delib. 98 del 03/11/2025
    addizionaleComunale: { scaglioni: flat(0.007), sogliaEsenzione: 15000 },
  },
  sondrio: {
    name: "Sondrio",
    emoji: "📍",
    regione: "lombardia",
    // delib. 78 del 22/12/2025
    addizionaleComunale: { scaglioni: flat(0.008), sogliaEsenzione: 9999.99 },
  },
  milano: {
    name: "Milano",
    emoji: "🏙️",
    regione: "lombardia",
    // delib. 46 del 28/09/2020
    addizionaleComunale: { scaglioni: flat(0.008), sogliaEsenzione: 23000 },
  },
  bergamo: {
    name: "Bergamo",
    emoji: "📍",
    regione: "lombardia",
    // delib. 37 del 06/04/2022
    addizionaleComunale: { scaglioni: flat(0.008), sogliaEsenzione: 0 },
  },
  brescia: {
    name: "Brescia",
    emoji: "📍",
    regione: "lombardia",
    // delib. 22 del 26/02/2019
    addizionaleComunale: { scaglioni: flat(0.008), sogliaEsenzione: 13000 },
  },
  pavia: {
    name: "Pavia",
    emoji: "📍",
    regione: "lombardia",
    // delib. 39 del 04/12/2025
    addizionaleComunale: {
      scaglioni: [
        { limite: 15000, aliquota: 0.007 },
        { limite: 28000, aliquota: 0.0077 },
        { limite: 50000, aliquota: 0.0078 },
        { limite: Infinity, aliquota: 0.008 },
      ],
      sogliaEsenzione: 16000,
    },
  },
  cremona: {
    name: "Cremona",
    emoji: "📍",
    regione: "lombardia",
    // delib. 49 del 18/12/2025
    addizionaleComunale: { scaglioni: flat(0.008), sogliaEsenzione: 12000 },
  },
  mantova: {
    name: "Mantova",
    emoji: "📍",
    regione: "lombardia",
    // delib. 35 del 23/05/2022
    addizionaleComunale: {
      scaglioni: [
        { limite: 15000, aliquota: 0.0038 },
        { limite: 28000, aliquota: 0.0039 },
        { limite: 50000, aliquota: 0.0062 },
        { limite: Infinity, aliquota: 0.008 },
      ],
      sogliaEsenzione: 22000,
    },
  },
  lecco: {
    name: "Lecco",
    emoji: "📍",
    regione: "lombardia",
    // delib. 42 del 27/10/2025
    addizionaleComunale: { scaglioni: flat(0.008), sogliaEsenzione: 17000 },
  },
  lodi: {
    name: "Lodi",
    emoji: "📍",
    regione: "lombardia",
    // delib. 106 del 18/12/2025
    addizionaleComunale: {
      scaglioni: [
        { limite: 28000, aliquota: 0.0073 },
        { limite: 50000, aliquota: 0.0078 },
        { limite: Infinity, aliquota: 0.008 },
      ],
      sogliaEsenzione: 17000,
    },
  },
  monza: {
    name: "Monza",
    emoji: "📍",
    regione: "lombardia",
    // delib. 6 del 10/02/2025
    addizionaleComunale: { scaglioni: flat(0.008), sogliaEsenzione: 15000 },
  },
  bolzano: {
    name: "Bolzano",
    emoji: "📍",
    regione: "bolzano",
    // delib. 100 del 27/10/2016
    addizionaleComunale: { scaglioni: flat(0), sogliaEsenzione: 0 },
  },
  trento: {
    name: "Trento",
    emoji: "📍",
    regione: "trento",
    // nessuna addizionale comunale
    addizionaleComunale: { scaglioni: flat(0), sogliaEsenzione: 0 },
  },
  verona: {
    name: "Verona",
    emoji: "🏟️",
    regione: "veneto",
    // delib. 9 del 02/02/2023
    addizionaleComunale: { scaglioni: flat(0.008), sogliaEsenzione: 12000 },
  },
  vicenza: {
    name: "Vicenza",
    emoji: "📍",
    regione: "veneto",
    // delib. 134 del 22/12/2025
    addizionaleComunale: { scaglioni: flat(0.008), sogliaEsenzione: 15000 },
  },
  belluno: {
    name: "Belluno",
    emoji: "📍",
    regione: "veneto",
    // delib. 73 del 29/11/2024
    addizionaleComunale: { scaglioni: flat(0.008), sogliaEsenzione: 12000 },
  },
  treviso: {
    name: "Treviso",
    emoji: "📍",
    regione: "veneto",
    // delib. 105 del 19/12/2024
    addizionaleComunale: { scaglioni: flat(0.008), sogliaEsenzione: 16000 },
  },
  venezia: {
    name: "Venezia",
    emoji: "🛶",
    regione: "veneto",
    // delib. 67 del 20/12/2023
    addizionaleComunale: { scaglioni: flat(0.008), sogliaEsenzione: 10000 },
  },
  padova: {
    name: "Padova",
    emoji: "📚",
    regione: "veneto",
    // delib. 91 del 20/10/2025
    addizionaleComunale: {
      scaglioni: [
        { limite: 28000, aliquota: 0.0078 },
        { limite: 50000, aliquota: 0.0079 },
        { limite: Infinity, aliquota: 0.008 },
      ],
      sogliaEsenzione: 15000,
    },
  },
  rovigo: {
    name: "Rovigo",
    emoji: "📍",
    regione: "veneto",
    // delib. 106 del 22/12/2025
    addizionaleComunale: { scaglioni: flat(0.008), sogliaEsenzione: 10000 },
  },
  udine: {
    name: "Udine",
    emoji: "📍",
    regione: "friuli-venezia-giulia",
    // delib. 87 del 11/12/2023
    addizionaleComunale: {
      scaglioni: [
        { limite: 28000, aliquota: 0.006 },
        { limite: 50000, aliquota: 0.007 },
        { limite: Infinity, aliquota: 0.008 },
      ],
      sogliaEsenzione: 15000,
    },
  },
  gorizia: {
    name: "Gorizia",
    emoji: "📍",
    regione: "friuli-venezia-giulia",
    // delib. 37 del 15/12/2025
    addizionaleComunale: { scaglioni: flat(0.007), sogliaEsenzione: 15000 },
  },
  trieste: {
    name: "Trieste",
    emoji: "⛵",
    regione: "friuli-venezia-giulia",
    // delib. 33 del 03/08/2015
    addizionaleComunale: { scaglioni: flat(0.008), sogliaEsenzione: 12500 },
  },
  pordenone: {
    name: "Pordenone",
    emoji: "📍",
    regione: "friuli-venezia-giulia",
    // delib. 78 del 22/12/2025
    addizionaleComunale: { scaglioni: flat(0.006), sogliaEsenzione: 20000 },
  },
  imperia: {
    name: "Imperia",
    emoji: "📍",
    regione: "liguria",
    // delib. 97 del 17/12/2024
    addizionaleComunale: { scaglioni: flat(0.008), sogliaEsenzione: 0 },
  },
  savona: {
    name: "Savona",
    emoji: "📍",
    regione: "liguria",
    // delib. 2 del 23/01/2025
    addizionaleComunale: { scaglioni: flat(0.008), sogliaEsenzione: 10000 },
  },
  genova: {
    name: "Genova",
    emoji: "⚓",
    regione: "liguria",
    // delib. 55 del 19/12/2024
    addizionaleComunale: {
      scaglioni: [
        { limite: 28000, aliquota: 0.01 },
        { limite: 50000, aliquota: 0.011 },
        { limite: Infinity, aliquota: 0.012 },
      ],
      sogliaEsenzione: 14000,
    },
  },
  "la-spezia": {
    name: "La Spezia",
    emoji: "📍",
    regione: "liguria",
    // delib. 37 del 15/12/2025
    addizionaleComunale: { scaglioni: flat(0.008), sogliaEsenzione: 15000 },
  },
  piacenza: {
    name: "Piacenza",
    emoji: "📍",
    regione: "emilia-romagna",
    // delib. 8 del 27/02/2023
    addizionaleComunale: {
      scaglioni: [
        { limite: 15000, aliquota: 0.0069 },
        { limite: 28000, aliquota: 0.007 },
        { limite: 50000, aliquota: 0.0079 },
        { limite: Infinity, aliquota: 0.008 },
      ],
      sogliaEsenzione: 15000,
    },
  },
  parma: {
    name: "Parma",
    emoji: "📍",
    regione: "emilia-romagna",
    // delib. 86 del 19/12/2022
    addizionaleComunale: { scaglioni: flat(0.008), sogliaEsenzione: 12000 },
  },
  "reggio-emilia": {
    name: "Reggio Emilia",
    emoji: "📍",
    regione: "emilia-romagna",
    // delib. 10 del 19/01/2026
    addizionaleComunale: { scaglioni: flat(0.008), sogliaEsenzione: 15000 },
  },
  modena: {
    name: "Modena",
    emoji: "📍",
    regione: "emilia-romagna",
    // delib. 13 del 28/02/2025
    addizionaleComunale: { scaglioni: flat(0.008), sogliaEsenzione: 15000 },
  },
  bologna: {
    name: "Bologna",
    emoji: "🍝",
    regione: "emilia-romagna",
    // delib. 354/2016 del 22/12/2016
    addizionaleComunale: { scaglioni: flat(0.008), sogliaEsenzione: 15000 },
  },
  ferrara: {
    name: "Ferrara",
    emoji: "📍",
    regione: "emilia-romagna",
    // delib. 15 del 24/02/2025
    addizionaleComunale: { scaglioni: flat(0.008), sogliaEsenzione: 0 },
  },
  ravenna: {
    name: "Ravenna",
    emoji: "📍",
    regione: "emilia-romagna",
    // delib. 47 del 30/03/2023
    addizionaleComunale: { scaglioni: flat(0.008), sogliaEsenzione: 13000 },
  },
  forli: {
    name: "Forlì",
    emoji: "📍",
    regione: "emilia-romagna",
    // delib. 22 del 25/03/2025
    addizionaleComunale: {
      scaglioni: [
        { limite: 28000, aliquota: 0.0055 },
        { limite: 50000, aliquota: 0.0078 },
        { limite: Infinity, aliquota: 0.0079 },
      ],
      sogliaEsenzione: 15000,
    },
  },
  rimini: {
    name: "Rimini",
    emoji: "📍",
    regione: "emilia-romagna",
    // delib. 26 del 04/04/2024
    addizionaleComunale: {
      scaglioni: [
        { limite: 15000, aliquota: 0.005 },
        { limite: 28000, aliquota: 0.006 },
        { limite: 50000, aliquota: 0.007 },
        { limite: Infinity, aliquota: 0.008 },
      ],
      sogliaEsenzione: 16000,
    },
  },
  massa: {
    name: "Massa",
    emoji: "📍",
    regione: "toscana",
    // delib. 33 del 31/03/2022
    addizionaleComunale: {
      scaglioni: [
        { limite: 15000, aliquota: 0.0063 },
        { limite: 28000, aliquota: 0.0068 },
        { limite: 50000, aliquota: 0.0071 },
        { limite: Infinity, aliquota: 0.008 },
      ],
      sogliaEsenzione: 11999.99,
    },
  },
  lucca: {
    name: "Lucca",
    emoji: "📍",
    regione: "toscana",
    // delib. 30 del 29/03/2022
    addizionaleComunale: {
      scaglioni: [
        { limite: 15000, aliquota: 0.0058 },
        { limite: 28000, aliquota: 0.006 },
        { limite: 50000, aliquota: 0.0074 },
        { limite: Infinity, aliquota: 0.0079 },
      ],
      sogliaEsenzione: 14500,
    },
  },
  pistoia: {
    name: "Pistoia",
    emoji: "📍",
    regione: "toscana",
    // delib. 74 del 10/12/2025
    addizionaleComunale: { scaglioni: flat(0.008), sogliaEsenzione: 15000 },
  },
  firenze: {
    name: "Firenze",
    emoji: "🎨",
    regione: "toscana",
    // delib. 47 del 28/07/2014
    addizionaleComunale: { scaglioni: flat(0.002), sogliaEsenzione: 25000 },
  },
  livorno: {
    name: "Livorno",
    emoji: "📍",
    regione: "toscana",
    // delib. 45 del 05/03/2015
    addizionaleComunale: { scaglioni: flat(0.008), sogliaEsenzione: 0 },
  },
  pisa: {
    name: "Pisa",
    emoji: "📍",
    regione: "toscana",
    // delib. 47 del 18/12/2025
    addizionaleComunale: {
      scaglioni: [
        { limite: 28000, aliquota: 0.0065 },
        { limite: 50000, aliquota: 0.0075 },
        { limite: Infinity, aliquota: 0.008 },
      ],
      sogliaEsenzione: 15000,
    },
  },
  arezzo: {
    name: "Arezzo",
    emoji: "📍",
    regione: "toscana",
    // delib. 36 del 24/02/2022
    addizionaleComunale: {
      scaglioni: [
        { limite: 15000, aliquota: 0.0048 },
        { limite: 28000, aliquota: 0.0049 },
        { limite: 50000, aliquota: 0.0078 },
        { limite: Infinity, aliquota: 0.0079 },
      ],
      sogliaEsenzione: 13500,
    },
  },
  siena: {
    name: "Siena",
    emoji: "📍",
    regione: "toscana",
    // delib. 66 del 26/05/2022
    addizionaleComunale: {
      scaglioni: [
        { limite: 15000, aliquota: 0.00735 },
        { limite: 28000, aliquota: 0.0078 },
        { limite: 50000, aliquota: 0.0079 },
        { limite: Infinity, aliquota: 0.008 },
      ],
      sogliaEsenzione: 11999.99,
    },
  },
  grosseto: {
    name: "Grosseto",
    emoji: "📍",
    regione: "toscana",
    // delib. 78 del 14/10/2013
    addizionaleComunale: { scaglioni: flat(0.008), sogliaEsenzione: 0 },
  },
  prato: {
    name: "Prato",
    emoji: "📍",
    regione: "toscana",
    // delib. 17 del 11/12/2025
    addizionaleComunale: { scaglioni: flat(0.005), sogliaEsenzione: 0 },
  },
  perugia: {
    name: "Perugia",
    emoji: "🍫",
    regione: "umbria",
    // delib. 110 del 25/11/2013
    addizionaleComunale: { scaglioni: flat(0.008), sogliaEsenzione: 12500 },
  },
  terni: {
    name: "Terni",
    emoji: "📍",
    regione: "umbria",
    // delib. 236 del 10/12/2025
    addizionaleComunale: { scaglioni: flat(0.008), sogliaEsenzione: 12500 },
  },
  pesaro: {
    name: "Pesaro",
    emoji: "📍",
    regione: "marche",
    // delib. 112 del 23/12/2024
    addizionaleComunale: { scaglioni: flat(0.008), sogliaEsenzione: 9000 },
  },
  ancona: {
    name: "Ancona",
    emoji: "📍",
    regione: "marche",
    // delib. 176 del 21/12/2007
    addizionaleComunale: { scaglioni: flat(0.008), sogliaEsenzione: 0 },
  },
  macerata: {
    name: "Macerata",
    emoji: "📍",
    regione: "marche",
    // delib. 151 del 16/12/2024
    addizionaleComunale: { scaglioni: flat(0.008), sogliaEsenzione: 8499.99 },
  },
  "ascoli-piceno": {
    name: "Ascoli Piceno",
    emoji: "📍",
    regione: "marche",
    // delib. 109 del 07/06/2013
    addizionaleComunale: { scaglioni: flat(0.008), sogliaEsenzione: 8500 },
  },
  fermo: {
    name: "Fermo",
    emoji: "📍",
    regione: "marche",
    // delib. 74 del 18/12/2025
    addizionaleComunale: { scaglioni: flat(0.008), sogliaEsenzione: 9000 },
  },
  viterbo: {
    name: "Viterbo",
    emoji: "📍",
    regione: "lazio",
    // delib. 129 del 23/11/2023
    addizionaleComunale: {
      scaglioni: [
        { limite: 15000, aliquota: 0.0075 },
        { limite: 50000, aliquota: 0.0076 },
        { limite: Infinity, aliquota: 0.008 },
      ],
      sogliaEsenzione: 0,
    },
  },
  rieti: {
    name: "Rieti",
    emoji: "📍",
    regione: "lazio",
    // delib. 95 del 23/12/2025
    addizionaleComunale: { scaglioni: flat(0.008), sogliaEsenzione: 0 },
  },
  roma: {
    name: "Roma",
    emoji: "🏛️",
    regione: "lazio",
    // delib. 186 del 19/12/2024
    addizionaleComunale: { scaglioni: flat(0.009), sogliaEsenzione: 14000 },
  },
  latina: {
    name: "Latina",
    emoji: "📍",
    regione: "lazio",
    // delib. 25 del 29/04/2016
    addizionaleComunale: { scaglioni: flat(0.008), sogliaEsenzione: 7999.99 },
  },
  frosinone: {
    name: "Frosinone",
    emoji: "📍",
    regione: "lazio",
    // delib. 3 del 15/01/2026
    addizionaleComunale: { scaglioni: flat(0.008), sogliaEsenzione: 0 },
  },
  "l-aquila": {
    name: "L'Aquila",
    emoji: "📍",
    regione: "abruzzo",
    // delib. 17 del 03/03/2008
    addizionaleComunale: { scaglioni: flat(0.006), sogliaEsenzione: 15000 },
  },
  teramo: {
    name: "Teramo",
    emoji: "📍",
    regione: "abruzzo",
    // delib. 79 del 20/12/2011
    addizionaleComunale: { scaglioni: flat(0.008), sogliaEsenzione: 10000 },
  },
  pescara: {
    name: "Pescara",
    emoji: "📍",
    regione: "abruzzo",
    // delib. 71 del 01/06/2015
    addizionaleComunale: { scaglioni: flat(0.008), sogliaEsenzione: 10000 },
  },
  chieti: {
    name: "Chieti",
    emoji: "📍",
    regione: "abruzzo",
    // delib. 460 del 19/12/2012
    addizionaleComunale: { scaglioni: flat(0.008), sogliaEsenzione: 0 },
  },
  campobasso: {
    name: "Campobasso",
    emoji: "📍",
    regione: "molise",
    // delib. 42 del 29/12/2023
    addizionaleComunale: { scaglioni: flat(0.008), sogliaEsenzione: 0 },
  },
  isernia: {
    name: "Isernia",
    emoji: "📍",
    regione: "molise",
    // delib. 62 del 30/09/2014
    addizionaleComunale: { scaglioni: flat(0.008), sogliaEsenzione: 0 },
  },
  caserta: {
    name: "Caserta",
    emoji: "📍",
    regione: "campania",
    // delib. 79 del 28/07/2023
    addizionaleComunale: { scaglioni: flat(0.008), sogliaEsenzione: 0 },
  },
  benevento: {
    name: "Benevento",
    emoji: "📍",
    regione: "campania",
    // delib. 22 del 14/07/2011
    addizionaleComunale: { scaglioni: flat(0.008), sogliaEsenzione: 0 },
  },
  napoli: {
    name: "Napoli",
    emoji: "🍕",
    regione: "campania",
    // delib. 143 del 29/12/2023
    addizionaleComunale: { scaglioni: flat(0.01), sogliaEsenzione: 12000 },
  },
  avellino: {
    name: "Avellino",
    emoji: "📍",
    regione: "campania",
    // delib. 59 del 13/12/2024
    addizionaleComunale: { scaglioni: flat(0.01), sogliaEsenzione: 20000 },
  },
  salerno: {
    name: "Salerno",
    emoji: "📍",
    regione: "campania",
    // delib. 54 del 22/12/2025
    addizionaleComunale: { scaglioni: flat(0.011), sogliaEsenzione: 10000 },
  },
  foggia: {
    name: "Foggia",
    emoji: "📍",
    regione: "puglia",
    // delib. 65 del 26/04/2007
    addizionaleComunale: { scaglioni: flat(0.008), sogliaEsenzione: 0 },
  },
  bari: {
    name: "Bari",
    emoji: "🌊",
    regione: "puglia",
    // delib. 42 del 31/07/2012
    addizionaleComunale: { scaglioni: flat(0.008), sogliaEsenzione: 15000 },
  },
  taranto: {
    name: "Taranto",
    emoji: "📍",
    regione: "puglia",
    // delib. 7 del 28/01/2026
    addizionaleComunale: { scaglioni: flat(0.008), sogliaEsenzione: 0 },
  },
  brindisi: {
    name: "Brindisi",
    emoji: "📍",
    regione: "puglia",
    // delib. 107 del 22/12/2025
    addizionaleComunale: { scaglioni: flat(0.012), sogliaEsenzione: 10000 },
  },
  lecce: {
    name: "Lecce",
    emoji: "📍",
    regione: "puglia",
    // delib. 184 del 20/12/2022
    addizionaleComunale: {
      scaglioni: [
        { limite: 28000, aliquota: 0.008 },
        { limite: Infinity, aliquota: 0.012 },
      ],
      sogliaEsenzione: 12500,
    },
  },
  andria: {
    name: "Andria",
    emoji: "📍",
    regione: "puglia",
    // delib. 96 del 12/12/2023
    addizionaleComunale: { scaglioni: flat(0.008), sogliaEsenzione: 7500 },
  },
  barletta: {
    name: "Barletta",
    emoji: "📍",
    regione: "puglia",
    // delib. 13 del 27/02/2025
    addizionaleComunale: {
      scaglioni: [
        { limite: 28000, aliquota: 0.005 },
        { limite: 50000, aliquota: 0.0079 },
        { limite: Infinity, aliquota: 0.008 },
      ],
      sogliaEsenzione: 9000,
    },
  },
  trani: {
    name: "Trani",
    emoji: "📍",
    regione: "puglia",
    // delib. 10 del 10/03/2022
    addizionaleComunale: {
      scaglioni: [
        { limite: 15000, aliquota: 0.007 },
        { limite: 28000, aliquota: 0.0075 },
        { limite: Infinity, aliquota: 0.008 },
      ],
      sogliaEsenzione: 7999.99,
    },
  },
  potenza: {
    name: "Potenza",
    emoji: "📍",
    regione: "basilicata",
    // delib. 12 del 11/03/2025
    addizionaleComunale: {
      scaglioni: [
        { limite: 50000, aliquota: 0.008 },
        { limite: Infinity, aliquota: 0.01 },
      ],
      sogliaEsenzione: 0,
    },
  },
  matera: {
    name: "Matera",
    emoji: "📍",
    regione: "basilicata",
    // delib. 56 del 23/12/2025
    addizionaleComunale: { scaglioni: flat(0.008), sogliaEsenzione: 10000 },
  },
  cosenza: {
    name: "Cosenza",
    emoji: "📍",
    regione: "calabria",
    // delib. 55 del 30/12/2025
    addizionaleComunale: { scaglioni: flat(0.008), sogliaEsenzione: 0 },
  },
  catanzaro: {
    name: "Catanzaro",
    emoji: "📍",
    regione: "calabria",
    // delib. 51 del 30/07/2015
    addizionaleComunale: { scaglioni: flat(0.008), sogliaEsenzione: 0 },
  },
  "reggio-calabria": {
    name: "Reggio Calabria",
    emoji: "📍",
    regione: "calabria",
    // delib. 130 del 08/07/2019
    addizionaleComunale: { scaglioni: flat(0.008), sogliaEsenzione: 0 },
  },
  crotone: {
    name: "Crotone",
    emoji: "📍",
    regione: "calabria",
    // delib. 12 del 19/03/2026
    addizionaleComunale: { scaglioni: flat(0.008), sogliaEsenzione: 0 },
  },
  "vibo-valentia": {
    name: "Vibo Valentia",
    emoji: "📍",
    regione: "calabria",
    // delib. 67 del 22/12/2025
    addizionaleComunale: { scaglioni: flat(0.012), sogliaEsenzione: 7000 },
  },
  trapani: {
    name: "Trapani",
    emoji: "📍",
    regione: "sicilia",
    // delib. 30 del 28/03/2019
    addizionaleComunale: { scaglioni: flat(0.008), sogliaEsenzione: 10000 },
  },
  palermo: {
    name: "Palermo",
    emoji: "🌴",
    regione: "sicilia",
    // delib. 137 del 15/04/2026
    addizionaleComunale: { scaglioni: flat(0.0103), sogliaEsenzione: 0 },
  },
  messina: {
    name: "Messina",
    emoji: "📍",
    regione: "sicilia",
    // delib. 63 del 23/01/2013
    addizionaleComunale: { scaglioni: flat(0.008), sogliaEsenzione: 0 },
  },
  agrigento: {
    name: "Agrigento",
    emoji: "📍",
    regione: "sicilia",
    // delib. 126 del 27/09/2012
    addizionaleComunale: { scaglioni: flat(0.008), sogliaEsenzione: 7499.99 },
  },
  caltanissetta: {
    name: "Caltanissetta",
    emoji: "📍",
    regione: "sicilia",
    // delib. 23 del 11/05/2022
    addizionaleComunale: { scaglioni: flat(0.008), sogliaEsenzione: 0 },
  },
  enna: {
    name: "Enna",
    emoji: "📍",
    regione: "sicilia",
    // delib. 12 del 29/03/2018
    addizionaleComunale: { scaglioni: flat(0.008), sogliaEsenzione: 22999.99 },
  },
  catania: {
    name: "Catania",
    emoji: "🌋",
    regione: "sicilia",
    // delib. 3 del 22/01/2019
    addizionaleComunale: { scaglioni: flat(0.008), sogliaEsenzione: 7500 },
  },
  ragusa: {
    name: "Ragusa",
    emoji: "📍",
    regione: "sicilia",
    // delib. 325 del 23/09/2024
    addizionaleComunale: {
      scaglioni: [
        { limite: 15000, aliquota: 0.006 },
        { limite: 28000, aliquota: 0.007 },
        { limite: 50000, aliquota: 0.0075 },
        { limite: Infinity, aliquota: 0.008 },
      ],
      sogliaEsenzione: 0,
    },
  },
  siracusa: {
    name: "Siracusa",
    emoji: "📍",
    regione: "sicilia",
    // delib. 10 del 29/01/2013
    addizionaleComunale: { scaglioni: flat(0.008), sogliaEsenzione: 0 },
  },
  sassari: {
    name: "Sassari",
    emoji: "📍",
    regione: "sardegna",
    // delib. 13 del 09/04/2014
    addizionaleComunale: { scaglioni: flat(0.008), sogliaEsenzione: 15000 },
  },
  nuoro: {
    name: "Nuoro",
    emoji: "📍",
    regione: "sardegna",
    // delib. 23 del 31/07/2023
    addizionaleComunale: {
      scaglioni: [
        { limite: 15000, aliquota: 0.0045 },
        { limite: 28000, aliquota: 0.0055 },
        { limite: 50000, aliquota: 0.0065 },
        { limite: Infinity, aliquota: 0.008 },
      ],
      sogliaEsenzione: 7999.99,
    },
  },
  cagliari: {
    name: "Cagliari",
    emoji: "🏖️",
    regione: "sardegna",
    // delib. 69 del 30/05/2022
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
  oristano: {
    name: "Oristano",
    emoji: "📍",
    regione: "sardegna",
    // delib. 19 del 05/05/2022
    addizionaleComunale: {
      scaglioni: [
        { limite: 15000, aliquota: 0.0069 },
        { limite: 28000, aliquota: 0.0072 },
        { limite: 50000, aliquota: 0.0076 },
        { limite: Infinity, aliquota: 0.008 },
      ],
      sogliaEsenzione: 10000,
    },
  },
  carbonia: {
    name: "Carbonia",
    emoji: "📍",
    regione: "sardegna",
    // delib. 18 del 28/03/2022
    addizionaleComunale: {
      scaglioni: [
        { limite: 15000, aliquota: 0.0059 },
        { limite: 28000, aliquota: 0.006 },
        { limite: 50000, aliquota: 0.0079 },
        { limite: Infinity, aliquota: 0.008 },
      ],
      sogliaEsenzione: 0,
    },
  },
} satisfies Record<string, CityData>;

export type CityCode = keyof typeof CITIES;

export const CITY_CODES = Object.keys(CITIES) as CityCode[];
