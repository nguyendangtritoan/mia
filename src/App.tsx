import React, { useState, useEffect } from 'react';
import { Menu, X, Mail, Phone, MapPin, Download, Palette, Layout, Users, Code, Briefcase, GraduationCap, ChevronRight, FileText, User, Home, Folder, History } from 'lucide-react';
import EncowayLogo from './EncowayLogo';
import KukaLogo from './KukaLogo';
import VWLogo from './VWLogo';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = ['home', 'about', 'experience', 'projects', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= window.innerHeight / 3 && rect.bottom >= window.innerHeight / 3;
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

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: <Home size={20} /> },
    { id: 'about', label: 'About', icon: <User size={20} /> },
    { id: 'experience', label: 'Experience', icon: <History size={20} /> },
    { id: 'projects', label: 'Work', icon: <Folder size={20} /> },
    { id: 'contact', label: 'Contact', icon: <Mail size={20} /> },
  ];

  const experiences = [
    {
      company: "Volkswagen",
      role: "Praktikum Kommunikationsplattform",
      period: "09.2025 - Heute",
      description: "Entwicklung und Umsetzung einer internen Kommunikationsplattform. Fokus auf Prozessdigitalisierung, Feedback-Auswertung und Optimierung der internen Kommunikationsstruktur.",
      tags: ["Interne Kommunikation", "Prozessgestaltung", "Digitalisierung"]
    },
    {
      company: "encoway GmbH",
      role: "Werkstudentin UX/UI Design",
      period: "02.2024 - 04.2025",
      description: "Durchführung von Expert Reviews und Competitor Analysis. Erstellung von Wireframes, Prototypen und UX/UI-Kommunikationsmaterialien. Gestaltung einer SharePoint-Seite für das UX-Team.",
      tags: ["Expert Reviews", "Prototyping", "SharePoint", "Visual Design"]
    },
    {
      company: "Siemens AG",
      role: "Werkstudentin UX/UI Design",
      period: "08.2022 - 02.2023",
      description: "Unterstützung bei der Pflege und Optimierung von Archivierungsprozessen. Verwaltung und Digitalisierung von Dokumenten im SAP-System.",
      tags: ["Prozessoptimierung", "SAP", "Organisation"]
    },
    {
      company: "KUKA AG",
      role: "Praktikantin im UX Bereich",
      period: "04.2022 - 06.2022",
      description: "Prototyping mit Axure 9 für Robotereinsatz-Handhelds. Recherche zu internationalen Tastaturlayouts und Entwicklung von UX-Patterns.",
      tags: ["Axure 9", "HMI Design", "User Research", "UX Patterns"]
    }
  ];

  const projects = [
    {
      title: "Volkswagen Internal Hub",
      category: "Product Design",
      description: "Konzeption und Umsetzung einer zentralen Plattform zur Informationsverteilung für Mitarbeitende.",
      metrics: ["Zentrale Info-Verteilung", "Feedback-Integration"],
      color: "bg-blue-50"
    },
    {
      title: "KUKA Smart Handheld",
      category: "HMI / Industrial UX",
      description: "Optimierung der Benutzeroberfläche für Roboter-Steuerungsgeräte mittels High-Fidelity Prototyping in Axure 9.",
      metrics: ["Axure 9", "Industrial Design", "Accessibility"],
      color: "bg-orange-50"
    },
    {
      title: "Encoway UX Audit",
      category: "Research & Analysis",
      description: "Umfassende Analyse von Wettbewerber-Websites und Expert Reviews der eigenen Produkte zur Identifikation von UX-Schwachstellen.",
      metrics: ["Competitor Analysis", "Heuristic Eval"],
      color: "bg-green-50"
    }
  ];

  const skills = {
    design: ["UX/UI Design", "Interaction Design", "Wireframing", "User Research", "Usability Testing", "Prototyping", "User Journey Mapping"],
    tools: ["Figma", "Adobe XD", "Adobe InDesign", "Illustrator", "Photoshop", "Sketch", "Miro", "Axure 9"],
    languages: ["Deutsch (C1)", "Englisch (B2)", "Vietnamesisch (Muttersprache)"]
  };
  
  const resumeUrl = "Phan My Anh Nguyen_Lebenslauf.pdf"; 

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-blue-200 selection:text-blue-900">
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'py-4' : 'py-6'}`}>
        <div className="container mx-auto px-6 flex justify-center items-center relative">
          
          {/* Logo (Left Side) */}
          <div className="absolute left-6 md:left-12 top-1/2 transform -translate-y-1/2 cursor-pointer" onClick={() => scrollTo('home')}>
             <span className="text-2xl font-bold tracking-tighter text-slate-900">PMN<span className="text-blue-600">.</span></span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex bg-slate-900 rounded-full p-1.5 shadow-2xl border border-slate-800 gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button 
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`
                    group flex items-center rounded-full p-2.5 transition-all duration-300 ease-in-out
                    ${isActive ? 'bg-white text-slate-900' : 'text-slate-400 hover:text-slate-900 hover:bg-white'}
                  `}
                >
                  <span className="relative z-10">
                    {item.icon}
                  </span>
                  <span className={`
                    overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out font-medium text-sm
                    ${isActive ? 'max-w-[100px] opacity-100 ml-2' : 'max-w-0 opacity-0 group-hover:max-w-[100px] group-hover:opacity-100 group-hover:ml-2'}
                  `}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
          
          {/* CV Download Button */}
          <a
            href={resumeUrl}
            download="Phan_My_Anh_Nguyen_CV.pdf"
            className="absolute right-6 md:right-12 top-1/2 transform -translate-y-1/2 hidden md:flex items-center px-5 py-2.5 bg-white rounded-full shadow-lg border border-slate-100 text-sm font-medium text-slate-700 hover:shadow-xl hover:text-blue-600 hover:border-blue-100 transition-all active:scale-95"
          >
            <FileText size={16} className="mr-2" />
            Resume
          </a>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden absolute right-6 top-1/2 transform -translate-y-1/2 p-3 bg-white rounded-full shadow-lg border" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} className="text-slate-800" /> : <Menu size={24} className="text-slate-800" />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-lg py-4 md:hidden flex flex-col items-center space-y-4 border-t animate-in slide-in-from-top-5">
            {navItems.map((item) => (
              <button 
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-slate-600 font-medium py-2 hover:text-blue-600 flex items-center gap-2"
              >
                {item.icon} {item.label}
              </button>
            ))}
            <a 
              href={resumeUrl}
              download="Phan_My_Anh_Nguyen_CV.pdf"
              className="px-4 py-2 bg-blue-600 text-white rounded-full font-medium flex items-center gap-2 hover:bg-blue-700 transition-colors"
            >
              <Download size={16} /> CV Herunterladen
            </a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-72 h-72 bg-purple-100 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

        <div className="container mx-auto max-w-5xl">
          <div className="space-y-6">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold tracking-wide mb-4 animate-fade-in">
              PORTFOLIO 2025
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 tracking-tight leading-tight">
              Hi, ich bin <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Phan My Anh Nguyen
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 max-w-2xl leading-relaxed">
              UI/UX Designerin mit Fokus auf nutzerzentrierte Lösungen, sauberes Design und effiziente Prozesse.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-8">
              <button 
                onClick={() => scrollTo('projects')}
                className="px-8 py-4 bg-slate-900 text-white rounded-full font-medium hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                Meine Arbeiten ansehen <ChevronRight size={18} />
              </button>
              <a 
                href={resumeUrl}
                download="Phan_My_Anh_Nguyen_CV.pdf"
                className="px-8 py-4 bg-white border border-slate-200 text-slate-700 rounded-full font-medium hover:border-slate-400 transition-all flex items-center gap-2"
              >
                CV Herunterladen <Download size={18} />
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 border-t pt-10 border-slate-200">
            <div>
              <div className="text-3xl font-bold text-slate-900">3+</div>
              <div className="text-sm text-slate-500 mt-1">Jahre Erfahrung</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-900">10+</div>
              <div className="text-sm text-slate-500 mt-1">Tools gemeistert</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-900">B.A.</div>
              <div className="text-sm text-slate-500 mt-1">Medieninformatik</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-900">3</div>
              <div className="text-sm text-slate-500 mt-1">Sprachen</div>
            </div>
          </div>
        </div>
      </section>

      {/* About & Skills Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-sm font-bold text-blue-600 tracking-wider uppercase mb-2">Über Mich</h2>
              <h3 className="text-3xl font-bold text-slate-900 mb-6">Design meets Logic</h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                Mit einem Hintergrund in Medieninformatik und Wirtschaftswissenschaften verbinde ich kreatives Design mit technischem Verständnis. Ich liebe es, komplexe Probleme in intuitive Interfaces zu verwandeln.
              </p>
              <p className="text-slate-600 leading-relaxed mb-8">
                Meine Leidenschaft erstreckt sich über das Erstellen von Wireframes und Prototypen bis hin zur Content-Erstellung für soziale Medien. Wenn ich nicht designe, fotografiere ich gerne oder erstelle Videos.
              </p>
              
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <GraduationCap size={20} className="text-blue-600"/> Ausbildung
                </h4>
                <div>
                  <div className="font-medium text-slate-900">Bachelor of Arts, Medieninformatik</div>
                  <div className="text-sm text-slate-500">Universität Regensburg | GPA: 2.0</div>
                  <div className="text-sm text-slate-400 mt-1">Nebenfächer: Volkswirtschaftslehre, Medienwissenschaft</div>
                </div>
              </div>
              
              <div className="mt-8">
                <div className="w-24 h-24 rounded-full bg-blue-100 border-4 border-white shadow-lg flex items-center justify-center">
                  <User size={48} className="text-blue-500" />
                </div>
                <p className="text-sm text-slate-500 mt-2">Phan My Anh Nguyen</p>
              </div>
            </div>

            <div>
              <h2 className="text-sm font-bold text-blue-600 tracking-wider uppercase mb-6">Tech Stack & Skills</h2>
              
              <div className="space-y-8">
                <div>
                  <h4 className="font-medium text-slate-900 mb-3 flex items-center gap-2">
                    <Palette size={18} /> Design
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.design.map(skill => (
                      <span key={skill} className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-sm text-slate-600">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-slate-900 mb-3 flex items-center gap-2">
                    <Layout size={18} /> Tools
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.tools.map(skill => (
                      <span key={skill} className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-sm text-slate-600">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-slate-900 mb-3 flex items-center gap-2">
                    <Users size={18} /> Sprachen
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.languages.map(skill => (
                      <span key={skill} className="px-3 py-1 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-lg text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-slate-50">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-blue-600 tracking-wider uppercase mb-2">Werdegang</h2>
            <h3 className="text-3xl font-bold text-slate-900">Berufserfahrung</h3>
          </div>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
                <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 gap-2">
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{exp.role}</h4>
                    <p className="text-slate-600 font-medium">{exp.company}</p>
                  </div>
                  <span className="px-4 py-1 bg-slate-100 text-slate-600 rounded-full text-sm font-medium whitespace-nowrap self-start md:self-auto">
                    {exp.period}
                  </span>
                </div>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  {exp.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {exp.tags.map(tag => (
                    <span key={tag} className="text-xs font-medium text-slate-500 px-2 py-1 bg-slate-50 rounded border border-slate-100">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects / Selected Work */}
      <section id="projects" className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-sm font-bold text-blue-600 tracking-wider uppercase mb-2">Portfolio</h2>
              <h3 className="text-3xl font-bold text-slate-900">Ausgewählte Projekte</h3>
            </div>
            <p className="text-slate-500 max-w-md text-right hidden md:block">
              Ein Einblick in meine Arbeit als UX/UI Designerin bei verschiedenen Unternehmen.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="group relative bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                <div className={`h-48 w-full ${project.color} flex items-center justify-center overflow-hidden relative`}>
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#475569_1px,transparent_1px)] [background-size:16px_16px]"></div>
                  
                  {/* Logo Switching Logic */}
                  {project.title === "Volkswagen Internal Hub" && (
                    <VWLogo className="w-32 h-32 transform group-hover:scale-110 transition-transform duration-500 opacity-80 mix-blend-multiply" />
                  )}
                  {project.title === "KUKA Smart Handheld" && (
                    <KukaLogo className="w-40 h-auto transform group-hover:scale-110 transition-transform duration-500 opacity-80 mix-blend-multiply" />
                  )}
                  {project.title === "Encoway UX Audit" && (
                    <EncowayLogo className="w-32 h-32 transform group-hover:scale-110 transition-transform duration-500 opacity-50 mix-blend-multiply" />
                  )}
                </div>

                <div className="p-8 flex-1 flex flex-col">
                  <div className="text-xs font-bold text-blue-600 mb-2 uppercase tracking-wide">{project.category}</div>
                  <h4 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">{project.title}</h4>
                  <p className="text-slate-600 mb-6 text-sm leading-relaxed flex-1">
                    {project.description}
                  </p>
                  
                  <div className="border-t border-slate-200 pt-4 mt-auto">
                    <div className="flex flex-wrap gap-2">
                      {project.metrics.map((m, i) => (
                        <span key={i} className="text-xs text-slate-500 bg-white px-2 py-1 rounded border border-slate-100">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-sm font-bold text-blue-400 tracking-wider uppercase mb-2">Kontakt</h2>
          <h3 className="text-4xl font-bold mb-8">Lass uns zusammenarbeiten</h3>
          <p className="text-slate-400 mb-12 max-w-2xl mx-auto">
            Ich bin immer offen für neue Herausforderungen und spannende Projekte im Bereich UX/UI Design.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <a href="mailto:nguyenphanmyanh@gmail.com" className="bg-slate-800 p-6 rounded-xl hover:bg-slate-700 transition-colors group">
              <Mail className="mx-auto mb-4 text-blue-400 group-hover:scale-110 transition-transform" size={32} />
              <div className="font-medium text-slate-200">Email</div>
              <div className="text-sm text-slate-500 mt-1">nguyenphanmyanh@gmail.com</div>
            </a>
            <div className="bg-slate-800 p-6 rounded-xl hover:bg-slate-700 transition-colors group">
              <Phone className="mx-auto mb-4 text-blue-400 group-hover:scale-110 transition-transform" size={32} />
              <div className="font-medium text-slate-200">Telefon</div>
              <div className="text-sm text-slate-500 mt-1">+49 1624562672</div>
            </div>
            <div className="bg-slate-800 p-6 rounded-xl hover:bg-slate-700 transition-colors group">
              <MapPin className="mx-auto mb-4 text-blue-400 group-hover:scale-110 transition-transform" size={32} />
              <div className="font-medium text-slate-200">Standort</div>
              <div className="text-sm text-slate-500 mt-1">Frankfurt am Main</div>
            </div>
          </div>

          <footer className="text-slate-600 text-sm pt-8 border-t border-slate-800">
            <p>© 2025 Phan My Anh Nguyen. Alle Rechte vorbehalten.</p>
          </footer>
        </div>
      </section>
    </div>
  );
};

export default App;