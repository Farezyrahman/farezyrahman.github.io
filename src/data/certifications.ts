export interface Certification {
  title: string;
  issuer: string;
  date: string;
  description: string;
  image: string;
  pdf?: string;
}

export const certifications: Certification[] = [
  {
    title: "I'MMERSe 2026 — Certificate of Appreciation",
    issuer: "International Immersive Computing Symposium, UTM",
    date: '26 June 2026',
    description:
      'Co-authored and presented the paper "Interactive Game-Based Learning of Wau Bulan with NPCs in Virtual Reality" (with Dr. Norhaida Mohd Suaib) to students, lecturers, and examiners.',
    image: '/certs/immerse-2026.jpg',
  },
  {
    title: 'Degree++ Mastering Unity 3D Game Engine',
    issuer: 'MivieLab, Faculty of Computing, UTM',
    date: '24 July 2025',
    description:
      'Hands-on workshop covering core Unity game development techniques, strengthening the practical skills behind the Wau Bulan VR final year project.',
    image: '/certs/unity3d-workshop.jpg',
  },
  {
    title: 'Developing Virtual Spaces in the Metaverse using Spatial IO',
    issuer: 'MivieLab, Faculty of Computing, UTM',
    date: '28 May 2025',
    description: 'Workshop on building virtual environments in the metaverse using Spatial IO, covering spatial design and interactive 3D space creation.',
    image: '/certs/metaverse-spatial-io.jpg',
  },
  {
    title: 'Alumni Industry Talk Series',
    issuer: 'MivieLab, Faculty of Computing, UTM',
    date: '15 June 2025',
    description: 'Industry talk session featuring insights from alumni working in tech, with exposure to real-world career paths in computing.',
    image: '/certs/alumni-industry-talk.jpg',
  },
  {
    title: 'MAPITA 2022 — Certificate of Attendance',
    issuer: 'Department of Digital Services, UTM',
    date: '13–15 December 2022',
    description: 'Google Workspace OnBoard session at MAPITA 2022 (Majlis Pengarah-Pengarah ICT IPTA), themed "Jaringan Digital dan Industri".',
    image: '/certs/mapita-2022.jpg',
  },
];
