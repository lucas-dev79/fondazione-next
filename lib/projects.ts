export const featuredProjectImages = [
  '/images/grid-hp/featured.jpg',
  '/images/grid-hp/grid-01.jpg',
  '/images/grid-hp/grid-02.jpg',
  '/images/grid-hp/grid-03.jpg',
  
]

export const projects = [
  {
    slug: 'esposizioni-temporanee',
    category: 'Mostre',
    title: 'Esposizioni temporanee e progetti site-specific.',
    excerpt:
      'Un programma di mostre dedicato alla ricerca contemporanea, con artisti invitati a dialogare con lo spazio, il territorio e il pubblico.',
    image: '/images/fondazione_01.jpg',
    content: [
      'Le esposizioni temporanee della fondazione nascono come occasioni di incontro tra ricerca artistica, spazio architettonico e territorio.',
      'Ogni progetto viene pensato come un percorso specifico, capace di attivare nuove letture del luogo e nuove relazioni con il pubblico. Il programma mette in relazione opere, processi e documenti, costruendo percorsi che possono cambiare nel tempo e lasciare spazio a nuove interpretazioni.',
    ],
  },
  {
    slug: 'talk-visite-guidate',
    category: 'Incontri',
    title: 'Talk, visite guidate e momenti di approfondimento.',
    excerpt:
      'Appuntamenti pensati per creare dialogo tra artisti, curatori, visitatori e comunità, attraverso conversazioni e visite.',
    image: '/images/hero-fondazione.jpg',
    content: [
      'Gli incontri aprono il programma della fondazione a voci, domande e prospettive diverse.',
      'Talk, visite e momenti pubblici accompagnano le mostre e rendono il percorso culturale più accessibile e partecipato.',
      'Ogni appuntamento è pensato come un momento di ascolto e scambio, in cui il pubblico può avvicinarsi ai temi del progetto attraverso racconti, conversazioni e letture condivise.',
    ],
  },
  {
    slug: 'residenze-artistiche',
    category: 'Residenze',
    title: 'Programmi dedicati ad artisti, ricerca e produzione.',
    excerpt:
      'Residenze e percorsi di ricerca che accompagnano nuove produzioni, sperimentazioni e collaborazioni con il territorio.',
    image: '/images/fairy_tail.jpg',
    content: [
      'Le residenze sostengono processi di ricerca, produzione e sperimentazione artistica.',
      'La fondazione accompagna artisti e curatori in percorsi capaci di generare opere, incontri e nuove possibilità di relazione.',
      'Il tempo della residenza permette di approfondire idee, materiali e collaborazioni, trasformando lo spazio in un luogo di lavoro aperto e in dialogo con il contesto.',
    ],
  },
]

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug)
}
