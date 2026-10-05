import {
  siArduino,
  siAuth0,
  siAutodesk,
  siCplusplus,
  siCss,
  siEspressif,
  siFlask,
  siGit,
  siGithub,
  siGithubactions,
  siGooglegemini,
  siHtml5,
  siJavascript,
  siPostgresql,
  siPython,
  siReact,
  siSqlite,
  siTypescript,
  siVite,
} from 'simple-icons';

// Mirrors the Technical Skills section of the resume.
// `icon` is a simple-icons brand logo; `glyph` is a line icon for things without one (see ToolIcon.jsx).
export const toolGroups = [
  {
    label: 'Languages',
    tools: [
      { name: 'Python', icon: siPython },
      { name: 'JavaScript', icon: siJavascript },
      { name: 'TypeScript', icon: siTypescript },
      { name: 'C++', icon: siCplusplus },
      { name: 'SQL', glyph: 'database' },
      { name: 'HTML', icon: siHtml5 },
      { name: 'CSS', icon: siCss },
    ],
  },
  {
    label: 'Frameworks, libraries & databases',
    tools: [
      { name: 'React', icon: siReact },
      { name: 'Flask', icon: siFlask },
      { name: 'Vite', icon: siVite },
      { name: 'Motion', glyph: 'motion' },
      { name: 'ReportLab', glyph: 'document' },
      { name: 'PostgreSQL', icon: siPostgresql },
      { name: 'SQLite', icon: siSqlite },
      { name: 'Gemini API', icon: siGooglegemini },
      { name: 'Auth0', icon: siAuth0 },
    ],
  },
  {
    label: 'Embedded & hardware',
    tools: [
      { name: 'ESP32', icon: siEspressif },
      { name: 'ESP-NOW', glyph: 'wireless' },
      { name: 'Fusion 360', icon: siAutodesk },
    ],
  },
  {
    label: 'Tools',
    tools: [
      { name: 'Git', icon: siGit },
      { name: 'GitHub', icon: siGithub },
      { name: 'GitHub Actions', icon: siGithubactions },
      { name: 'VS Code', glyph: 'code' },
      { name: 'Arduino IDE', icon: siArduino },
    ],
  },
  {
    label: 'Spoken',
    tools: [
      { name: 'English', glyph: 'globe' },
      { name: 'French', glyph: 'globe' },
      { name: 'Arabic', glyph: 'globe' },
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
    title: 'myUni.courses',
    summary:
      'A uOttawa schedule builder made at Hack the Hill III: describe your ideal week in plain English and get conflict-free timetables, ranked and explained. I built the frontend and the AI and calendar integrations.',
    details:
      'Built with a team of four in 36 hours at Hack the Hill III (uOttawa, September 2026). Students pick their courses, describe what they want in plain English ("no classes before 10, Fridays off, good profs matter most"), and get conflict-free schedules built from live uoCampus data, scored on professor ratings, class times, and gaps, each with a short explanation of its trade-offs. My part was the React and TypeScript frontend (the week grid, class blocks, preference panel and sliders, and the animations) plus the AI and integrations. Gemini turns a student\'s sentence into weights that show up as sliders they can see and adjust, summarizes professor reviews, and writes each schedule\'s explanation from facts the algorithm has already computed, so it can only phrase what is actually true. Auth0 handles sign-in, and schedules export to .ics or straight into Google Calendar, skipping reading week.',
    github: 'https://github.com/HoussemDegachi/MyUniCourses',
    demo: 'https://myuni.courses',
    devpost: 'https://devpost.com/software/ucourses',
    tags: ['React', 'TypeScript', 'Gemini'],
    cover: { src: '/projects/myuni/schedule-card.webp', alt: 'A generated weekly schedule in myUni.courses with its match score' },
    media: [
      { type: 'image', src: '/projects/myuni/schedule.webp', alt: 'Generated schedule with score breakdown', caption: 'Best-match schedule for first-year Computer Science, with its score breakdown' },
      { type: 'image', src: '/projects/myuni/preferences.webp', alt: 'Preference panel and empty week grid', caption: 'Plain-English preferences, turned into adjustable sliders' },
    ],
  },
  {
    title: 'Wireless Shop Doorbell',
    summary:
      'A two-unit wireless doorbell installed in the SWIFT shop: two ESP32s talk over ESP-NOW, with a deep-sleep battery button and a wall-powered chime. Firmware in C++, enclosures 3D-printed.',
    details:
      "A two-unit wireless doorbell built with my partner Aidan to solve a real access problem in the SWIFT workshop, and now installed there. The shop door locks automatically, so visitors went unnoticed when staff were in the classroom; now a press on the button outside plays a chime inside. Two ESP32s talk directly over ESP-NOW, with no router or Wi-Fi network. The button unit runs on a 26700 LiFePO4 cell wired to the 3V3 pin to skip the onboard regulator, and spends almost all its time in deep sleep: pressing the VEX bumper switch pulls GPIO33 (an RTC pin) low, waking the board just long enough to send one packet before it sleeps again, so the battery lasts months. The wall-powered speaker unit stays on, listening, and plays one of three randomized melodies through a BC547 transistor driver on GPIO25. I wrote all the firmware in C++ and took the design through three cycles, from a Micro:bit to an Arduino to the ESP32s; Aidan designed both 3D-printed enclosures in Fusion 360.",
    github: 'https://github.com/IbraHIM-Howaid/Swift-Doorbell',
    demo: '',
    tags: ['ESP32', 'ESP-NOW', 'C++'],
    cover: { src: '/projects/doorbell/final-cover-card.webp', alt: 'The button unit: an ESP32, a LiFePO4 cell, and a red VEX bumper switch in a black 3D-printed case' },
    media: [
      { type: 'image', src: '/projects/doorbell/final-both-open.webp', alt: 'Both doorbell units with their lids off', caption: 'Both units: the button (black case) and the speaker (grey case)' },
      { type: 'video', src: '/projects/doorbell/final-demo.mp4', poster: '/projects/doorbell/final-video-poster.webp', caption: 'Demo of the final build' },
      { type: 'image', src: '/projects/doorbell/final-button.webp', alt: 'Button unit: ESP32, LiFePO4 cell and VEX bumper switch', caption: 'Button unit: ESP32, LiFePO4 cell, and VEX bumper switch' },
      { type: 'image', src: '/projects/doorbell/final-speaker.webp', alt: 'Speaker unit: ESP32, BC547 driver circuit and speaker', caption: 'Speaker unit: ESP32, BC547 driver circuit, and speaker' },
      { type: 'image', src: '/projects/doorbell/final-lid-on.webp', alt: 'Speaker unit with its sliding lid next to the open button unit', caption: 'Speaker unit with its sliding lid, next to the button unit' },
      { type: 'image', src: '/projects/doorbell/prototype.webp', alt: 'Breadboard prototype with a lit push button', caption: 'Where it started: the Arduino prototype from design cycle 2' },
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

export const hackathons = [
  {
    event: 'Hack the Hill III',
    host: 'University of Ottawa',
    date: 'Sep 2026',
    project: 'myUni.courses',
    role: 'Frontend developer',
    text: 'Frontend developer on a team building an AI course schedule maker for uOttawa, with natural-language preferences and RateMyProf summaries.',
    links: [
      { label: 'Devpost', href: 'https://devpost.com/software/ucourses' },
      { label: 'Live site', href: 'https://myuni.courses' },
    ],
  },
  {
    event: 'Hack Club Lift-Off',
    host: 'Nokia',
    project: 'Cosmic Brews',
    role: 'Frontend developer',
    text: 'Built the frontend (UI/UX in HTML, CSS, and JavaScript) for Cosmic Brews, a cafe game where players decipher alien languages to serve customers.',
  },
  {
    event: 'Hack Club Campfire',
    host: 'Kinaxis',
    project: 'Mole mining game',
    role: 'Game jam',
    text: 'Built a game jam entry about a mole mining underground while working in a team.',
  },
];

export const experience = [
  {
    logoText: 'TdJ', // no logo available, so the timeline shows these initials instead
    date: 'Jun 2022 to Sep 2022',
    title: 'Teaching Assistant',
    issuer: 'Terre-des-Jeunes School',
    bullets: [
      'Managed **course material distribution** and answered inquiries from **students, parents, and faculty** for the **Arabic-language** Sunday school program.',
    ],
  },
  {
    logo: '/assets/Yipi Logo.png',
    logoAlt: 'YIPI Logo',
    date: 'Dec 2023 to Mar 2024',
    title: 'Youth in Policing Initiative Student',
    issuer: 'Ottawa Police Service',
    bullets: [
      'Developed **teamwork, communication, and leadership** skills through diverse work assignments.',
      'Maintained **confidentiality and professionalism** while handling sensitive information in a police environment.',
      'Participated in educational workshops to gain insight into **law enforcement and community service**.',
    ],
  },
  {
    logo: '/assets/ocdsb-logo.png',
    logoAlt: 'OCDSB Logo',
    date: 'Feb 2026 to Jun 2026',
    title: 'SWIFT Co-op Student',
    issuer: 'OCDSB SWIFT Program, Kanata North',
    bullets: [
      "Designed and shipped a **full-stack clinical EMR** web app actively used by **Carleton University's nursing simulation lab**.",
      'Built a **wireless ESP32 doorbell** system (ESP-NOW, deep sleep, C++ firmware) from scratch with a partner.',
      'Toured and received technical briefings from **BlackBerry QNX, Nokia, Telesat, Nordion, Ross Video**, and the **NRC Photonics Fabrication Centre**.',
    ],
  },
];

export const education = [
  {
    logo: '/assets/University_of_Ottawa_Logo.svg.png',
    logoAlt: 'University of Ottawa Logo',
    date: 'Sep 2026 to Present',
    title: 'Honours BSc in Computer Science (Co-op)',
    issuer: 'University of Ottawa',
    text: 'Admitted to the **Honours Computer Science** program with **co-op**, combining academic coursework with **paid industry work terms**.',
  },
  {
    logo: '/assets/ocdsb-logo.png',
    logoAlt: 'OCDSB Logo',
    date: 'Feb 2026 to Jun 2026',
    title: 'OCDSB SWIFT Program',
    issuer: 'SWIFT Launch Secondary, Kanata North Technology Park',
    text: "Selected for a **competitive co-op program** embedded in **Canada's largest tech hub**, building industry-led projects alongside professional engineers. Designed and shipped a **full-stack EMR** used by Carleton University, built a **wireless ESP32 doorbell**, and toured industry leaders including **BlackBerry QNX, Nokia, Telesat, Nordion, Ross Video**, and the **NRC Photonics Fabrication Centre**.",
  },
  {
    logo: '/assets/SRB Logo.png',
    logoAlt: 'College Logo',
    date: 'Sep 2022 to Jun 2026',
    title: 'Highschool Degree',
    issuer: 'Sir Robert Borden Highschool',
    text: 'High school diploma with a focus on **STEM**.',
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
