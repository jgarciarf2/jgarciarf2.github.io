document.addEventListener('DOMContentLoaded', function () {
    // --- Theme Toggle Logic ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'dark';
    
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    themeToggleBtn.addEventListener('click', () => {
        const activeTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // --- Custom Interactive Cursor ---
    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.custom-cursor-dot');
    
    if (window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
            
            cursorDot.style.left = `${e.clientX}px`;
            cursorDot.style.top = `${e.clientY}px`;
        });

        // Hover Effect on Magnetic/Interactive elements
        const interactiveElements = document.querySelectorAll('.magnetic, a, button, .tilt-card');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hovered');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hovered');
            });
        });

        // Magnetic Button Effect
        const magneticButtons = document.querySelectorAll('.magnetic');
        magneticButtons.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate(0px, 0px)';
            });
        });
    }

    // --- Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const body = document.body;

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        body.classList.toggle('menu-open');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            body.classList.remove('menu-open');
        });
    });

    // --- Active Link Highlighting on Scroll ---
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavigation() {
        const scrollPos = window.scrollY + 160;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    window.addEventListener('scroll', highlightNavigation);
    highlightNavigation();

    // --- 3D Tilt Effect on Project Cards ---
    const tiltCards = document.querySelectorAll('.tilt-card');
    if (window.innerWidth > 768) {
        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const rotateX = ((y - rect.height / 2) / rect.height) * -15; // Max 15 degrees tilt
                const rotateY = ((x - rect.width / 2) / rect.width) * 15;
                
                card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
            
            card.style.addEventListener ? card.addEventListener('mouseleave', () => {
                card.style.transform = 'rotateX(0deg) rotateY(0deg)';
            }) : card.onmouseleave = () => {
                card.style.transform = 'rotateX(0deg) rotateY(0deg)';
            };
        });
    }

    // --- REST API Playground Console Simulator ---
    const terminalTabs = document.querySelectorAll('.terminal-tab');
    const terminalCmd = document.getElementById('terminal-cmd');
    const jsonRenderer = document.getElementById('json-renderer');

    const apiOutputs = {
        proyectos: {
            command: "curl -X GET https://api.jgarciarf2.dev/v1/proyectos",
            data: {
                status: 200,
                success: true,
                count: 4,
                data: [
                    {
                        name: "Finanzas Pro (Finance App)",
                        type: "Full-Stack Dashboard",
                        tech: ["Next.js 16", "Supabase", "TypeScript", "Vanilla CSS"],
                        features: "12-month projections, dynamic amortization, custom interactive charts"
                    },
                    {
                        name: "Confianza Backend",
                        type: "Enterprise REST API",
                        tech: ["Express", "TypeScript", "Prisma ORM", "PostgreSQL"],
                        features: "1000+ endpoints, secure Cookie auth (no JWT), desgravamen simulation"
                    },
                    {
                        name: "BAT Backend & Anuncios",
                        type: "Full Backend & Geolocalización",
                        tech: ["Node.js", "MongoDB", "Mongoose", "Stripe API"],
                        features: "Stripe subscriptions, geo radial query, dynamic Ads campaign control"
                    },
                    {
                        name: "ESEIT Convenios Académicos",
                        type: "Custom Theme & Interactive Front-End",
                        tech: ["PHP", "SCSS", "GSAP Animations", "WordPress"],
                        features: "Custom WordPress templates, interactive GSAP partner modals"
                    }
                ]
            }
        },
        simulador: {
            command: "curl -X POST https://api.jgarciarf2.dev/v1/simulador-credito \\\\\n  -H 'Content-Type: application/json' \\\\\n  -d '{\"monto\": 5000, \"cuotas\": 12, \"seguro\": \"con-devolucion\"}'",
            data: {
                status: 201,
                success: true,
                simulation: {
                    monto_solicitado: 5000.00,
                    moneda: "PEN",
                    plazo_meses: 12,
                    tasa_efectiva_mensual: "1.408%",
                    seguro_desgravamen: {
                        tipo: "con-devolucion",
                        tasa_devolucion: "0.14079%"
                    },
                    cronograma_resumido: [
                        { cuota: 1, saldo_inicial: 5000.00, amortizacion: 385.50, interes: 70.40, desgravamen: 7.04, total_cuota: 462.94 },
                        { cuota: 2, saldo_inicial: 4614.50, amortizacion: 390.93, interes: 64.97, desgravamen: 6.50, total_cuota: 462.40 },
                        { cuota: "...", nota: "Cronograma completo de 12 cuotas calculado mediante fórmulas estándar" }
                    ]
                }
            }
        },
        skills: {
            command: "curl -X GET https://api.jgarciarf2.dev/v1/habilidades",
            data: {
                status: 200,
                success: true,
                data: {
                    backend: ["JS/TS", "PHP (WordPress / Temas / php puro)", "Python (FastAPI / Django)", "Java (Spring Boot)", "PostgreSQL", "MongoDB", "MySQL", "Oracle"],
                    arquitectura: ["Microservicios", "SOLID", "DDD (Domain-Driven Design)", "Clean Architecture", "Clean Code", "KISS & DRY"],
                    devops_and_tools: ["Docker", "Git/GitHub/GitLab", "Stripe API", "Zapier & N8N", "SEO Técnico", "Linux CLI"]
                }
            }
        },
        contacto: {
            command: "curl -X GET https://api.jgarciarf2.dev/v1/contacto",
            data: {
                status: 200,
                success: true,
                info: {
                    email: "jgarciarf216@gmail.com",
                    telefono: "+57 302 321 7019",
                    ubicacion: "Manizales, Caldas, Colombia",
                    linkedin: "https://linkedin.com/in/jgarciarf2",
                    github: "https://github.com/jgarciarf2",
                    disponibilidad: "Inmediata para proyectos de alto impacto"
                }
            }
        }
    };

    function renderOutput(tabKey) {
        const target = apiOutputs[tabKey];
        terminalCmd.textContent = target.command;
        
        // Show temporary loading indicator
        jsonRenderer.textContent = "... cargando datos desde el servidor simulado ...";
        
        setTimeout(() => {
            jsonRenderer.textContent = JSON.stringify(target.data, null, 4);
        }, 300);
    }

    terminalTabs.forEach(tab => {
        tab.addEventListener('click', function () {
            terminalTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            const endpoint = this.getAttribute('data-endpoint');
            renderOutput(endpoint);
        });
    });

    // Render projects tab by default
    renderOutput('proyectos');

    // Form Submission Handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('¡Gracias por tu mensaje! Me pondré en contacto contigo a la brevedad.');
            contactForm.reset();
        });
    }
});