import {
  siArduino,
  siAutodesk,
  siCplusplus,
  siCss,
  siEspressif,
  siFigma,
  siFlask,
  siGit,
  siGithub,
  siGithubactions,
  siHtml5,
  siJavascript,
  siLinux,
  siPostgresql,
  siPython,
  siReact,
  siVite,
} from 'simple-icons';

// `icon` is a simple-icons brand logo; `glyph` is a line icon for tools without one (see ToolIcon.jsx).
export const toolGroups = [
  {
    label: 'Languages',
    tools: [
      { name: 'Python', icon: siPython },
      { name: 'JavaScript', icon: siJavascript },
      { name: 'C++', icon: siCplusplus },
      { name: 'SQL', glyph: 'database' },
      { name: 'HTML', icon: siHtml5 },
      { name: 'CSS', icon: siCss },
    ],
  },
  {
    label: 'Web & backend',
    tools: [
      { name: 'React', icon: siReact },
      { name: 'Flask', icon: siFlask },
      { name: 'Vite', icon: siVite },
      { name: 'PostgreSQL', icon: siPostgresql },
    ],
  },
  {
    label: 'Hardware',
    tools: [
      { name: 'ESP32', icon: siEspressif },
      { name: 'Arduino', icon: siArduino },
      { name: 'ESP-NOW', glyph: 'wireless' },
    ],
  },
  {
    label: 'Tooling',
    tools: [
      { name: 'Git', icon: siGit },
      { name: 'GitHub', icon: siGithub },
      { name: 'GitHub Actions', icon: siGithubactions },
      { name: 'VS Code', glyph: 'code' },
      { name: 'Linux', icon: siLinux },
    ],
  },
  {
    label: 'Design',
    tools: [
      { name: 'Fusion 360', icon: siAutodesk },
      { name: 'Figma', icon: siFigma },
    ],
  },
];

export const currently = 'First year, Honours Computer Science (Co-op) @ uOttawa';

export const typedStrings = [
  'Software Developer.',
  'Computer Enthusiast.',
  'Professional Over-thinker.',
  'Team Player.',
  'Problem Solver.',
  'Cappuccino Maniac.',
  'Pattern Finder.',
  'Cat GIF Hoarder.',
];

export const projects = [
  {
    title: 'Wireless Shop Doorbell',
    summary:
      'A two-unit wireless doorbell built from two ESP32s communicating over ESP-NOW, with a deep-sleep battery button and a wall-powered chime. Firmware in C++, enclosure in Fusion 360.',
    details:
      'A two-unit wireless doorbell built from scratch with a partner to solve a real access problem in the SWIFT workshop. Two ESP32 microcontrollers communicate directly via ESP-NOW, with no router needed. The battery-powered button unit spends almost all its time in deep sleep drawing near-zero power, waking on an RTC pin (GPIO33) only when pressed to fire an ESP-NOW packet, then dropping straight back to sleep so the battery lasts months. The wall-powered speaker unit stays always-on, listens for the signal, and drives a speaker through a BC547 transistor on GPIO25 to play the chime. I wrote all the firmware in C++ (Arduino IDE) and iterated through LED, speaker, and deep-sleep prototypes; my partner designed the 3D-printed weatherproof enclosure in Fusion 360.',
    github: 'https://github.com/IbraHIM-Howaid/Swift-Doorbell',
    demo: '',
    tags: ['ESP32', 'ESP-NOW', 'C++'],
    cover: { src: '/projects/doorbell/enclosure-card.webp', alt: 'The finished doorbell: a 3D-printed SWIFT enclosure with a button and a speaker' },
    media: [
      { type: 'image', src: '/projects/doorbell/enclosure.webp', alt: 'The 3D-printed enclosure with its button and speaker', caption: 'Enclosure, button, and speaker unit' },
      { type: 'video', src: '/projects/doorbell/demo.mp4', poster: '/projects/doorbell/prototype.webp', caption: 'Demo of the second design cycle' },
      { type: 'image', src: '/projects/doorbell/wiring.webp', alt: 'Wiring inside the open enclosure', caption: 'Wiring inside the enclosure' },
      { type: 'image', src: '/projects/doorbell/prototype.webp', alt: 'Breadboard prototype with a lit push button', caption: 'Early breadboard prototype' },
    ],
  },
  {
    title: 'Carleton Manor EMR',
    summary:
      "A full-stack clinical EMR web app deployed in Carleton University's nursing simulation lab, with role-based access, an instructor analytics dashboard, and automated multi-page PDF chart export.",
    details:
      "A full-stack clinical Electronic Medical Record web app built for Carleton University's nursing simulation lab and actively used by nursing students and instructors. Students chart on simulated patients across 24 assessment sections (vitals, neuro, cardiovascular, MAR, and more); instructors get a dedicated admin panel with role-based access, real-time student activity tracking and online status, and bulk PDF chart export (a ZIP organized student → patient → PDF). I built the authentication and CSRF security layer, the data model, the instructor analytics dashboard, and a multi-page PDF generation engine that renders full patient assessment reports from live charting data, stamping each page's footer with who charted and who exported it. I coordinated with Carleton faculty to tailor the system to specific course requirements, and ran ongoing testing and QA to keep it reliable and secure under active use.",
    github: 'https://github.com/IbraHIM-Howaid/CarletonU-Simlab-EMR',
    demo: '',
    tags: ['Python', 'Flask', 'PostgreSQL'],
    cover: { src: '/projects/emr/dashboard-card.webp', alt: 'EMR instructor dashboard showing student charting activity' },
    media: [
      { type: 'image', src: '/projects/emr/dashboard.webp', alt: 'Instructor dashboard', caption: 'Instructor dashboard with live student activity' },
      { type: 'image', src: '/projects/emr/charting.webp', alt: 'Patient charting page', caption: 'Charting a simulated patient across 24 sections' },
      { type: 'image', src: '/projects/emr/patients.webp', alt: 'Student patient list', caption: 'Student view of assigned patients' },
      { type: 'image', src: '/projects/emr/pdf-export.webp', alt: 'Exported patient assessment PDF', caption: 'Generated PDF chart export' },
    ],
  },
  {
    title: 'Personal Portfolio Website',
    summary:
      'A custom, responsive portfolio site built from scratch with React, Vite, and Motion, with a custom domain on GitHub Pages.',
    details:
      "The site you're on right now, built from scratch with React and Vite. I started it as hand-coded vanilla HTML, CSS, and JavaScript with GSAP, then rebuilt it as a React app using Motion for the scroll-triggered reveals, magnetic buttons, 3D tilt on these project cards, and this modal. It also has an animated tsParticles background and a typewriter intro, and the layout is responsive from desktop to mobile. It deploys to GitHub Pages through a GitHub Actions build, on a custom .me domain with the right DNS records and HTTPS. Debugging the deployment (DNS records, CNAMEs, propagation, and getting the certificate to issue) was a crash course in how the web actually fits together.",
    github: 'https://github.com/IbraHIM-Howaid/Ibrahim_Al-Howaid_Resume',
    demo: 'https://al-howaid.me',
    tags: ['React', 'Motion', 'Vite'],
    cover: { src: '/projects/portfolio/hero-card.webp', alt: 'The hero section of this portfolio' },
    media: [{ type: 'image', src: '/projects/portfolio/hero.webp', alt: 'The hero section of this portfolio', caption: 'The site you are on' }],
  },
];

export const experience = [
  {
    logo: '/assets/Yipi Logo.png',
    logoAlt: 'YIPI Logo',
    date: '2023 to 2024',
    title: 'Youth in Policing Initiative Student',
    issuer: 'Ottawa Police Service',
    bullets: [
      'Developed teamwork, communication, and leadership skills through diverse work assignments.',
      'Maintained confidentiality and professionalism while handling sensitive information in a police environment.',
      'Participated in educational workshops to gain insight into law enforcement and community service.',
    ],
  },
  {
    logo: '/assets/ocdsb-logo.png',
    logoAlt: 'OCDSB Logo',
    date: '2026 to Present',
    title: 'SWIFT Co-op Student',
    issuer: 'OCDSB SWIFT Program, Kanata North',
    bullets: [
      "Designed and shipped a full-stack clinical EMR web app actively used by Carleton University's nursing simulation lab.",
      'Built a wireless ESP32 doorbell system (ESP-NOW, deep sleep, C++ firmware) from scratch with a partner.',
      'Toured and received technical briefings from BlackBerry QNX, Nokia, Telesat, Nordion, Ross Video, and the NRC Photonics Fabrication Centre.',
    ],
  },
];

export const education = [
  {
    logo: '/assets/University_of_Ottawa_Logo.svg.png',
    logoAlt: 'University of Ottawa Logo',
    date: '2026 to Present',
    title: 'Honours BSc in Computer Science (Co-op)',
    issuer: 'University of Ottawa',
    text: 'Admitted to the Honours Computer Science program with co-op, combining academic coursework with paid industry work terms.',
  },
  {
    logo: '/assets/ocdsb-logo.png',
    logoAlt: 'OCDSB Logo',
    date: '2026 to Present',
    title: 'OCDSB SWIFT Program',
    issuer: 'SWIFT Launch Secondary, Kanata North Technology Park',
    text: "Selected for a competitive co-op program embedded in Canada's largest tech hub, building industry-led projects alongside professional engineers. Designed and shipped a full-stack EMR used by Carleton University, built a wireless ESP32 doorbell, and toured industry leaders including BlackBerry QNX, Nokia, Telesat, Nordion, Ross Video, and the NRC Photonics Fabrication Centre.",
  },
  {
    logo: '/assets/SRB Logo.png',
    logoAlt: 'College Logo',
    date: '2022 to 2026',
    title: 'Highschool Degree',
    issuer: 'Sir Robert Borden Highschool',
    text: 'High school diploma with a focus on STEM.',
  },
];

export const certifications = [
  {
    logo: {
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/WHMIS_logo.svg/1280px-WHMIS_logo.svg.png?_=20221111180316',
      alt: 'WHMIS Logo',
      height: 60,
    },
    title: 'WHMIS (Worker Health And Safety)',
    issuer: 'Hazard Awareness, Fire Safety, Electrical Safety, Aerial Lift Safety • 2026',
    href: '#',
  },
  {
    logo: { src: '/assets/SJA.png', alt: 'St. John Ambulance Logo', height: 60 },
    title: 'Emergency First Aid + Level C CPR + AED',
    issuer: 'St. John Ambulance • 2024',
    href: '/assets/Ibrahim Al-Howaid First Aid Certificate.pdf',
  },
  {
    logo: {
      src: 'https://cdn.brandfetch.io/idkiwdw7KE/theme/light/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B',
      alt: 'AODA Logo',
      height: 35,
    },
    title: 'AODA (Accessibility for Ontarians with Disabilities Act)',
    issuer: 'OSG • 2026',
    href: '/assets/AODAcertificate.pdf',
  },
  {
    logo: { text: 'G2' },
    title: "Ontario Driver's Licence, Class G2",
    issuer: 'Ministry of Transportation Ontario',
    href: '#',
  },
];
