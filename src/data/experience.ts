export interface ExperienceItem {
  title: string;
  period: string;
  bullets: string[];
  projectSlug?: string;
}

export const internship = {
  company: 'Ace Star Tech Software Integration',
  role: 'Software Developer Intern',
  period: 'Sep 2025 – Jan 2026',
  summary:
    'Rotated across three projects covering backend & database development, applied machine learning, and graphics programming.',
  rotations: [
    {
      title: 'SweetHome3D JS — Data Curation & Applied Machine Learning',
      period: 'Dec 2025 – Jan 2026',
      bullets: [
        'Curated a 5,000+ image floor plan dataset with Roboflow and trained a custom YOLOv8 detection model.',
        'Wrote coordinate-transformation logic in Python to reconstruct detected floor plans as 3D models.',
      ],
      projectSlug: 'asti-designer',
    },
    {
      title: 'E-Invoice System with LHDN Integration — Backend & Database',
      period: 'Oct 2025 – Nov 2025',
      bullets: [
        'Designed a PostgreSQL schema for secure invoicing, transaction history, and automated financial reporting.',
        'Built Laravel CRUD APIs and real-time transaction tracking with automated PDF report generation.',
      ],
      projectSlug: 'einvoice-manager',
    },
    {
      title: 'AI Avatar Chatbox — Graphics & Multimedia Programming',
      period: 'Sep 2025',
      bullets: [
        'Built a unified body-and-face rig in Blender, Keen Tools, and Character Creator 5 for a 3D digital human.',
        'Synchronized facial and voice data pipelines for real-time, interactive character behavior.',
      ],
      projectSlug: 'ai-avatar-chatbox',
    },
  ] as ExperienceItem[],
};

export interface ActivityItem {
  title: string;
  period: string;
  description: string;
}

export const activities: ActivityItem[] = [
  {
    title: 'Technical Crew Lead — MEXRA ’25 (Metaverse & XR Adventure), University of Tokyo',
    period: 'Nov 2025',
    description:
      'Selected as leader for the technical crew of a UTM delegation to the University of Tokyo, handling sponsorship, proposal papers, and on-the-ground technical activities for the exchange program.',
  },
  {
    title: 'EXCO, Foto dan Video — Kelab Fotokreatif (KFK)',
    period: 'Mar 2025 – Jan 2026',
    description:
      'Committee member for the photo and video committee, shooting and editing photo/video content for club programs across the 2024/2025 session.',
  },
  {
    title: 'Crew Lead — Kelas Bimbingan Videografi 2024',
    period: 'Dec 2024',
    description:
      'Led a crew of around 15 volunteers running a videography training event for roughly 20 participants, and served as the editing instructor for the session.',
  },
];
