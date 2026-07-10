import React, { useState, useEffect } from 'react';

// --- Types & Interfaces ---
interface Project {
  id: string;
  name: string;
  link: string;
  demoLink?: string;
  badge?: string;
  desc: string;
  features: string[];
  tech: string[];
  iconClass: string;
  thumbnail: string;
}

interface TimelineItem {
  date: string;
  role: string;
  company: string;
  desc: string;
  bullets: string[];
}

export default function App() {
  // --- States ---
  const [theme, setTheme] = useState<'dark' | 'light'>(
    (localStorage.getItem('theme') as 'dark' | 'light') || 'dark'
  );
  const [lang, setLang] = useState<'es' | 'en'>(
    (localStorage.getItem('lang') as 'es' | 'en') || 'es'
  );
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [terminalTab, setTerminalTab] = useState<'skills' | 'contacto'>('skills');
  const [terminalLoading, setTerminalLoading] = useState<boolean>(false);

  // --- Refs ---

  // --- Projects Data (Bilingual) ---
  const projectsEs: Project[] = [
    {
      id: 'finance-app',
      name: 'Finanzas Pro',
      link: 'https://github.com/jgarciarf2/finance-app',
      demoLink: 'https://finance-app-chi-woad.vercel.app',
      desc: 'Dashboard full-stack para el control y proyección financiera de hogares. Integra un motor inteligente de amortización de deudas sensible a ciclos de facturación y gráficos SVG vectoriales.',
      features: ['Supabase Auth & DB', 'Gráficos SVG Interactivos'],
      tech: ['Next.js 16', 'TypeScript', 'Supabase Auth'],
      iconClass: 'fas fa-wallet',
      thumbnail: '/resources/project-finance.png'
    },
    {
      id: 'simulador-confianza',
      name: 'Simulador Confianza',
      link: 'https://simulador.confianza.pe/simulador-credito',
      badge: '100% Backend',
      desc: 'Desarrollo backend para el simulador oficial de créditos de Financiera Confianza en Perú. Responsable de la lógica de autenticación segura por cookies corporativas, protección de endpoints y cálculo de desgravamen con/sin devolución.',
      features: ['Autenticación por Cookies', 'Adaptación y aplicación de cálculos matemáticos de seguros e intereses'],
      tech: ['Express', 'TypeScript', 'Prisma ORM', 'PostgreSQL'],
      iconClass: 'fas fa-calculator',
      thumbnail: '/resources/project-simulador-confianza.png'
    },
    {
      id: 'confianza-pe',
      name: 'Confianza Perú',
      link: 'https://confianza.pe',
      desc: 'Mantenimiento y desarrollo web para la plataforma principal de Financiera Confianza. Creación de landing pages corporativas, gestión y control de contenidos dinámicos (multimedia, noticias, productos y artículos).',
      features: ['Creación de Landings', 'Gestión de Contenido & Multimedia'],
      tech: ['PHP', 'WordPress', 'HTML5 / CSS3'],
      iconClass: 'fas fa-university',
      thumbnail: '/resources/project-confianza.png'
    },
    {
      id: 'brewery-tour',
      name: 'Brewery Adventure Tour',
      link: 'https://breweryadventuretour.com',
      badge: 'Full Backend',
      desc: 'Desarrollo de APIs, control y creación de base de datos, optimización de consultas a cervecerías con búsqueda radial por geolocalización. Gestión completa de Ads (creación, edición y control), suscripciones de pago con Stripe y control de usuarios con roles y permisos.',
      features: ['Búsqueda Radial Geográfica', 'Suscripciones Stripe'],
      tech: ['Node.js', 'MongoDB', 'Mongoose', 'Stripe API'],
      iconClass: 'fas fa-beer',
      thumbnail: '/resources/project-bat.png'
    },
    {
      id: 'eseit',
      name: 'ESEIT',
      link: 'https://www.eseit.edu.co',
      desc: 'Mantenimiento y optimizaciones del portal web académico. Creación de landings personalizadas, modificación de temas de WordPress mediante PHP para adaptar plantillas a medida, optimizaciones SEO y optimización de rendimiento (WPO).',
      features: ['WordPress custom PHP', 'Rendimiento & WPO'],
      tech: ['PHP', 'SCSS', 'GSAP', 'WordPress'],
      iconClass: 'fas fa-graduation-cap',
      thumbnail: '/resources/project-eseit.png'
    },
    {
      id: 'distoyota',
      name: 'Distoyota',
      link: 'https://distoyota.com',
      desc: 'Desarrollo web corporativo para el concesionario oficial de Toyota. Creación de landings de alta conversión, optimizaciones de SEO on-page y técnico, automatizaciones de formularios complejas con JetEngine - Zapier, y redacción de manuales de usuario.',
      features: ['Formularios JetEngine', 'Integración Zapier'],
      tech: ['WordPress', 'JetEngine', 'Zapier', 'SEO Técnico'],
      iconClass: 'fas fa-car',
      thumbnail: '/resources/project-distoyota.png'
    }
  ];

  const projectsEn: Project[] = [
    {
      id: 'finance-app',
      name: 'Finance Pro',
      link: 'https://github.com/jgarciarf2/finance-app',
      demoLink: 'https://finance-app-chi-woad.vercel.app',
      desc: 'Full-stack dashboard for household financial control and projection. Integrates a smart debt amortization engine sensitive to billing cycles and interactive vector SVG charts.',
      features: ['Supabase Auth & DB', 'Interactive SVG Charts'],
      tech: ['Next.js 16', 'TypeScript', 'Supabase Auth'],
      iconClass: 'fas fa-wallet',
      thumbnail: '/resources/project-finance.png'
    },
    {
      id: 'simulador-confianza',
      name: 'Confianza Simulator',
      link: 'https://simulador.confianza.pe/simulador-credito',
      badge: '100% Backend',
      desc: 'Backend development for the official credit simulator of Financiera Confianza in Peru. Responsible for secure authentication logic via corporate cookies, endpoint protection, and desgravamen calculation with/without devolution.',
      features: ['Cookie Authentication', 'Adaptación y aplicación de cálculos matemáticos de seguros e intereses'],
      tech: ['Express', 'TypeScript', 'Prisma ORM', 'PostgreSQL'],
      iconClass: 'fas fa-calculator',
      thumbnail: '/resources/project-simulador-confianza.png'
    },
    {
      id: 'confianza-pe',
      name: 'Confianza Perú',
      link: 'https://confianza.pe',
      desc: 'Web maintenance and development for the main platform of Financiera Confianza. Creation of corporate landing pages, management, and control of dynamic content (multimedia, news, products, and articles).',
      features: ['Landing Page Creation', 'Content & Multimedia Management'],
      tech: ['PHP', 'WordPress', 'HTML5 / CSS3'],
      iconClass: 'fas fa-university',
      thumbnail: '/resources/project-confianza.png'
    },
    {
      id: 'brewery-tour',
      name: 'Brewery Adventure Tour',
      link: 'https://breweryadventuretour.com',
      badge: 'Full Backend',
      desc: 'API development, database creation and control, brewery query optimization with radial search by geolocation. Full Ad management (creation, edition, and control), payment subscriptions with Stripe, and role-based user access control.',
      features: ['Radial Geographic Search', 'Stripe Subscriptions'],
      tech: ['Node.js', 'MongoDB', 'Mongoose', 'Stripe API'],
      iconClass: 'fas fa-beer',
      thumbnail: '/resources/project-bat.png'
    },
    {
      id: 'eseit',
      name: 'ESEIT',
      link: 'https://www.eseit.edu.co',
      desc: 'Web portal maintenance and optimizations for an academic institution. Creation of custom landing pages, WordPress theme customization using PHP to adapt templates, SEO optimizations, and Web Performance Optimization (WPO).',
      features: ['WordPress custom PHP', 'Performance & WPO'],
      tech: ['PHP', 'SCSS', 'GSAP', 'WordPress'],
      iconClass: 'fas fa-graduation-cap',
      thumbnail: '/resources/project-eseit.png'
    },
    {
      id: 'distoyota',
      name: 'Distoyota',
      link: 'https://distoyota.com',
      desc: 'Corporate web development for the official Toyota dealership. Creation of high-conversion landing pages, on-page and technical SEO optimizations, complex form automation using JetEngine and Zapier, and user manuals drafting.',
      features: ['JetEngine Forms', 'Zapier Integration'],
      tech: ['WordPress', 'JetEngine', 'Zapier', 'Technical SEO'],
      iconClass: 'fas fa-car',
      thumbnail: '/resources/project-distoyota.png'
    }
  ];

  // --- Timeline Data (Bilingual) ---
  const timelineDataEs: TimelineItem[] = [
    {
      date: 'Dic 2025 - Actualidad',
      role: 'Desarrollador & Webmaster',
      company: 'Ariadna Communications Group | CDI Interactive',
      desc: 'Desarrollo integral de software y optimización técnica corporativa.',
      bullets: [
        'Desarrollo de un motor de simulación financiera compleja para amortizaciones de créditos (sistemas de cuota fija y cuotas flexibles), replicando modelos matemáticos de cálculo de TEA, seguros de desgravamen (con y sin devolución) y multirriesgo.',
        'Desarrollo de APIs RESTful robustas y escalables utilizando Node.js (Express), TypeScript, Python y PHP, totalmente documentadas con Swagger bajo estándares OpenAPI.',
        'Diseño de arquitectura limpia para el manejo global de errores y validación robusta de payloads JSON en Express, garantizando la estabilidad y resiliencia del sistema frente a peticiones maliciosas.',
        'Desarrollo y exportación dinámica de reportes y cronogramas de pago en formato PDF generados directamente en memoria para optimizar el rendimiento y consumo del servidor.',
        'Configuración de seguridad y control de acceso basado en roles (RBAC) con Express, gestionando sesiones protegidas mediante cookies y validación estricta de privilegios de usuario (Admin, Superadmin y público).',
        'Implementación de un sistema seguro de carga y gestión dinámica de archivos multimedia en el servidor local, previniendo vulnerabilidades de Path Traversal y asegurando la deduplicación automática de nombres.',
        'Diseño y modelado de bases de datos relacionales utilizando Prisma ORM y MySQL, gestionando migraciones seguras y sin pérdida de datos en entornos de producción.',
        'Refactorización avanzada de consultas, diseño de índices y optimización de latencia en bases de datos relacionales y no relacionales para mejorar los tiempos de respuesta globales.',
        'Integración de pasarelas de pago (Stripe) e integraciones avanzadas con Modelos de Lenguaje Grande (LLMs) para la automatización y enriquecimiento de flujos en el backend.',
        'Contenerización de aplicaciones con Docker y configuración de pipelines de integración y despliegue continuo (CI/CD) para automatizar fases de testing y producción.',
        'Desarrollo de plugins personalizados para WordPress y optimización/modificación estructural de temas existentes para adaptarlos a requerimientos lógicos complejos.',
        'Creación de estructuras de datos dinámicas y flujos automatizados de formularios mediante el uso avanzado de JetEngine y Zapier para la gestión eficiente de leads corporativos.',
        'Optimización del rendimiento web (WPO) y de SEO técnico en portales corporativos de alto tráfico (como Distoyota.com), garantizando excelentes métricas de Core Web Vitals.',
        'Gestión, carga y optimización de arquitectura de contenido multimedia, artículos y productos, asegurando consistencia y velocidad de carga en producción.'
      ]
    },
    {
      date: '2023 - 2025',
      role: 'Desarrollador Freelance | EBS-WebDev',
      company: 'Independiente / EBS-WebDev',
      desc: 'Liderando la ingeniería e infraestructura de múltiples aplicaciones a medida.',
      bullets: [
        'Implementación e integración de plugins certificados de pago locales como Nequi & Place to Pay (Certificaciones oficiales).',
        'Desarrollo de widgets de búsqueda personalizados para la centralizadora de AViajar Colombia.',
        'Diseño de arquitecturas de red complejas configurando protocolos de enrutamiento OSPF, BGP, RIP, y DHCP en IPv4/IPv6.',
        'Desarrollo de sistemas integrados de telemedicina y tiendas de comercio electrónico (React Native, Node.js, MongoDB).',
        'Automatización avanzada de procesos de negocios utilizando N8N e integraciones ERP Odoo.'
      ]
    }
  ];

  const timelineDataEn: TimelineItem[] = [
    {
      date: 'Dec 2025 - Present',
      role: 'Developer & Webmaster',
      company: 'Ariadna Communications Group | CDI Interactive',
      desc: 'Integral software development and corporate technical optimization.',
      bullets: [
        'Developed a complex financial simulation engine for credit amortization (fixed-day and flexible installment systems), replicating mathematical models for TEA, desgravamen insurance (with/without devolution), and multi-risk calculations.',
        'Developed robust and scalable RESTful APIs using Node.js (Express), TypeScript, Python, and PHP, fully documented with Swagger under OpenAPI standards.',
        'Designed clean architecture for global error handling and robust JSON payload validation in Express, ensuring system stability and resilience against malicious requests.',
        'Developed and dynamically exported payment schedules in PDF format generated directly in memory to optimize server performance and resource consumption.',
        'Configured security and role-based access control (RBAC) with Express, managing session protection via cookies and strict validation of user privileges (Admin, Superadmin, and public).',
        'Implemented a secure file upload and dynamic media management system on the local server, preventing Path Traversal vulnerabilities and ensuring automatic filename deduplication.',
        'Designed and modeled relational databases using Prisma ORM and MySQL, managing secure migrations without data loss in production environments.',
        'Advanced query refactoring, index design, and latency optimization in relational and non-relational databases to improve global response times.',
        'Integrated payment gateways (Stripe) and advanced integrations with Large Language Models (LLMs) for backend automation and enrichment.',
        'Containerized applications with Docker and configured continuous integration/deployment (CI/CD) pipelines to automate testing and production phases.',
        'Developed custom WordPress plugins and structurally modified existing themes to adapt them to complex logical requirements.',
        'Created dynamic data structures and automated form workflows through advanced usage of JetEngine and Zapier for efficient corporate lead management.',
        'Optimized Web Performance (WPO) and technical SEO on high-traffic corporate portals (such as Distoyota.com), ensuring excellent Core Web Vitals metrics.',
        'Managed, uploaded, and optimized multimedia, article, and product content architectures, ensuring consistency and load speed in production.'
      ]
    },
    {
      date: '2023 - 2025',
      role: 'Freelance Developer | EBS-WebDev',
      company: 'Independent / EBS-WebDev',
      desc: 'Leading engineering and infrastructure for multiple custom applications.',
      bullets: [
        'Implemented and integrated certified local payment plugins such as Nequi & Place to Pay (Official certifications).',
        'Developed custom search widgets for the AViajar Colombia centralizer.',
        'Designed complex network architectures, configuring OSPF, BGP, RIP, and DHCP routing protocols on IPv4/IPv6.',
        'Developed integrated telemedicine systems and e-commerce stores (React Native, Node.js, MongoDB).',
        'Advanced business process automation using N8N and Odoo ERP integrations.'
      ]
    }
  ];

  const projects = lang === 'es' ? projectsEs : projectsEn;
  const timelineData = lang === 'es' ? timelineDataEs : timelineDataEn;

  // --- API Outputs Mapping ---
  const apiOutputs = {
    skills: {
      command: 'curl -X GET https://api.jgarciarf2.dev/v1/habilidades',
      data: {
        status: 200,
        success: true,
        data: {
          fullstack: ['Backend: Node.js, Express, PHP, Python, Java', 'Frontend: HTML, CSS, JS, TS, JSX, TSX, React, Angular, React Native, Tailwind'],
          data_science: ['Machine Learning', 'Redes Neuronales', 'Análisis y Predicción', 'Python', 'R', 'Pandas / NumPy'],
          devops_and_tools: ['Docker', 'Git/GitHub/GitLab', 'Stripe API', 'Zapier & N8N', 'SEO Técnico', 'Linux CLI']
        }
      }
    },
    contacto: {
      command: 'curl -X GET https://api.jgarciarf2.dev/v1/contacto',
      data: {
        status: 200,
        success: true,
        info: {
          email: 'jgarciarf216@gmail.com',
          telefono: '+57 302 321 7019',
          ubicacion: 'Manizales, Caldas, Colombia',
          linkedin: 'https://linkedin.com/in/jgarciarf2',
          github: 'https://github.com/jgarciarf2',
          disponibilidad: 'Inmediata para proyectos de alto impacto'
        }
      }
    }
  };

  // --- Effects ---
  useEffect(() => {
    // Theme sync
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);


  // --- Theme & Language Toggles ---
  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleLanguage = () => {
    setLang(prev => {
      const next = prev === 'es' ? 'en' : 'es';
      localStorage.setItem('lang', next);
      return next;
    });
  };

  // --- Contact Form Submission ---
  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(lang === 'es' 
      ? '¡Gracias por tu mensaje! Me pondré en contacto contigo a la brevedad.' 
      : 'Thank you for your message! I will get in touch with you shortly.'
    );
    (e.target as HTMLFormElement).reset();
  };

  // --- Terminal Tab Selection ---
  const handleTerminalTabClick = (tab: 'skills' | 'contacto') => {
    setTerminalLoading(true);
    setTerminalTab(tab);
    setTimeout(() => {
      setTerminalLoading(false);
    }, 250);
  };

  return (
    <>


      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <span className="logo-text">jgarciarf2</span>
          </div>
          <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <li className="nav-item">
              <a href="#home" className="nav-link magnetic" onClick={() => setIsMenuOpen(false)}>
                {lang === 'es' ? 'Inicio' : 'Home'}
              </a>
            </li>
            <li className="nav-item">
              <a href="#about" className="nav-link magnetic" onClick={() => setIsMenuOpen(false)}>
                {lang === 'es' ? 'Perfil' : 'Profile'}
              </a>
            </li>
            <li className="nav-item">
              <a href="#playground" className="nav-link magnetic" onClick={() => setIsMenuOpen(false)}>
                {lang === 'es' ? 'API Playground' : 'API Playground'}
              </a>
            </li>
            <li className="nav-item">
              <a href="#experience" className="nav-link magnetic" onClick={() => setIsMenuOpen(false)}>
                {lang === 'es' ? 'Experiencia' : 'Experience'}
              </a>
            </li>
            <li className="nav-item">
              <a href="#projects" className="nav-link magnetic" onClick={() => setIsMenuOpen(false)}>
                {lang === 'es' ? 'Proyectos' : 'Projects'}
              </a>
            </li>
            <li className="nav-item">
              <a href="#skills" className="nav-link magnetic" onClick={() => setIsMenuOpen(false)}>
                {lang === 'es' ? 'Habilidades' : 'Skills'}
              </a>
            </li>
            <li className="nav-item">
              <a href="#contact" className="nav-link magnetic" onClick={() => setIsMenuOpen(false)}>
                {lang === 'es' ? 'Contacto' : 'Contact'}
              </a>
            </li>
          </ul>
          <div className="nav-actions">
            <button onClick={toggleLanguage} className="lang-toggle-btn magnetic" aria-label="Cambiar idioma" style={{ marginRight: '10px', background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-primary)', padding: '6px 12px', borderRadius: 'var(--radius-md)', fontSize: '0.8rem', cursor: 'pointer', fontWeight: 600 }}>
              {lang === 'es' ? 'EN' : 'ES'}
            </button>
            <button onClick={toggleTheme} className="theme-toggle-btn magnetic" aria-label="Cambiar tema">
              <i className="fas fa-sun icon-sun"></i>
              <i className="fas fa-moon icon-moon"></i>
            </button>
            <div className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-glow"></div>
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">{lang === 'es' ? 'Ingeniero de Sistemas' : 'Systems Engineer'}</div>
            <h1 className="hero-title">
              {lang === 'es' ? (
                <>Diseñando experiencias frontend y soluciones inteligentes.<br /><span>Creando software de alto nivel.</span></>
              ) : (
                <>Designing frontend experiences and smart solutions.<br /><span>Creating high-level software.</span></>
              )}
            </h1>
            <p className="hero-subtitle">
              {lang === 'es'
                ? 'Especializado en desarrollo backend, buenas prácticas, seguridad, calidad de software, optimización de bases de datos y entrega confiable de soluciones sólidas.'
                : 'Specializing in backend development, best practices, security, software quality, database optimization, and reliable delivery of solid solutions.'}
            </p>
            <div className="hero-buttons">
              <a href="#playground" className="btn btn-primary magnetic">
                {lang === 'es' ? 'Probar API' : 'Try API'}
              </a>
              <a href="#projects" className="btn btn-secondary magnetic">
                {lang === 'es' ? 'Ver Proyectos' : 'View Projects'}
              </a>
              <a href="/resources/CV.pdf" download="Juan_Garcia_CV.pdf" className="btn btn-secondary magnetic" style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}>
                <i className="fas fa-download" style={{ marginRight: '8px' }}></i> {lang === 'es' ? 'Descargar CV' : 'Download CV'}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Section */}
      <section id="about" className="about">
        <div className="container">
          <div className="about-grid">
            <div className="about-info">
              <div className="about-badge">{lang === 'es' ? 'SOBRE MÍ' : 'ABOUT ME'}</div>
              <h2 className="section-title">{lang === 'es' ? 'Perfil Técnico' : 'Technical Profile'}</h2>
              <p className="about-text">
                {lang === 'es' ? (
                  <>Como estudiante de Ingeniería en Sistemas y Computación en la Universidad de Caldas, me enfoco en construir soluciones backend robustas, seguras y mantenibles, con especial cuidado en las buenas prácticas, el control del código y la calidad del software. Mi forma de trabajar se apoya en <strong>SOLID</strong>, <strong>Clean Code</strong> y una mentalidad de mejora continua.</>
                ) : (
                  <>As a Systems Engineering and Computer Science student at Universidad de Caldas, I focus on building robust, secure, and maintainable backend solutions, with special attention to best practices, clean code control, and software quality. My work methodology relies on <strong>SOLID</strong>, <strong>Clean Code</strong>, and a continuous improvement mindset.</>
                )}
              </p>
              <p className="about-text">
                {lang === 'es' ? (
                  <>Cuento con experiencia en optimización de bases de datos relacionales y no relacionales, desarrollo de APIs, seguridad de aplicaciones, automatización de procesos y despliegue de soluciones confiables. Me interesa seguir aprendiendo, asumir responsabilidad técnica y entregar trabajo de alta calidad con compromiso y consistencia.</>
                ) : (
                  <>I have experience in database optimization (relational and non-relational), API development, application security, process automation, and reliable deployment of solutions. I am eager to continue learning, take technical responsibility, and deliver high-quality work with commitment and consistency.</>
                )}
              </p>
              <div className="languages-box">
                <span className="lang-tag">
                  {lang === 'es' ? (
                    <><strong>Inglés:</strong> Avanzado</>
                  ) : (
                    <><strong>English:</strong> Advanced</>
                  )}
                </span>
                <span className="lang-tag">
                  {lang === 'es' ? (
                    <><strong>Español:</strong> Nativo</>
                  ) : (
                    <><strong>Spanish:</strong> Native</>
                  )}
                </span>
              </div>
            </div>
            <div className="about-cards">
              <div className="profile-feature-card">
                <div className="feature-icon"><i className="fas fa-server"></i></div>
                <h3>{lang === 'es' ? 'Backend Sólido' : 'Solid Backend'}</h3>
                <p>
                  {lang === 'es'
                    ? 'Desarrollo de APIs limpias, mantenibles y escalables con foco en control, estabilidad y buenas prácticas.'
                    : 'Development of clean, maintainable, and scalable APIs focused on control, stability, and best practices.'}
                </p>
              </div>
              <div className="profile-feature-card">
                <div className="feature-icon"><i className="fas fa-shield-alt"></i></div>
                <h3>{lang === 'es' ? 'Seguridad & Calidad' : 'Security & Quality'}</h3>
                <p>
                  {lang === 'es'
                    ? 'Construcción responsable, validación cuidadosa y enfoque en confiabilidad, calidad y reducción de riesgos.'
                    : 'Responsible construction, careful validation, and focus on reliability, quality, and risk reduction.'}
                </p>
              </div>
              <div className="profile-feature-card">
                <div className="feature-icon"><i className="fas fa-chart-line"></i></div>
                <h3>{lang === 'es' ? 'Crecimiento Continuo' : 'Continuous Growth'}</h3>
                <p>
                  {lang === 'es'
                    ? 'Compromiso con aprender, mejorar procesos y mantener una evolución técnica constante en cada proyecto.'
                    : 'Commitment to learning, improving processes, and maintaining constant technical evolution in every project.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REST API Playground Section */}
      <section id="playground" className="playground">
        <div className="container">
          <div className="section-header">
            <div className="about-badge">{lang === 'es' ? 'DEMO BACKEND' : 'BACKEND DEMO'}</div>
            <h2 className="section-title">REST API Playground</h2>
            <p className="section-subtitle">
              {lang === 'es'
                ? 'Interactúa con mi perfil consumiendo esta consola de simulación de API RESTful.'
                : 'Interact with my profile using this simulated RESTful API console.'}
            </p>
          </div>

          <div className="terminal-container">
            <div className="terminal-header">
              <div className="terminal-dots">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <div className="terminal-title">api-client - bash</div>
            </div>
            <div className="terminal-body">
              <div className="terminal-tabs">
                <button
                  className={`terminal-tab magnetic ${terminalTab === 'skills' ? 'active' : ''}`}
                  onClick={() => handleTerminalTabClick('skills')}
                >
                  <span className="method get">GET</span> {lang === 'es' ? '/habilidades' : '/skills'}
                </button>
                <button
                  className={`terminal-tab magnetic ${terminalTab === 'contacto' ? 'active' : ''}`}
                  onClick={() => handleTerminalTabClick('contacto')}
                >
                  <span className="method get">GET</span> {lang === 'es' ? '/contacto' : '/contact'}
                </button>
              </div>
              <div className="terminal-console">
                <div className="console-input-line">
                  <span className="prompt">guest@jgarcia-api:~$</span>
                  <span className="cmd-text">{apiOutputs[terminalTab].command}</span>
                </div>
                <div className="console-output">
                  <pre>
                    <code className="json-code">
                      {terminalLoading
                        ? (lang === 'es' ? '... cargando datos desde el servidor simulado ...' : '... loading data from simulated server ...')
                        : JSON.stringify(apiOutputs[terminalTab].data, null, 4)}
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="experience">
        <div className="container">
          <div className="section-header">
            <div className="about-badge">{lang === 'es' ? 'TRAYECTORIA' : 'JOURNEY'}</div>
            <h2 className="section-title">{lang === 'es' ? 'Experiencia Profesional' : 'Professional Experience'}</h2>
            <p className="section-subtitle">
              {lang === 'es'
                ? 'Construyendo y optimizando sistemas robustos de alta demanda.'
                : 'Building and optimizing robust systems for high demand.'}
            </p>
          </div>

          <div className="timeline">
            {timelineData.map((item, idx) => (
              <div className="timeline-item" key={idx}>
                <div className="timeline-dot"></div>
                <div className="timeline-date">{item.date}</div>
                <div className="timeline-content">
                  <span className="badge-role">{item.role}</span>
                  <h3>{item.company}</h3>
                  <p className="timeline-desc">{item.desc}</p>
                  <ul className="timeline-bullets">
                    {item.bullets.map((bullet, bIdx) => (
                      <li key={bIdx}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects">
        <div className="container">
          <div className="section-header">
            <div className="about-badge">{lang === 'es' ? 'CASOS DE ÉXITO' : 'PORTFOLIO'}</div>
            <h2 className="section-title">{lang === 'es' ? 'Proyectos Destacados' : 'Featured Projects'}</h2>
            <p className="section-subtitle">
              {lang === 'es'
                ? 'Descubre los proyectos que demuestran mi capacidad técnica.'
                : 'Discover projects that demonstrate my technical capability.'}
            </p>
          </div>

          <div className="projects-grid">
            {projects.map((project) => (
              <div
                className="project-card"
                key={project.id}
              >
                <div className="project-card-inner">
                  <div className="project-thumbnail-container">
                    <img
                      src={project.thumbnail}
                      alt={project.name}
                      className="project-thumbnail"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </div>
                  <div className="project-details">
                    <div className="project-card-header">
                      <h3>{project.name}</h3>
                      {project.badge && <span className="badge-tech">{project.badge}</span>}
                    </div>
                    <p>{project.desc}</p>
                    <div className="project-features">
                      {project.features.map((feat, fIdx) => (
                        <span key={fIdx}><i className="fas fa-check"></i>{feat}</span>
                      ))}
                    </div>
                    <div className="project-tags">
                      {project.tech.map((t, tIdx) => (
                        <span key={tIdx}>{t}</span>
                      ))}
                    </div>
                    <div className="project-actions">
                      {project.demoLink && (
                        <a
                          href={project.demoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-project magnetic"
                          style={{ marginRight: '20px' }}
                        >
                          <i className="fas fa-external-link-alt"></i> {lang === 'es' ? 'Demo en Vivo' : 'Live Demo'}
                        </a>
                      )}
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-project magnetic"
                      >
                        {project.link.includes('github.com') ? (
                          <><i className="fab fa-github"></i> {lang === 'es' ? 'Repositorio' : 'Repository'}</>
                        ) : (
                          <><i className="fas fa-external-link-alt"></i> {lang === 'es' ? 'Visitar Sitio' : 'Visit Site'}</>
                        )}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills">
        <div className="container">
          <div className="section-header">
            <div className="about-badge">{lang === 'es' ? 'CAPACIDADES' : 'SKILLS'}</div>
            <h2 className="section-title">{lang === 'es' ? 'Habilidades Técnicas' : 'Technical Skills'}</h2>
            <p className="section-subtitle">
              {lang === 'es'
                ? 'El stack tecnológico y patrones arquitectónicos que domino.'
                : 'The technological stack and architectural patterns I master.'}
            </p>
          </div>

          <div className="skills-grid-wrapper">
            <div className="skills-cat-card">
              <h3>Backend & Frontend</h3>
              <div className="skill-tags-group">
                <span><i className="fab fa-node-js" style={{ marginRight: '6px', color: '#68a063' }}></i> Node.js</span>
                <span><i className="fas fa-server" style={{ marginRight: '6px', color: '#808080' }}></i> Express</span>
                <span><i className="fab fa-php" style={{ marginRight: '6px', color: '#777bb4' }}></i> PHP</span>
                <span><i className="fab fa-python" style={{ marginRight: '6px', color: '#3776ab' }}></i> Python</span>
                <span><i className="fab fa-java" style={{ marginRight: '6px', color: '#ea2d2e' }}></i> Java</span>
                <span><i className="fab fa-html5" style={{ marginRight: '6px', color: '#e34f26' }}></i> HTML</span>
                <span><i className="fab fa-css3-alt" style={{ marginRight: '6px', color: '#1572b6' }}></i> CSS</span>
                <span><i className="fab fa-js" style={{ marginRight: '6px', color: '#f7df1e' }}></i> JavaScript</span>
                <span><i className="fab fa-js" style={{ marginRight: '6px', color: '#3178c6' }}></i> TypeScript</span>
                <span><i className="fas fa-code" style={{ marginRight: '6px', color: '#61dafb' }}></i> JSX</span>
                <span><i className="fas fa-code" style={{ marginRight: '6px', color: '#3178c6' }}></i> TSX</span>
                <span><i className="fab fa-react" style={{ marginRight: '6px', color: '#61dafb' }}></i> React</span>
                <span><i className="fab fa-react" style={{ marginRight: '6px', color: '#61dafb' }}></i> React Native</span>
                <span><i className="fab fa-angular" style={{ marginRight: '6px', color: '#dd0031' }}></i> Angular</span>
                <span><i className="fas fa-search" style={{ marginRight: '6px', color: '#4285f4' }}></i> {lang === 'es' ? 'SEO Técnico' : 'Technical SEO'}</span>
                <span><i className="fab fa-css3" style={{ marginRight: '6px', color: '#38bdf8' }}></i> Tailwind CSS</span>
              </div>
            </div>

            <div className="skills-cat-card">
              <h3>{lang === 'es' ? 'Machine Learning & Datos' : 'Machine Learning & Data'}</h3>
              <div className="skill-tags-group">
                <span><i className="fas fa-brain" style={{ marginRight: '6px', color: '#ff6f00' }}></i> Machine Learning</span>
                <span><i className="fas fa-network-wired" style={{ marginRight: '6px', color: '#9c27b0' }}></i> {lang === 'es' ? 'Redes Neuronales' : 'Neural Networks'}</span>
                <span><i className="fas fa-chart-line" style={{ marginRight: '6px', color: '#00bcd4' }}></i> {lang === 'es' ? 'Análisis y Predicción' : 'Analysis & Prediction'}</span>
                <span><i className="fab fa-python" style={{ marginRight: '6px', color: '#3776ab' }}></i> Python</span>
                <span><i className="fas fa-calculator" style={{ marginRight: '6px', color: '#1f425f' }}></i> Pandas / NumPy</span>
              </div>
            </div>

            <div className="skills-cat-card">
              <h3>Databases & DevOps</h3>
              <div className="skill-tags-group">
                <span><i className="fas fa-database" style={{ marginRight: '6px', color: '#336791' }}></i> PostgreSQL</span>
                <span><i className="fas fa-leaf" style={{ marginRight: '6px', color: '#47a248' }}></i> MongoDB</span>
                <span><i className="fas fa-database" style={{ marginRight: '6px', color: '#00758f' }}></i> MySQL</span>
                <span><i className="fas fa-database" style={{ marginRight: '6px', color: '#f80000' }}></i> Oracle</span>
                <span><i className="fas fa-project-diagram" style={{ marginRight: '6px', color: '#2b3547' }}></i> Prisma ORM</span>
                <span><i className="fas fa-network-wired" style={{ marginRight: '6px', color: '#880000' }}></i> Mongoose</span>
                <span><i className="fab fa-git-alt" style={{ marginRight: '6px', color: '#f05032' }}></i> Git & GitHub / GitLab</span>
                <span><i className="fab fa-docker" style={{ marginRight: '6px', color: '#2496ed' }}></i> Docker</span>
                <span><i className="fab fa-stripe-s" style={{ marginRight: '6px', color: '#635bff' }}></i> Stripe</span>
                <span><i className="fas fa-bolt" style={{ marginRight: '6px', color: '#ff4a00' }}></i> Zapier & N8N</span>
                <span><i className="fas fa-file-alt" style={{ marginRight: '6px', color: '#85ea2d' }}></i> Swagger Docs</span>
                <span><i className="fas fa-server" style={{ marginRight: '6px', color: '#607d8b' }}></i> {lang === 'es' ? 'Adm. Servidores' : 'Server Admin'}</span>
                <span><i className="fab fa-linux" style={{ marginRight: '6px', color: '#000000' }}></i> Linux CLI</span>
                <span><i className="fas fa-route" style={{ marginRight: '6px', color: '#e91e63' }}></i> {lang === 'es' ? 'Redes (OSPF/BGP)' : 'Networking (OSPF/BGP)'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="education">
        <div className="container">
          <div className="section-header">
            <div className="about-badge">{lang === 'es' ? 'FORMACIÓN' : 'EDUCATION'}</div>
            <h2 className="section-title">{lang === 'es' ? 'Educación & Certificaciones' : 'Education & Certifications'}</h2>
            <p className="section-subtitle">
              {lang === 'es'
                ? 'Mi camino de aprendizaje formal y especializado.'
                : 'My formal and specialized learning path.'}
            </p>
          </div>

          <div className="education-grid">
            <div className="edu-card">
              <span className="edu-icon"><i className="fas fa-university"></i></span>
              <h3>{lang === 'es' ? 'Ingeniería en Sistemas y Computación' : 'Systems Engineering & Computer Science'}</h3>
              <p className="edu-meta">Universidad de Caldas (2022 - 2027)</p>
              <p className="edu-desc">
                {lang === 'es'
                  ? 'Enfoque en ingeniería de software, arquitectura de sistemas y redes complejas.'
                  : 'Focus on software engineering, systems architecture, and complex networks.'}
              </p>
            </div>
            <div className="edu-card">
              <span className="edu-icon"><i className="fas fa-user-shield"></i></span>
              <h3>{lang === 'es' ? 'Bootcamp en Ciberseguridad' : 'Cybersecurity Bootcamp'}</h3>
              <p className="edu-meta">MinTIC / Universidad de Caldas</p>
              <p className="edu-desc">
                {lang === 'es'
                  ? 'Especialización en análisis de vulnerabilidades, seguridad defensiva y auditorías.'
                  : 'Specialization in vulnerability analysis, defensive security, and audits.'}
              </p>
            </div>
            <div className="edu-card">
              <span className="edu-icon"><i className="fas fa-file-contract-agreement"></i></span>
              <h3>{lang === 'es' ? 'Workshop ISO 27001' : 'Workshop ISO 27001'}</h3>
              <p className="edu-meta">{lang === 'es' ? 'Seguridad de la Información' : 'Information Security'}</p>
              <p className="edu-desc">
                {lang === 'es'
                  ? 'Diseño y auditoría de Sistemas de Gestión de Seguridad de la Información (SGSI).'
                  : 'Design and auditing of Information Security Management Systems (ISMS).'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-header-box">
              <div className="about-badge">{lang === 'es' ? 'CONTACTAR' : 'CONTACT'}</div>
              <h2 className="section-title">{lang === 'es' ? '¿Tienes un proyecto en mente?' : 'Have a project in mind?'}</h2>
              <p className="section-subtitle">
                {lang === 'es'
                  ? 'Hablemos para diseñar y construir sistemas estables, escalables y con rendimiento superior.'
                  : "Let's talk to design and build stable, scalable, and high-performance systems."}
              </p>

              <div className="contact-direct-info">
                <div className="c-info-item">
                  <i className="fas fa-envelope"></i>
                  <div>
                    <span>Email</span>
                    <a href="mailto:jgarciarf216@gmail.com" className="magnetic">jgarciarf216@gmail.com</a>
                  </div>
                </div>
                <div className="c-info-item">
                  <i className="fas fa-map-marker-alt"></i>
                  <div>
                    <span>{lang === 'es' ? 'Ubicación' : 'Location'}</span>
                    <p>{lang === 'es' ? 'Manizales, Caldas, Colombia' : 'Manizales, Caldas, Colombia'}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-form-box">
              <form className="contact-form" onSubmit={handleContactSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">{lang === 'es' ? 'Nombre' : 'Name'}</label>
                    <input type="text" id="name" placeholder={lang === 'es' ? 'Tu Nombre' : 'Your Name'} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder={lang === 'es' ? 'Tu Email' : 'Your Email'} required />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="subject">{lang === 'es' ? 'Asunto' : 'Subject'}</label>
                  <input type="text" id="subject" placeholder={lang === 'es' ? 'Asunto del mensaje' : 'Subject of the message'} required />
                </div>
                <div className="form-group">
                  <label htmlFor="message">{lang === 'es' ? 'Mensaje' : 'Message'}</label>
                  <textarea id="message" rows={4} placeholder={lang === 'es' ? 'Tu Mensaje' : 'Your Message'} required></textarea>
                </div>
                <button type="submit" className="btn btn-primary magnetic">
                  {lang === 'es' ? 'Enviar Mensaje' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-inner">
            <span className="footer-logo">jgarciarf2</span>
            <p>&copy; 2026. {lang === 'es' ? 'Todos los derechos reservados. Diseñado con estilo minimalista.' : 'All rights reserved. Designed with a minimalist style.'}</p>
            <div className="footer-social-links">
              <a href="mailto:jgarciarf216@gmail.com" className="magnetic"><i className="fas fa-envelope"></i></a>
              <a href="https://github.com/jgarciarf2" className="magnetic" target="_blank" rel="noopener noreferrer"><i className="fab fa-github"></i></a>
              <a href="https://linkedin.com/in/jgarciarf2" className="magnetic" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
