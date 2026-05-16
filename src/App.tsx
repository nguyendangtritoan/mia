import React, { useState, useEffect } from 'react';
import { Menu, X, Mail, MapPin, Phone, Download, Palette, Layout, Users, Briefcase, ChevronRight, FileText, User, Home, Folder, History, Linkedin, Eye, Sparkles, Heart, Globe, Code, ListTodo, GraduationCap, School } from 'lucide-react';

// --- SWIPER IMPORTS ---
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';

// --- LOGO IMPORTS ---
import EncowayLogo from './EncowayLogo';
import KukaLogo from './KukaLogo';
import VWLogo from './VWLogo';
import UniLogo from './UniLogo'; 
import BILogo from './BILOGO';
import JourneyDivider from './JourneyDivider';

// --- TYPE DEFINITION FOR PROJECTS ---
interface Project {
  id: string;
  title: string;
  description: string;
  color: string;
  category?: string;
  metrics?: string[];
  Logo?: React.ElementType; 
  icon?: React.ReactNode;   
  pdfUrl?: string;
  isGroup?: boolean;
}

// --- ROLE TICKER COMPONENT ---

const RoleTicker = ({ language }: { language: 'de' | 'en' }) => {
  const roles = {
    de: ["UI/UX-Designerin", "Mediengestalterin"],
    en: ["UI/UX Designer", "Media Designer"]
  };
  
  const currentRoles = roles[language];
  const [isFlipped, setIsFlipped] = React.useState(false);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setIsFlipped((prev) => !prev);
    }, 2000); 

    return () => clearInterval(interval);
  }, []);

  const pillClass = "w-full text-center px-3 py-0.5 bg-pink-100 text-pink-700 rounded-full text-sm md:text-base border border-pink-200 font-bold block truncate leading-none shadow-sm";

  return (
    <span className="inline-block h-[1.5em] w-48 relative align-middle mb-1 mx-1" style={{ perspective: '1000px' }}>
      <span
        className={`absolute inset-0 transition-transform duration-600 ${isFlipped ? '[transform:rotateX(180deg)]' : '[transform:rotateX(0deg)]'}`}
        style={{ 
            transformStyle: 'preserve-3d',
            transitionTimingFunction: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)' 
        }}
      >
        <span className="absolute inset-0 flex items-center justify-center" style={{ backfaceVisibility: 'hidden' }}>
          <span className={pillClass}>
            {currentRoles[0]}
          </span>
        </span>
        <span
          className="absolute inset-0 flex items-center justify-center"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateX(180deg)' }}
        >
          <span className={pillClass}>
            {currentRoles[1]}
          </span>
        </span>
      </span>
    </span>
  );
};

const cursorArrowUrl = `${import.meta.env.BASE_URL}arrowhead-rounded-outline.svg`;

type CursorBurst = {
  id: number;
  x: number;
  y: number;
};

const FigmaCursor = () => {
  const cursorRef = React.useRef<HTMLDivElement | null>(null);
  const targetPositionRef = React.useRef({ x: -80, y: -80 });
  const followerPositionRef = React.useRef({ x: -80, y: -80 });
  const previousPointerPositionRef = React.useRef<{ x: number; y: number } | null>(null);
  const targetAngleRef = React.useRef(-151);
  const followerAngleRef = React.useRef(-151);
  const animationFrameRef = React.useRef<number | null>(null);
  const burstIdRef = React.useRef(0);
  const [isVisible, setIsVisible] = React.useState(false);
  const [isInteractive, setIsInteractive] = React.useState(false);
  const [isPressing, setIsPressing] = React.useState(false);
  const [clickBursts, setClickBursts] = React.useState<CursorBurst[]>([]);

  React.useEffect(() => {
    const pointerQuery = window.matchMedia('(pointer: fine)');
    if (!pointerQuery.matches) return;

    const cursorClass = 'figma-cursor-enabled';
    const interactiveSelector = [
      'a',
      'button',
      '[role="button"]',
      'input',
      'textarea',
      'select',
      'summary',
      'iframe',
      '[tabindex]:not([tabindex="-1"])'
    ].join(',');
    const burstTimeouts: number[] = [];
    const cursorHeadGap = 44;

    document.documentElement.classList.add(cursorClass);

    const renderCursor = () => {
      const target = targetPositionRef.current;
      const follower = followerPositionRef.current;

      const angleDelta = ((targetAngleRef.current - followerAngleRef.current + 540) % 360) - 180;
      followerAngleRef.current += angleDelta * 0.18;
      const angleInRadians = followerAngleRef.current * (Math.PI / 180);
      const followerTipTarget = {
        x: target.x - Math.cos(angleInRadians) * cursorHeadGap,
        y: target.y - Math.sin(angleInRadians) * cursorHeadGap
      };

      follower.x += (followerTipTarget.x - follower.x) * 0.16;
      follower.y += (followerTipTarget.y - follower.y) * 0.16;

      cursorRef.current?.style.setProperty('--cursor-x', `${follower.x}px`);
      cursorRef.current?.style.setProperty('--cursor-y', `${follower.y}px`);
      cursorRef.current?.style.setProperty('--cursor-angle', `${followerAngleRef.current}deg`);

      animationFrameRef.current = window.requestAnimationFrame(renderCursor);
    };

    const addClickBurst = (x: number, y: number) => {
      const id = burstIdRef.current + 1;
      burstIdRef.current = id;

      setClickBursts((bursts) => [...bursts.slice(-4), { id, x, y }]);

      const timeout = window.setTimeout(() => {
        setClickBursts((bursts) => bursts.filter((burst) => burst.id !== id));
      }, 650);

      burstTimeouts.push(timeout);
    };

    const handlePointerMove = (event: PointerEvent) => {
      const target = event.target;
      const nextPosition = { x: event.clientX, y: event.clientY };
      const previousPosition = previousPointerPositionRef.current;

      if (previousPosition) {
        const deltaX = nextPosition.x - previousPosition.x;
        const deltaY = nextPosition.y - previousPosition.y;

        if (Math.hypot(deltaX, deltaY) > 2) {
          targetAngleRef.current = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
        }
      }

      previousPointerPositionRef.current = nextPosition;
      targetPositionRef.current = nextPosition;
      setIsVisible(true);
      setIsInteractive(target instanceof Element && Boolean(target.closest(interactiveSelector)));
    };

    const handlePointerLeave = () => {
      setIsVisible(false);
      setIsPressing(false);
      previousPointerPositionRef.current = null;
    };

    const handlePointerDown = (event: PointerEvent) => {
      setIsPressing(true);
      addClickBurst(event.clientX, event.clientY);
    };

    const handlePointerUp = () => setIsPressing(false);

    animationFrameRef.current = window.requestAnimationFrame(renderCursor);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerleave', handlePointerLeave);
    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      document.documentElement.classList.remove(cursorClass);
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
      burstTimeouts.forEach((timeout) => window.clearTimeout(timeout));
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        aria-hidden="true"
        className={`figma-cursor ${isVisible ? 'is-visible' : ''} ${isInteractive ? 'is-interactive' : ''} ${isPressing ? 'is-pressing' : ''}`}
      >
        <div className="figma-cursor__inner">
          <img className="figma-cursor__arrow" src={cursorArrowUrl} alt="" draggable={false} />
        </div>
      </div>
      {clickBursts.map((burst) => (
        <span
          key={burst.id}
          aria-hidden="true"
          className="figma-cursor__click-burst"
          style={{
            '--burst-x': `${burst.x}px`,
            '--burst-y': `${burst.y}px`
          } as React.CSSProperties}
        >
          <svg className="figma-cursor__spark" viewBox="0 0 80 80" aria-hidden="true" focusable="false">
            <path
              className="figma-cursor__spark-halo"
              d="M31.5002 20.6751L30.6481 12.7227L29.796 20.6751C28.9048 28.9931 21.9189 35.8954 12.4375 37.8259C21.9189 39.7564 28.9048 46.6587 29.796 54.9767L30.6481 62.9291L31.5002 54.9767C32.3914 46.6586 39.3773 39.7564 48.8587 37.8259C39.3773 35.8954 32.3914 28.9931 31.5002 20.6751Z"
            />
            <path
              className="figma-cursor__spark-halo figma-cursor__spark-small"
              d="M54.7759 38.6445L54.2114 33.3764L53.6469 38.6445C53.0565 44.1549 48.4287 48.7273 42.1477 50.0062C48.4287 51.285 53.0565 55.8575 53.6469 61.3678L54.2114 66.636L54.7759 61.3678C55.3663 55.8575 59.9941 51.285 66.2751 50.0062C59.9941 48.7273 55.3663 44.1549 54.7759 38.6445Z"
            />
            <path
              className="figma-cursor__spark-shape"
              d="M30.6481 12.7227L31.5002 20.6751C32.3914 28.9931 39.3773 35.8954 48.8587 37.8259C39.3773 39.7564 32.3914 46.6586 31.5002 54.9767L30.6481 62.9291L29.796 54.9767C28.9048 46.6586 21.9189 39.7564 12.4375 37.8259C21.9189 35.8954 28.9048 28.9931 29.796 20.6751L30.6481 12.7227Z"
            />
            <path
              className="figma-cursor__spark-shape figma-cursor__spark-small"
              d="M54.2122 33.375L54.7766 38.6432C55.367 44.1535 59.9949 48.7259 66.2759 50.0048C59.9949 51.2836 55.367 55.8561 54.7766 61.3664L54.2122 66.6346L53.6477 61.3664C53.0573 55.8561 48.4294 51.2836 42.1484 50.0048C48.4294 48.7259 53.0573 44.1535 53.6477 38.6432L54.2122 33.375Z"
            />
          </svg>
        </span>
      ))}
    </>
  );
};

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [showResume, setShowResume] = useState(false);
  
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [showUniGroup, setShowUniGroup] = useState(false);

  const [language, setLanguage] = useState<'de' | 'en'>('de');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [swiperRef, setSwiperRef] = useState<SwiperType | null>(null);
  const profilePointerStartRef = React.useRef<{ x: number; y: number } | null>(null);

  const resumeUrl = `${import.meta.env.BASE_URL}PhanMyAnh_Nguyen_CV.pdf`;
  
  const todoAppPdfUrl = "https://drive.google.com/file/d/12qWc2aWSaTFAXu2885xmGEfQRRUE8LRK/preview"; 
  const campusTauschPdfUrl = "https://drive.google.com/file/d/109oDtSaE_Y781CRKuJ_EJzzxP-CSlXSe/preview"; 

  const toggleLanguage = () => {
    setLanguage(prevLang => prevLang === 'de' ? 'en' : 'de');
  };

  const profileImages = [
    "https://drive.google.com/thumbnail?id=1sKzdkj0WP1g64_gI7TPWbW6rSrY2LICD&sz=w1000",
    "https://drive.google.com/thumbnail?id=1FA3WBBE3MABiqMfQSOPfc9PgHdx-vw0i&sz=w1000",
    "https://drive.google.com/thumbnail?id=1oJnhjno7JJJBTjIprHUn1BbyD4WcGnJW&sz=w1000",
    "https://drive.google.com/thumbnail?id=1uLEKkvzCVwDVaydJcbsEqM-gt2o375xB&sz=w1000",
    "https://drive.google.com/thumbnail?id=1Sq-lthddelXJK-rrDhTcUyNYOkaWhJvy&sz=w1000"
  ];

  const shiftProfilePhoto = () => {
    if (!swiperRef) return;

    const nextIndex = swiperRef.activeIndex === profileImages.length - 1 ? 0 : swiperRef.activeIndex + 1;
    swiperRef.slideTo(nextIndex);
  };

  const handleProfilePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    profilePointerStartRef.current = { x: event.clientX, y: event.clientY };
  };

  const handleProfilePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!profilePointerStartRef.current) return;

    const deltaX = event.clientX - profilePointerStartRef.current.x;
    const deltaY = event.clientY - profilePointerStartRef.current.y;
    profilePointerStartRef.current = null;

    if (Math.hypot(deltaX, deltaY) < 8) {
      shiftProfilePhoto();
    }
  };

  const handleProfileKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;

    event.preventDefault();
    shiftProfilePhoto();
  };

  const translationsData = {
    de: {
      nav: { home: 'Startseite', skills: 'Kenntnisse', experience: 'Erfahrung', projects: 'Projekte', contact: 'Kontakt' },
      hero: { 
        open: 'Offen für neue Möglichkeiten', 
        hello: 'Xin chào, ich bin', 
        role_start: 'Eine', 
        role_end: ', die Kunst mit Logik verbindet. Ich gestalte intuitive digitale Erlebnisse mit Begeisterung und einem Blick fürs Detail.', 
        btn_projects: 'Projekte ansehen', 
        btn_resume: 'Lebenslauf',
        stats: { exp: 'Jahre Erfahrung', skills: 'Skills & Tools', langs: 'Sprachen' }
      },
      skills: { title: 'Meine Expertise', subtitle: 'Design & Entwicklung' },
      experience: { title: 'Mein Werdegang' },
      projects: { title: 'Ausgewählte Arbeiten', subtitle: 'Aktuelle Projekte' },
      contact: { title: 'Bereit, etwas Großartiges zu erschaffen?', text: 'Ich bin immer auf der Suche nach neuen Herausforderungen und Möglichkeiten.', footer: 'Erstellt mit' },
      roles: ["UI/UX-Designerin", "Mediengestalterin"]
    },
    en: {
      nav: { home: 'Home', skills: 'Knowledge', experience: 'Experience', projects: 'Projects', contact: 'Contact' },
      hero: { 
        open: 'Open for new opportunities', 
        hello: 'Xin chào, I am', 
        role_start: 'A', 
        role_end: ', blending art with logic. I craft intuitive digital experiences with enthusiasm and an eye for detail.', 
        btn_projects: 'View Projects', 
        btn_resume: 'Resume',
        stats: { exp: 'Years Exp.', skills: 'Skills & Tools', langs: 'Languages' }
      },
      skills: { title: 'My Expertise', subtitle: 'Design & Development' },
      experience: { title: 'My Journey' },
      projects: { title: 'Selected Work', subtitle: 'Recent Projects' },
      contact: { title: 'Ready to create something amazing?', text: 'I am always looking for new challenges and opportunities.', footer: 'Built with' },
      roles: ["UI/UX Designer", "Media Designer"]
    }
  };

  const t = translationsData[language];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const isBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50;
      if (isBottom) {
        setActiveSection('contact');
        return;
      }

      const sections = ['home', 'about', 'experience', 'projects', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 3;
        }
        return false;
      });
      
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const handleResumeClick = (e: React.MouseEvent) => {
    e.preventDefault(); 
    if (window.innerWidth < 768) {
        window.open(resumeUrl, '_blank');
    } else {
        setShowResume(!showResume);
    }
  };

  const navItems = [
    { id: 'home', label: t.nav.home, icon: <Home size={20} /> },
    { id: 'about', label: t.nav.skills, icon: <User size={20} /> },
    { id: 'experience', label: t.nav.experience, icon: <History size={20} /> },
    { id: 'projects', label: t.nav.projects, icon: <Folder size={20} /> },
    { id: 'contact', label: t.nav.contact, icon: <Mail size={20} /> },
  ];

  const experiences = [
    {
      company: "Boehringer Ingelheim",
      role: "Praktikantin - Gestaltung des QMS-Portals",
      period: "03.2026 - Heute",
      description: "Analyse und Neustrukturierung bestehender Intranetseiten im Qualitätsmanagement sowie Konzeption eines nutzerfreundlichen QMS-Portals.",
      tags: ["QMS-Portal", "Intranet", "Informationsarchitektur", "UX Design"],
      Logo: BILogo,
      logoClassName: "w-full max-w-[78px] max-h-9"
    },
    {
      company: "Volkswagen AG",
      role: "Praktikantin - Gestaltung einer internen Kommunikationsplattform",
      period: "09.2025 - 03.2026",
      description: "Unterstützung beim Aufbau der internen Kommunikationsplattform Entgelt-Wiki inklusive Nutzungsanalyse, Umfrage mit ca. 100 Personen und Veröffentlichung von Beiträgen.",
      tags: ["Entgelt-Wiki", "Nutzungsanalyse", "Umfrage", "Intranet"],
      Logo: VWLogo,
      logoClassName: "w-10 h-10 text-blue-900"
    },
    {
      company: "encoway GmbH",
      role: "Werkstudentin UX/UI Design",
      period: "02.2024 - 04.2025",
      description: "Analyse von Wettbewerber-Websites, Expert Reviews mit Handlungsempfehlungen, Wireframes, Prototypen und UX/UI-Kommunikationsmaterialien.",
      tags: ["Expert Reviews", "Wireframes", "Prototyping", "SharePoint"],
      Logo: EncowayLogo,
      logoClassName: "w-full max-w-[78px] max-h-9"
    },
    {
      company: "KUKA AG",
      role: "Praktikantin UX Design",
      period: "04.2022 - 06.2022",
      description: "Prototyping mit Axure 9 zur Optimierung eines Robotik-Handhelds sowie Recherche zu Tastaturen, UX-Patterns und Designkomponenten.",
      tags: ["Axure 9", "HMI Design", "UX Patterns", "Designkomponenten"],
      Logo: KukaLogo,
      logoClassName: "w-full max-w-[76px] max-h-9"
    }
  ];

  const mainProjects: Project[] = [
    {
      id: "boehringer",
      title: "Boehringer QMS Portal",
      category: "Intranet / UX Design",
      description: "Analyse und Neustrukturierung bestehender Intranetseiten im Qualitätsmanagement sowie Konzeption eines nutzerfreundlichen QMS-Portals.",
      metrics: ["QMS-Portal", "Intranet-Struktur", "UX-Konzept"],
      color: "bg-teal-50",
      Logo: BILogo
    },
    {
      id: "uni_group",
      title: "Uni-Projekte",
      category: "Academic Work",
      description: "Eine Sammlung von UI/UX-Projekten, die während des Studiums entwickelt wurden, darunter Apps und Plattformen.",
      metrics: ["ToDo App", "Campus Tausch"],
      color: "bg-indigo-50",
      Logo: UniLogo,
      isGroup: true
    },
    {
      id: "vw",
      title: "Volkswagen Entgelt-Wiki",
      category: "Product Design",
      description: "Aufbau und Gestaltung einer internen Kommunikationsplattform inklusive Analyse der alten Website und Nutzerumfrage.",
      metrics: ["Interne Kommunikation", "Nutzungsanalyse"],
      color: "bg-blue-50",
      Logo: VWLogo
    },
    {
      id: "kuka",
      title: "KUKA Smart Handheld",
      category: "HMI / Industrial UX",
      description: "Optimierung der Benutzeroberfläche für Roboter-Steuerungsgeräte mittels High-Fidelity Prototyping in Axure 9.",
      metrics: ["Axure 9", "Industrial Design", "Accessibility"],
      color: "bg-orange-50",
      Logo: KukaLogo
    },
    {
      id: "encoway",
      title: "Encoway UX/UI Audit",
      category: "Research & Analysis",
      description: "Wettbewerbsanalysen, Expert Reviews, Wireframes, Prototypen und UX/UI-Kommunikationsmaterialien für digitale Produkte.",
      metrics: ["Competitor Analysis", "Expert Reviews"],
      color: "bg-green-50",
      Logo: EncowayLogo
    }
  ];

  const uniProjects: Project[] = [
    {
      id: "todo",
      title: "ToDo App",
      description: "Eine Aufgabenverwaltungs-App für Web, iOS und Android. Fokus auf minimalistischem Design und Produktivität.",
      icon: <ListTodo size={32} className="text-emerald-600" />,
      color: "bg-emerald-50",
      pdfUrl: todoAppPdfUrl
    },
    {
      id: "campus",
      title: "Campus Tausch",
      description: "Eine Tausch-Plattform für Studierende der Uni Regensburg. Ermöglicht den Austausch von Dokumenten, Jobs und Wohnungen.",
      icon: <School size={32} className="text-amber-700" />,
      color: "bg-amber-50",
      pdfUrl: campusTauschPdfUrl
    }
  ];

  const skills = {
    design: ["UX/UI Design", "Interaction Design", "Wireframing", "User Research", "Usability Testing", "Prototyping", "User Journey Mapping", "CSS / HTML"],
    tools: ["Figma", "Adobe XD", "Adobe InDesign", "Adobe Illustrator", "Adobe Photoshop", "Sketch", "Miro", "Microsoft Office", "SharePoint", "Confluence"],
    languages: ["Deutsch (C1)", "Englisch (B2)", "Vietnamesisch (Muttersprache)"]
  };

  const getProjectById = (id: string) => {
      const all = [...mainProjects, ...uniProjects];
      return all.find(p => p.id === id);
  };

  const getProjectLogoClassName = (projectId: string) => {
    const logoClassNames: Record<string, string> = {
      boehringer: 'w-full max-w-[120px] max-h-14',
      uni_group: 'w-full max-w-[132px] max-h-16',
      vw: 'h-16 w-16 text-blue-900',
      kuka: 'w-full max-w-[130px] max-h-14',
      encoway: 'w-full max-w-[140px] max-h-14'
    };

    return `${logoClassNames[projectId] ?? 'w-full max-w-[120px] max-h-14'} opacity-90 mix-blend-multiply`;
  };
  
  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans selection:bg-rose-200 selection:text-rose-900">
      <FigmaCursor />
      
      {showResume && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-5xl h-[85vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden relative animate-in zoom-in-95 duration-300 border-4 border-white ring-4 ring-stone-200">
            <div className="flex justify-between items-center p-4 border-b bg-stone-50">
              <h3 className="font-bold text-stone-700 flex items-center gap-2">
                <FileText size={18} className="text-emerald-600"/> 
                Letztes Update: Mai 2026
              </h3>
              <div className="flex items-center gap-3">
                <a 
                  href={resumeUrl} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  <Download size={16} /> Download
                </a>
                <button onClick={() => setShowResume(false)} className="p-2 hover:bg-stone-200 rounded-full transition-colors">
                  <X size={20} className="text-stone-500" />
                </button>
              </div>
            </div>
            <div className="flex-1 bg-slate-100 overflow-hidden relative">
              <iframe src={resumeUrl} title="Resume PDF" className="w-full h-full border-none" allow="autoplay" />
            </div>
          </div>
        </div>
      )}

      {/* --- UNI PROJECTS GROUP SELECTION MODAL --- */}
      {showUniGroup && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-md animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl p-8 relative animate-in zoom-in-95 duration-300 border-4 border-white ring-4 ring-stone-200">
                <button 
                    onClick={() => setShowUniGroup(false)}
                    className="absolute top-4 right-4 p-2 hover:bg-stone-100 rounded-full transition-colors"
                >
                    <X size={24} className="text-stone-500" />
                </button>
                
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <GraduationCap size={32} className="text-indigo-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-stone-800">Uni-Projekte</h3>
                    <p className="text-stone-500 mt-2">Wähle ein Projekt aus meiner Studienzeit</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    {uniProjects.map((project) => (
                        <button 
                            key={project.id}
                            // FIXED: Mobile check for Uni Projects inside modal
                            onClick={() => {
                                if (window.innerWidth < 768 && project.pdfUrl) {
                                    window.open(project.pdfUrl, '_blank');
                                } else {
                                    setShowUniGroup(false);
                                    setActiveProject(project.id);
                                }
                            }}
                            className={`p-6 rounded-2xl border text-left transition-all hover:shadow-lg hover:-translate-y-1 group ${project.color} border-stone-100 hover:border-stone-200`}
                        >
                            <div className="mb-4 bg-white w-12 h-12 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                {project.icon}
                            </div>
                            <h4 className="font-bold text-lg text-stone-800 mb-2">{project.title}</h4>
                            <p className="text-sm text-stone-600 line-clamp-2">{project.description}</p>
                            <div className="mt-4 flex items-center text-sm font-medium text-blue-600 group-hover:gap-2 transition-all">
                                Ansehen <ChevronRight size={16} />
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
      )}

      {/* --- PDF PREVIEW MODAL --- */}
      {activeProject && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-5xl h-[85vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden relative animate-in zoom-in-95 duration-300 border-4 border-white ring-4 ring-stone-200">
            <div className="flex justify-between items-center p-4 border-b bg-stone-50">
              <h3 className="font-bold text-stone-700 flex items-center gap-2">
                <Folder size={18} className="text-emerald-600"/> 
                Projekt: {getProjectById(activeProject)?.title}
              </h3>
              <div className="flex items-center gap-3">
                <button onClick={() => setActiveProject(null)} className="p-2 hover:bg-stone-200 rounded-full transition-colors">
                  <X size={20} className="text-stone-500" />
                </button>
              </div>
            </div>
            <div className="flex-1 bg-slate-100 overflow-hidden relative">
              {getProjectById(activeProject)?.pdfUrl ? (
                  <iframe 
                    src={getProjectById(activeProject)?.pdfUrl} 
                    title="Project PDF"
                    className="w-full h-full border-none"
                    allow="autoplay"
                  />
              ) : (
                  <div className="flex items-center justify-center h-full text-stone-400">
                      Keine Vorschau verfügbar
                  </div>
              )}
            </div>
          </div>
        </div>
      )}

      <nav className={`fixed top-6 left-0 right-0 z-50 flex justify-center px-4 transition-all duration-500 ${scrolled ? 'transform -translate-y-2' : ''}`}>
        <div className="bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg shadow-stone-200/50 rounded-full px-2 py-2 flex items-center gap-1 md:gap-2 max-w-fit mx-auto">
          
          {/* LEFT: LinkedIn Button & Logo */}
          <div className="flex items-center md:mr-2">
              <a href="https://www.linkedin.com/in/myanh02/" target="_blank" rel="noopener noreferrer" className="p-2 md:mr-2 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors hover:scale-110 transform duration-200">
                <Linkedin size={18} />
              </a>

              <div className="hidden md:block px-2 font-bold text-emerald-700 cursor-pointer" onClick={() => scrollTo('home')}>
                <span>PMN.</span>
              </div>
          </div>
          
          {/* CENTER: Navigation Items */}
          <div className="hidden md:flex items-center gap-1 bg-stone-100/50 rounded-full p-1">
            {navItems.map((item) => (
              <button 
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeSection === item.id.toLowerCase() ? 'bg-white text-emerald-700 shadow-sm' : 'text-stone-500 hover:text-stone-900'}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* RIGHT: Language Toggle & Mobile Menu */}
          <div className="flex items-center gap-2 ml-2 pl-2 border-l border-stone-200">
            <button
                onClick={toggleLanguage}
                className="p-2 font-bold text-emerald-700 flex items-center gap-1 cursor-pointer bg-stone-100/50 hover:bg-stone-200 rounded-full transition-colors"
                aria-label={`Switch to ${language === 'de' ? 'English' : 'German'}`}
              >
                <Globe className="w-4 h-4 text-emerald-600" />
                <span className="text-xs">{language.toUpperCase()}</span>
            </button>

            <button className="md:hidden p-2.5 bg-stone-100 rounded-full" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
           <div className="absolute top-full mt-4 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl p-4 w-[90vw] flex flex-col gap-2 border border-stone-100 animate-in slide-in-from-top-5">
             {navItems.map((item) => (
               <button key={item.id} onClick={() => scrollTo(item.id)} className="py-3 px-4 text-left text-stone-600 font-medium hover:bg-emerald-50 hover:text-emerald-700 rounded-xl transition-colors">
                 {item.label}
               </button>
             ))}
           </div>
        )}
      </nav>

      <section id="home" className="relative pt-40 pb-8 px-6 overflow-hidden min-h-screen flex items-center">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-[10%] right-[5%] w-[500px] h-[500px] bg-rose-100/50 rounded-full blur-3xl opacity-60 mix-blend-multiply animate-pulse" style={{animationDuration: '8s'}}></div>
            <div className="absolute bottom-[10%] left-[10%] w-[400px] h-[400px] bg-emerald-100/50 rounded-full blur-3xl opacity-60 mix-blend-multiply animate-pulse" style={{animationDuration: '10s'}}></div>
            <div className="absolute top-[40%] left-[50%] w-[300px] h-[300px] bg-amber-100/50 rounded-full blur-3xl opacity-60 mix-blend-multiply animate-pulse" style={{animationDuration: '12s'}}></div>
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-24">
            
            <div className="flex-1 text-center lg:text-left space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-stone-200 rounded-full shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-bold tracking-wider text-stone-500 uppercase">{t.hero.open}</span>
              </div>

              <div className="space-y-4">
                <h2 className="text-3xl md:text-5xl font-serif text-stone-400 font-light italic animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-100">
                  {t.hero.hello}
                </h2>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-stone-800 tracking-tight animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                  Phan My <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Anh Nguyen</span>
                </h1>
              </div>

              <p className="text-lg md:text-xl text-stone-500 max-w-2xl mx-auto lg:mx-0 leading-relaxed animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
                {t.hero.role_start} <RoleTicker language={language} /> {t.hero.role_end}
              </p>

              <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
                <button onClick={() => scrollTo('projects')} className="group relative px-8 py-4 bg-stone-900 text-white rounded-full font-medium overflow-hidden shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-emerald-500 to-emerald-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative flex items-center gap-2">{t.hero.btn_projects} <ChevronRight size={18} /></span>
                </button>
                
                <button onClick={handleResumeClick} className="px-8 py-4 bg-white border border-stone-200 text-stone-700 rounded-full font-medium hover:border-rose-300 hover:text-rose-600 hover:bg-rose-50 transition-all flex items-center gap-2 shadow-sm hover:shadow-md">
                  {t.hero.btn_resume} <Eye size={18} />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-700 border-t border-stone-100 mt-8">
                  <div className="flex flex-col items-center sm:items-start space-y-1">
                      <div className="text-2xl md:text-3xl font-bold text-stone-800 flex items-center gap-2">
                          2+ <Briefcase size={18} className="text-emerald-500" />
                      </div>
                      <div className="text-xs md:text-sm text-stone-500 font-medium uppercase tracking-wide text-center sm:text-left">{t.hero.stats.exp}</div>
                  </div>
                  <div className="flex flex-col items-center sm:items-start space-y-1">
                      <div className="text-2xl md:text-3xl font-bold text-stone-800 flex items-center gap-2">
                          18+ <Code size={18} className="text-blue-500" />
                      </div>
                      <div className="text-xs md:text-sm text-stone-500 font-medium uppercase tracking-wide text-center sm:text-left">{t.hero.stats.skills}</div>
                  </div>
                  <div className="flex flex-col items-center sm:items-start space-y-1">
                      <div className="text-2xl md:text-3xl font-bold text-stone-800 flex items-center gap-2">
                          3 <Globe size={18} className="text-rose-500" />
                      </div>
                      <div className="text-xs md:text-sm text-stone-500 font-medium uppercase tracking-wide text-center sm:text-left">{t.hero.stats.langs}</div>
                  </div>
              </div>

            </div>

            <div className="flex-1 relative w-full max-w-md lg:max-w-lg animate-in fade-in zoom-in duration-1000 delay-300">
               <div className="flex flex-col items-center">
                  <div className="relative aspect-[3/4] w-full mx-auto group">
                      <div className="absolute top-[-20px] right-[-20px] w-24 h-24 bg-rose-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
                      <div className="absolute bottom-[-10px] left-[-10px] w-32 h-32 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-700"></div>
                      
                      <div className="absolute inset-0 bg-stone-200 rounded-[3rem] transform rotate-3"></div>
                      
                      <div
                        className="absolute inset-0 rounded-[3rem] overflow-hidden transform -rotate-2 transition-transform duration-500 hover:rotate-0 relative cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300"
                        role="button"
                        tabIndex={0}
                        aria-label="Show next profile photo"
                        onPointerDown={handleProfilePointerDown}
                        onPointerUp={handleProfilePointerUp}
                        onPointerCancel={() => {
                          profilePointerStartRef.current = null;
                        }}
                        onKeyDown={handleProfileKeyDown}
                      >
                        
                        <Swiper
                          effect={'cards'}
                          grabCursor={true}
                          modules={[EffectCards]}
                          onSwiper={setSwiperRef}
                          onSlideChange={(swiper) => setCurrentImageIndex(swiper.activeIndex)}
                          className="w-full h-full rounded-[2.8rem]"
                        >
                          {profileImages.map((img, idx) => (
                            <SwiperSlide key={idx} className="rounded-[2.8rem] overflow-hidden bg-white">
                                <div className="w-full aspect-[3/4] relative">
                                    <img 
                                      src={img} 
                                      alt={`Profile ${idx}`} 
                                      className="absolute inset-0 w-full h-full object-cover block" 
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/20 to-transparent mix-blend-overlay pointer-events-none"></div>
                                </div>
                            </SwiperSlide>
                          ))}
                        </Swiper>

                      </div>
                  </div>

                  <div className="flex justify-center gap-2 mt-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
                    {profileImages.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => swiperRef?.slideTo(idx)}
                        className={`h-2 rounded-full transition-all duration-300 hover:scale-110 ${
                          idx === currentImageIndex 
                            ? 'w-6 bg-emerald-500' 
                            : 'w-2 bg-stone-300 hover:bg-emerald-300'
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
               </div>
            </div>

          </div>
        </div>
      </section>

      <JourneyDivider />

      <section id="about" className="py-24 pt-8 relative">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-emerald-600 tracking-widest uppercase mb-3">{t.skills.title}</h2>
            <h3 className="text-4xl font-serif text-stone-800">{t.skills.subtitle}</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Palette className="text-rose-500" size={28} />
              </div>
              <h4 className="text-xl font-bold text-stone-800 mb-4">Design</h4>
              <div className="flex flex-wrap gap-2">
                {skills.design.map(skill => (
                  <span key={skill} className="px-3 py-1.5 bg-stone-50 text-stone-600 text-sm rounded-lg border border-stone-100">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Layout className="text-blue-500" size={28} />
              </div>
              <h4 className="text-xl font-bold text-stone-800 mb-4">Tools</h4>
              <div className="flex flex-wrap gap-2">
                {skills.tools.map(skill => (
                  <span key={skill} className="px-3 py-1.5 bg-stone-50 text-stone-600 text-sm rounded-lg border border-stone-100">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="text-emerald-500" size={28} />
              </div>
              <h4 className="text-xl font-bold text-stone-800 mb-4">Sprachen</h4>
              <div className="space-y-3">
                 {skills.languages.map((skill, i) => (
                   <div key={i} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                      <span className="text-stone-600 font-medium">{skill}</span>
                   </div>
                 ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="experience" className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex items-center gap-4 mb-16">
            <div className="h-px flex-1 bg-stone-200"></div>
            <h2 className="text-3xl font-serif text-stone-800">{t.experience.title}</h2>
            <div className="h-px flex-1 bg-stone-200"></div>
          </div>

          <div className="-mx-6 overflow-x-auto px-6 pb-5 snap-x snap-mandatory scroll-px-6">
            <div className="relative grid min-w-[1040px] grid-cols-4 gap-5 lg:min-w-0">
              <div className="pointer-events-none absolute left-12 right-12 top-10 h-0.5 bg-gradient-to-r from-transparent via-emerald-200 to-transparent"></div>
              {experiences.map((exp, index) => (
                <article key={exp.company} className="relative flex flex-col snap-center">
                  <div className="relative z-10 mx-auto mb-7 flex h-20 w-36 items-center justify-center rounded-2xl border border-stone-200 bg-white p-3 shadow-lg shadow-stone-200/70 ring-8 ring-white transition-transform duration-300 hover:-translate-y-1">
                    <exp.Logo className={exp.logoClassName} />
                  </div>

                  <div className={`relative min-h-[300px] rounded-2xl border border-stone-100 bg-stone-50 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${index % 2 === 1 ? 'mt-8' : ''}`}>
                    <div className="mb-4 flex items-start justify-between gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-xs font-bold text-emerald-700 shadow-sm ring-1 ring-stone-100">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-stone-500 shadow-sm ring-1 ring-stone-100">
                        {exp.period}
                      </span>
                    </div>

                    <h4 className="text-lg font-bold text-stone-800">{exp.company}</h4>
                    <div className="mb-3 mt-1 text-sm font-medium text-emerald-600">{exp.role}</div>
                    <p className="mb-5 text-sm leading-relaxed text-stone-600">{exp.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.tags.map(tag => (
                        <span key={tag} className="rounded border border-stone-200 bg-white px-2 py-1 text-xs text-stone-500">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="py-24 bg-stone-50">
        <div className="container mx-auto px-6 max-w-6xl">
           <div className="flex justify-between items-end mb-12">
             <div>
               <h2 className="text-sm font-bold text-emerald-600 tracking-widest uppercase mb-3">{t.projects.title}</h2>
               <h3 className="text-4xl font-serif text-stone-800">{t.projects.subtitle}</h3>
             </div>
             <div className="hidden md:block">
                <Sparkles className="text-emerald-300 w-12 h-12" />
             </div>
           </div>

           <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {mainProjects.map((project) => (
                <div 
                  key={project.id} 
                  onClick={() => {
                      if (project.isGroup) {
                          setShowUniGroup(true);
                      } else if (project.pdfUrl) {
                          if (window.innerWidth < 768) {
                             window.open(project.pdfUrl, '_blank');
                          } else {
                             setActiveProject(project.id);
                          }
                      }
                  }}
                  className={`group relative min-h-[190px] overflow-hidden rounded-3xl border border-white/80 ${project.color} p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer`}
                >
                  <div className="pointer-events-none absolute inset-x-4 top-4 h-24 rounded-full bg-white/45 blur-2xl transition-opacity duration-300 group-hover:opacity-80"></div>

                  <div className="relative flex h-24 items-center justify-center rounded-2xl border border-white/80 bg-white/75 p-4 shadow-sm">
                    {project.Logo ? (
                      <project.Logo className={getProjectLogoClassName(project.id)} />
                    ) : project.icon ? (
                      <div className="flex h-full w-full items-center justify-center opacity-90">
                        {project.icon}
                      </div>
                    ) : null}
                  </div>

                  <h4 className="relative mt-5 text-center text-base font-bold leading-snug text-stone-800 transition-colors duration-300 group-hover:text-emerald-700">
                    {project.title}
                  </h4>
                </div>
              ))}
           </div>
        </div>
      </section>

      <section id="contact" className="py-24 bg-stone-900 text-stone-300 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
           <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500 rounded-full blur-3xl"></div>
           <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-rose-500 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-8">{t.contact.title}</h2>
          <p className="text-lg text-stone-400 mb-12 max-w-2xl mx-auto">
            {t.contact.text}
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mb-16">
            <a href="tel:+491624562672" className="flex flex-col items-center justify-center p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors group">
              <Phone className="text-emerald-400 mb-3 group-hover:scale-110 transition-transform" size={24} />
              <span className="text-xs md:text-sm font-medium text-white whitespace-nowrap">+49 162 4562672</span>
            </a>
            <a href="mailto:nguyenphanmyanh@gmail.com" className="flex flex-col items-center justify-center p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors group">
              <Mail className="text-emerald-400 mb-3 group-hover:scale-110 transition-transform" size={24} />
              <span className="text-xs md:text-sm font-medium text-white">nguyenphanmyanh@gmail.com</span>
            </a>
            <a href="https://www.linkedin.com/in/myanh02/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors group">
              <Linkedin className="text-blue-400 mb-3 group-hover:scale-110 transition-transform" size={24} />
              <span className="text-xs md:text-sm font-medium text-white">@myanh02</span>
            </a>
            <div className="flex flex-col items-center justify-center p-6 bg-white/5 border border-white/10 rounded-2xl group">
              <MapPin className="text-rose-400 mb-3 group-hover:scale-110 transition-transform" size={24} />
              <span className="text-xs md:text-sm font-medium text-white">Frankfurt, DE</span>
            </div>
          </div>

          <div className="text-sm text-stone-600 border-t border-white/10 pt-8">
            <p>© 2026 Phan My Anh Nguyen. {t.contact.footer} <Heart size={12} className="inline text-rose-500 mx-1 fill-rose-500" /> und Code.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
