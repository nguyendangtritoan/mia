import React, { useState, useEffect } from 'react';
import { Menu, X, Mail, MapPin, Download, Palette, Layout, Users, Briefcase, ChevronRight, FileText, User, Home, Folder, History, Linkedin, Eye, Sparkles, Heart, Globe, Code, CheckCircle, ListTodo, GraduationCap, School } from 'lucide-react';

// --- SWIPER IMPORTS ---
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';

// Import Swiper styles
// @ts-ignore
import 'swiper/css';
// @ts-ignore
import 'swiper/css/effect-cards';

// --- LOGO IMPORTS ---
import EncowayLogo from './EncowayLogo';
import KukaLogo from './KukaLogo';
import VWLogo from './VWLogo';
import UniLogo from './UniLogo'; // <--- IMPORTED NEW LOGO

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

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [showResume, setShowResume] = useState(false);
  
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [showUniGroup, setShowUniGroup] = useState(false);

  const [language, setLanguage] = useState<'de' | 'en'>('de');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [swiperRef, setSwiperRef] = useState<any>(null);

  const resumeUrl = "https://drive.google.com/file/d/1D4BLzlOJM1oRUHO99a-lU9fZ8Fn-37CU/preview";
  
  // *** IMPORTANT: REPLACE THESE LINKS WITH YOUR ACTUAL PDF LINKS ***
  const todoAppPdfUrl = "https://drive.google.com/file/d/1D4BLzlOJM1oRUHO99a-lU9fZ8Fn-37CU/preview"; 
  const campusTauschPdfUrl = "https://drive.google.com/file/d/1D4BLzlOJM1oRUHO99a-lU9fZ8Fn-37CU/preview"; 

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
      
      // Scroll logic
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
      company: "Volkswagen",
      role: "Praktikum Kommunikationsplattform",
      period: "09.2025 - Heute",
      description: "Entwicklung und Umsetzung einer internen Kommunikationsplattform. Fokus auf Prozessdigitalisierung.",
      tags: ["Interne Kommunikation", "Prozessgestaltung", "Digitalisierung"],
      icon: <Briefcase size={18} className="text-white" />,
      bg: "bg-blue-600"
    },
    {
      company: "encoway GmbH",
      role: "Werkstudentin UX/UI Design",
      period: "02.2024 - 04.2025",
      description: "Durchführung von Expert Reviews und Competitor Analysis. Erstellung von Wireframes und Prototypen.",
      tags: ["Expert Reviews", "Prototyping", "SharePoint", "Visual Design"],
      icon: <Palette size={18} className="text-white" />,
      bg: "bg-emerald-500"
    },
    {
      company: "Siemens AG",
      role: "Werkstudentin UX/UI Design",
      period: "08.2022 - 02.2023",
      description: "Unterstützung bei der Pflege und Optimierung von Archivierungsprozessen. Verwaltung von Dokumenten im SAP-System.",
      tags: ["Prozessoptimierung", "SAP", "Organisation"],
      icon: <Briefcase size={18} className="text-white" />,
      bg: "bg-cyan-600"
    },
    {
      company: "KUKA AG",
      role: "Praktikantin im UX Bereich",
      period: "04.2022 - 06.2022",
      description: "Prototyping mit Axure 9 für Robotereinsatz-Handhelds. Recherche zu internationalen Tastaturlayouts.",
      tags: ["Axure 9", "HMI Design", "User Research", "UX Patterns"],
      icon: <Layout size={18} className="text-white" />,
      bg: "bg-orange-500"
    }
  ];

  // --- PROJECT DATA ---
  
  const mainProjects: Project[] = [
    {
      id: "uni_group",
      title: "Uni-Projekte",
      category: "Academic Work",
      description: "Eine Sammlung von UI/UX-Projekten, die während des Studiums entwickelt wurden, darunter Apps und Plattformen.",
      metrics: ["ToDo App", "Campus Tausch"],
      color: "bg-indigo-50",
      Logo: UniLogo, // FIXED: Using the new UniLogo component here
      isGroup: true
    },
    {
      id: "vw",
      title: "Volkswagen Internal Hub",
      category: "Product Design",
      description: "Konzeption und Umsetzung einer zentralen Plattform zur Informationsverteilung für Mitarbeitende.",
      metrics: ["Zentrale Info-Verteilung", "Feedback-Integration"],
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
      title: "Encoway UX Audit",
      category: "Research & Analysis",
      description: "Umfassende Analyse von Wettbewerber-Websites und Expert Reviews der eigenen Produkte zur Identifikation von UX-Schwachstellen.",
      metrics: ["Competitor Analysis", "Heuristic Eval"],
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
    design: ["UX/UI Design", "Interaction Design", "Wireframing", "User Research", "Usability Testing", "Prototyping", "User Journey Mapping"],
    tools: ["Figma", "Adobe XD", "Adobe InDesign", "Illustrator", "Photoshop", "Sketch", "Miro", "Axure 9"],
    languages: ["Deutsch (C1)", "Englisch (B2)", "Vietnamesisch (Muttersprache)"]
  };

  const getProjectById = (id: string) => {
      const all = [...mainProjects, ...uniProjects];
      return all.find(p => p.id === id);
  };
  
  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans selection:bg-rose-200 selection:text-rose-900">
      
      {/* --- RESUME MODAL --- */}
      {showResume && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-5xl h-[85vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden relative animate-in zoom-in-95 duration-300 border-4 border-white ring-4 ring-stone-200">
            <div className="flex justify-between items-center p-4 border-b bg-stone-50">
              <h3 className="font-bold text-stone-700 flex items-center gap-2">
                <FileText size={18} className="text-emerald-600"/> 
                Letztes Update: 2025
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
                            onClick={() => {
                                setShowUniGroup(false);
                                setActiveProject(project.id);
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

      <section id="home" className="relative pt-40 pb-20 px-6 overflow-hidden min-h-screen flex items-center">
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

              {/* FIXED: STATS GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-700 border-t border-stone-100 mt-8">
                  <div className="flex flex-col items-center sm:items-start space-y-1">
                      <div className="text-2xl md:text-3xl font-bold text-stone-800 flex items-center gap-2">
                          2+ <Briefcase size={18} className="text-emerald-500" />
                      </div>
                      <div className="text-xs md:text-sm text-stone-500 font-medium uppercase tracking-wide text-center sm:text-left">{t.hero.stats.exp}</div>
                  </div>
                  <div className="flex flex-col items-center sm:items-start space-y-1">
                      <div className="text-2xl md:text-3xl font-bold text-stone-800 flex items-center gap-2">
                          15+ <Code size={18} className="text-blue-500" />
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
                      
                      <div className="absolute inset-0 rounded-[3rem] overflow-hidden transform -rotate-2 transition-transform duration-500 hover:rotate-0 relative">
                        
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

      <section id="about" className="py-24 relative">
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

      <section id="experience" className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="flex items-center gap-4 mb-16">
            <div className="h-px flex-1 bg-stone-200"></div>
            <h2 className="text-3xl font-serif text-stone-800">{t.experience.title}</h2>
            <div className="h-px flex-1 bg-stone-200"></div>
          </div>

          <div className="relative space-y-12 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-stone-200 before:to-transparent">
            {experiences.map((exp, index) => (
              <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-white shadow-lg shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 ${exp.bg}`}>
                  {exp.icon}
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-stone-50 p-6 rounded-2xl border border-stone-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 relative">
                  <div className="absolute top-4 -left-2 w-4 h-4 bg-stone-50 rotate-45 border-l border-b border-stone-100 md:hidden"></div>
                  <div className="hidden md:block absolute top-3 w-4 h-4 bg-stone-50 rotate-45 border-t border-l border-stone-100 group-odd:-right-2 group-odd:rotate-[135deg] group-even:-left-2 group-even:-rotate-45"></div>

                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-2">
                    <h4 className="font-bold text-stone-800">{exp.company}</h4>
                    <span className="text-xs font-bold px-2 py-1 bg-white rounded-md text-stone-500 shadow-sm border border-stone-100">{exp.period}</span>
                  </div>
                  <div className="text-emerald-600 font-medium text-sm mb-3">{exp.role}</div>
                  <p className="text-stone-600 text-sm leading-relaxed mb-4">{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map(tag => (
                      <span key={tag} className="text-xs text-stone-500 bg-white px-2 py-1 rounded border border-stone-200">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
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

           <div className="grid md:grid-cols-3 gap-8">
              {mainProjects.map((project, index) => (
                <div 
                  key={index} 
                  onClick={() => {
                      if (project.isGroup) {
                          setShowUniGroup(true);
                      } else if (project.pdfUrl) {
                          setActiveProject(project.id);
                      }
                  }}
                  className={`group relative bg-white rounded-3xl overflow-hidden border hover:shadow-2xl transition-all duration-500 flex flex-col ${project.color} cursor-pointer`}
                >
                  <div className="relative h-64 overflow-hidden flex items-center justify-center p-10">
                    <div className="w-full h-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-700 ease-out">
                       {project.Logo && <project.Logo className="w-full h-full max-w-[180px] opacity-80 mix-blend-multiply" />}
                    </div>
                  </div>

                  <div className="p-8 flex-1 flex flex-col bg-white relative z-20">
                    <div className="text-xs font-bold text-emerald-600 mb-2 uppercase tracking-wider">{project.category}</div>
                    <h4 className="text-2xl font-bold text-stone-800 mb-3 group-hover:text-emerald-700 transition-colors flex items-center justify-between">
                        {project.title}
                        {project.isGroup 
                            ? <Folder size={20} className="opacity-0 group-hover:opacity-100 transition-opacity text-indigo-500" />
                            : <Eye size={20} className="opacity-0 group-hover:opacity-100 transition-opacity text-emerald-500" />
                        }
                    </h4>
                    <p className="text-stone-500 text-sm leading-relaxed mb-6 line-clamp-3">
                      {project.description}
                    </p>
                    
                    <div className="mt-auto pt-6 border-t border-stone-100 flex flex-wrap gap-2">
                      {project.metrics?.map((m, i) => (
                        <span key={i} className="text-xs font-medium text-stone-500 bg-stone-50 px-3 py-1 rounded-full">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
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

          <div className="grid sm:grid-cols-3 gap-4 max-w-5xl mx-auto mb-16">
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
            <p>© 2025 Phan My Anh Nguyen. {t.contact.footer} <Heart size={12} className="inline text-rose-500 mx-1 fill-rose-500" /> und Code.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;