import React, { useState, useEffect, useRef } from 'react';

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
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [terminalTab, setTerminalTab] = useState<'skills' | 'contacto'>('skills');
  const [terminalLoading, setTerminalLoading] = useState<boolean>(false);

  // --- Refs ---
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);

  // --- Projects Data ---
  const projects: Project[] = [
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
      features: ['Autenticación por Cookies', 'Desgravamen & Devolution Rate'],
      tech: ['Express', 'TypeScript', 'Prisma ORM', 'PostgreSQL'],
      iconClass: 'fas fa-calculator',
      thumbnail: '/resources/project-simulador-confianza.png'
    },
    {
      id: 'confianza-pe',
      name: 'Confianza.pe',
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
      desc: 'API y base de datos de cervecerías con búsqueda radial por geolocalización. Diseñé todo el backend, la gestión completa de Ads (creación, edición y control), la conexión segura con Stripe y el modelado general de la base de datos.',
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
      desc: 'Desarrollo web corporativo para el concesionario oficial de Toyota. Creación de landings de alta conversión, optimizaciones de SEO on-page y técnico, automatizaciones de formularios complejas con JetEngine y Zapier, y redacción de manuales de uso.',
      features: ['Formularios JetEngine', 'Integración Zapier'],
      tech: ['WordPress', 'JetEngine', 'Zapier', 'SEO Técnico'],
      iconClass: 'fas fa-car',
      thumbnail: '/resources/project-distoyota.png'
    }
  ];

  // --- Timeline Data ---
  const timelineData: TimelineItem[] = [
    {
      date: 'Dic 2025 - Actualidad',
      role: 'Full-Stack & Webmaster',
      company: 'Ariadna Communications',
      desc: 'Desarrollo integral de software y optimización técnica corporativa.',
      bullets: [
        'Desarrollo de APIs RESTful escalables con Node.js, TypeScript, Python y PHP, documentadas con Swagger.',
        'Refactorización avanzada de consultas y optimización de latencia en bases de datos relacionales y no relacionales.',
        'Implementación de contenedores con Docker e integración de flujos CI/CD.',
        'Creación de landing pages avanzadas para Distoyota.com enfocadas en rendimiento, optimización de SEO técnico, creación de manuales, control de contenido y automatización de formularios con JetEngine y Zapier.',
        'Integración de pagos en Stripe e integraciones avanzadas con LLMs (Modelos de IA).'
      ]
    },
    {
      date: '2023 - 2025',
      role: 'Desarrollador Freelance | EBS-WebDev',
      company: 'Independiente / EBS-WebDev',
      desc: 'Liderando la ingeniería e infraestructura de múltiples aplicaciones a medida.',
      bullets: [
        'Implementación e integración de plugins certificados de pago locales como Nequi (certificado oficialmente por Nequi) y Place to Pay.',
        'Desarrollo de widgets de búsqueda personalizados para la centralizadora de Aviajar (aviajarcolombia.com).',
        'Diseño de arquitecturas de red complejas configurando protocolos de enrutamiento OSPF, BGP, RIP, y DHCP en IPv4/IPv6.',
        'Desarrollo de sistemas integrados de telemedicina y tiendas de comercio electrónico (React Native, Node.js, MongoDB).',
        'Automatización avanzada de procesos de negocios utilizando N8N e integraciones ERP Odoo.'
      ]
    }
  ];

  // --- API Outputs Mapping ---
  const apiOutputs = {
    skills: {
      command: 'curl -X GET https://api.jgarciarf2.dev/v1/habilidades',
      data: {
        status: 200,
        success: true,
        data: {
          backend: ['JS/TS', 'PHP (WordPress / Temas / php puro)', 'Python (FastAPI / Django)', 'Java (Spring Boot)', 'PostgreSQL', 'MongoDB', 'MySQL', 'Oracle'],
          arquitectura: ['Microservicios', 'SOLID', 'DDD (Domain-Driven Design)', 'Clean Architecture', 'Clean Code', 'KISS & DRY'],
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

  useEffect(() => {
    // Custom cursor and magnetic effect (Only on desktop)
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current && cursorDotRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
        cursorDotRef.current.style.left = `${e.clientX}px`;
        cursorDotRef.current.style.top = `${e.clientY}px`;
      }
    };

    if (window.innerWidth > 768) {
      document.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // --- Theme Toggle ---
  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // --- Contact Form Submission ---
  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('¡Gracias por tu mensaje! Me pondré en contacto contigo a la brevedad.');
    (e.target as HTMLFormElement).reset();
  };

  // --- Card Mouse Follow (3D Tilt) ---
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth <= 768) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / rect.height) * -15;
    const rotateY = ((x - rect.width / 2) / rect.width) * 15;
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'rotateX(0deg) rotateY(0deg)';
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
      {/* Custom Cursor */}
      <div className="custom-cursor" ref={cursorRef}></div>
      <div className="custom-cursor-dot" ref={cursorDotRef}></div>

      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <span className="logo-text">Juan F. García</span>
          </div>
          <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <li className="nav-item">
              <a href="#home" className="nav-link magnetic" onClick={() => setIsMenuOpen(false)}>Inicio</a>
            </li>
            <li className="nav-item">
              <a href="#about" className="nav-link magnetic" onClick={() => setIsMenuOpen(false)}>Perfil</a>
            </li>
            <li className="nav-item">
              <a href="#playground" className="nav-link magnetic" onClick={() => setIsMenuOpen(false)}>API Playground</a>
            </li>
            <li className="nav-item">
              <a href="#experience" className="nav-link magnetic" onClick={() => setIsMenuOpen(false)}>Experiencia</a>
            </li>
            <li className="nav-item">
              <a href="#projects" className="nav-link magnetic" onClick={() => setIsMenuOpen(false)}>Proyectos</a>
            </li>
            <li className="nav-item">
              <a href="#skills" className="nav-link magnetic" onClick={() => setIsMenuOpen(false)}>Habilidades</a>
            </li>
            <li className="nav-item">
              <a href="#contact" className="nav-link magnetic" onClick={() => setIsMenuOpen(false)}>Contacto</a>
            </li>
          </ul>
          <div className="nav-actions">
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
            <div className="hero-badge">Ingeniero de Sistemas (8vo Semestre)</div>
            <h1 className="hero-title">Diseñando arquitecturas robustas.<br /><span>Creando software de alto nivel.</span></h1>
            <p className="hero-subtitle">Especializado en desarrollo Backend, sistemas distribuidos, optimización de bases de datos y principios SOLID / DDD.</p>
            <div className="hero-buttons">
              <a href="#playground" className="btn btn-primary magnetic">Probar API Playground</a>
              <a href="#projects" className="btn btn-secondary magnetic">Ver Proyectos</a>
            </div>
            <div className="hero-social">
              <a href="mailto:jgarciarf216@gmail.com" className="social-link magnetic" title="Email"><i className="fas fa-envelope"></i></a>
              <a href="https://github.com/jgarciarf2" className="social-link magnetic" target="_blank" title="GitHub"><i className="fab fa-github"></i></a>
              <a href="https://linkedin.com/in/jgarciarf2" className="social-link magnetic" target="_blank" title="LinkedIn"><i className="fab fa-linkedin"></i></a>
              <a href="https://wa.me/573023217019" className="social-link magnetic" target="_blank" title="WhatsApp"><i className="fab fa-whatsapp"></i></a>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Section */}
      <section id="about" className="about">
        <div className="container">
          <div className="about-grid">
            <div className="about-info">
              <div className="about-badge">SOBRE MÍ</div>
              <h2 className="section-title">Perfil Técnico</h2>
              <p className="about-text">
                Como estudiante de Ingeniería en Sistemas y Computación en la Universidad de Caldas, me enfoco en crear arquitecturas backend limpias, eficientes y seguras. Mi enfoque de desarrollo se basa en principios de ingeniería sólidos como <strong>SOLID</strong>, <strong>DDD (Domain-Driven Design)</strong> y <strong>Clean Code</strong>.
              </p>
              <p className="about-text">
                Cuento con amplia experiencia en la optimización de bases de datos relacionales y no relacionales, infraestructura en la nube, despliegue de microservicios contenerizados y automatizaciones de flujos de trabajo corporativos para impulsar la eficiencia empresarial.
              </p>
              <div className="languages-box">
                <span className="lang-tag"><strong>Inglés:</strong> Avanzado</span>
                <span className="lang-tag"><strong>Español:</strong> Nativo</span>
              </div>
            </div>
            <div className="about-cards">
              <div className="profile-feature-card">
                <div className="feature-icon"><i className="fas fa-layer-group"></i></div>
                <h3>Sistemas Distribuidos</h3>
                <p>Diseño e implementación de microservicios robustos y APIs REST de alto rendimiento.</p>
              </div>
              <div className="profile-feature-card">
                <div className="feature-icon"><i className="fas fa-database"></i></div>
                <h3>Optimización de Latencia</h3>
                <p>Refactorización de consultas y modelado de datos escalables (SQL & NoSQL).</p>
              </div>
              <div className="profile-feature-card">
                <div className="feature-icon"><i className="fas fa-shield-alt"></i></div>
                <h3>Seguridad de la Información</h3>
                <p>Certificaciones en Ciberseguridad e ISO 27001 aplicadas al desarrollo de software.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REST API Playground Section */}
      <section id="playground" className="playground">
        <div className="container">
          <div className="section-header">
            <div className="about-badge">BACKEND DEMO</div>
            <h2 className="section-title">REST API Playground</h2>
            <p className="section-subtitle">Interactúa con mi perfil consumiendo esta consola de simulación de API RESTful.</p>
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
                  <span className="method get">GET</span> /habilidades
                </button>
                <button
                  className={`terminal-tab magnetic ${terminalTab === 'contacto' ? 'active' : ''}`}
                  onClick={() => handleTerminalTabClick('contacto')}
                >
                  <span className="method get">GET</span> /contacto
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
                        ? '... cargando datos desde el servidor simulado ...'
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
            <div className="about-badge">TRAYECTORIA</div>
            <h2 className="section-title">Experiencia Profesional</h2>
            <p className="section-subtitle">Construyendo y optimizando sistemas robustos de alta demanda.</p>
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
            <div className="about-badge">CASOS DE ÉXITO</div>
            <h2 className="section-title">Proyectos Destacados</h2>
            <p className="section-subtitle">Descubre los proyectos que demuestran mi capacidad técnica.</p>
          </div>

          <div className="projects-grid">
            {projects.map((project) => (
              <div
                className="project-card tilt-card"
                key={project.id}
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
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
                    <div className="project-thumbnail-fallback">
                      <i className={project.iconClass}></i>
                    </div>
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
                          <i className="fas fa-external-link-alt"></i> Demo en Vivo
                        </a>
                      )}
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-project magnetic"
                      >
                        {project.link.includes('github.com') ? (
                          <><i className="fab fa-github"></i> Repositorio</>
                        ) : (
                          <><i className="fas fa-external-link-alt"></i> Visitar Sitio</>
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
            <div className="about-badge">CAPACIDADES</div>
            <h2 className="section-title">Habilidades Técnicas</h2>
            <p className="section-subtitle">El stack tecnológico y patrones arquitectónicos que domino.</p>
          </div>

          <div className="skills-grid-wrapper">
            <div className="skills-cat-card">
              <h3>Backend & Databases</h3>
              <div className="skill-tags-group">
                <span>Node.js</span>
                <span>Express</span>
                <span>TypeScript</span>
                <span>PHP (WordPress / Temas)</span>
                <span>Python (FastAPI / Django)</span>
                <span>Java (Spring Boot)</span>
                <span>PostgreSQL</span>
                <span>MongoDB</span>
                <span>MySQL</span>
                <span>Oracle</span>
                <span>Prisma ORM</span>
                <span>Mongoose</span>
              </div>
            </div>

            <div className="skills-cat-card">
              <h3>Arquitectura & Patrones</h3>
              <div className="skill-tags-group">
                <span>Microservicios</span>
                <span>SOLID Principles</span>
                <span>DDD (Domain-Driven Design)</span>
                <span>Clean Architecture</span>
                <span>Clean Code</span>
                <span>KISS & DRY</span>
                <span>Design Patterns (Factory / Singleton)</span>
                <span>Monolítico Modular</span>
              </div>
            </div>

            <div className="skills-cat-card">
              <h3>DevOps & Integraciones</h3>
              <div className="skill-tags-group">
                <span>Git & GitHub / GitLab</span>
                <span>Docker</span>
                <span>Stripe (Pasarelas de Pago)</span>
                <span>Zapier & N8N (Automatización)</span>
                <span>SEO Técnico</span>
                <span>Swagger Documentation</span>
                <span>Administración de Servidores</span>
                <span>Linux CLI</span>
                <span>Configuración de Redes (OSPF/BGP)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="education">
        <div className="container">
          <div className="section-header">
            <div className="about-badge">FORMACIÓN</div>
            <h2 className="section-title">Educación & Certificaciones</h2>
            <p className="section-subtitle">Mi camino de aprendizaje formal y especializado.</p>
          </div>

          <div className="education-grid">
            <div className="edu-card">
              <span className="edu-icon"><i className="fas fa-university"></i></span>
              <h3>Ingeniería en Sistemas y Computación</h3>
              <p className="edu-meta">Universidad de Caldas (2022 - 2027) | 8vo Semestre</p>
              <p className="edu-desc">Enfoque en ingeniería de software, arquitectura de sistemas y redes complejas.</p>
            </div>
            <div className="edu-card">
              <span className="edu-icon"><i className="fas fa-user-shield"></i></span>
              <h3>Bootcamp en Ciberseguridad</h3>
              <p className="edu-meta">MinTIC / Universidad de Caldas</p>
              <p className="edu-desc">Especialización en análisis de vulnerabilidades, seguridad defensiva y auditorías.</p>
            </div>
            <div className="edu-card">
              <span className="edu-icon"><i className="fas fa-file-contract-agreement"></i></span>
              <h3>Workshop ISO 27001</h3>
              <p className="edu-meta">Seguridad de la Información</p>
              <p className="edu-desc">Diseño y auditoría de Sistemas de Gestión de Seguridad de la Información (SGSI).</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-header-box">
              <div className="about-badge">CONTACTAR</div>
              <h2 className="section-title">¿Tienes un proyecto en mente?</h2>
              <p className="section-subtitle">Hablemos para diseñar y construir sistemas estables, escalables y con rendimiento superior.</p>

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
                    <span>Ubicación</span>
                    <p>Manizales, Caldas, Colombia</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-form-box">
              <form className="contact-form" onSubmit={handleContactSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Nombre</label>
                    <input type="text" id="name" placeholder="Tu Nombre" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder="Tu Email" required />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Asunto</label>
                  <input type="text" id="subject" placeholder="Asunto del mensaje" required />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Mensaje</label>
                  <textarea id="message" rows={4} placeholder="Tu Mensaje" required></textarea>
                </div>
                <button type="submit" className="btn btn-primary magnetic">Enviar Mensaje</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-inner">
            <span className="footer-logo">Juan F. García</span>
            <p>&copy; 2026. Todos los derechos reservados. Diseñado con estilo minimalista.</p>
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
