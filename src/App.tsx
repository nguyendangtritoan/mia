import React, { useState, useEffect } from 'react';
import { Menu, X, Mail, MapPin, Download, Palette, Layout, Users, Briefcase, ChevronRight, ChevronLeft, FileText, User, Home, Folder, History, Linkedin, Eye, Sparkles, Heart, Globe } from 'lucide-react';

// --- TRANSLATIONS DATA ---
const translationsData = {
  de: {
    nav: { 
      home: 'Startseite', 
      skills: 'Kenntnisse', 
      experience: 'Erfahrung', 
      projects: 'Projekte', 
      contact: 'Kontakt' 
    },
    hero: { 
      open: 'Offen für neue Möglichkeiten', 
      hello: 'Xin chào, ich bin', 
      role_start: 'Eine', 
      role_end: ', die Kunst mit Logik verbindet. Ich gestalte intuitive digitale Erlebnisse mit Begeisterung und einem Blick fürs Detail.', 
      btn_projects: 'Projekte ansehen', 
      btn_resume: 'Lebenslauf' 
    },
    skills: { 
      title: 'Meine Expertise', 
      subtitle: 'Design & Entwicklung' 
    },
    experience: { 
      title: 'Mein Werdegang' 
    },
    projects: { 
      title: 'Ausgewählte Arbeiten', 
      subtitle: 'Aktuelle Projekte' 
    },
    contact: { 
      title: 'Bereit, etwas Großartiges zu erschaffen?', 
      text: 'Ich bin immer auf der Suche nach neuen Herausforderungen und Möglichkeiten, meine Leidenschaft für Design und Präzision einzubringen.', 
      footer: 'Erstellt mit' 
    },
    roles: ["UI/UX-Designerin", "Mediengestalterin"]
  },
  en: {
    nav: { 
      home: 'Home', 
      skills: 'Knowledge', 
      experience: 'Experience', 
      projects: 'Projects', 
      contact: 'Contact' 
    },
    hero: { 
      open: 'Open for new opportunities', 
      hello: 'Xin chào, I am', 
      role_start: 'A', 
      role_end: ', blending art with logic. I craft intuitive digital experiences with enthusiasm and an eye for detail.', 
      btn_projects: 'View Projects', 
      btn_resume: 'Resume' 
    },
    skills: { 
      title: 'My Expertise', 
      subtitle: 'Design & Development' 
    },
    experience: { 
      title: 'My Journey' 
    },
    projects: { 
      title: 'Selected Work', 
      subtitle: 'Recent Projects' 
    },
    contact: { 
      title: 'Ready to create something amazing?', 
      text: 'I am always looking for new challenges and opportunities to bring my passion for design and precision.', 
      footer: 'Built with' 
    },
    roles: ["UI/UX Designer", "Media Designer"]
  }
};

// --- INLINE LOGO COMPONENTS ---

const EncowayLogo = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 153.32" className={className} aria-label="Encoway Logo">
    <style>{`.cls-1{fill:#0077c8;}`}</style>
    <path className="cls-1" d="M372.76,30H394.5a8.73,8.73,0,0,1,7.79-7.79V.49A30.43,30.43,0,0,0,372.76,30Z" transform="translate(-0.31 -0.48)"></path>
    <line className="cls-1" x1="402.38" y1="22.11" x2="402.38" y2="22.11"></line>
    <path className="cls-1" d="M424.75,9.39A30.22,30.22,0,0,0,404.12.49V22.23a8.77,8.77,0,0,1,7.78,7.69h21.74A30.24,30.24,0,0,0,424.75,9.39Z" transform="translate(-0.31 -0.48)"></path>
    <path className="cls-1" d="M402.29,61.33V39.6a30.4,30.4,0,0,0-29.52,29.49H394.5A8.77,8.77,0,0,1,402.29,61.33Z" transform="translate(-0.31 -0.48)"></path>
    <rect className="cls-1" x="403.81" y="39.1" width="6.02" height="21.7"></rect>
    <polygon className="cls-1" points="411.65 62.22 411.65 68.61 433.34 68.61 433.34 31.36 411.65 31.36 411.65 37.68 411.65 62.22"></polygon>
    <path className="cls-1" d="M394.5,71H372.77a30.4,30.4,0,0,0,29.52,29.49V78.71A8.77,8.77,0,0,1,394.5,71Z" transform="translate(-0.31 -0.48)"></path>
    <path className="cls-1" d="M433.64,71H411.9a8.77,8.77,0,0,1-7.78,7.76v21.73A30.4,30.4,0,0,0,433.64,71Z" transform="translate(-0.31 -0.48)"></path>
    <rect className="cls-1" x="133.32" y="31.46" width="21.66" height="37.19"></rect>
    <path className="cls-1" d="M194.43,30.11A30.36,30.36,0,0,0,165,.63v21.7a8.76,8.76,0,0,1,7.79,7.78Z" transform="translate(-0.31 -0.48)"></path>
    <path className="cls-1" d="M133.65,30.11h21.69a8.76,8.76,0,0,1,7.79-7.78V.63a30.36,30.36,0,0,0-29.48,29.48Z" transform="translate(-0.31 -0.48)"></path>
    <path className="cls-1" d="M163.13,100.44V78.74a8.76,8.76,0,0,1-7.77-7.65H133.65a30.37,30.37,0,0,0,29.48,29.35Z" transform="translate(-0.31 -0.48)"></path>
    <path className="cls-1" d="M165,78.74v21.7A30.36,30.36,0,0,0,194.43,71H172.74A8.75,8.75,0,0,1,165,78.74Z" transform="translate(-0.31 -0.48)"></path>
    <path className="cls-1" d="M29.8,22.33V.63A30.36,30.36,0,0,0,.32,30.11H22A8.75,8.75,0,0,1,29.8,22.33Z" transform="translate(-0.31 -0.48)"></path>
    <polygon className="cls-1" points="21.66 68.65 21.66 62.31 21.66 37.8 21.66 31.45 0 31.45 0 68.65 21.66 68.65"></polygon>
    <path className="cls-1" d="M29.8,100.44V78.74A8.74,8.74,0,0,1,22,71H.32A30.36,30.36,0,0,0,29.8,100.44Z" transform="translate(-0.31 -0.48)"></path>
    <rect className="cls-1" x="39.15" y="31.46" width="21.66" height="5.94"></rect>
    <path className="cls-1" d="M61.11,30.05A30.36,30.36,0,0,0,31.63.63v21.7a8.74,8.74,0,0,1,7.77,7.72Z" transform="translate(-0.31 -0.48)"></path>
    <polygon className="cls-1" points="23.49 39.22 23.49 60.88 60.81 60.88 60.81 39.22 37.73 39.22 23.49 39.22"></polygon>
    <path className="cls-1" d="M31.63,78.74v21.7A30.36,30.36,0,0,0,61.11,71H39.41A8.73,8.73,0,0,1,31.63,78.74Z" transform="translate(-0.31 -0.48)"></path>
    <rect className="cls-1" x="105.83" y="70.49" width="21.64" height="29.47"></rect>
    <rect className="cls-1" x="105.83" y="31.32" width="21.64" height="37.3"></rect>
    <path className="cls-1" d="M98.3.48V22.16a8.78,8.78,0,0,1,7.79,7.78h21.67A30.36,30.36,0,0,0,98.3.48Z" transform="translate(-0.31 -0.48)"></path>
    <rect className="cls-1" x="66.66" y="70.49" width="21.64" height="29.47"></rect>
    <path className="cls-1" d="M96.44,22.16V.48A30.36,30.36,0,0,0,67,29.94H88.65A8.79,8.79,0,0,1,96.44,22.16Z" transform="translate(-0.31 -0.48)"></path>
    <rect className="cls-1" x="66.66" y="31.32" width="21.64" height="37.3"></rect>
    <rect className="cls-1" x="266.63" y="31.41" width="21.66" height="37.24"></rect>
    <rect className="cls-1" x="266.63" y="0.09" width="21.66" height="29.49"></rect>
    <rect className="cls-1" x="305.78" y="39.16" width="21.66" height="29.49"></rect>
    <path className="cls-1" d="M288.66,71H267a30.37,30.37,0,0,0,29.48,29.4V78.74A8.75,8.75,0,0,1,288.66,71Z" transform="translate(-0.31 -0.48)"></path>
    <path className="cls-1" d="M337.41,78.74v21.7A30.37,30.37,0,0,0,366.89,71H345.18A8.75,8.75,0,0,1,337.41,78.74Z" transform="translate(-0.31 -0.48)"></path>
    <path className="cls-1" d="M327.8,71H306a8.73,8.73,0,0,1-7.78,7.78v21.7a30.19,30.19,0,0,0,18.09-6.66l.32-.25.25-.21.25.21.32.25a30.19,30.19,0,0,0,18.09,6.66V78.74A8.74,8.74,0,0,1,327.8,71Z" transform="translate(-0.31 -0.48)"></path>
    <rect className="cls-1" x="344.93" y="31.41" width="21.66" height="37.24"></rect>
    <rect className="cls-1" x="344.93" y="0.09" width="21.66" height="29.49"></rect>
    <rect className="cls-1" x="478.37" y="31.33" width="21.63" height="37.3"></rect>
    <path className="cls-1" d="M470.84,100.43A30.36,30.36,0,0,0,500.3,71H478.63a8.79,8.79,0,0,1-7.79,7.78Z" transform="translate(-0.31 -0.48)"></path>
    <rect className="cls-1" x="439.2" width="21.63" height="29.47"></rect>
    <path className="cls-1" d="M448.41,52.39A30.21,30.21,0,0,0,469,61.27V39.6a8.78,8.78,0,0,1-7.78-7.79H439.53A30.15,30.15,0,0,0,448.41,52.39Z" transform="translate(-0.31 -0.48)"></path>
    <polygon className="cls-1" points="500 5.97 500 5.97 500 0 478.37 0 478.37 29.47 500 29.47 500 6.37 500 5.97"></polygon>
    <rect className="cls-1" x="470.53" y="39.16" width="5.97" height="21.63"></rect>
    <rect className="cls-1" x="439.21" y="78.32" width="29.47" height="21.63"></rect>
    <path className="cls-1" d="M261.08,71H239.41a8.78,8.78,0,0,1-7.78,7.78v21.67A30.36,30.36,0,0,0,261.08,71Z" transform="translate(-0.31 -0.48)"></path>
    <rect className="cls-1" x="239.15" y="31.34" width="21.63" height="37.3"></rect>
    <rect className="cls-1" x="199.99" y="31.34" width="21.63" height="37.3"></rect>
    <path className="cls-1" d="M231.62.51V22.18A8.78,8.78,0,0,1,239.41,30h21.67A30.36,30.36,0,0,0,231.62.51Z" transform="translate(-0.31 -0.48)"></path>
    <path className="cls-1" d="M229.76,22.18V.51A30.36,30.36,0,0,0,200.31,30H222A8.77,8.77,0,0,1,229.76,22.18Z" transform="translate(-0.31 -0.48)"></path>
    <path className="cls-1" d="M229.76,100.44V78.77A8.77,8.77,0,0,1,222,71H200.31a30.36,30.36,0,0,0,29.45,29.45Z" transform="translate(-0.31 -0.48)"></path>
    <path className="cls-1" d="M30.26,150v-21.7a8.73,8.73,0,0,1-7.78-7.78H.78A30.36,30.36,0,0,0,30.26,150Z" transform="translate(-0.31 -0.48)"></path>
    <rect className="cls-1" x="31.78" y="112.22" width="21.64" height="37.3"></rect>
    <rect className="cls-1" x="55.24" y="120.06" width="21.64" height="29.47"></rect>
    <rect className="cls-1" x="78.7" y="127.83" width="6.02" height="21.7"></rect>
    <path className="cls-1" d="M116.4,120.53H94.64a8.74,8.74,0,0,1-7.78,7.78V150A30.19,30.19,0,0,0,105,143.35l.32-.25.25-.21.25.21.32.25A30.19,30.19,0,0,0,124.18,150v-21.7A8.73,8.73,0,0,1,116.4,120.53Z" transform="translate(-0.31 -0.48)"></path>
    <path className="cls-1" d="M144.87,132.86l-.87,1.6a9.32,9.32,0,0,0-3.9-1c-2,0-3.57.94-3.57,2.48,0,1.12.85,1.78,2.39,2.24l2.21.63c2.32.67,4,1.88,4,4.29s-2.18,4.24-5.6,4.24a12,12,0,0,1-6-1.61l.91-1.63a10.05,10.05,0,0,0,5,1.39c2.42,0,3.6-1.12,3.6-2.39s-1.21-2-2.72-2.44l-2.12-.61c-2.38-.69-3.74-2.08-3.74-4.14,0-2.57,2.11-4.29,5.41-4.29A11.91,11.91,0,0,1,144.87,132.86Z" transform="translate(-0.31 -0.48)"></path>
    <path className="cls-1" d="M151.7,132h4.9v1.66h-4.9v8.86c0,2.11,1.12,3,2.69,3a5.7,5.7,0,0,0,2.42-.54l.61,1.6a6.68,6.68,0,0,1-3.12.79,4.33,4.33,0,0,1-4.68-4.57v-9.16h-2.57V132h2.57l.48-4.63h1.6Z" transform="translate(-0.31 -0.48)"></path>
    <path className="cls-1" d="M172.32,138.12V147h-2.06V144.4a6.49,6.49,0,0,1-5.59,3c-3.57,0-5.92-1.88-5.92-4.72s2.35-4.62,5.89-4.62a12.58,12.58,0,0,1,5.53,1.3V138a4.24,4.24,0,0,0-4.53-4.44,9,9,0,0,0-5,1.6l-.79-1.54a9.37,9.37,0,0,1,5.9-1.93A6.16,6.16,0,0,1,172.32,138.12Zm-11.49,4.5c0,1.75,1.66,2.93,4.17,2.93a6.57,6.57,0,0,0,5.26-3v-1.78a13.23,13.23,0,0,0-5.35-1.15C162.46,139.63,160.83,140.81,160.83,142.62Z" transform="translate(-0.31 -0.48)"></path>
    <path className="cls-1" d="M190.54,138.45V147h-2v-8.58c0-3.11-1.72-5-4.11-5-2.9,0-5.17,2.3-5.23,6.14V147h-2.06V132h2.06v3.26a5.64,5.64,0,0,1,5.35-3.59C188,131.65,190.54,134.19,190.54,138.45Z" transform="translate(-0.31 -0.48)"></path>
    <path className="cls-1" d="M209.89,147h-2.06v-3.17a7,7,0,0,1-6.1,3.51c-4.54,0-7.53-3.18-7.53-7.86s3-7.86,7.53-7.86a7,7,0,0,1,6.1,3.5v-10h2.06Zm-13.63-7.52c0,3.56,2.23,6,5.65,6a6,6,0,0,0,0-12C198.49,133.49,196.26,135.94,196.26,139.51Z" transform="translate(-0.31 -0.48)"></path>
    <path className="cls-1" d="M227.06,138.12V147H225V144.4a6.5,6.5,0,0,1-5.59,3c-3.57,0-5.92-1.88-5.92-4.72s2.35-4.62,5.89-4.62a12.58,12.58,0,0,1,5.53,1.3V138a4.24,4.24,0,0,0-4.53-4.44,9,9,0,0,0-5,1.6l-.79-1.54a9.37,9.37,0,0,1,5.9-1.93A6.16,6.16,0,0,1,227.06,138.12Zm-11.49,4.5c0,1.75,1.66,2.93,4.17,2.93a6.57,6.57,0,0,0,5.26-3v-1.78a13.23,13.23,0,0,0-5.35-1.15C217.2,139.63,215.57,140.81,215.57,142.62Z" transform="translate(-0.31 -0.48)"></path>
    <path className="cls-1" d="M239.45,131.71v2a6.1,6.1,0,0,0-1.12-.12c-2.81,0-4.41,3.24-4.44,7.65V147h-2.06V132h2.06v3.72c.6-2.42,2.36-4,4.56-4C238.48,131.65,238.88,131.65,239.45,131.71Z" transform="translate(-0.31 -0.48)"></path>
    <path className="cls-1" d="M256.38,147h-2.06v-3.17a7,7,0,0,1-6.1,3.51c-4.54,0-7.53-3.18-7.53-7.86s3-7.86,7.53-7.86a7.06,7.06,0,0,1,6.1,3.5v-10h2.06Zm-13.64-7.52c0,3.56,2.24,6,5.66,6a6,6,0,0,0,0-12C245,133.49,242.74,135.94,242.74,139.51Z" transform="translate(-0.31 -0.48)"></path>
    <path className="cls-1" d="M279.44,126.09l-.82,1.6a6.91,6.91,0,0,0-2.93-1,3.22,3.22,0,0,0-3.32,3.54V132h4.74v1.66h-4.74V147h-2.06V133.64h-2.54V132h2.54v-2c0-3.17,2.15-5.07,5.23-5.07A8.25,8.25,0,0,1,279.44,126.09Z" transform="translate(-0.31 -0.48)"></path>
    <path className="cls-1" d="M294,139.51a7.89,7.89,0,1,1-7.92-7.86A7.9,7.9,0,0,1,294,139.51Zm-13.73,0a5.84,5.84,0,1,0,11.67,0,5.84,5.84,0,1,0-11.67,0Z" transform="translate(-0.31 -0.48)"></path>
    <path className="cls-1" d="M305.4,131.71v2a6,6,0,0,0-1.12-.12c-2.81,0-4.41,3.24-4.44,7.65V147h-2.06V132h2.06v3.72c.6-2.42,2.36-4,4.56-4C304.43,131.65,304.83,131.65,305.4,131.71Z" transform="translate(-0.31 -0.48)"></path>
    <path className="cls-1" d="M344,138.12V147h-2V144.4a6.52,6.52,0,0,1-5.6,3c-3.56,0-5.92-1.88-5.92-4.72s2.36-4.62,5.89-4.62a12.63,12.63,0,0,1,5.54,1.3V138a4.25,4.25,0,0,0-4.54-4.44,9,9,0,0,0-5,1.6l-.78-1.54a9.36,9.36,0,0,1,5.89-1.93A6.16,6.16,0,0,1,344,138.12Zm-11.49,4.5c0,1.75,1.67,2.93,4.18,2.93a6.58,6.58,0,0,0,5.26-3v-1.78a13.27,13.27,0,0,0-5.35-1.15C334.18,139.63,332.54,140.81,332.54,142.62Z" transform="translate(-0.31 -0.48)"></path>
    <path className="cls-1" d="M356.42,131.71v2a6,6,0,0,0-1.12-.12c-2.81,0-4.41,3.24-4.44,7.65V147h-2.05V132h2.05v3.72c.61-2.42,2.36-4,4.57-4C355.46,131.65,355.85,131.65,356.42,131.71Z" transform="translate(-0.31 -0.48)"></path>
    <path className="cls-1" d="M361.5,128.44h-2.33v-2.57h2.33ZM361.35,147h-2.06V132h2.06Z" transform="translate(-0.31 -0.48)"></path>
    <path className="cls-1" d="M380,138.69a5.82,5.82,0,0,1-.09,1.12H367.33c.19,3.54,2.39,5.71,5.93,5.71a8,8,0,0,0,4.32-1.18l1,1.42a9.55,9.55,0,0,1-5.32,1.61c-4.93,0-8-3.15-8-7.92s3.05-7.8,7.62-7.8A6.68,6.68,0,0,1,380,138.69Zm-12.54-.48h10.45a4.74,4.74,0,0,0-5-4.72A5.33,5.33,0,0,0,367.46,138.21Z" transform="translate(-0.31 -0.48)"></path>
    <path className="cls-1" d="M386.29,132h4.89v1.66h-4.89v8.86c0,2.11,1.11,3,2.69,3a5.69,5.69,0,0,0,2.41-.54l.61,1.6a6.67,6.67,0,0,1-3.11.79,4.34,4.34,0,0,1-4.69-4.57v-9.16h-2.57V132h2.57l.48-4.63h1.61Z" transform="translate(-0.31 -0.48)"></path>
    <path className="cls-1" d="M398.62,153.8h-2.09l2.87-6.89L392.87,132h2.36l5.26,12.6,5-12.6h2.39Z" transform="translate(-0.31 -0.48)"></path>
    <path className="cls-1" d="M323.24,147.06H320.9l-6-15.13h2.18l4.95,13,5-13h2.19Z" transform="translate(-0.31 -0.48)"></path>
  </svg>
);

const KukaLogo = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 -36 12002 2110" 
    className={className}
    aria-label="KUKA Logo"
  >
    {/* KUKA Orange: #FF5800 */}
    <style>{`.kuka-fill{fill:#FF5800;}`}</style>
    <path className="kuka-fill" d="M10.5,0h4.8v13l8.2-13h6L19.3,13.4l10.2,16.6h-6.2l-7.5-13.1l-0.6,0.9V30h-4.8V0z M45.5,19.8V0h4.8v20.2c0,3.6,1.9,5.5,5.2,5.5c3.4,0,5.2-1.9,5.2-5.5V0h4.8v19.8c0,6.8-4.2,10.2-10,10.2S45.5,26.6,45.5,19.8z M76.8,0h4.8v13l8.2-13h6L85.6,13.4l10.2,16.6h-6.2l-7.5-13.1l-0.6,0.9V30h-4.8V0z M43.1,0L31.5,30h-5.2L38,0H43.1z"/>
    <path d="m3576 2044c-229-42-408-165-490-337-73-153-70-108-73-949l-4-758h660l3 667c3 653 3 669 24 713 25 53 78 103 131 121 56 20 970 20 1026 0 53-18 106-68 131-121 21-44 21-60 24-713l3-667h660l-4 753c-3 676-5 759-20 817-58 216-198 365-412 438-145 50-180 52-904 51-538-1-692-4-755-15zm-3576-1029v-1015h650v980l293-249c160-137 420-357 577-490l285-241h470c268 0 465 4 460 9-6 5-125 100-266 212-140 112-416 332-612 488l-356 285 41 35c23 20 83 70 134 111 345 281 1063 876 1063 883 1 4-207 7-461 7h-463l-75-66c-41-37-122-107-180-158-58-50-287-250-508-443l-402-352v1019h-650zm6160 0v-1015h660l2 486 3 485 141-118c179-150 517-437 792-671l214-182h465c279 0 462 4 459 9-4 5-104 88-224 183-119 96-394 315-610 488-216 172-389 317-385 321s280 233 613 507c551 456 606 498 617 482 7-10 239-380 516-822s554-885 617-986l115-182h590l201 323c111 177 392 626 624 997 233 371 425 683 428 692 4 17-18 18-370 18h-374l-97-160c-54-88-100-167-103-175-5-13-82-15-603-15h-596l-105 175-105 175h-1663l-573-502c-316-276-577-506-581-512s-8 220-8 502v512h-660zm4623 197c-163-281-329-562-334-562-3 0-77 123-165 273-87 149-167 287-177 305l-19 32h722z" 
      fill="#ff5c00"
    />
    <g fill="#ff6102">
      <path d="m3587 2046c-57-11-101-26-71-26 23 1 187 30 192 35 8 8-47 4-121-9zm156 7c9-2 25-2 35 0 9 3 1 5-18 5s-27-2-17-5zm1160 0c9-2 25-2 35 0 9 3 1 5-18 5s-27-2-17-5zm59 1c3-3 34-9 69-14 232-34 402-123 498-260 53-75 78-135 102-240 17-79 19-136 19-812 0-498 3-728 10-728 8 0 10 235 7 753-3 676-5 759-20 817-58 216-198 365-412 438-92 32-292 66-273 46zm-4962-1039v-1015h650v490c0 270 3 490 8 490 4 0 20-14 35-30 16-17 34-30 41-30s22-14 35-30c12-17 26-28 32-25 5 4 8 3 7-2-2-4 7-18 20-31 12-12 22-20 22-18s21-16 47-40c25-24 51-40 56-37 6 3 8 2 5-3s3-17 14-26c10-10 18-15 18-11 0 3 8-4 19-15 10-12 24-22 30-22 7 0 9-4 6-10-3-5 1-10 10-10 8 0 18-7 21-15 4-8 10-12 15-9s9-2 9-10c0-9 5-16 10-16 6 0 20-11 32-25 11-13 24-22 29-20 4 3 16-5 26-18s33-32 51-42c17-11 32-25 32-32 0-6 5-15 12-19 7-5 9-2 3 7-4 8 12-6 35-31s38-38 35-30c-4 8 5 2 20-15 14-16 23-24 19-16-5 9-3 12 4 7 7-4 12-13 12-21s5-17 12-21c7-5 9-2 4 7-4 8 2 2 14-14 12-15 26-24 31-21s8 0 7-7c-3-12 1-14 34-18 6 0 8-4 5-8-6-5 15-27 60-63 7-6 17-10 23-10s9-4 5-9c-3-5 13-20 35-34 22-13 37-26 34-29-3-4 4-9 15-13 12-3 21-11 21-16s4-9 9-9 7 8 5 18c-3 9 4 64 15 122s35 186 52 285c18 99 35 184 40 189 4 4 202-148 440-338 239-190 440-346 448-346 19 0 38-16-260 221-140 112-416 332-612 488l-356 285 41 35c23 20 83 70 134 111 348 283 1063 876 1063 883 1 4-209 6-466 5-355-2-467-6-466-15 2-6-6-15-17-18-11-4-20-11-20-17s-2-9-5-6c-6 5-53-33-120-99-24-23-45-40-47-37-3 2-11-7-18-21-7-13-28-31-46-40-19-9-34-18-34-21s5-2 12 2 8 3 4-4-12-12-17-12c-18 0-79-52-79-66 0-8-7-14-16-14s-41-26-72-57c-31-32-52-51-47-43s-7 0-26-19c-18-19-33-39-31-44 1-4-2-6-8-2-5 3-10 1-10-4 0-6-5-11-11-11-10 0-37-22-105-88-19-18-34-30-34-26 0 3-16-10-36-30s-40-36-45-36-21-18-35-40c-15-22-34-40-43-40-18 0-57-40-53-1-5-1-6-5-4-9 6-39-13-41-25-1-5-4-7-6-5-9 5-45-36-39-46 3-6 1-7-5-3s-29-11-50-34c-22-22-42-40-46-40-3 0-6 230-6 510v510h-650zm2680 980c-21-20-705-584-706-582-1 1 18 108 42 237s49 263 55 298l11 62h306c268 0 304-2 292-15zm3480 28c0-5 144-7 320-5l320 3v-1011c0-667 3-1010 10-1010s10 345 10 1015v1015h-330c-181 0-330-3-330-7zm2267-3 452-5-614-505c-337-278-614-509-614-515 0-10 1219-986 1241-994 27-9-17 29-220 191-119 96-394 315-610 488-372 297-392 315-375 330 10 9 289 240 620 514l602 496 363-2 363-3 104-172 104-173 601 2 601 3-595 3-595 2-105 175-105 175-835-2c-708-2-766-3-383-8zm3195 0 366-5-385-615c-212-338-495-790-629-1004s-241-392-239-395c7-6-13-37 275 424 145 231 425 679 623 995s362 583 365 592c4 17-17 18-369 16l-374-3zm-8200-21c-29-12-52-23-49-25 4-4 127 36 127 42 0 8-27 2-78-17zm438-475c-74-16-135-54-163-102-45-76-46-101-47-779 0-417 3-643 9-643 7 0 11 237 13 668 3 618 4 670 21 707 36 80 88 118 190 138 34 7 57 15 52 19-6 3-39-1-75-8zm100 6c0-6 132-10 375-10s375 4 375 10-132 10-375 10-375-4-375-10zm795-6c55-15 97-22 88-13-5 5-31 11-58 14-28 2-41 2-30-1zm-1740-864c0-366 1-515 2-332 2 182 2 482 0 665-1 182-2 33-2-333z"/>
      <path d="m10070 1265c0-13 375-646 378-637 3 11-360 641-370 642-5 0-8-2-8-5z"/>
    </g>
  </svg>
);

const VWLogo = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 192.744 192.744" 
    className={className}
    aria-label="Volkswagen Logo"
  >
    <g fillRule="evenodd" clipRule="evenodd">
      <path fill="#fff" d="M0 0h192.744v192.744H0V0z"/>
      <path fill="currentColor" d="M96.336 2.865c-51.663 0-93.543 41.882-93.543 93.543 0 51.662 41.881 93.543 93.543 93.543 51.66 0 93.543-41.881 93.543-93.543 0-51.66-41.883-93.543-93.543-93.543zm0 178.699c-47.031 0-85.156-38.125-85.156-85.156 0-47.029 38.125-85.155 85.156-85.155 47.029 0 85.156 38.126 85.156 85.155 0 47.031-38.127 85.156-85.156 85.156z"/>
      <path fill="currentColor" d="M77.692 32.786a66.308 66.308 0 0 1 18.644-2.657c6.465 0 12.715.926 18.623 2.652l-18.623 41.28-18.644-41.275z"/>
      <path fill="currentColor" d="M131.914 40.477a66.695 66.695 0 0 1 17.957 16.847l-30.566 67.64-11.795-26.227H85.162l-11.794 26.226-30.522-67.702a66.635 66.635 0 0 1 17.909-16.783l24.407 54.146h22.424l24.328-54.147zM32.296 79.254a66.384 66.384 0 0 0-2.241 17.154c0 25.975 14.939 48.458 36.694 59.329L32.296 79.254z"/>
      <path fill="currentColor" d="M78 160.12a66.268 66.268 0 0 0 18.336 2.569c6.354 0 12.498-.895 18.314-2.562l-18.314-40.673L78 160.12zM125.92 155.737c21.756-10.871 36.695-33.354 36.695-59.329 0-5.88-.766-11.581-2.201-17.009l-34.494 76.338z"/>
    </g>
  </svg>
);

// --- ROLE TICKER COMPONENT (3D FLIP ANIMATION) ---

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
    }, 1500); 

    return () => clearInterval(interval);
  }, []);

  const pillClass = "w-full text-center px-3 py-0.5 bg-emerald-100/50 text-emerald-800 rounded-full text-base md:text-lg border border-emerald-200 font-semibold block truncate leading-none";

  return (
    // Container with perspective for 3D effect
    <span className="inline-block h-[1.5em] w-48 relative align-middle mb-1 mx-1" style={{ perspective: '1000px' }}>
      {/* The rotating wrapper */}
      <span
        // CHANGED: duration-700 to duration-1000 for slower flip
        className={`absolute inset-0 transition-transform duration-1000 ease-in-out ${isFlipped ? '[transform:rotateX(180deg)]' : '[transform:rotateX(0deg)]'}`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front Face (Role 0) */}
        <span className="absolute inset-0 flex items-center justify-center" style={{ backfaceVisibility: 'hidden' }}>
          <span className={pillClass}>
            {currentRoles[0]}
          </span>
        </span>

        {/* Back Face (Role 1) - Pre-rotated 180deg */}
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // FIXED: TypeScript state definition
  const [language, setLanguage] = useState<'de' | 'en'>('de');

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

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % profileImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + profileImages.length) % profileImages.length);
  };

  const translationsData = {
    de: {
      nav: { 
        home: 'Startseite', 
        skills: 'Kenntnisse', 
        experience: 'Erfahrung', 
        projects: 'Projekte', 
        contact: 'Kontakt' 
      },
      hero: { 
        open: 'Offen für neue Möglichkeiten', 
        hello: 'Xin chào, ich bin', 
        role_start: 'Eine', 
        role_end: ', die Kunst mit Logik verbindet. Ich gestalte intuitive digitale Erlebnisse mit Begeisterung und einem Blick fürs Detail.', 
        btn_projects: 'Projekte ansehen', 
        btn_resume: 'Lebenslauf' 
      },
      skills: { 
        title: 'Meine Expertise', 
        subtitle: 'Design & Entwicklung' 
      },
      experience: { 
        title: 'Mein Werdegang' 
      },
      projects: { 
        title: 'Ausgewählte Arbeiten', 
        subtitle: 'Aktuelle Projekte' 
      },
      contact: { 
        title: 'Bereit, etwas Großartiges zu erschaffen?', 
        text: 'Ich bin immer auf der Suche nach neuen Herausforderungen und Möglichkeiten, meine Leidenschaft für Design und Präzision einzubringen.', 
        footer: 'Erstellt mit' 
      },
      roles: ["UI/UX-Designerin", "Mediengestalterin"]
    },
    en: {
      nav: { 
        home: 'Home', 
        skills: 'Knowledge', 
        experience: 'Experience', 
        projects: 'Projects', 
        contact: 'Contact' 
      },
      hero: { 
        open: 'Open for new opportunities', 
        hello: 'Xin chào, I am', 
        role_start: 'A', 
        role_end: ', blending art with logic. I craft intuitive digital experiences with enthusiasm and an eye for detail.', 
        btn_projects: 'View Projects', 
        btn_resume: 'Resume' 
      },
      skills: { 
        title: 'My Expertise', 
        subtitle: 'Design & Development' 
      },
      experience: { 
        title: 'My Journey' 
      },
      projects: { 
        title: 'Selected Work', 
        subtitle: 'Recent Projects' 
      },
      contact: { 
        title: 'Ready to create something amazing?', 
        text: 'I am always looking for new challenges and opportunities to bring my passion for design and precision.', 
        footer: 'Built with' 
      },
      roles: ["UI/UX Designer", "Media Designer"]
    }
  };

  const t = translationsData[language];

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

  const toggleResume = (e: React.MouseEvent) => {
    e.preventDefault(); 
    setShowResume(!showResume);
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
      description: "Entwicklung und Umsetzung einer internen Kommunikationsplattform. Fokus auf Prozessdigitalisierung, Feedback-Auswertung und Optimierung der internen Kommunikationsstruktur.",
      tags: ["Interne Kommunikation", "Prozessgestaltung", "Digitalisierung"],
      icon: <Briefcase size={18} className="text-white" />,
      bg: "bg-blue-600"
    },
    {
      company: "encoway GmbH",
      role: "Werkstudentin UX/UI Design",
      period: "02.2024 - 04.2025",
      description: "Durchführung von Expert Reviews und Competitor Analysis. Erstellung von Wireframes, Prototypen und UX/UI-Kommunikationsmaterialien. Gestaltung einer SharePoint-Seite für das UX-Team.",
      tags: ["Expert Reviews", "Prototyping", "SharePoint", "Visual Design"],
      icon: <Palette size={18} className="text-white" />,
      bg: "bg-emerald-500"
    },
    {
      company: "Siemens AG",
      role: "Werkstudentin UX/UI Design",
      period: "08.2022 - 02.2023",
      description: "Unterstützung bei der Pflege und Optimierung von Archivierungsprozessen. Verwaltung und Digitalisierung von Dokumenten im SAP-System.",
      tags: ["Prozessoptimierung", "SAP", "Organisation"],
      icon: <Briefcase size={18} className="text-white" />,
      bg: "bg-cyan-600"
    },
    {
      company: "KUKA AG",
      role: "Praktikantin im UX Bereich",
      period: "04.2022 - 06.2022",
      description: "Prototyping mit Axure 9 für Robotereinsatz-Handhelds. Recherche zu internationalen Tastaturlayouts und Entwicklung von UX-Patterns.",
      tags: ["Axure 9", "HMI Design", "User Research", "UX Patterns"],
      icon: <Layout size={18} className="text-white" />,
      bg: "bg-orange-500"
    }
  ];

  const projects = [
    {
      title: "Volkswagen Internal Hub",
      category: "Product Design",
      description: "Konzeption und Umsetzung einer zentralen Plattform zur Informationsverteilung für Mitarbeitende.",
      metrics: ["Zentrale Info-Verteilung", "Feedback-Integration"],
      color: "bg-blue-50",
      Logo: VWLogo
    },
    {
      title: "KUKA Smart Handheld",
      category: "HMI / Industrial UX",
      description: "Optimierung der Benutzeroberfläche für Roboter-Steuerungsgeräte mittels High-Fidelity Prototyping in Axure 9.",
      metrics: ["Axure 9", "Industrial Design", "Accessibility"],
      color: "bg-orange-50",
      Logo: KukaLogo
    },
    {
      title: "Encoway UX Audit",
      category: "Research & Analysis",
      description: "Umfassende Analyse von Wettbewerber-Websites und Expert Reviews der eigenen Produkte zur Identifikation von UX-Schwachstellen.",
      metrics: ["Competitor Analysis", "Heuristic Eval"],
      color: "bg-green-50",
      Logo: EncowayLogo
    }
  ];

  const skills = {
    design: ["UX/UI Design", "Interaction Design", "Wireframing", "User Research", "Usability Testing", "Prototyping", "User Journey Mapping"],
    tools: ["Figma", "Adobe XD", "Adobe InDesign", "Illustrator", "Photoshop", "Sketch", "Miro", "Axure 9"],
    languages: ["Deutsch (C1)", "Englisch (B2)", "Vietnamesisch (Muttersprache)"]
  };
  
  const resumeUrl = "https://drive.google.com/file/d/1D4BLzlOJM1oRUHO99a-lU9fZ8Fn-37CU/preview";

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans selection:bg-rose-200 selection:text-rose-900">
      
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
                <button 
                  onClick={() => setShowResume(false)}
                  className="p-2 hover:bg-stone-200 rounded-full transition-colors"
                >
                  <X size={20} className="text-stone-500" />
                </button>
              </div>
            </div>
            <div className="flex-1 bg-slate-100 overflow-hidden relative">
              <iframe 
                src={resumeUrl} 
                title="Resume PDF"
                className="w-full h-full border-none"
                allow="autoplay"
              />
            </div>
          </div>
        </div>
      )}

      <nav className={`fixed top-6 left-0 right-0 z-50 flex justify-center px-4 transition-all duration-500 ${scrolled ? 'transform -translate-y-2' : ''}`}>
        <div className="bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg shadow-stone-200/50 rounded-full px-2 py-2 flex items-center gap-1 md:gap-2 max-w-fit mx-auto">
          
          {/* LEFT: Language Toggle & Logo */}
          <div className="flex items-center mr-2">
               {/* Moved Language Toggle Here */}
               <button
                onClick={toggleLanguage}
                className="p-2 mr-2 font-bold text-emerald-700 flex items-center gap-1 cursor-pointer bg-stone-100/50 hover:bg-stone-200 rounded-full transition-colors"
                aria-label={`Switch to ${language === 'de' ? 'English' : 'German'}`}
              >
                <Globe className="w-4 h-4 text-emerald-600" />
                <span className="text-xs">{language.toUpperCase()}</span>
              </button>

              <div className="px-2 font-bold text-emerald-700 cursor-pointer" onClick={() => scrollTo('home')}>
                <span className="hidden md:inline">PMN.</span>
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

          {/* RIGHT: LinkedIn Button & Mobile Menu */}
          <div className="flex items-center gap-2 ml-2 pl-2 border-l border-stone-200">
            {/* Moved LinkedIn Here */}
            <a href="https://www.linkedin.com/in/myanh02/" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors hover:scale-110 transform duration-200">
              <Linkedin size={18} />
            </a>
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
                
                <button onClick={toggleResume} className="px-8 py-4 bg-white border border-stone-200 text-stone-700 rounded-full font-medium hover:border-rose-300 hover:text-rose-600 hover:bg-rose-50 transition-all flex items-center gap-2 shadow-sm hover:shadow-md">
                  {t.hero.btn_resume} <Eye size={18} />
                </button>
              </div>
            </div>

            <div className="flex-1 relative w-full max-w-md lg:max-w-lg animate-in fade-in zoom-in duration-1000 delay-300">
               <div className="relative aspect-[4/5] mx-auto group">
                  <div className="absolute top-[-20px] right-[-20px] w-24 h-24 bg-rose-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
                  <div className="absolute bottom-[-10px] left-[-10px] w-32 h-32 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-700"></div>
                  
                  <div className="absolute inset-0 bg-stone-200 rounded-[3rem] transform rotate-3"></div>
                  <div className="absolute inset-0 bg-white rounded-[3rem] border-4 border-white shadow-2xl overflow-hidden transform -rotate-2 transition-transform duration-500 hover:rotate-0 relative">
                    <img src={profileImages[currentImageIndex]} alt="Phan My Anh Nguyen" className="w-full h-full object-cover transition-all duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/20 to-transparent mix-blend-overlay"></div>

                    <button 
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm p-2 rounded-full text-white hover:bg-white/40 transition-all opacity-0 group-hover:opacity-100"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    
                    <button 
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm p-2 rounded-full text-white hover:bg-white/40 transition-all opacity-0 group-hover:opacity-100"
                    >
                      <ChevronRight size={24} />
                    </button>

                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                      {profileImages.map((_, idx) => (
                        <div 
                          key={idx} 
                          className={`w-2 h-2 rounded-full transition-all ${idx === currentImageIndex ? 'bg-white w-4' : 'bg-white/50'}`}
                        />
                      ))}
                    </div>
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
              {projects.map((project, index) => (
                <div key={index} className={`group relative bg-white rounded-3xl overflow-hidden border hover:shadow-2xl transition-all duration-500 flex flex-col ${project.color}`}>
                  <div className="relative h-64 overflow-hidden flex items-center justify-center p-10">
                    <div className="w-full h-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-700 ease-out">
                       {project.Logo && <project.Logo className="w-full h-full max-w-[180px] opacity-80 mix-blend-multiply" />}
                    </div>
                  </div>

                  <div className="p-8 flex-1 flex flex-col bg-white relative z-20">
                    <div className="text-xs font-bold text-emerald-600 mb-2 uppercase tracking-wider">{project.category}</div>
                    <h4 className="text-2xl font-bold text-stone-800 mb-3 group-hover:text-emerald-700 transition-colors">{project.title}</h4>
                    <p className="text-stone-500 text-sm leading-relaxed mb-6 line-clamp-3">
                      {project.description}
                    </p>
                    
                    <div className="mt-auto pt-6 border-t border-stone-100 flex flex-wrap gap-2">
                      {project.metrics.map((m, i) => (
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