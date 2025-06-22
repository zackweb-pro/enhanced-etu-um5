// Enhanced eTU UM5 Portal - Content Script
// Professional UI enhancement with FontAwesome icons

(function() {
    'use strict';
    
    // Configuration
    let currentTheme = 'light';
    let currentGradient = 'gradient-1';
    let isEnabled = true;
      // Service definitions with better icons and real extracted text
    const serviceDefinitions = {
        // MON PROFIL ÉTUDIANT section
        'profil': [
            {
                icon: '👤',
                iconClass: 'fas fa-user-circle',
                title: 'Informations Personnelles',
                description: 'Gérez vos informations personnelles et académiques'
            },
            {
                icon: '📝',
                iconClass: 'fas fa-edit',
                title: 'Inscription Administrative',
                description: 'Complétez votre inscription administrative'
            },
            {
                icon: '📋',
                iconClass: 'fas fa-file-contract',
                title: 'Contrat Pédagogique',
                description: 'Consultez et validez votre contrat pédagogique'
            }
        ],
        // E-SCOLARITÉ section  
        'scolarite': [
            {
                icon: '📜',
                iconClass: 'fas fa-certificate',
                title: 'Attestation d\'Inscription',
                description: 'Téléchargez votre attestation d\'inscription'
            },
            {
                icon: '🏆',
                iconClass: 'fas fa-trophy',
                title: 'Attestation de Réussite',
                description: 'Attestation de réussite aux examens'
            },
            {
                icon: '📊',
                iconClass: 'fas fa-chart-line',
                title: 'Relevé de Notes',
                description: 'Consultez vos relevés de notes officiels'
            },
            {
                icon: '📈',
                iconClass: 'fas fa-graduation-cap',
                title: 'Notes et Résultats',
                description: 'Accédez à vos notes et résultats d\'examens'
            }
        ],
        // MON EMPLOI DU TEMPS section
        'emploi': [
            {
                icon: '📅',
                iconClass: 'fas fa-calendar-alt',
                title: 'Mon Emploi du Temps',
                description: 'Consultez votre planning de cours détaillé'
            }
        ],
        // COURS EN LIGNE section
        'cours': [
            {
                icon: '🎓',
                iconClass: 'fab fa-moodle',
                title: 'Moodle',
                description: 'Plateforme d\'apprentissage en ligne Moodle'
            },
            {
                icon: '📚',
                iconClass: 'fas fa-book-open',
                title: 'MOOC',
                description: 'Cours en ligne ouverts et massifs'
            },
            {
                icon: '💬',
                iconClass: 'fas fa-video',
                title: 'Google Meet',
                description: 'Participez aux cours en visioconférence'
            },
            {
                icon: '👥',
                iconClass: 'fab fa-microsoft',
                title: 'Microsoft Teams',
                description: 'Collaboration et communication d\'équipe'
            }
        ],
        // MES AUTRES SERVICES section
        'services': [
            {
                icon: '📧',
                iconClass: 'fas fa-envelope',
                title: 'Email',
                description: 'Accédez à votre messagerie universitaire'
            },
            {
                icon: '☁️',
                iconClass: 'fas fa-cloud',
                title: 'Stockage',
                description: 'Espace de stockage cloud universitaire'
            },
            {
                icon: '📋',
                iconClass: 'fas fa-tasks',
                title: 'Planificateur',
                description: 'Organisez vos tâches et projets'
            },
            {
                icon: '✅',
                iconClass: 'fas fa-check-square',
                title: 'To Do',
                description: 'Gérez votre liste de tâches à faire'
            }
        ],
        // RESSOURCES ÉLECTRONIQUES section
        'ressources': [
            {
                icon: '🗄️',
                iconClass: 'fas fa-database',
                title: 'Base de Données',
                description: 'Accédez aux ressources numériques de l\'université'
            }
        ]
    };
      // Initialize when DOM is ready
    function init() {
        console.log('Enhanced eTU Portal: Initializing...');
        
        // Add debug indicator
        addDebugIndicator();
        
        // Inject FontAwesome
        injectFontAwesome();
        
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
    }
      // Inject FontAwesome with multiple fallback methods
    function injectFontAwesome() {
        // Method 1: Try the provided FontAwesome kit
        const fontAwesome1 = document.createElement('script');
        fontAwesome1.src = 'https://kit.fontawesome.com/0a18d87a1d.js';
        fontAwesome1.crossOrigin = 'anonymous';
        
        // Method 2: Fallback to CDN version
        const fontAwesome2 = document.createElement('link');
        fontAwesome2.rel = 'stylesheet';
        fontAwesome2.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
        fontAwesome2.crossOrigin = 'anonymous';
        
        // Method 3: Another CDN fallback
        const fontAwesome3 = document.createElement('link');
        fontAwesome3.rel = 'stylesheet';
        fontAwesome3.href = 'https://pro.fontawesome.com/releases/v5.10.0/css/all.css';
        fontAwesome3.crossOrigin = 'anonymous';
        
        const addToHead = () => {
            if (document.head) {
                document.head.appendChild(fontAwesome1);
                document.head.appendChild(fontAwesome2);
                document.head.appendChild(fontAwesome3);
                
                // Add CSS to ensure FontAwesome loads properly
                const faStyle = document.createElement('style');
                faStyle.textContent = `
                    .fa, .fas, .far, .fal, .fab {
                        font-family: "Font Awesome 5 Free", "Font Awesome 5 Pro", "FontAwesome" !important;
                        font-weight: 900 !important;
                        -webkit-font-smoothing: antialiased !important;
                        display: inline-block !important;
                        font-style: normal !important;
                        font-variant: normal !important;
                        text-rendering: auto !important;
                        line-height: 1 !important;
                    }
                    .fab {
                        font-family: "Font Awesome 5 Brands" !important;
                        font-weight: 400 !important;
                    }
                `;
                document.head.appendChild(faStyle);
                
                console.log('FontAwesome injection attempted with multiple methods');
            } else {
                setTimeout(addToHead, 100);
            }
        };
        addToHead();
    }    // Enhance service cards with better text extraction and fallback icons
    function enhanceServiceCards() {
        setTimeout(() => {
            const panels = document.querySelectorAll('.panel');
            
            panels.forEach((panel, panelIndex) => {
                const heading = panel.querySelector('.panel-heading');
                const linkContainers = panel.querySelectorAll('.panel-body > div[class*="col-"]');
                
                if (!heading) return;
                
                const headingText = heading.textContent.toLowerCase();
                console.log(`Processing panel: ${headingText}`);
                
                linkContainers.forEach((container, index) => {
                    const link = container.querySelector('a');
                    if (!link) return;
                    
                    let originalText = '';
                    let service = null;
                    
                    // Check if link contains an image
                    const img = link.querySelector('img');
                    if (img) {
                        // Extract service info from image filename
                        const imgSrc = img.src;
                        const filename = imgSrc.split('/').pop().split('.')[0];
                        console.log(`Found image: ${filename}`);
                        
                        service = getServiceFromImage(filename, headingText);
                        originalText = service.title;
                    } else {
                        // Extract from text content
                        originalText = link.textContent.trim();
                        if (originalText) {
                            service = {
                                icon: getIconForText(originalText),
                                iconClass: getFontAwesomeIconForText(originalText),
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
                    cardContent.className = 'service-card-content';
                    cardContent.style.cssText = `
                        display: flex !important;
                        flex-direction: column !important;
                        align-items: center !important;
                        justify-content: center !important;
                        text-align: center !important;
                        height: 100% !important;
                        position: relative !important;
                        z-index: 1 !important;
                        padding: 1.5rem !important;
                    `;
                    
                    // Add icon (with fallback)
                    const iconElement = document.createElement('div');
                    iconElement.className = 'service-icon';
                    iconElement.style.cssText = `
                        font-size: 3rem !important;
                        margin-bottom: 1rem !important;
                        color: var(--primary-solid) !important;
                        transition: all 0.3s ease !important;
                        display: flex !important;
                        align-items: center !important;
                        justify-content: center !important;
                    `;
                    
                    // Always use emoji as it's more reliable
                    iconElement.textContent = service.icon;
                    
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
                    cardContent.appendChild(descElement);
                    link.appendChild(cardContent);
                    
                    console.log(`Enhanced: ${service.title}`);
                });
            });
            
            // Update debug info
            updateDebugInfo();
            
        }, 1000); // Wait for DOM to be ready
    }
    
    // Get service info from image filename
    function getServiceFromImage(filename, sectionTitle) {
        console.log(`Mapping image: ${filename} in section: ${sectionTitle}`);
        
        // Map image filenames to services
        const imageMap = {
            'informations_personnelle': {
                icon: '👤',
                title: 'Informations Personnelles',
                description: 'Consultez et modifiez vos informations personnelles'
            },
            'inscription_administrative': {
                icon: '📝',
                title: 'Inscription Administrative',
                description: 'Complétez votre inscription administrative'
            },
            'contrat_pedagogique': {
                icon: '📋',
                title: 'Contrat Pédagogique',
                description: 'Gérez votre contrat pédagogique'
            },
            'attestation_inscription': {
                icon: '📜',
                title: 'Attestation d\'Inscription',
                description: 'Téléchargez votre attestation d\'inscription'
            },
            'attestation_reussite': {
                icon: '🏆',
                title: 'Attestation de Réussite',
                description: 'Attestation de réussite aux examens'
            },
            'releve_notes': {
                icon: '📊',
                title: 'Relevé de Notes',
                description: 'Consultez vos relevés de notes officiels'
            },
            'notes_reultats': {
                icon: '📈',
                title: 'Notes et Résultats',
                description: 'Accédez à vos notes et résultats d\'examens'
            },
            'planning': {
                icon: '📅',
                title: 'Mon Emploi du Temps',
                description: 'Consultez votre planning de cours'
            },
            'moodle': {
                icon: '🎓',
                title: 'Moodle',
                description: 'Plateforme d\'apprentissage Moodle'
            },
            'mooc': {
                icon: '📚',
                title: 'MOOC',
                description: 'Cours en ligne ouverts et massifs'
            },
            'meet': {
                icon: '💬',
                title: 'Google Meet',
                description: 'Participez aux cours en visioconférence'
            },
            'teams': {
                icon: '👥',
                title: 'Microsoft Teams',
                description: 'Collaboration et communication d\'équipe'
            },
            'outlook': {
                icon: '📧',
                title: 'Email',
                description: 'Accédez à votre messagerie universitaire'
            },
            'oneDrive': {
                icon: '☁️',
                title: 'Stockage',
                description: 'Espace de stockage cloud universitaire'
            },
            'planner': {
                icon: '📋',
                title: 'Planificateur',
                description: 'Organisez vos tâches et projets'
            },
            'to-do': {
                icon: '✅',
                title: 'To Do',
                description: 'Gérez votre liste de tâches'
            },
            'eressources': {
                icon: '🗄️',
                title: 'Ressources Électroniques',
                description: 'Accédez aux ressources numériques'
            }
        };
        
        return imageMap[filename] || {
            icon: '📎',
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
    }
    
    // Helper function to get FontAwesome icon class based on text content
    function getFontAwesomeIconForText(text) {
        const textLower = text.toLowerCase();
        
        if (textLower.includes('profil') || textLower.includes('personnel')) return 'fas fa-user-circle';
        if (textLower.includes('inscription')) return 'fas fa-edit';
        if (textLower.includes('contrat') || textLower.includes('pédagogique')) return 'fas fa-file-contract';
        if (textLower.includes('attestation') && textLower.includes('inscription')) return 'fas fa-certificate';
        if (textLower.includes('attestation') && textLower.includes('réussite')) return 'fas fa-trophy';
        if (textLower.includes('relevé') || textLower.includes('notes')) return 'fas fa-chart-line';
        if (textLower.includes('résultats')) return 'fas fa-graduation-cap';
        if (textLower.includes('emploi') || textLower.includes('temps')) return 'fas fa-calendar-alt';
        if (textLower.includes('moodle')) return 'fab fa-moodle';
        if (textLower.includes('mooc')) return 'fas fa-book-open';
        if (textLower.includes('google') || textLower.includes('meet')) return 'fas fa-video';
        if (textLower.includes('microsoft') || textLower.includes('teams')) return 'fab fa-microsoft';
        if (textLower.includes('email') || textLower.includes('mail')) return 'fas fa-envelope';
        if (textLower.includes('stockage') || textLower.includes('cloud')) return 'fas fa-cloud';
        if (textLower.includes('planificateur')) return 'fas fa-tasks';
        if (textLower.includes('todo') || textLower.includes('do')) return 'fas fa-check-square';
        if (textLower.includes('base') || textLower.includes('données')) return 'fas fa-database';
        if (textLower.includes('actualité') || textLower.includes('news')) return 'fas fa-bullhorn';
        
        return 'fas fa-external-link-alt'; // Default icon
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
    }
    
    // Update theme toggle button appearance
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
    }
    
    // Add visual debug indicator
    function addDebugIndicator() {
        const indicator = document.createElement('div');
        indicator.id = 'enhancement-debug';
        indicator.style.cssText = `
            position: fixed !important;
            bottom: 60px !important;
            left: 10px !important;
            background: var(--primary-solid) !important;
            color: white !important;
            padding: 8px 12px !important;
            border-radius: 8px !important;
            font-size: 12px !important;
            font-weight: 600 !important;
            z-index: 999999 !important;
            opacity: 0.9 !important;
            pointer-events: none !important;
            font-family: var(--font-primary) !important;
            box-shadow: var(--shadow-md) !important;
            cursor: pointer !important;
            pointer-events: auto !important;
        `;
        indicator.textContent = 'Enhanced eTU Portal: Processing...';
        
        indicator.addEventListener('click', debugEnhancement);
        
        const addToBody = () => {
            if (document.body) {
                document.body.appendChild(indicator);
                
                // Update status after enhancement
                setTimeout(() => {
                    const serviceCards = document.querySelectorAll('.service-card-content').length;
                    const faIcons = document.querySelectorAll('.service-icon i').length;
                    indicator.textContent = `Enhanced: ${serviceCards} cards, ${faIcons} FA icons (Click for debug)`;
                    
                    if (serviceCards > 0) {
                        indicator.style.background = 'var(--success-color)';
                    } else {
                        indicator.style.background = 'var(--error-color)';
                        indicator.textContent = 'Enhancement Failed - Click for debug';
                    }
                }, 3000);
            } else {
                setTimeout(addToBody, 100);
            }
        };
        addToBody();
    }
    
    // Update debug information
    function updateDebugInfo() {
        const indicator = document.getElementById('enhancement-debug');
        if (indicator) {
            const serviceCards = document.querySelectorAll('.service-card-content').length;
            const enhancedImages = document.querySelectorAll('.panel-body img').length;
            const totalImages = document.querySelectorAll('img[src*="css/images/"]').length;
            
            if (serviceCards > 0) {
                indicator.style.background = 'var(--success-color)';
                indicator.textContent = `✅ Enhanced: ${serviceCards} cards (${totalImages - enhancedImages}/${totalImages} images replaced)`;
            } else {
                indicator.style.background = 'var(--error-color)';
                indicator.textContent = '❌ Enhancement Failed - Click for debug';
            }
        }
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Add animations
    addAnimations();
    
    // Add debug indicator
    addDebugIndicator();
    
    console.log('Enhanced eTU Portal content script loaded');
})();
