export interface GalleryImage {
  src: string;
  caption: string;
}

export interface CourseworkItem {
  slug: string;
  title: string;
  subtitle: string;
  course: string;
  period: string;
  description: string;
  image: string;
  overview: string[];
  highlights: string[];
  techStack: string[];
  gallery: GalleryImage[];
  href?: string;
}

export const coursework: CourseworkItem[] = [
  {
    slug: 'ar-foundation',
    title: 'AR Foundation Project',
    subtitle: 'Marker-based augmented reality experiments in Unity',
    course: 'Real-Time Computer Graphics',
    period: 'Aug 2025',
    description:
      "Hands-on experiments with Unity's AR Foundation — plane detection, object placement, and AR interaction patterns.",
    image: '/coursework/ar-foundation.jpg',
    href: 'https://github.com/Farezyrahman/AR-Foundation-Project',
    overview: [
      'Marker-based AR experiments in Unity: placing and anchoring virtual objects against a real camera feed, as groundwork for the later XR work in this course and in the Wau Bulan VR final year project.',
    ],
    highlights: [
      "Built marker-based AR object placement and anchoring using Unity's AR Foundation.",
      'Explored AR tracking types and interaction patterns later carried into the Wau Bulan VR final year project.',
      'Tested a stereo (side-by-side) render mode of the same scene for headset-style viewing.',
    ],
    techStack: ['Unity', 'C#', 'AR Foundation'],
    gallery: [
      { src: '/coursework/ar-foundation.jpg', caption: 'AR marker-based character placement demo, running on a phone' },
      { src: '/coursework/ar-foundation-stereo.jpg', caption: 'Stereo side-by-side render of the scene for headset viewing' },
    ],
  },
  {
    slug: 'spatial-io',
    title: 'Metaverse Spaces with Spatial IO',
    subtitle: 'Building a hosted, multi-user 3D playground',
    course: 'Real-Time Computer Graphics',
    period: '2025',
    description:
      'Built and hosted an interactive 3D playground space in Spatial IO as part of a hands-on metaverse workshop.',
    image: '/coursework/spatial-io.jpg',
    overview: [
      'A hands-on exercise in no-code/low-code metaverse authoring: designing and publishing a multi-user social space on Spatial IO, a browser-based platform that lets visitors drop in as avatars and explore together in real time.',
      'The brief was to go beyond a static scene and build something people would actually want to move around in — a playground layout with obstacles, climbing structures, and open space for avatars to run, jump, and interact, then share it as a live link classmates could join.',
    ],
    highlights: [
      'Laid out a full playground environment (slides, monkey bars, seesaws, an obstacle course) using Spatial IO\'s scene editor and asset library.',
      'Published the space as a shareable link and tested it live with multiple classmates joining as avatars simultaneously, confirming multiplayer sync worked end to end.',
      'Iterated on scale and spacing so the layout stayed readable and navigable from a third-person avatar camera, not just a top-down editor view.',
    ],
    techStack: ['Spatial IO', 'WebGL', '3D scene composition'],
    gallery: [
      { src: '/coursework/spatial-scene.jpg', caption: 'The finished playground space, viewed with classmates joined in as avatars' },
      { src: '/coursework/spatial-hub.jpg', caption: 'The published space on its public Spatial IO hub page' },
    ],
  },
  {
    slug: 'ai-npc-xr',
    title: 'AI NPC & XR Interaction Toolkit',
    subtitle: 'Hand-tracked grab interactions and reactive dialogue',
    course: 'Real-Time Computer Graphics',
    period: '2025',
    description:
      "Explored Unity's XR Interaction Toolkit — hand-poser grab interactions and NPC dialogue systems.",
    image: '/coursework/ai-npc-xr.jpg',
    overview: [
      "A two-part exercise in Unity's XR Interaction Toolkit: getting believable hand-to-object interaction working, then layering a reactive NPC on top so a scene feels inhabited rather than empty.",
      'The interaction side used the toolkit\'s hand-poser system to make a tracked hand realistically wrap around and pick up a physical prop; the NPC side scripted dialogue that responds to what the player does, rather than playing a fixed line on a timer.',
    ],
    highlights: [
      "Configured the XR Interaction Toolkit's hand-poser system so a tracked hand grips a pickup object (a gun prop) with correct finger placement instead of clipping through it.",
      'Set up grab and release interaction states with visual feedback, testing the pose across multiple approach angles.',
      'Scripted an NPC dialogue sequence that triggers contextually as the player character regains movement, rather than firing on a fixed timer.',
    ],
    techStack: ['Unity', 'XR Interaction Toolkit', 'C#'],
    gallery: [
      { src: '/coursework/ai-npc-handposer.jpg', caption: "Hand-poser grab interaction on a pickup object, built with XR Interaction Toolkit" },
      { src: '/coursework/ai-npc-xr.jpg', caption: 'In-editor playtest of the NPC dialogue sequence' },
    ],
  },
  {
    slug: 'drone-slicer',
    title: 'LeapMotion + Hologram Drone Slicer',
    subtitle: 'Hand-tracked control for a drone-swarm slicer prototype',
    course: 'Real-Time Computer Graphics',
    period: '2025',
    description:
      'Real-time hand-tracking interaction with LeapMotion, feeding into a drone-swarm slicer game prototype.',
    image: '/coursework/drone-slicer.jpg',
    overview: [
      'A final project combining two real-time graphics threads from the course: LeapMotion hand tracking as the input device, and a fruit-ninja-style "slicer" game where the target is a swarm of up to 41 drones instead of fruit.',
      'The LeapMotion device replaced keyboard/mouse entirely — the player\'s bare hand, tracked in 3D space above the sensor, becomes the slicing blade, which meant tuning gesture detection to feel responsive against fast-moving 3D targets.',
    ],
    highlights: [
      'Positioned and calibrated a LeapMotion sensor to track real-time hand gestures as the primary input device, replacing keyboard/mouse controls entirely.',
      'Built a spawner system managing up to 41 drone targets on screen at once, with visible-drone counts and a runtime culling toggle to profile performance.',
      'Implemented slice detection between tracked hand position and drone hitboxes, with on-screen FPS/CPU/GPU stats used to keep the scene performant during testing.',
    ],
    techStack: ['Unity', 'Ultraleap (LeapMotion) SDK', 'C#'],
    gallery: [
      { src: '/coursework/drone-editor.jpg', caption: 'Full Unity editor view of the drone-swarm scene and project structure' },
      { src: '/coursework/drone-gameplay-1.jpg', caption: 'Runtime game view — drone swarm with visible-drone count and culling stats' },
      { src: '/coursework/drone-gameplay-2.jpg', caption: 'Closer view of a drone target with performance stats overlay' },
      { src: '/coursework/drone-leapmotion-figure.jpg', caption: 'LeapMotion sensor setup captured for the project report' },
    ],
  },
];

export function getCourseworkBySlug(slug: string): CourseworkItem | undefined {
  return coursework.find((c) => c.slug === slug);
}
