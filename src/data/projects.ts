export interface GalleryImage {
  src: string;
  caption: string;
}

export interface Metric {
  label: string;
  value: string;
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  image?: string;
  tags: string[];
  href?: string;
  status: 'public' | 'private';
  role: string;
  year: string;
  period?: string;
  overview?: string[];
  highlights?: string[];
  techStack?: string[];
  metrics?: Metric[];
  gallery?: GalleryImage[];
}

export const projects: Project[] = [
  {
    slug: 'wau-bulan-vr',
    title: 'Wau Bulan VR',
    tagline: 'VR educational simulator, Final Year Project',
    description:
      'A VR game that teaches the traditional Malaysian art of Wau Bulan (moon kite) making — from gathering materials to crafting and flying — guided by NPCs across three levels, built for Meta Quest 2.',
    image: '/projects/wau-bulan-vr/kite-flying.jpg',
    tags: ['Unity', 'C#', 'XR Interaction Toolkit', 'Meta Quest 2'],
    href: 'https://github.com/Farezyrahman/Wau-Bulan-Vr',
    status: 'public',
    role: 'Solo developer · Final Year Project',
    year: '2026',
    period: 'Sep 2025 – Jul 2026',
    overview: [
      "My Final Year Project at UTM, supervised by Dr. Norhaida Mohd Suaib: a VR training simulator that teaches the traditional Malaysian craft of Wau Bulan (moon kite) making — from gathering raw materials, through bamboo-bending and paper-cutting crafting mechanics, to physics-based kite flying — deployed on the Meta Quest 2.",
      "The system is built around three checkpoint-based levels, each tracking completion status and performance metrics as the learner progresses, with three Kelantanese-speaking NPC guides and an in-game Knowledge Quiz reinforcing the cultural and technical knowledge behind the craft.",
    ],
    highlights: [
      'Designed a checkpoint-based progress-tracking system in Unity, recording completion status and performance metrics at each stage of the Wau Bulan kite-making process.',
      "Implemented a real-world-grounded Wind Zone system using Unity's Rigidbody physics, with location-specific wind ranges for three flying zones derived from published Malaysian wind-speed data.",
      'Designed three Kelantanese-speaking NPC guides and an in-game Knowledge Quiz to reinforce cultural and crafting knowledge.',
      'Validated the system through usability and black-box testing with 14 target users, achieving a 95.8% first-attempt success rate across 22 interaction checkpoints.',
      'Co-authored and presented "Interactive Game-Based Learning of Wau Bulan with NPCs in Virtual Reality" at UTM\'s International Immersive Computing Symposium (I\'MMERSe 2026).',
    ],
    techStack: ['Unity', 'C#', 'XR Interaction Toolkit', 'Meta Quest 2', 'Rigidbody Physics'],
    metrics: [
      { label: 'Target users tested', value: '14' },
      { label: 'Interaction checkpoints', value: '22' },
      { label: 'First-attempt success rate', value: '95.8%' },
    ],
    gallery: [
      { src: '/projects/wau-bulan-vr/kite-flying.jpg', caption: 'In-game kite flying, Level 3 flying zone' },
      { src: '/projects/wau-bulan-vr/level1-collection.jpg', caption: 'Level 1 — item collection mechanics' },
      { src: '/projects/wau-bulan-vr/level2-painting.jpg', caption: 'Level 2 — Station 2, paper painting & cutting' },
      { src: '/projects/wau-bulan-vr/level3-env.jpg', caption: 'Level 3 — flying field environment design' },
      { src: '/projects/wau-bulan-vr/windzone.jpg', caption: 'Custom Wind Zone particle system' },
      { src: '/projects/wau-bulan-vr/quiz.jpg', caption: 'In-game Knowledge Quiz' },
      { src: '/projects/wau-bulan-vr/scoreboard.jpg', caption: 'End-of-session scoreboard — stage times & quiz score' },
    ],
  },
  {
    slug: 'asti-designer',
    title: 'ASTI Designer',
    tagline: 'AI floor-plan detection → interactive 3D',
    description:
      'AI-powered tool that detects walls, doors, and windows in 2D floor plan images with a custom-trained YOLOv8 model, then converts the result into an interactive 3D model — built on a modernized Sweet Home 3D core.',
    image: '/projects/asti-designer/3d-recon-furnished.jpg',
    tags: ['Python', 'YOLOv8', 'Roboflow', 'Three.js'],
    status: 'private',
    role: 'Software Developer Intern · Ace Star Tech Software Integration',
    year: '2026',
    period: 'Dec 2025 – Jan 2026',
    overview: [
      'One of three project rotations during my software development internship at Ace Star Tech Software Integration: an end-to-end pipeline that converts a raw 2D floor plan image into an interactive, textured 3D model.',
      'I led the data curation and applied machine learning side — building the training dataset, training the detection model, and writing the geometry code that turns detected walls, doors, and windows into a reconstructed 3D space.',
    ],
    highlights: [
      'Curated and preprocessed a structural dataset of over 5,000 floor plan images for object detection model training, using Roboflow to label walls, doors, and windows for consistent, reproducible training runs.',
      'Trained a custom YOLOv8 object detection model on an NVIDIA RTX 3050 GPU, resolving memory and performance bottlenecks by rewriting the data loading pipeline, tuning batch sizes, and adding automatic garbage collection.',
      'Wrote custom coordinate-transformation logic in Python to convert 2D pixel coordinates from detected objects into structured 3D spatial data.',
      'Deployed the final model into a Three.js and Sweet Home 3D compatible ecosystem, achieving near 100% boundary accuracy for structural walls, windows, and doors.',
    ],
    techStack: ['Python', 'YOLOv8', 'Roboflow', 'OpenCV', 'Three.js', 'NVIDIA RTX 3050'],
    metrics: [
      { label: 'Training images curated', value: '5,000+' },
      { label: 'Avg. detection confidence', value: '~100%' },
    ],
    gallery: [
      { src: '/projects/asti-designer/dataset.jpg', caption: 'Roboflow dataset — 5,000+ labeled floor plan images' },
      { src: '/projects/asti-designer/detection-results.jpg', caption: 'Wall / door / window detection results' },
      { src: '/projects/asti-designer/detection-history.jpg', caption: 'Detection history across training iterations' },
      { src: '/projects/asti-designer/3d-recon-furnished.jpg', caption: 'Reconstructed 3D model with furniture placement' },
      { src: '/projects/asti-designer/3d-recon-rooms.jpg', caption: 'Multi-room 3D reconstruction with door detection' },
    ],
  },
  {
    slug: 'einvoice-manager',
    title: 'E-Invoice Manager',
    tagline: 'Full-stack POS & e-invoicing platform',
    description:
      'A Laravel-based invoicing and point-of-sale system aligned with Malaysia LHDN e-invoicing requirements, with product catalogs, POS checkout, and real-time payment tracking on PostgreSQL.',
    image: '/projects/einvoice-manager/dashboard.jpg',
    tags: ['Laravel', 'PHP', 'PostgreSQL', 'Tailwind CSS'],
    status: 'private',
    role: 'Software Developer Intern · Ace Star Tech Software Integration',
    year: '2026',
    period: 'Oct 2025 – Nov 2025',
    overview: [
      'The second of three rotations during my internship: a compliance-driven invoicing platform aligned with Malaysia\'s Inland Revenue Board (LHDN) e-invoicing requirements, covering backend, database, and reporting.',
      'I owned the database design and backend logic — schema design, CRUD APIs, validation, and the real-time reporting layer — paired with a Tailwind CSS front-end for the end-user dashboard.',
    ],
    highlights: [
      "Designed and implemented a PostgreSQL database schema to support secure invoicing, transaction history tracking, and automated financial reporting aligned with LHDN's e-invoicing regulatory requirements.",
      'Built backend CRUD operations and data validation logic using Laravel (PHP) — covering invoice creation, updates, and record retrieval — while enforcing integrity checks to prevent duplicate or malformed entries.',
      'Implemented real-time transaction tracking and automated PDF report generation, paired with a Tailwind CSS front-end, giving end-users accurate, up-to-date financial records without manual report compilation.',
    ],
    techStack: ['Laravel', 'PHP', 'PostgreSQL', 'Tailwind CSS', 'JavaScript'],
    gallery: [
      { src: '/projects/einvoice-manager/database.jpg', caption: 'PostgreSQL schema — e-invoicing database' },
      { src: '/projects/einvoice-manager/invoice-pdf.jpg', caption: 'Auto-generated LHDN-aligned e-invoice PDF' },
      { src: '/projects/einvoice-manager/dashboard.jpg', caption: 'Business dashboard — revenue, orders, stock' },
      { src: '/projects/einvoice-manager/transactions.jpg', caption: 'Real-time transaction tracking' },
      { src: '/projects/einvoice-manager/invoice-builder.jpg', caption: 'Invoice builder — customer & line items' },
    ],
  },
  {
    slug: 'ai-avatar-chatbox',
    title: 'AI Avatar Chatbox',
    tagline: '3D digital human rigging & lip sync',
    description:
      'A high-fidelity 3D character rig with synchronized facial and voice-driven animation, built for an interactive avatar chat interface.',
    image: '/projects/ai-avatar-chatbox/facerig-cc.jpg',
    tags: ['Blender', 'Character Creator 5', 'Rigify'],
    status: 'private',
    role: 'Software Developer Intern · Ace Star Tech Software Integration',
    year: '2025',
    period: 'Sep 2025',
    overview: [
      'The third rotation during my internship: developing and optimizing high-fidelity 3D digital human characters with face and voice cloning capabilities for an interactive avatar chat interface.',
      'This was my deepest dive into graphics and character-animation programming — bridging 3D geometric modeling and real-time animation mechanics for a unified, expressive character rig.',
    ],
    highlights: [
      'Developed 3D character rigging and real-time animation systems using Blender, Keen Tools, and Character Creator 5.',
      'Built a unified body-and-face rig supporting both scripted and reactive animations, refining facial rigs and animation pipelines for improved anatomical deformation accuracy.',
      'Worked with facial and voice data pipelines to synchronize character expressions and speech, supporting interactive, real-time character behavior for the avatar interface.',
    ],
    techStack: ['Blender', 'Character Creator 5', 'Keen Tools', 'Rigify', 'Unity'],
    gallery: [
      { src: '/projects/ai-avatar-chatbox/facerig-cc.jpg', caption: 'High-fidelity facial rig in Character Creator 5' },
      { src: '/projects/ai-avatar-chatbox/lipsync.jpg', caption: 'Viseme-based lip sync setup in Blender' },
      { src: '/projects/ai-avatar-chatbox/facial-bones.jpg', caption: 'Facial bone rig — close-up topology' },
      { src: '/projects/ai-avatar-chatbox/fullbody-rig.jpg', caption: 'Unified body + face rig, T-pose' },
      { src: '/projects/ai-avatar-chatbox/wireframe-closeup.jpg', caption: 'High-poly facial topology, close-up' },
    ],
  },
  {
    slug: 'multiuser-metaverse',
    title: 'Multiuser Interaction Application',
    tagline: 'Networked metaverse app with voice cloning',
    description:
      'A multiplayer Unity application with real-time networking, cloud data sync, and voice cloning for interactive, personalized communication between users.',
    tags: ['Unity', 'Photon PUN', 'Firebase', 'ElevenLabs'],
    status: 'private',
    role: 'Solo · University project',
    year: '2025',
    period: 'Jun 2025',
    overview: [
      'A multiplayer metaverse application exploring real-time networked interaction — built to see how far a small Unity project could go on synchronization, cloud data, and personalized voice, three pieces that usually live in separate systems.',
    ],
    highlights: [
      'Developed a multiplayer application using Unity with Photon PUN for networked communication, synchronizing player actions and positions in real time across multiple connected clients.',
      'Integrated Firebase for real-time data synchronization, keeping user data consistent across all connected sessions.',
      'Integrated voice cloning technology for interactive, personalized voice communication between connected users.',
    ],
    techStack: ['Unity', 'Photon PUN', 'Firebase', 'ElevenLabs'],
  },
  {
    slug: 'venue-management',
    title: 'Venue Management Platform',
    tagline: 'Booking system for Faculty of Computing, UTM',
    description:
      'A web-based booking system to manage lecture venue scheduling for lecturers and students at the Faculty of Computing, UTM.',
    tags: ['Laravel', 'MySQL', 'JavaScript'],
    status: 'private',
    role: 'Team project · Faculty of Computing, UTM',
    year: '2025',
    period: 'Jan 2025',
    overview: [
      'A team project built for our own faculty: a booking system that replaced manual venue scheduling for lecturers and students with a shared, conflict-checked calendar.',
    ],
    highlights: [
      'Built a web-based booking system using Laravel, Blade, HTML, JavaScript, and MySQL to simplify venue scheduling for lecturers and students.',
      'Designed a database structure to track room availability and prevent double-booking conflicts.',
    ],
    techStack: ['Laravel', 'Blade', 'MySQL', 'JavaScript'],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
