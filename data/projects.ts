export interface ProjectData {
  id: string
  title: string
  description: string
  longDescription?: string
  technologies: string[]
  category: string
  status: "Completed" | "In Progress" | "Planned"
  year?: string
  images: string[]
  features?: string[]
  challenges?: string[]
  function: "Some function description",
  links?: {
    github?: string
    live?: string
    demo?: string
  }
}

export const projectsData: ProjectData[] = [
  {
    id: "easy-quest",
    title: "Easy Quest",
    description: "Plateforme collaborative de questions-réponses pour étudiants avec système de modération avancé",
    longDescription:
      "Easy Quest est une plateforme web complète conçue pour faciliter l'apprentissage collaboratif entre étudiants. Elle permet de poser des questions, partager des connaissances et bénéficier d'un système de modération pour garantir la qualité du contenu.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Socket.io", "JWT"],
    category: "Web",
    status: "Completed",
    year: "2023",
    images: [
      "/images/easyQuest/EQ_home.svg",
      "/images/easyQuest/EQ_home2.svg",
      "/images/easyQuest/EQ_Articles.svg",
      "/images/easyQuest/EQ_LogIn.svg",
      "/images/easyQuest/EQ_moderators.svg",
      "/images/easyQuest/Easy_Quest.svg",
    ],
    features: [
      "Système de questions-réponses interactif",
      "Modération automatique et manuelle",
      "Interface utilisateur intuitive",
      "Système de notifications en temps réel",
      "Gestion des utilisateurs et permissions",
    ],
    challenges: [
      "Implémentation d'un système de modération efficace",
      "Optimisation des performances pour de gros volumes de données",
      "Création d'une interface utilisateur responsive",
    ],
      function: "Some function description", // <-- Add this property to every project object

    links: {
      github: "https://github.com/issamboussebata/easy-quest",
    },
  },
  {
    id: "easy-way",
    title: "Easy Way",
    description: "Application de navigation et d'évaluation pour optimiser les trajets urbains",
    longDescription:
      "Easy Way est une solution innovante qui combine navigation GPS et système d'évaluation pour aider les utilisateurs à trouver les meilleurs itinéraires en fonction de critères personnalisés.",
    technologies: ["React Native", "Google Maps API", "Firebase", "Node.js"],
    category: "Mobile",
    status: "Completed",
    year: "2023",
    images: ["/images/easyway/Last_evaluation_pdf.pdf"],
    features: [
      "Navigation GPS intégrée",
      "Système d'évaluation des trajets",
      "Interface mobile optimisée",
      "Synchronisation cloud",
    ],
    function: "Some function description",
    challenges: [
      "Intégration complexe avec l'API Google Maps",
      "Optimisation de la batterie pour le GPS",
      "Gestion des données hors ligne",
    ],
  },
  {
    id: "esi-doc",
    title: "ESI Doc",
    description: "Système de gestion documentaire pour l'École Supérieure d'Informatique",
    longDescription:
      "ESI Doc est une plateforme de gestion documentaire développée spécifiquement pour les besoins de l'École Supérieure d'Informatique, permettant l'organisation, le partage et la recherche de documents académiques.",
    technologies: ["Vue.js", "Laravel", "MySQL", "Elasticsearch"],
    category: "Web",
    status: "In Progress",
    year: "2024",
    images: ["/images/esiDoc/ESI_DOC_first.svg"],
    features: [
      "Gestion centralisée des documents",
      "Recherche avancée avec Elasticsearch",
      "Système de permissions granulaires",
      "Interface d'administration complète",
    ],
    function: "Some function description",
    challenges: [
      "Indexation efficace de gros volumes de documents",
      "Sécurisation des accès aux documents sensibles",
      "Optimisation des performances de recherche",
    ],
  },
  {
    id: "ken-editor",
    title: "Ken Editor",
    description: "Éditeur de code moderne avec fonctionnalités avancées pour le développement",
    longDescription:
      "Ken Editor est un éditeur de code moderne et léger, conçu pour améliorer la productivité des développeurs avec des fonctionnalités avancées de coloration syntaxique, d'autocomplétion et de gestion de projets.",
    technologies: ["Electron", "TypeScript", "Monaco Editor", "Node.js"],
    category: "Desktop",
    status: "In Progress",
    year: "2024",
    images: ["/images/kenEditor/Ken_Editor_first.svg", "/images/kenEditor/Ken_Editor_Phone_first.svg"],
    features: [
      "Coloration syntaxique avancée",
      "Autocomplétion intelligente",
      "Gestion de projets intégrée",
      "Interface responsive",
      "Support multi-langages",
    ],
    challenges: [
      "Optimisation des performances pour de gros fichiers",
      "Implémentation d'un système de plugins",
      "Création d'une interface utilisateur moderne",
    ],
    function: "Some function description",
    links: {
      github: "https://github.com/ISSAM2411/ken-editor",
    },
  },
  {
    id: "sonatrach-ep",
    title: "Sonatrach EP",
    description: "Plateforme de gestion d'entreprise pour Sonatrach avec tableau de bord avancé",
    longDescription:
      "Sonatrach EP est une plateforme complète de gestion d'entreprise développée pour Sonatrach, incluant la gestion des membres, des documents, des alertes et des incidents avec un tableau de bord analytique avancé.",
    technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "Redis", "Docker"],
    category: "Platform",
    status: "Completed",
    year: "2024",
    images: [
      "/images/sonatrachEP/sonatrach_first.svg",
      "/images/sonatrachEP/landing_page.png",
      "/images/sonatrachEP/Dashboard_page.png",
      "/images/sonatrachEP/Register_page.png",
      "/images/sonatrachEP/membres.png",
      "/images/sonatrachEP/Documents_Rapports.png",
      "/images/sonatrachEP/Alertes_Incidents.png",
      "/images/sonatrachEP/list_view.png",
      "/images/sonatrachEP/sonatrach_second.svg",
    ],
    features: [
      "Tableau de bord analytique complet",
      "Gestion des membres et permissions",
      "Système de gestion documentaire",
      "Alertes et gestion d'incidents",
      "Interface d'administration avancée",
      "Rapports et statistiques détaillés",
    ],
    challenges: [
      "Architecture scalable pour une grande entreprise",
      "Sécurisation des données sensibles",
      "Intégration avec les systèmes existants",
      "Optimisation des performances pour de gros volumes",
    ],
    function: "Some function description",
    links: {
      live: "https://sonatrachep.vercel.app/",
    },
  },
]
