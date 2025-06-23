// Enhanced eTU UM5 Portal - Content Script
// Professional UI enhancement with Lucide SVG icons (CSP-safe)

(function() {
    'use strict';
    
    // Configuration
    let currentTheme = 'light';
    let currentGradient = 'gradient-1';
    let isEnabled = true;    // Service definitions with Lucide icons and real extracted text
    const serviceDefinitions = {
        // MON PROFIL ÉTUDIANT section
        'profil': [            {
                icon: '👤',
                lucideIcon: 'user-circle',
                title: 'Informations Personnelles',
                description: 'Gérez vos informations personnelles et académiques'
            },
            {
                icon: '📝',
                lucideIcon: 'edit',
                title: 'Inscription Administrative',
                description: 'Complétez votre inscription administrative'
            },
            {
                icon: '📋',
                lucideIcon: 'file-text',
                title: 'Contrat Pédagogique',
                description: 'Consultez et validez votre contrat pédagogique'
            }
        ],
        // E-SCOLARITÉ section  
        'scolarite': [
            {
                icon: '📜',
                lucideIcon: 'award',
                title: 'Attestation d\'Inscription',
                description: 'Téléchargez votre attestation d\'inscription'
            },
            {
                icon: '🏆',
                lucideIcon: 'trophy',
                title: 'Attestation de Réussite',
                description: 'Attestation de réussite aux examens'
            },            {
                icon: '📊',
                lucideIcon: 'bar-chart-3',
                title: 'Relevé de Notes',
                description: 'Consultez vos relevés de notes officiels'
            },
            {
                icon: '📈',
                lucideIcon: 'trending-up',
                title: 'Notes et Résultats',
                description: 'Accédez à vos notes et résultats d\'examens'
            }
        ],
        // MON EMPLOI DU TEMPS section
        'emploi': [
            {
                icon: '📅',
                lucideIcon: 'calendar',
                title: 'Mon Emploi du Temps',
                description: 'Consultez votre planning de cours détaillé'
            }
        ],
        // COURS EN LIGNE section
        'cours': [
            {
                icon: '🎓',
                lucideIcon: 'graduation-cap',
                title: 'Moodle',
                description: 'Plateforme d\'apprentissage en ligne Moodle'
            },
            {
                icon: '📚',
                lucideIcon: 'book-open',
                title: 'MOOC',
                description: 'Cours en ligne ouverts et massifs'
            },
            {
                icon: '💬',
                lucideIcon: 'video',
                title: 'Google Meet',
                description: 'Participez aux cours en visioconférence'
            },
            {
                icon: '👥',
                lucideIcon: 'users',
                title: 'Microsoft Teams',
                description: 'Collaboration et communication d\'équipe'
            }
        ],
        // MES AUTRES SERVICES section
        'services': [
            {
                icon: '📧',
                lucideIcon: 'mail',
                title: 'Email',
                description: 'Accédez à votre messagerie universitaire'
            },
            {
                icon: '☁️',
                lucideIcon: 'cloud',
                title: 'Stockage',
                description: 'Espace de stockage cloud universitaire'
            },
            {
                icon: '📋',
                lucideIcon: 'clipboard-list',
                title: 'Planificateur',
                description: 'Organisez vos tâches et projets'
            },
            {
                icon: '✅',
                lucideIcon: 'check-square',
                title: 'To Do',
                description: 'Gérez votre liste de tâches à faire'
            }
        ],
        // RESSOURCES ÉLECTRONIQUES section
        'ressources': [
            {
                icon: '🗄️',
                lucideIcon: 'database',
                title: 'Base de Données',
                description: 'Accédez aux ressources numériques de l\'université'
            }
        ]
    };    // Initialize when DOM is ready
    function init() {        console.log('Enhanced eTU Portal: Initializing...');
        
        // Inject Lucide Icons
        injectLucideIcons();
        
        // Create custom navbar
        createCustomNavbar();
        
        // Create custom footer
        createCustomFooter();
        
        // Load saved preferences
        loadSettings();
        
        // Apply theme and gradient immediately
        applyTheme();
        applyGradient();
        
        // Create controls
        createThemeToggle();
        createGradientSelector();
        
        // Enhance service cards
        enhanceServiceCards();
        
        // Register with background script
        registerTab();
        
        console.log('Enhanced eTU Portal: Activated successfully!');
    }    // Lucide Icons SVG data (manual implementation to avoid CSP issues)
    const lucideIcons = {
        'user-circle': '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="10" r="3"/><path d="m7 20.662 10 0"/>',
        'edit': '<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="m18.5 2.5 3 3L12 15l-4 1 1-4z"/>',
        'file-text': '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>',
        'award': '<circle cx="12" cy="8" r="6"/><path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"/>',
        'trophy': '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55.47.98.97 1.21C12.04 18.75 13 20.24 13 22"/><path d="M14 14.66V17c0 .55-.53.98-1.03 1.21C11.96 18.75 11 20.24 11 22"/><rect width="8" height="12" x="8" y="2" rx="2"/>',
        'bar-chart-3': '<path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>',
        'trending-up': '<polyline points="22,7 13.5,15.5 8.5,10.5 2,17"/><polyline points="16,7 22,7 22,13"/>',
        'calendar-days': '<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="m9 16 2 2 4-4"/>',
        'graduation-cap': '<path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/>',
        'book-open': '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
        'video': '<path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"/><rect x="2" y="6" width="14" height="12" rx="2"/>',
        'users': '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="m22 21-3.2-3.2"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
        'mail': '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>',
        'cloud': '<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>',
        'clipboard-list': '<rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/>',
        'check-square': '<polyline points="9,11 12,14 22,4"/><path d="m21 12-7 7-3-3"/>',
        'database': '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/>',        'external-link': '<path d="M15 3h6v6"/><path d="m10 14 9-9"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
        'megaphone': '<path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>',
        'calendar': '<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>',
        'facebook': '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
        'twitter': '<path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>',
        'youtube': '<path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4C5.9 5.1 12 5 12 5s6.1.1 8.1.6A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4c-2 .5-8.1.6-8.1.6s-6.1-.1-8.1-.6A2 2 0 0 1 2.5 17Z"/><polygon points="10,15 15,12 10,9"/>',
        'linkedin': '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>',
        'globe': '<circle cx="12" cy="12" r="10"/><path d="m2 12 20 0"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
        'building': '<rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/>',
        'school': '<path d="M14 22v-4a2 2 0 1 0-4 0v4"/><path d="m18 10 4 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8l4-2"/><path d="M18 5v17"/><path d="m4 6 8-4 8 4"/><path d="M6 5v17"/><circle cx="12" cy="9" r="2"/>'
    };

    // Create Lucide SVG icon
    function createLucideIcon(iconName, size = '2.5rem') {
        const iconData = lucideIcons[iconName];
        if (!iconData) {
            console.warn(`Lucide icon "${iconName}" not found`);
            return null;
        }

        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', size);
        svg.setAttribute('height', size);
        svg.setAttribute('viewBox', '0 0 24 24');
        svg.setAttribute('fill', 'none');
        svg.setAttribute('stroke', 'currentColor');
        svg.setAttribute('stroke-width', '1.5');
        svg.setAttribute('stroke-linecap', 'round');
        svg.setAttribute('stroke-linejoin', 'round');
        svg.style.cssText = `color: inherit; width: ${size}; height: ${size};`;
        svg.innerHTML = iconData;

        return svg;
    }

    // No need for external script injection
    function injectLucideIcons() {
        console.log('Lucide Icons: Using manual SVG implementation (CSP-safe)');
        // Icons are created on-demand, no external loading needed
    }// Enhance service cards with better text extraction and fallback icons
    function enhanceServiceCards() {
        setTimeout(() => {
            const panels = document.querySelectorAll('.panel');
            
            panels.forEach((panel, panelIndex) => {
                const heading = panel.querySelector('.panel-heading');
                const linkContainers = panel.querySelectorAll('.panel-body > div[class*="col-"]');
                
                if (!heading) return;
                  const headingText = heading.textContent.toLowerCase();
                
                linkContainers.forEach((container, index) => {
                    const link = container.querySelector('a');
                    if (!link) return;
                    
                    let originalText = '';
                    let service = null;
                    
                    // Check if link contains an image
                    const img = link.querySelector('img');
                    if (img) {                        // Extract service info from image filename
                        const imgSrc = img.src;
                        const filename = imgSrc.split('/').pop().split('.')[0];
                        
                        service = getServiceFromImage(filename, headingText);
                        originalText = service.title;
                    } else {
                        // Extract from text content
                        originalText = link.textContent.trim();                        if (originalText) {
                            service = {
                                icon: getIconForText(originalText),
                                lucideIcon: getLucideIconForText(originalText),
                                title: originalText,
                                description: getDescriptionForText(originalText)
                            };
                        }
                    }
                    
                    if (!service) return;
                    
                    // Clear existing content but preserve href
                    const href = link.href;
                    link.innerHTML = '';
                    link.href = href;
                    
                    // Create service card structure
                    const cardContent = document.createElement('div');
                    cardContent.className = 'service-card-content';                    cardContent.style.cssText = `
                        display: flex !important;
                        flex-direction: column !important;
                        align-items: center !important;
                        justify-content: center !important;
                        text-align: center !important;
                        height: 100% !important;
                        position: relative !important;
                        z-index: 1 !important;
                        padding: 1rem !important;
                    `;// Add icon (Lucide with emoji fallback)
                    const iconElement = document.createElement('div');
                    iconElement.className = 'service-icon';                    iconElement.style.cssText = `
                        font-size: 2.5rem !important;
                        margin-bottom: 1rem !important;
                        color: var(--primary-solid) !important;
                        transition: all 0.3s ease !important;
                        display: flex !important;
                        align-items: center !important;
                        justify-content: center !important;
                        min-height: 2.5rem !important;
                    `;                    // Create Lucide SVG icon using manual implementation
                    if (service.lucideIcon) {
                        const lucideSvg = createLucideIcon(service.lucideIcon, '2.5rem');
                        if (lucideSvg) {
                            lucideSvg.style.cssText += 'color: var(--primary-solid) !important;';
                            iconElement.appendChild(lucideSvg);
                        } else {
                            // Fallback to emoji if Lucide icon not found
                            iconElement.innerHTML = service.icon;
                        }
                    } else {
                        iconElement.textContent = service.icon;
                    }
                    
                    // Add title
                    const titleElement = document.createElement('div');
                    titleElement.className = 'service-title';
                    titleElement.textContent = service.title;
                    titleElement.style.cssText = `
                        font-size: 1.1rem !important;
                        font-weight: 700 !important;
                        margin-bottom: 0.5rem !important;
                        color: var(--text-primary) !important;
                        line-height: 1.3 !important;
                        text-align: center !important;
                    `;
                    
                    // Add description
                    const descElement = document.createElement('div');
                    descElement.className = 'service-description';
                    descElement.textContent = service.description;
                    descElement.style.cssText = `
                        font-size: 0.875rem !important;
                        font-weight: 400 !important;
                        color: var(--text-muted) !important;
                        line-height: 1.4 !important;
                        text-align: center !important;
                        max-width: 220px !important;
                        margin: 0 auto !important;
                    `;
                    
                    // Assemble the card
                    cardContent.appendChild(iconElement);
                    cardContent.appendChild(titleElement);
                    cardContent.appendChild(descElement);                    link.appendChild(cardContent);
                });            });
            
        }, 1000); // Wait for DOM to be ready
    }
      // Get service info from image filename
    function getServiceFromImage(filename, sectionTitle) {
        
        // Map image filenames to services
        const imageMap = {            'informations_personnelle': {
                icon: '👤',
                lucideIcon: 'user-circle',
                title: 'Informations Personnelles',
                description: 'Consultez et modifiez vos informations personnelles'
            },            'inscription_administrative': {
                icon: '📝',
                lucideIcon: 'edit',
                title: 'Inscription Administrative',
                description: 'Complétez votre inscription administrative'
            },
            'contrat_pedagogique': {
                icon: '📋',
                lucideIcon: 'file-text',
                title: 'Contrat Pédagogique',
                description: 'Gérez votre contrat pédagogique'
            },
            'attestation_inscription': {
                icon: '📜',
                lucideIcon: 'award',
                title: 'Attestation d\'Inscription',
                description: 'Téléchargez votre attestation d\'inscription'
            },
            'attestation_reussite': {
                icon: '🏆',
                lucideIcon: 'trophy',
                title: 'Attestation de Réussite',
                description: 'Attestation de réussite aux examens'
            },
            'releve_notes': {
                icon: '📊',
                lucideIcon: 'bar-chart-3',
                title: 'Relevé de Notes',
                description: 'Consultez vos relevés de notes officiels'
            },
            'notes_reultats': {
                icon: '📈',
                lucideIcon: 'trending-up',
                title: 'Notes et Résultats',
                description: 'Accédez à vos notes et résultats d\'examens'            },
            'planning': {
                icon: '📅',
                lucideIcon: 'calendar-days',
                title: 'Mon Emploi du Temps',
                description: 'Consultez votre planning de cours'
            },
            'moodle': {
                icon: '🎓',
                lucideIcon: 'graduation-cap',
                title: 'Moodle',
                description: 'Plateforme d\'apprentissage Moodle'
            },
            'mooc': {
                icon: '📚',
                lucideIcon: 'book-open',
                title: 'MOOC',
                description: 'Cours en ligne ouverts et massifs'
            },
            'meet': {
                icon: '💬',
                lucideIcon: 'video',
                title: 'Google Meet',
                description: 'Participez aux cours en visioconférence'
            },
            'teams': {
                icon: '👥',
                lucideIcon: 'users',
                title: 'Microsoft Teams',
                description: 'Collaboration et communication d\'équipe'
            },
            'outlook': {
                icon: '📧',
                lucideIcon: 'mail',
                title: 'Email',
                description: 'Accédez à votre messagerie universitaire'
            },
            'oneDrive': {
                icon: '☁️',
                lucideIcon: 'cloud',
                title: 'Stockage',
                description: 'Espace de stockage cloud universitaire'
            },
            'planner': {
                icon: '📋',
                lucideIcon: 'clipboard-list',
                title: 'Planificateur',
                description: 'Organisez vos tâches et projets'
            },
            'to-do': {
                icon: '✅',
                lucideIcon: 'check-square',
                title: 'To Do',
                description: 'Gérez votre liste de tâches'
            },
            'eressources': {
                icon: '🗄️',
                lucideIcon: 'database',
                title: 'Ressources Électroniques',
                description: 'Accédez aux ressources numériques'
            }
        };        return imageMap[filename] || {
            icon: '📎',
            lucideIcon: 'external-link',
            title: filename.replace(/_/g, ' ').toUpperCase(),
            description: 'Service universitaire'
        };
    }
    
    // Helper function to get emoji icon based on text content
    function getIconForText(text) {
        const textLower = text.toLowerCase();
        
        if (textLower.includes('profil') || textLower.includes('personnel')) return '👤';
        if (textLower.includes('inscription')) return '📝';
        if (textLower.includes('contrat') || textLower.includes('pédagogique')) return '📋';
        if (textLower.includes('attestation') && textLower.includes('inscription')) return '📜';
        if (textLower.includes('attestation') && textLower.includes('réussite')) return '🏆';
        if (textLower.includes('relevé') || textLower.includes('notes')) return '📊';
        if (textLower.includes('résultats')) return '📈';
        if (textLower.includes('emploi') || textLower.includes('temps')) return '📅';
        if (textLower.includes('moodle')) return '🎓';
        if (textLower.includes('mooc')) return '📚';
        if (textLower.includes('google') || textLower.includes('meet')) return '💬';
        if (textLower.includes('microsoft') || textLower.includes('teams')) return '👥';
        if (textLower.includes('email') || textLower.includes('mail')) return '📧';
        if (textLower.includes('stockage') || textLower.includes('cloud')) return '☁️';
        if (textLower.includes('planificateur')) return '📋';
        if (textLower.includes('todo') || textLower.includes('do')) return '✅';
        if (textLower.includes('base') || textLower.includes('données')) return '🗄️';
        if (textLower.includes('actualité') || textLower.includes('news')) return '📢';
        
        return '📎'; // Default icon
    }      // Helper function to get Lucide icon based on text content
    function getLucideIconForText(text) {
        const textLower = text.toLowerCase();
        
        if (textLower.includes('profil') || textLower.includes('personnel')) return 'user-circle';
        if (textLower.includes('inscription')) return 'edit';
        if (textLower.includes('contrat') || textLower.includes('pédagogique')) return 'file-text';
        if (textLower.includes('attestation') && textLower.includes('inscription')) return 'award';
        if (textLower.includes('attestation') && textLower.includes('réussite')) return 'trophy';
        if (textLower.includes('relevé') || textLower.includes('notes')) return 'bar-chart-3';
        if (textLower.includes('résultats')) return 'trending-up';
        if (textLower.includes('emploi') || textLower.includes('temps')) return 'calendar-days';
        if (textLower.includes('moodle')) return 'graduation-cap';
        if (textLower.includes('mooc')) return 'book-open';
        if (textLower.includes('google') || textLower.includes('meet')) return 'video';
        if (textLower.includes('microsoft') || textLower.includes('teams')) return 'users';
        if (textLower.includes('email') || textLower.includes('mail')) return 'mail';
        if (textLower.includes('stockage') || textLower.includes('cloud')) return 'cloud';
        if (textLower.includes('planificateur')) return 'clipboard-list';
        if (textLower.includes('todo') || textLower.includes('do')) return 'check-square';
        if (textLower.includes('base') || textLower.includes('données')) return 'database';
        if (textLower.includes('actualité') || textLower.includes('news')) return 'megaphone';
        
        return 'external-link'; // Default icon
    }
    
    // Helper function to generate description based on text content
    function getDescriptionForText(text) {
        const textLower = text.toLowerCase();
        
        if (textLower.includes('information') && textLower.includes('personnel')) {
            return 'Consultez et modifiez vos informations personnelles';
        }
        if (textLower.includes('inscription') && textLower.includes('administrative')) {
            return 'Complétez votre inscription administrative';
        }
        if (textLower.includes('contrat') && textLower.includes('pédagogique')) {
            return 'Gérez votre contrat pédagogique';
        }
        if (textLower.includes('attestation')) {
            return 'Téléchargez vos attestations officielles';
        }
        if (textLower.includes('relevé') || textLower.includes('notes')) {
            return 'Consultez vos notes et relevés';
        }
        if (textLower.includes('emploi') || textLower.includes('temps')) {
            return 'Accédez à votre planning de cours';
        }
        if (textLower.includes('moodle')) {
            return 'Plateforme d\'apprentissage Moodle';
        }
        if (textLower.includes('mooc')) {
            return 'Cours en ligne ouverts et massifs';
        }
        if (textLower.includes('email')) {
            return 'Accédez à votre messagerie universitaire';
        }
        
        return `Accédez au service ${text}`;
    }
    
    // Load settings from storage
    function loadSettings() {
        if (typeof chrome !== 'undefined' && chrome.storage) {
            chrome.storage.sync.get(['theme', 'gradient', 'isEnabled'], (result) => {
                currentTheme = result.theme || 'light';
                currentGradient = result.gradient || 'gradient-1';
                isEnabled = result.isEnabled !== false;
                applyTheme();
                applyGradient();
            });
        }
    }
    
    // Save settings to storage
    function saveSettings() {
        if (typeof chrome !== 'undefined' && chrome.storage) {
            chrome.storage.sync.set({
                theme: currentTheme,
                gradient: currentGradient,
                isEnabled: isEnabled
            });
        }
    }
    
    // Apply theme to document
    function applyTheme() {
        document.documentElement.setAttribute('data-theme', currentTheme);
        updateThemeToggle();
    }
    
    // Apply gradient theme
    function applyGradient() {
        const root = document.documentElement;
        root.style.setProperty('--gradient-theme', `var(--${currentGradient})`);
    }
    
    // Create floating theme toggle button
    function createThemeToggle() {
        const existing = document.querySelector('.enhanced-theme-toggle');
        if (existing) existing.remove();
        
        const toggle = document.createElement('button');
        toggle.className = 'enhanced-theme-toggle';
        toggle.innerHTML = currentTheme === 'light' ? '🌙' : '☀️';
        toggle.title = 'Changer le thème (Light/Dark)';
        toggle.setAttribute('aria-label', 'Toggle theme');
        
        toggle.style.cssText = `
            position: fixed !important;
            top: 20px !important;
            right: 20px !important;
            z-index: 99999 !important;
            background: rgba(255, 255, 255, 0.95) !important;
            border: 2px solid rgba(102, 126, 234, 0.8) !important;
            border-radius: 50% !important;
            width: 50px !important;
            height: 50px !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            font-size: 1.5rem !important;
            cursor: pointer !important;
            transition: all 0.3s ease !important;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15) !important;
            backdrop-filter: blur(10px) !important;
        `;
        
        toggle.addEventListener('mouseenter', () => {
            toggle.style.transform = 'scale(1.1)';
            toggle.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.25)';
        });
        
        toggle.addEventListener('mouseleave', () => {
            toggle.style.transform = 'scale(1)';
            toggle.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
        });
        
        toggle.addEventListener('click', toggleTheme);
        
        const addToBody = () => {
            if (document.body) {
                document.body.appendChild(toggle);
            } else {
                setTimeout(addToBody, 100);
            }
        };
        addToBody();
    }
    
    // Create gradient selector
    function createGradientSelector() {
        const existing = document.querySelector('.enhanced-gradient-selector');
        if (existing) existing.remove();
        
        const selector = document.createElement('div');
        selector.className = 'enhanced-gradient-selector';
        selector.innerHTML = `
            <div class="gradient-title">🎨</div>
            <div class="gradient-options">
                <div class="gradient-option" data-gradient="gradient-1" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%)"></div>
                <div class="gradient-option" data-gradient="gradient-2" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"></div>
                <div class="gradient-option" data-gradient="gradient-3" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"></div>
                <div class="gradient-option" data-gradient="gradient-4" style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"></div>
                <div class="gradient-option" data-gradient="gradient-5" style="background: linear-gradient(135deg, #fa709a 0%, #fee140 100%)"></div>
                <div class="gradient-option" data-gradient="gradient-6" style="background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)"></div>
                <div class="gradient-option" data-gradient="gradient-7" style="background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)"></div>
                <div class="gradient-option" data-gradient="gradient-8" style="background: linear-gradient(135deg, #1fa2ff 0%, #12d8fa 0%, #a6ffcb 100%)"></div>
            </div>
        `;
        
        selector.style.cssText = `
            position: fixed !important;
            top: 80px !important;
            right: 20px !important;
            z-index: 99998 !important;
            background: rgba(255, 255, 255, 0.95) !important;
            border: 2px solid rgba(102, 126, 234, 0.8) !important;
            border-radius: 16px !important;
            padding: 12px !important;
            backdrop-filter: blur(10px) !important;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15) !important;
            opacity: 0 !important;
            transform: translateX(100%) !important;
            transition: all 0.3s ease !important;
        `;
        
        // Style gradient title
        const title = selector.querySelector('.gradient-title');
        title.style.cssText = `
            text-align: center !important;
            font-size: 1.2rem !important;
            margin-bottom: 8px !important;
            cursor: pointer !important;
        `;
        
        // Style gradient options container
        const options = selector.querySelector('.gradient-options');
        options.style.cssText = `
            display: grid !important;
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 8px !important;
            max-height: 0 !important;
            overflow: hidden !important;
            transition: max-height 0.3s ease !important;
        `;
        
        // Style individual gradient options
        selector.querySelectorAll('.gradient-option').forEach(option => {
            option.style.cssText = `
                width: 24px !important;
                height: 24px !important;
                border-radius: 50% !important;
                cursor: pointer !important;
                border: 2px solid transparent !important;
                transition: all 0.3s ease !important;
            `;
              option.addEventListener('click', () => {
                currentGradient = option.dataset.gradient;
                applyGradient();
                saveSettings();
                showNotification(`Thème gradient ${currentGradient.replace('gradient-', '')} appliqué!`);
                
                // Dispatch gradient changed event for footer update
                document.dispatchEvent(new CustomEvent('gradientChanged', { 
                    detail: { gradient: currentGradient } 
                }));
                
                // Update active state
                selector.querySelectorAll('.gradient-option').forEach(opt => {
                    opt.style.border = '2px solid transparent';
                });
                option.style.border = '2px solid #667eea';
            });
            
            if (option.dataset.gradient === currentGradient) {
                option.style.border = '2px solid #667eea';
            }
        });
        
        // Toggle functionality
        title.addEventListener('click', () => {
            const isOpen = options.style.maxHeight !== '0px';
            options.style.maxHeight = isOpen ? '0px' : '100px';
        });
        
        // Show/hide on hover
        const themeToggle = document.querySelector('.enhanced-theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('mouseenter', () => {
                selector.style.opacity = '1';
                selector.style.transform = 'translateX(0)';
            });
            
            setTimeout(() => {
                if (!selector.matches(':hover') && !themeToggle.matches(':hover')) {
                    selector.style.opacity = '0';
                    selector.style.transform = 'translateX(100%)';
                }
            }, 2000);
        }
        
        const addToBody = () => {
            if (document.body) {
                document.body.appendChild(selector);
            } else {
                setTimeout(addToBody, 100);
            }
        };
        addToBody();
    }    // Create modern ETU navbar with original links and current gradient
    function createCustomNavbar() {
        // Wait for DOM to be ready and find the original navbar
        setTimeout(() => {
            const originalNavbar = document.querySelector('.navbar, nav.navbar');
            if (!originalNavbar) {
                console.warn('Original navbar not found');
                return;
            }

            // Configuration
            const CONFIG = {
                NAVBAR_ID: 'etu-enhanced-navbar',
                DROPDOWN_CLASS: 'etu-dropdown',
                ACTIVE_CLASS: 'etu-active',
                SHOW_CLASS: 'etu-show'
            };

            // Lucide SVG Icons for fallback and enhancement
            const ICONS = {
                home: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>',
                user: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
                book: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>',
                settings: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2.18l.2 1.83a2 2 0 0 1-.26 1.31l-1.29 2.23a2 2 0 0 1-1.72 1l-1.84-.03a2 2 0 0 0-1.63 2.87l.22.38a2 2 0 0 0 1.73 1h1.84a2 2 0 0 1 1.31.26l2.23 1.29a2 2 0 0 1 1 1.72l.03 1.84a2 2 0 0 0 2.87 1.63l.38-.22a2 2 0 0 0 1-1.73v-1.84a2 2 0 0 1 .26-1.31l1.29-2.23a2 2 0 0 1 1.72-1l1.84.03a2 2 0 0 0 1.63-2.87l-.22-.38a2 2 0 0 0-1.73-1h-1.84a2 2 0 0 1-1.31-.26L16.5 7.22a2 2 0 0 1-1-1.72l-.03-1.84a2 2 0 0 0-2.87-1.63l-.38.22a2 2 0 0 0-1 1.73v1.84a2 2 0 0 1-.26 1.31L9.67 8.36a2 2 0 0 1-1.72 1l-1.84-.03z"/><circle cx="12" cy="12" r="3"/></svg>',
                chevronDown: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>',
                fileText: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><line x1="10" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/></svg>',
                calendar: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>',
                creditCard: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>',
                mail: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-10 5L2 7"/></svg>',
                users: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="m22 21-3-3m0 0a4 4 0 0 1-5.64-5.64L19 16"/></svg>',
                default: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"/><path d="m10 14 9-9"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>'
            };

            // Extract navigation items from the original navbar
            const originalNavItems = originalNavbar.querySelectorAll('.navbar-nav > li');
            const navItems = [];

            originalNavItems.forEach((item, index) => {
                const link = item.querySelector('a');
                if (link) {
                    const navItem = {
                        text: link.textContent.trim(),
                        href: link.href,
                        isDropdown: false,
                        dropdownItems: [],
                        icon: getIconForNavItem(link.textContent.trim(), index)
                    };

                    // Check if this item has a dropdown
                    const dropdown = item.querySelector('.dropdown-menu');
                    if (dropdown) {
                        navItem.isDropdown = true;
                        const dropdownLinks = dropdown.querySelectorAll('li > a');
                        dropdownLinks.forEach(dropLink => {
                            navItem.dropdownItems.push({
                                text: dropLink.textContent.trim(),
                                href: dropLink.href,
                                icon: getIconForNavItem(dropLink.textContent.trim())
                            });
                        });
                    }

                    navItems.push(navItem);
                }
            });

            // Function to get appropriate icon for nav item
            function getIconForNavItem(text, index = 0) {
                const textLower = text.toLowerCase();
                
                if (textLower.includes('accueil') || textLower.includes('home') || index === 0) return ICONS.home;
                if (textLower.includes('profil') || textLower.includes('étudiant') || textLower.includes('student')) return ICONS.user;
                if (textLower.includes('scolarité') || textLower.includes('academic') || textLower.includes('cours')) return ICONS.book;
                if (textLower.includes('emploi') || textLower.includes('temps') || textLower.includes('schedule')) return ICONS.calendar;
                if (textLower.includes('notes') || textLower.includes('grade')) return ICONS.fileText;
                if (textLower.includes('service') || textLower.includes('admin')) return ICONS.settings;
                if (textLower.includes('contact') || textLower.includes('support')) return ICONS.users;
                if (textLower.includes('mail') || textLower.includes('message')) return ICONS.mail;
                
                return ICONS.default;
            }

            // Get current gradient CSS
            function getCurrentGradientCSS() {
                const gradientMap = {
                    'gradient-1': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    'gradient-2': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                    'gradient-3': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                    'gradient-4': 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                    'gradient-5': 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                    'gradient-6': 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
                    'gradient-7': 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
                    'gradient-8': 'linear-gradient(135deg, #1fa2ff 0%, #12d8fa 0%, #a6ffcb 100%)'
                };
                
                return gradientMap[currentGradient] || gradientMap['gradient-1'];
            }            // Inject navbar styles with current gradient
            function injectNavbarStyles() {
                const styleId = 'etu-navbar-styles';
                if (document.getElementById(styleId)) return;

                const currentGradientCSS = getCurrentGradientCSS();
                const style = document.createElement('style');
                style.id = styleId;
                style.textContent = `
                    /* ETU Enhanced Navbar Styles */
                    #${CONFIG.NAVBAR_ID} {
                        position: fixed;
                        top: 0;
                        left: 0;
                        right: 0;
                        background: ${currentGradientCSS};
                        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                        z-index: 9999;
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                        backdrop-filter: blur(10px);
                        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                    }

                    .etu-navbar-container {
                        max-width: 1200px;
                        margin: 0 auto;
                        padding: 0 20px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        height: 60px;
                    }

                    .etu-logo {
                        display: flex;
                        align-items: center;
                        gap: 12px;
                        color: white;
                        font-size: 20px;
                        font-weight: 700;
                        text-decoration: none;
                        transition: all 0.3s ease;
                    }

                    .etu-logo:hover {
                        transform: scale(1.05);
                        color: #f0f0f0;
                    }

                    .etu-nav-menu {
                        display: flex;
                        list-style: none;
                        margin: 0;
                        padding: 0;
                        gap: 8px;
                    }

                    .etu-nav-item {
                        position: relative;
                    }

                    .etu-nav-link {
                        display: flex;
                        align-items: center;
                        gap: 8px;
                        padding: 10px 16px;
                        color: rgba(255, 255, 255, 0.9);
                        text-decoration: none;
                        border-radius: 8px;
                        transition: all 0.3s ease;
                        font-weight: 500;
                        font-size: 14px;
                        white-space: nowrap;
                    }

                    .etu-nav-link:hover {
                        background: rgba(255, 255, 255, 0.15);
                        color: white;
                        transform: translateY(-1px);
                    }

                    .etu-nav-link.${CONFIG.ACTIVE_CLASS} {
                        background: rgba(255, 255, 255, 0.2);
                        color: white;
                    }

                    .${CONFIG.DROPDOWN_CLASS} {
                        position: absolute;
                        top: 100%;
                        left: 0;
                        background: white;
                        border-radius: 12px;
                        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
                        min-width: 220px;
                        opacity: 0;
                        visibility: hidden;
                        transform: translateY(-10px);
                        transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                        z-index: 1000;
                        border: 1px solid rgba(0, 0, 0, 0.08);
                        overflow: hidden;
                    }

                    .${CONFIG.DROPDOWN_CLASS}.${CONFIG.SHOW_CLASS} {
                        opacity: 1;
                        visibility: visible;
                        transform: translateY(0);
                    }

                    .etu-dropdown-item {
                        display: flex;
                        align-items: center;
                        gap: 12px;
                        padding: 14px 18px;
                        color: #333;
                        text-decoration: none;
                        transition: all 0.2s ease;
                        border-bottom: 1px solid rgba(0, 0, 0, 0.05);
                        font-size: 14px;
                    }

                    .etu-dropdown-item:last-child {
                        border-bottom: none;
                    }

                    .etu-dropdown-item:hover {
                        background: #f8f9ff;
                        color: #667eea;
                        transform: translateX(4px);
                    }

                    .etu-mobile-toggle {
                        display: none;
                        background: none;
                        border: none;
                        color: white;
                        font-size: 24px;
                        cursor: pointer;
                        padding: 8px;
                        border-radius: 6px;
                        transition: background 0.3s ease;
                    }

                    .etu-mobile-toggle:hover {
                        background: rgba(255, 255, 255, 0.1);
                    }

                    /* Mobile Responsive */
                    @media (max-width: 768px) {
                        .etu-mobile-toggle {
                            display: block;
                        }

                        .etu-nav-menu {
                            position: absolute;
                            top: 100%;
                            left: 0;
                            right: 0;
                            background: ${currentGradientCSS};
                            flex-direction: column;
                            padding: 20px;
                            gap: 4px;
                            transform: translateY(-10px);
                            opacity: 0;
                            visibility: hidden;
                            transition: all 0.3s ease;
                            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
                        }

                        .etu-nav-menu.${CONFIG.SHOW_CLASS} {
                            transform: translateY(0);
                            opacity: 1;
                            visibility: visible;
                        }

                        .etu-nav-item {
                            width: 100%;
                        }

                        .etu-nav-link {
                            width: 100%;
                            justify-content: flex-start;
                            padding: 14px 16px;
                        }

                        .${CONFIG.DROPDOWN_CLASS} {
                            position: static;
                            opacity: 1;
                            visibility: visible;
                            transform: none;
                            box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
                            background: rgba(255, 255, 255, 0.95);
                            margin-top: 8px;
                            border-radius: 8px;
                        }
                    }

                    /* Body adjustment */
                    body.etu-navbar-active {
                        padding-top: 60px !important;
                        transition: padding-top 0.3s ease;
                    }
                `;
                
                document.head.appendChild(style);
            }

            // Create navbar HTML with extracted links
            function createNavbarHTML() {
                let navMenuHTML = '';
                
                navItems.forEach((item, index) => {
                    const itemId = `nav-item-${index}`;
                    const isFirst = index === 0;
                    
                    if (item.isDropdown && item.dropdownItems.length > 0) {
                        let dropdownHTML = '';
                        item.dropdownItems.forEach(dropItem => {
                            dropdownHTML += `
                                <a href="${dropItem.href}" class="etu-dropdown-item">
                                    ${dropItem.icon}
                                    <span>${dropItem.text}</span>
                                </a>
                            `;
                        });
                        
                        navMenuHTML += `
                            <li class="etu-nav-item">
                                <a href="#" class="etu-nav-link" data-dropdown="${itemId}">
                                    ${item.icon}
                                    <span>${item.text}</span>
                                    ${ICONS.chevronDown}
                                </a>
                                <div class="${CONFIG.DROPDOWN_CLASS}" id="${itemId}-dropdown">
                                    ${dropdownHTML}
                                </div>
                            </li>
                        `;
                    } else {
                        navMenuHTML += `
                            <li class="etu-nav-item">
                                <a href="${item.href}" class="etu-nav-link ${isFirst ? CONFIG.ACTIVE_CLASS : ''}" data-page="${item.text.toLowerCase()}">
                                    ${item.icon}
                                    <span>${item.text}</span>
                                </a>
                            </li>
                        `;
                    }
                });

                return `
                    <nav id="${CONFIG.NAVBAR_ID}">
                        <div class="etu-navbar-container">
                            <a href="#" class="etu-logo">
                                ${ICONS.book}
                                <span>ETU UM5</span>
                            </a>
                            
                            <ul class="etu-nav-menu" id="etu-nav-menu">
                                ${navMenuHTML}
                            </ul>
                            
                            <button class="etu-mobile-toggle" id="etu-mobile-toggle">
                                ☰
                            </button>
                        </div>
                    </nav>
                `;
            }

            // Initialize dropdown functionality
            function initDropdowns() {
                const dropdownTriggers = document.querySelectorAll('[data-dropdown]');
                const dropdowns = document.querySelectorAll(`.${CONFIG.DROPDOWN_CLASS}`);

                // Close all dropdowns
                function closeAllDropdowns() {
                    dropdowns.forEach(dropdown => {
                        dropdown.classList.remove(CONFIG.SHOW_CLASS);
                    });
                }

                // Handle dropdown triggers
                dropdownTriggers.forEach(trigger => {
                    trigger.addEventListener('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        
                        const dropdownId = trigger.getAttribute('data-dropdown') + '-dropdown';
                        const dropdown = document.getElementById(dropdownId);
                        
                        if (dropdown) {
                            const isVisible = dropdown.classList.contains(CONFIG.SHOW_CLASS);
                            
                            // Close all dropdowns first
                            closeAllDropdowns();
                            
                            // Toggle current dropdown
                            if (!isVisible) {
                                dropdown.classList.add(CONFIG.SHOW_CLASS);
                            }
                        }
                    });
                });

                // Close dropdowns when clicking outside
                document.addEventListener('click', (e) => {
                    if (!e.target.closest(`.${CONFIG.DROPDOWN_CLASS}`) && 
                        !e.target.closest('[data-dropdown]')) {
                        closeAllDropdowns();
                    }
                });

                // Close dropdowns on escape key
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape') {
                        closeAllDropdowns();
                    }
                });
            }

            // Initialize mobile menu
            function initMobileMenu() {
                const mobileToggle = document.getElementById('etu-mobile-toggle');
                const navMenu = document.getElementById('etu-nav-menu');

                if (mobileToggle && navMenu) {
                    mobileToggle.addEventListener('click', (e) => {
                        e.preventDefault();
                        navMenu.classList.toggle(CONFIG.SHOW_CLASS);
                        
                        // Update toggle icon
                        mobileToggle.textContent = navMenu.classList.contains(CONFIG.SHOW_CLASS) ? '✕' : '☰';
                    });
                }
            }

            // Initialize navigation
            function initNavigation() {
                const navLinks = document.querySelectorAll('[data-page]');
                
                navLinks.forEach(link => {
                    link.addEventListener('click', (e) => {
                        const page = link.getAttribute('data-page');
                        
                        // Remove active class from all links
                        navLinks.forEach(l => l.classList.remove(CONFIG.ACTIVE_CLASS));
                        
                        // Add active class to clicked link
                        link.classList.add(CONFIG.ACTIVE_CLASS);
                        
                        // Close mobile menu if open
                        const navMenu = document.getElementById('etu-nav-menu');
                        const mobileToggle = document.getElementById('etu-mobile-toggle');
                        if (navMenu && navMenu.classList.contains(CONFIG.SHOW_CLASS)) {
                            navMenu.classList.remove(CONFIG.SHOW_CLASS);
                            if (mobileToggle) mobileToggle.textContent = '☰';
                        }
                        
                        // Show notification
                        showNotification(`Navigation: ${page}`);
                    });
                });
            }

            // Remove existing navigation
            function removeExistingNavigation() {
                const existingNavbar = document.getElementById(CONFIG.NAVBAR_ID);
                if (existingNavbar) {
                    existingNavbar.remove();
                }

                const existingStyles = document.getElementById('etu-navbar-styles');
                if (existingStyles) {
                    existingStyles.remove();
                }

                document.body.classList.remove('etu-navbar-active');
            }

            // Initialize the navbar
            if (navItems.length > 0) {
                // Remove any existing navigation
                removeExistingNavigation();
                
                // Inject styles
                injectNavbarStyles();
                
                // Create and inject navbar
                const navbarHTML = createNavbarHTML();
                document.body.insertAdjacentHTML('afterbegin', navbarHTML);
                
                // Add body class for spacing
                document.body.classList.add('etu-navbar-active');
                
                // Initialize functionality
                setTimeout(() => {
                    initDropdowns();
                    initMobileMenu();
                    initNavigation();
                }, 100);
                
                console.log(`ETU Enhanced Navbar initialized with ${navItems.length} items and current gradient: ${currentGradient}`);
            } else {
                console.warn('No navigation items found in original navbar');
            }
        }, 500);
    }    // Create custom footer
    function createCustomFooter() {
        // Wait for DOM to be ready and find the original footer
        setTimeout(() => {
            console.log('Creating custom footer...');
            
            // Configuration
            const FOOTER_ID = 'etu-enhanced-footer';
              // Find and extract data from original footer
            const originalFooter = document.querySelector('footer.container-fluid, footer[style*="background"]');
            let originalFooterData = {
                usefulLinks: [
                    { text: 'UM5', url: 'https://www.um5.ac.ma', icon: 'building' },
                    { text: 'ENSSUP', url: 'https://www.enssup.gov.ma', icon: 'school' },
                    { text: 'Ministère de l\'Education', url: 'https://www.men.gov.ma', icon: 'globe' },
                    { text: 'CNRST', url: 'https://www.cnrst.ma', icon: 'database' },
                    { text: 'Campus France', url: 'https://www.campusfrance.org', icon: 'external-link' }
                ],
                socialLinks: [
                    { text: 'Facebook', url: 'https://www.facebook.com/UM5Rabat', icon: 'facebook' },
                    { text: 'Twitter', url: 'https://twitter.com/um5rabat', icon: 'twitter' },
                    { text: 'YouTube', url: 'https://www.youtube.com/user/um5s', icon: 'youtube' },
                    { text: 'LinkedIn', url: 'https://fr.linkedin.com/school/um5rabat', icon: 'linkedin' }
                ],
                copyright: '© 2025 Université Mohammed V de Rabat - Enhanced with ❤️'
            };

            // If original footer exists, extract its data
            if (originalFooter) {
                console.log('Original footer found, extracting data...');
                
                // Extract useful links
                const usefulLinksSection = originalFooter.querySelector('h4');
                if (usefulLinksSection && usefulLinksSection.textContent.includes('Liens utiles')) {
                    const linkElements = usefulLinksSection.parentNode.querySelectorAll('a');                    if (linkElements.length > 0) {
                        originalFooterData.usefulLinks = Array.from(linkElements).map(link => {
                            const text = link.textContent.trim();
                            let icon = 'external-link';
                            if (text.toLowerCase().includes('um5')) icon = 'building';
                            else if (text.toLowerCase().includes('enssup')) icon = 'school';
                            else if (text.toLowerCase().includes('ministère')) icon = 'globe';
                            else if (text.toLowerCase().includes('cnrst')) icon = 'database';
                            
                            return {
                                text: text,
                                url: link.href,
                                icon: icon
                            };
                        });
                    }
                }

                // Extract social links
                const socialSection = Array.from(originalFooter.querySelectorAll('h4')).find(h4 => 
                    h4.textContent.includes('Suivez-nous')
                );
                if (socialSection) {
                    const socialLinks = socialSection.parentNode.querySelectorAll('a');
                    if (socialLinks.length > 0) {                        originalFooterData.socialLinks = Array.from(socialLinks).map(link => {
                            const text = link.textContent.trim();
                            let icon = 'external-link';
                            if (text.includes('Facebook')) icon = 'facebook';
                            else if (text.includes('Twitter')) icon = 'twitter';
                            else if (text.includes('YouTube')) icon = 'youtube';
                            else if (text.includes('LinkedIn')) icon = 'linkedin';
                            
                            return {
                                text: text.replace(/^[📘🐦📺💼]\s*/, ''), // Remove existing icons
                                url: link.href,
                                icon: icon
                            };
                        });
                    }
                }

                // Extract copyright
                const copyrightElement = originalFooter.querySelector('p, .text-center');
                if (copyrightElement) {
                    originalFooterData.copyright = copyrightElement.textContent.trim()
                        .replace('Enhanced with ❤️', '') // Remove if already there
                        + ' - Enhanced with ❤️';
                }
            }

            // Remove existing enhanced footer if any
            const existingFooter = document.getElementById(FOOTER_ID);
            if (existingFooter) {
                existingFooter.remove();
                console.log('Removed existing enhanced footer');
            }

            // Remove old footer styles
            const existingStyles = document.getElementById('etu-footer-styles');
            if (existingStyles) {
                existingStyles.remove();
            }

            // Get current gradient for footer background
            const getCurrentGradient = () => {
                const gradients = {
                    'gradient-1': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    'gradient-2': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                    'gradient-3': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                    'gradient-4': 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                    'gradient-5': 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                    'gradient-6': 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
                    'gradient-7': 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
                    'gradient-8': 'linear-gradient(135deg, #1fa2ff 0%, #12d8fa 0%, #a6ffcb 100%)'
                };
                return gradients[currentGradient] || gradients['gradient-1'];
            };

            // Inject footer styles (NOT fixed position)
            const footerStyles = document.createElement('style');
            footerStyles.id = 'etu-footer-styles';
            footerStyles.textContent = `
                .etu-footer {
                    width: 100% !important;
                    background: ${getCurrentGradient()} !important;
                    margin-top: 40px !important;
                    padding: 32px 24px !important;
                    color: white !important;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
                    box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1) !important;
                    border-top: 1px solid rgba(255, 255, 255, 0.2) !important;
                }

                .etu-footer-container {
                    max-width: 1200px !important;
                    margin: 0 auto !important;
                    display: grid !important;
                    grid-template-columns: 1fr 1fr !important;
                    gap: 32px !important;
                    align-items: start !important;
                }

                .etu-footer-section h4 {
                    font-size: 18px !important;
                    font-weight: 700 !important;
                    color: white !important;
                    margin-bottom: 16px !important;
                    text-transform: uppercase !important;
                    letter-spacing: 0.5px !important;
                    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2) !important;
                    display: flex !important;
                    align-items: center !important;
                    gap: 8px !important;
                }

                .etu-footer-links {
                    display: flex !important;
                    flex-direction: column !important;
                    gap: 8px !important;
                }

                .etu-footer-section .etu-footer-link {
                    display: inline-flex !important;
                    align-items: center !important;
                    gap: 8px !important;
                    color: rgba(255, 255, 255, 0.9) !important;
                    text-decoration: none !important;
                    font-weight: 500 !important;
                    font-size: 14px !important;
                    padding: 8px 12px !important;
                    border-radius: 8px !important;
                    transition: all 0.3s ease !important;
                    background: rgba(255, 255, 255, 0.1) !important;
                    border: 1px solid rgba(255, 255, 255, 0.2) !important;
                    width: fit-content !important;
                }

                .etu-footer-section .etu-footer-link:hover {
                    background: rgba(255, 255, 255, 0.2) !important;
                    transform: translateY(-2px) !important;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2) !important;
                    color: white !important;
                }

                .etu-footer-social-links {
                    display: flex !important;
                    flex-wrap: wrap !important;
                    gap: 8px !important;
                }

                .etu-footer-copyright {
                    grid-column: 1 / -1 !important;
                    text-align: center !important;
                    padding-top: 24px !important;
                    border-top: 1px solid rgba(255, 255, 255, 0.2) !important;
                    margin-top: 24px !important;
                    font-size: 14px !important;
                    color: rgba(255, 255, 255, 0.8) !important;
                    font-weight: 500 !important;
                    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2) !important;
                }

                .etu-footer-enhanced-badge {
                    background: linear-gradient(45deg, #ff6b6b, #ffd93d) !important;
                    background-clip: text !important;
                    -webkit-background-clip: text !important;
                    -webkit-text-fill-color: transparent !important;
                    font-weight: 700 !important;
                }

                /* Mobile responsive */
                @media (max-width: 768px) {
                    .etu-footer {
                        padding: 24px 16px !important;
                    }
                    
                    .etu-footer-container {
                        grid-template-columns: 1fr !important;
                        gap: 24px !important;
                    }
                    
                    .etu-footer-social-links {
                        justify-content: center !important;
                    }
                    
                    .etu-footer-links {
                        align-items: center !important;
                    }
                }

                /* Hide original footer */
                footer.container-fluid,
                footer[style*="background"] {
                    display: none !important;
                }
            `;
            
            // Add styles to head
            if (document.head) {
                document.head.appendChild(footerStyles);
                console.log('Footer styles injected');
            } else {
                console.error('Document head not found');
                return;
            }

            // Create footer element
            const footer = document.createElement('footer');
            footer.id = FOOTER_ID;
            footer.className = 'etu-footer';            // Generate useful links HTML with Lucide icons
            const usefulLinksHTML = originalFooterData.usefulLinks.map(link => {
                const iconSvg = createLucideIcon(link.icon, '16px');
                const iconHTML = iconSvg ? iconSvg.outerHTML : `<span style="width: 16px; height: 16px; display: inline-block;">🔗</span>`;
                return `<a href="${link.url}" target="_blank" class="etu-footer-link">
                    ${iconHTML} ${link.text}
                </a>`;
            }).join('');

            // Generate social links HTML with Lucide icons
            const socialLinksHTML = originalFooterData.socialLinks.map(link => {
                const iconSvg = createLucideIcon(link.icon, '16px');
                const iconHTML = iconSvg ? iconSvg.outerHTML : `<span style="width: 16px; height: 16px; display: inline-block;">🔗</span>`;
                return `<a href="${link.url}" target="_blank" class="etu-footer-link">
                    ${iconHTML} ${link.text}
                </a>`;
            }).join('');            // Footer HTML content with all original information and Lucide icons
            footer.innerHTML = `
                <div class="etu-footer-container">
                    <div class="etu-footer-section">
                        <h4>${createLucideIcon('external-link', '18px')?.outerHTML || '🔗'} Liens utiles</h4>
                        <div class="etu-footer-links">
                            ${usefulLinksHTML}
                        </div>
                    </div>
                    
                    <div class="etu-footer-section">
                        <h4>${createLucideIcon('users', '18px')?.outerHTML || '📱'} Suivez-nous sur</h4>
                        <div class="etu-footer-social-links">
                            ${socialLinksHTML}
                        </div>
                    </div>
                    
                    <div class="etu-footer-copyright">
                        ${originalFooterData.copyright}
                    </div>
                </div>
            `;

            // Function to add footer to body (at the end)
            const addFooterToBody = () => {
                if (document.body) {
                    // Find a good place to insert footer (end of main content)
                    const mainContent = document.querySelector('.container, .main-content, main') || document.body;
                    mainContent.appendChild(footer);
                    console.log('Footer added to body successfully');
                    
                    // Update footer gradient when gradient changes
                    const updateFooterGradient = () => {
                        const footerElement = document.getElementById(FOOTER_ID);
                        const footerStylesElement = document.getElementById('etu-footer-styles');
                        if (footerElement && footerStylesElement) {
                            const newGradient = getCurrentGradient();
                            footerElement.style.background = newGradient;
                            
                            // Update styles as well
                            footerStylesElement.textContent = footerStylesElement.textContent.replace(
                                /background: linear-gradient[^;]+;/g,
                                `background: ${newGradient} !important;`
                            );
                            
                            console.log('Footer gradient updated to:', currentGradient);
                        }
                    };

                    // Listen for gradient changes
                    document.addEventListener('gradientChanged', updateFooterGradient);
                    
                    return true;
                } else {
                    console.warn('Document body not ready yet, retrying...');
                    setTimeout(addFooterToBody, 100);
                    return false;
                }
            };

            // Add footer to body
            addFooterToBody();
            
            console.log('Enhanced eTU Footer initialized with current gradient:', currentGradient);
            console.log('Footer data extracted:', originalFooterData);
        }, 700); // Wait a bit longer to ensure original footer is loaded
    }// Update theme toggle button appearance
    function updateThemeToggle() {
        const toggle = document.querySelector('.enhanced-theme-toggle');
        if (toggle) {
            toggle.innerHTML = currentTheme === 'light' ? '🌙' : '☀️';
            
            if (currentTheme === 'dark') {
                toggle.style.background = 'rgba(30, 41, 59, 0.95) !important';
                toggle.style.color = '#f8fafc !important';
                toggle.style.borderColor = 'rgba(102, 126, 234, 0.8) !important';
            } else {
                toggle.style.background = 'rgba(255, 255, 255, 0.95) !important';
                toggle.style.color = '#1a202c !important';
                toggle.style.borderColor = 'rgba(102, 126, 234, 0.8) !important';
            }
        }
    }
    
    // Toggle theme function
    function toggleTheme() {
        currentTheme = currentTheme === 'light' ? 'dark' : 'light';
        applyTheme();
        saveSettings();
        showNotification(`Thème ${currentTheme === 'light' ? 'clair' : 'sombre'} activé!`);
    }
    
    // Show notification
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed !important;
            top: 140px !important;
            right: 20px !important;
            z-index: 99997 !important;
            background: rgba(34, 197, 94, 0.95) !important;
            color: white !important;
            padding: 12px 18px !important;
            border-radius: 12px !important;
            font-family: Inter, sans-serif !important;
            font-size: 14px !important;
            font-weight: 600 !important;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15) !important;
            backdrop-filter: blur(10px) !important;
            animation: slideInRight 0.3s ease !important;
        `;
        
        const addNotificationToBody = () => {
            if (document.body) {
                document.body.appendChild(notification);
                setTimeout(() => {
                    notification.style.animation = 'slideOutRight 0.3s ease';
                    setTimeout(() => notification.remove(), 300);
                }, 2000);
            } else {
                setTimeout(addNotificationToBody, 100);
            }
        };
        addNotificationToBody();
    }
    
    // Register tab with background script
    function registerTab() {
        if (typeof chrome !== 'undefined' && chrome.runtime) {
            chrome.runtime.sendMessage({
                action: 'registerTab'
            }).catch(() => {
                // Ignore errors if background script is not available
            });
        }
    }
    
    // Listen for messages from popup/background
    if (typeof chrome !== 'undefined' && chrome.runtime) {
        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            switch (request.action) {
                case 'toggleTheme':
                    toggleTheme();
                    sendResponse({ success: true });
                    break;
                case 'changeGradient':
                    currentGradient = request.gradient;
                    applyGradient();
                    saveSettings();
                    sendResponse({ success: true });
                    break;
                case 'getSettings':
                    sendResponse({ theme: currentTheme, gradient: currentGradient, isEnabled: isEnabled });
                    break;
                default:
                    sendResponse({ error: 'Unknown action' });
            }
        });
    }
    
    // Add required CSS animations
    function addAnimations() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        
        const addStyleToHead = () => {
            if (document.head) {
                document.head.appendChild(style);
            } else {
                setTimeout(addStyleToHead, 100);
            }
        };
        addStyleToHead();
    }
      // Debug function to see what's happening
    function debugEnhancement() {
        console.log('=== ENHANCED eTU PORTAL DEBUG ===');
        console.log('Panels found:', document.querySelectorAll('.panel').length);
        console.log('Images found:', document.querySelectorAll('img[src*="css/images/"]').length);
        console.log('Service cards created:', document.querySelectorAll('.service-card-content').length);
        
        document.querySelectorAll('.panel').forEach((panel, index) => {
            const heading = panel.querySelector('.panel-heading');
            const images = panel.querySelectorAll('img[src*="css/images/"]');
            const links = panel.querySelectorAll('.panel-body a');
            const serviceCards = panel.querySelectorAll('.service-card-content');
            
            console.log(`Panel ${index + 1}:`);
            console.log('  Heading:', heading ? heading.textContent.trim() : 'None');
            console.log('  Images found:', images.length);
            console.log('  Links found:', links.length);
            console.log('  Service cards:', serviceCards.length);
            
            images.forEach((img, imgIndex) => {
                const filename = img.src.split('/').pop();
                console.log(`    Image ${imgIndex + 1}: ${filename}`);
            });
        });
        
        console.log('Theme controls:', {
            themeToggle: !!document.querySelector('.enhanced-theme-toggle'),
            gradientSelector: !!document.querySelector('.enhanced-gradient-selector')
        });
        
        console.log('================================');
    }    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();    }
      // Add animations
    addAnimations();
    
    console.log('Enhanced eTU Portal content script loaded');
})();
