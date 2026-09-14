import { useEffect, useMemo, useState } from 'react';
import type { CSSProperties } from 'react';
import { FiCamera, FiZoomIn } from 'react-icons/fi';
import GradientText from '../blocks/TextAnimations/GradientText/GradientText';
import AnimatedContent from '../blocks/Animations/AnimatedContent/AnimatedContent';
import Lightbox from './Lightbox';
import { asset } from '../lib/asset';

interface Photo {
  src: string;
  caption: string;
}

interface PhotoGroup {
  label: string;
  color: string;
  photos: Photo[];
}

// Grouped by context rather than one flat grid — makes the section read as
// a set of moments rather than a wall of thumbnails.
const GROUPS: PhotoGroup[] = [
  {
    label: "MEXRA '25 — Tokyo",
    color: 'var(--color-accent-cool-2)',
    photos: [
      {
        src: '/photos/mexra-tokyo-2025.jpg',
        caption:
          "UTM's MEXRA '25 delegation at the University of Tokyo, representing Malaysia at an international metaverse & XR exchange",
      },
      {
        src: '/photos/vr-demo.jpg',
        caption: "Demoing a VR build to University of Tokyo students and staff at MEXRA '25 (Metaverse & XR Adventure)",
      },
      {
        src: '/photos/dev-lab.jpg',
        caption: 'Getting hands-on with a headset during a lab walkthrough at the University of Tokyo',
      },
      {
        src: '/photos/mexra-banner-group.jpg',
        caption: "Touring the host lab's XR workstation setup, Tokyo",
      },
      {
        src: '/photos/mexra-moneyforward-visit.jpg',
        caption: 'Company visit to Money Forward Inc. in Tokyo, where UTM graduates have gone on to work',
      },
      {
        src: '/photos/mexra-happi.jpg',
        caption: 'Trying on a traditional happi coat during the cultural exchange',
      },
    ],
  },
  {
    label: 'Teaching & Crew Training',
    color: 'var(--color-accent-warm)',
    photos: [
      {
        src: '/photos/presenting.jpg',
        caption: 'Opening the program briefing for Kelas Bimbingan Videografi 2024',
      },
      {
        src: '/photos/kfk-presenting.jpg',
        caption: "Leading Kelas Bimbingan Videografi 2024's crew training session",
      },
      {
        src: '/photos/kfk-camera-teaching.jpg',
        caption: 'Walking participants through camera handling and settings',
      },
      {
        src: '/photos/kfk-gimbal-handover.jpg',
        caption: 'Handing over the gimbal rig — hands-on crew training',
      },
      {
        src: '/photos/kfk-camera-students.jpg',
        caption: 'Participants getting their first hands-on time with the camera',
      },
      {
        src: '/photos/kfk-camera-closeup.jpg',
        caption: 'Close-up of a camera-handling demo during the workshop',
      },
    ],
  },
  {
    label: 'Campus & Community',
    color: 'var(--color-accent-3)',
    photos: [
      {
        src: '/photos/showcase-presenting.jpg',
        caption: 'Showcasing a graphics project at the Faculty of Computing exhibition booth',
      },
      {
        src: '/photos/showcase-mic.jpg',
        caption: 'Presenting at the Graphics & Multimedia Software showcase',
      },
      {
        src: '/photos/showcase-room.jpg',
        caption: 'The Graphics & Multimedia Software showcase floor at UTM',
      },
      {
        src: '/photos/expedea-tugofwar.jpg',
        caption: "EXPEDEA — tug-of-war during the club's outdoor programme",
      },
      {
        src: '/photos/expedea-cheer.jpg',
        caption: 'EXPEDEA — team challenges on the beach',
      },
      {
        src: '/photos/expedea-beach-group.jpg',
        caption: 'EXPEDEA — the whole team after the programme wrapped',
      },
    ],
  },
];

const FEATURE_PHOTO: Photo = {
  src: '/photos/content-creator.jpg',
  caption: 'Shooting project footage around UTM campus',
};

const BTS_PHOTOS: Photo[] = [
  { src: '/photos/filming-bts.jpg', caption: 'On set — running the camera for a campus shoot' },
  { src: '/photos/content-creator-2.jpg', caption: 'Between takes at the UTM clock tower' },
];

// Actual photography work — shown at natural aspect ratio in a masonry
// layout so the framing reads as intended rather than centre-cropped.
interface WorkPhoto extends Photo {
  ratio: number; // width / height, used to balance the masonry columns
}

const PHOTO_WORK: { label: string; photos: WorkPhoto[] }[] = [
  {
    label: 'Convocation coverage, UTM',
    photos: [
      { src: '/photos/photography/convo-cap-toss.jpg', caption: 'Cap toss — UTM convocation', ratio: 1.501 },
      { src: '/photos/photography/convo-portrait.jpg', caption: 'Graduate portrait at the convocation banner', ratio: 0.667 },
      { src: '/photos/photography/convo-lineup.jpg', caption: 'Graduates lined up in front of the mosque', ratio: 1.501 },
      { src: '/photos/photography/convo-utm-back.jpg', caption: 'Robe detail against the UTM emblem', ratio: 0.667 },
      { src: '/photos/photography/convo-group.jpg', caption: 'Class group shot after the ceremony', ratio: 1.501 },
      { src: '/photos/photography/convo-palms.jpg', caption: 'Friends and family cap toss under the palms', ratio: 1.501 },
      { src: '/photos/photography/convo-bouquet.jpg', caption: 'Candid moment with the bouquets', ratio: 1.501 },
    ],
  },
  {
    label: 'Formal portrait session — KKDK club',
    photos: [
      { src: '/photos/photography/club-trio.jpg', caption: 'Committee portrait, trio', ratio: 0.667 },
      { src: '/photos/photography/club-group-park.jpg', caption: 'Group portrait in the park', ratio: 0.667 },
      { src: '/photos/photography/club-railing.jpg', caption: 'Individual portrait by the lake', ratio: 0.667 },
      { src: '/photos/photography/club-bench.jpg', caption: 'Committee portrait on the bench', ratio: 0.667 },
      { src: '/photos/photography/club-bridge.jpg', caption: 'Individual portrait on the boardwalk', ratio: 0.664 },
    ],
  },
];

// Column count tracks the same breakpoints Tailwind uses (md 768, lg 1024).
function useColumnCount() {
  const get = () => (window.innerWidth >= 1024 ? 4 : window.innerWidth >= 768 ? 3 : 2);
  const [count, setCount] = useState(get);
  useEffect(() => {
    const onResize = () => setCount(get());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return count;
}

// JS-distributed masonry: each photo goes into whichever column is currently
// shortest (by accumulated aspect ratio), so the columns end level and no
// column is left empty — CSS multicol with break-inside-avoid tends to leave
// the last column blank when items are tall.
function Masonry({ photos, onOpen }: { photos: WorkPhoto[]; onOpen: (p: WorkPhoto) => void }) {
  const count = useColumnCount();
  const columns = useMemo(() => {
    const cols: WorkPhoto[][] = Array.from({ length: count }, () => []);
    const heights = new Array(count).fill(0);
    photos.forEach((p) => {
      const i = heights.indexOf(Math.min(...heights));
      cols[i].push(p);
      heights[i] += 1 / p.ratio;
    });
    return cols;
  }, [photos, count]);

  return (
    <div className="flex gap-4">
      {columns.map((col, ci) => (
        <div key={ci} className="flex-1 flex flex-col gap-4 min-w-0">
          {col.map((photo, i) => (
            <AnimatedContent key={photo.src} distance={24} delay={(i % 3) * 0.06 + ci * 0.04}>
              <button
                type="button"
                onClick={() => onOpen(photo)}
                aria-label={`View larger: ${photo.caption}`}
                className="relative block w-full rounded-xl overflow-hidden border border-white/10 group cursor-zoom-in"
                style={{ aspectRatio: String(photo.ratio) }}
              >
                <img
                  src={asset(photo.src)}
                  alt={photo.caption}
                  loading="lazy"
                  className="w-full h-full object-cover block transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
                <span className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center w-7 h-7 rounded-full bg-black/60 border border-white/20 text-white">
                  <FiZoomIn size={13} />
                </span>
              </button>
            </AnimatedContent>
          ))}
        </div>
      ))}
    </div>
  );
}

function PhotoTile({ photo, onOpen, className = 'h-56' }: { photo: Photo; onOpen: () => void; className?: string }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`View larger: ${photo.caption}`}
      className={`relative w-full rounded-2xl overflow-hidden border border-white/10 group text-left cursor-zoom-in ${className}`}
    >
      <img
        src={asset(photo.src)}
        alt={photo.caption}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
      <span className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center w-8 h-8 rounded-full bg-black/60 border border-white/20 text-white">
        <FiZoomIn size={14} />
      </span>
      <p className="absolute bottom-0 left-0 right-0 p-3.5 text-xs text-white/85 leading-snug">{photo.caption}</p>
    </button>
  );
}

export default function Gallery() {
  const [open, setOpen] = useState<Photo | null>(null);

  return (
    <section id="gallery" className="relative py-28">
      <div className="section-shell">
        <p className="kicker mb-4">Beyond the code</p>
        <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-4">
          <GradientText colors={['#e8ff7a', '#c6f135', '#8fd93f']} animationSpeed={6}>
            In the field
          </GradientText>
        </h2>
        <p className="text-white/60 max-w-2xl mb-14 leading-relaxed text-justify hyphens-auto">
          Building things is only half of it. The other half happens off-screen: testing headsets on
          real users to see whether an interaction actually lands, presenting finished builds to a
          room of lecturers and students, training the next batch of student videographers through
          UTM's creative club, and — this past November — representing UTM and Malaysia at MEXRA, an
          international metaverse &amp; XR exchange hosted at the University of Tokyo. I also shoot and
          edit part-time as a photographer and videographer for campus productions, so in a good few
          of these photos I'm the one behind the camera rather than in front of it. Click any photo
          to view it larger.
        </p>

        <div className="space-y-14">
          {GROUPS.map((group) => (
            <div key={group.label}>
              <p className="group-label mb-5" style={{ ['--group-color' as string]: group.color } as CSSProperties}>
                {group.label}
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {group.photos.map((photo, i) => (
                  <AnimatedContent key={photo.src} distance={30} delay={(i % 3) * 0.07}>
                    <PhotoTile photo={photo} onOpen={() => setOpen(photo)} />
                  </AnimatedContent>
                ))}
              </div>
            </div>
          ))}

          <div>
            <p
              className="group-label mb-5"
              style={{ ['--group-color' as string]: 'var(--color-accent-pink)' } as CSSProperties}
            >
              Behind the Lens — Part-Time Photography
            </p>

            <div className="grid lg:grid-cols-[1.4fr_1fr] gap-4 mb-4">
              <AnimatedContent distance={30}>
                <button
                  type="button"
                  onClick={() => setOpen(FEATURE_PHOTO)}
                  aria-label={`View larger: ${FEATURE_PHOTO.caption}`}
                  className="relative w-full rounded-2xl overflow-hidden border border-white/10 group h-80 sm:h-96 lg:h-[28rem] text-left cursor-zoom-in"
                >
                  <img
                    src={asset(FEATURE_PHOTO.src)}
                    alt={FEATURE_PHOTO.caption}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between gap-4">
                    <p className="text-sm sm:text-base text-white/90 leading-snug max-w-md">{FEATURE_PHOTO.caption}</p>
                    <span
                      className="hidden sm:inline-flex items-center gap-2 text-[11px] uppercase tracking-wider font-medium px-3 py-1.5 rounded-full border shrink-0"
                      style={{
                        borderColor: 'color-mix(in srgb, var(--color-accent-pink) 45%, transparent)',
                        background: 'color-mix(in srgb, var(--color-accent-pink) 12%, transparent)',
                        color: 'var(--color-accent-pink)',
                      }}
                    >
                      <FiCamera size={13} />
                      Photographer &amp; videographer
                    </span>
                  </div>
                </button>
              </AnimatedContent>
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 content-start">
                {BTS_PHOTOS.map((photo, i) => (
                  <AnimatedContent key={photo.src} distance={30} delay={0.08 + i * 0.07}>
                    <PhotoTile photo={photo} onOpen={() => setOpen(photo)} className="h-52 lg:h-[13.5rem]" />
                  </AnimatedContent>
                ))}
              </div>
            </div>

            <p className="text-sm text-white/50 mb-8 max-w-2xl leading-relaxed">
              A selection of my own shots from paid and club jobs — convocation coverage and a formal
              portrait session — shown at their original framing.
            </p>

            <div className="space-y-10">
              {PHOTO_WORK.map((set) => (
                <div key={set.label}>
                  <p className="font-mono text-[11px] uppercase tracking-wider text-white/40 mb-4">{set.label}</p>
                  <Masonry photos={set.photos} onOpen={(p) => setOpen(p)} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {open && <Lightbox src={open.src} alt={open.caption} caption={open.caption} onClose={() => setOpen(null)} />}
    </section>
  );
}
