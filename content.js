// Enhanced eTU UM5 Portal - Content Script
// This script runs on the university portal pages to enhance the UI/UX

class EnhancedETUPortal {
    constructor() {
        this.isEnabled = true;
        this.theme = 'light';
        this.init();
    }

    async init() {
        // Load user preferences
        await this.loadPreferences();
        
        // Add loading animation
        this.showLoadingAnimation();
        
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.enhancePortal());
        } else {
            this.enhancePortal();
        }
        
        // Listen for theme toggle messages
        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            if (request.action === 'toggleTheme') {
                this.toggleTheme();
                sendResponse({success: true});
            } else if (request.action === 'toggleExtension') {
                this.toggleExtension();
                sendResponse({success: true});
            }
        });
    }

    async loadPreferences() {
        try {
            const result = await chrome.storage.sync.get(['theme', 'isEnabled']);
            this.theme = result.theme || 'light';
            this.isEnabled = result.isEnabled !== false;
        } catch (error) {
            console.log('Using default preferences');
        }
    }

    async savePreferences() {
        try {
            await chrome.storage.sync.set({
                theme: this.theme,
                isEnabled: this.isEnabled
            });
        } catch (error) {
            console.log('Could not save preferences');
        }
    }

    showLoadingAnimation() {
        const loader = document.createElement('div');
        loader.className = 'enhanced-loader';
        document.body.appendChild(loader);
        
        setTimeout(() => {
            loader.remove();
        }, 2000);
    }

    enhancePortal() {
        if (!this.isEnabled) return;

        // Apply theme
        document.documentElement.setAttribute('data-theme', this.theme);
        
        // Create and add theme toggle button
        this.createThemeToggle();
        
        // Add enhanced classes and functionality
        this.enhanceNavigation();
        this.enhanceCards();
        this.addInteractiveElements();
        this.improveAccessibility();
        this.addSearchFunctionality();
        this.addNotificationSystem();
        
        console.log('Enhanced eTU Portal activated successfully!');
    }

    enhanceNavigation() {
        // Add smooth scrolling
        document.documentElement.style.scrollBehavior = 'smooth';
        
        // Enhance dropdown menus
        const dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => {
            const toggle = dropdown.querySelector('.dropdown-toggle');
            const menu = dropdown.querySelector('.dropdown-menu');
            
            if (toggle && menu) {
                // Add smooth transitions
                menu.style.transition = 'all 0.3s ease';
                
                // Improve hover interactions
                dropdown.addEventListener('mouseenter', () => {
                    menu.style.opacity = '1';
                    menu.style.transform = 'translateY(0)';
                });
                
                dropdown.addEventListener('mouseleave', () => {
                    menu.style.opacity = '0';
                    menu.style.transform = 'translateY(-10px)';
                });
            }
        });

        // Add breadcrumb navigation
        this.addBreadcrumbs();
    }

    enhanceCards() {
        // Add hover effects and loading states to service cards
        const serviceLinks = document.querySelectorAll('.panel-body a');
        serviceLinks.forEach(link => {
            // Add ripple effect
            link.addEventListener('click', (e) => {
                this.createRippleEffect(e, link);
            });
            
            // Add loading state for external links
            if (link.href.includes('http') && !link.href.includes(window.location.hostname)) {
                link.addEventListener('click', () => {
                    this.showLoadingState(link);
                });
            }
        });

        // Enhance news items with read/unread state
        const newsLinks = document.querySelectorAll('a[href*="um5.ac.ma"]');
        newsLinks.forEach((link, index) => {
            link.setAttribute('data-news-id', index);
            this.checkReadState(link);
        });
    }

    addInteractiveElements() {
        // Add quick actions toolbar
        this.createQuickActionsToolbar();
        
        // Add theme toggle button
        this.createThemeToggle();
        
        // Add back to top button
        this.createBackToTopButton();
        
        // Add keyboard shortcuts
        this.addKeyboardShortcuts();
    }

    improveAccessibility() {
        // Add skip links
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--primary-color);
            color: white;
            padding: 8px;
            border-radius: 4px;
            text-decoration: none;
            z-index: 1000;
            transition: top 0.3s;
        `;
        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });
        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });
        document.body.insertBefore(skipLink, document.body.firstChild);

        // Add main content landmark
        const mainContent = document.querySelector('.jumbotron') || document.querySelector('.container');
        if (mainContent) {
            mainContent.id = 'main-content';
            mainContent.setAttribute('role', 'main');
        }

        // Improve focus indicators
        const focusableElements = document.querySelectorAll('a, button, input, select, textarea');
        focusableElements.forEach(element => {
            element.addEventListener('focus', () => {
                element.style.outline = '3px solid var(--primary-color)';
                element.style.outlineOffset = '2px';
            });
        });
    }

    addSearchFunctionality() {
        const searchContainer = document.createElement('div');
        searchContainer.className = 'enhanced-search-container';
        searchContainer.innerHTML = `
            <div class="enhanced-search-box">
                <input type="text" id="enhanced-search" placeholder="Rechercher dans le portail..." />
                <button type="button" id="enhanced-search-btn">
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clip-rule="evenodd"></path>
                    </svg>
                </button>
            </div>
            <div id="enhanced-search-results" class="enhanced-search-results"></div>
        `;
        
        searchContainer.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
            background: var(--bg-card);
            border-radius: var(--radius-lg);
            box-shadow: var(--shadow-lg);
            padding: 1rem;
            max-width: 300px;
        `;

        const navbar = document.querySelector('.navbar');
        if (navbar) {
            navbar.appendChild(searchContainer);
        }

        // Add search functionality
        const searchInput = document.getElementById('enhanced-search');
        const searchResults = document.getElementById('enhanced-search-results');
        
        searchInput.addEventListener('input', (e) => {
            this.performSearch(e.target.value, searchResults);
        });
    }

    performSearch(query, resultsContainer) {
        if (query.length < 2) {
            resultsContainer.innerHTML = '';
            return;
        }

        const searchableElements = document.querySelectorAll('.panel-heading, .panel-body a, .navbar-nav a');
        const results = [];

        searchableElements.forEach(element => {
            const text = element.textContent.toLowerCase();
            if (text.includes(query.toLowerCase())) {
                results.push(element);
            }
        });

        resultsContainer.innerHTML = results.length > 0 
            ? results.slice(0, 5).map(result => `
                <div class="search-result-item" onclick="document.querySelector('${this.getElementSelector(result)}').scrollIntoView({behavior: 'smooth'})">
                    ${result.textContent.trim()}
                </div>
            `).join('')
            : '<div class="no-results">Aucun résultat trouvé</div>';
    }

    addNotificationSystem() {
        const notificationContainer = document.createElement('div');
        notificationContainer.id = 'enhanced-notifications';
        notificationContainer.style.cssText = `
            position: fixed;
            top: 20px;
            left: 20px;
            z-index: 1001;
        `;
        document.body.appendChild(notificationContainer);

        // Check for new announcements
        this.checkForNewAnnouncements();
    }

    checkForNewAnnouncements() {
        const newsItems = document.querySelectorAll('a[href*="um5.ac.ma/um5/node"]');
        if (newsItems.length > 0) {
            this.showNotification('📢 Nouvelles annonces disponibles!', 'info');
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `enhanced-notification enhanced-notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            background: var(--bg-card);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-md);
            padding: 1rem;
            margin-bottom: 0.5rem;
            box-shadow: var(--shadow-md);
            animation: slideInLeft 0.3s ease;
        `;

        const container = document.getElementById('enhanced-notifications');
        container.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutLeft 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }

    createQuickActionsToolbar() {
        const toolbar = document.createElement('div');
        toolbar.className = 'enhanced-quick-actions';
        toolbar.innerHTML = `
            <button type="button" class="quick-action-btn" title="Actualiser" onclick="location.reload()">
                🔄
            </button>
            <button type="button" class="quick-action-btn" title="Imprimer" onclick="window.print()">
                🖨️
            </button>
            <button type="button" class="quick-action-btn" title="Partager" onclick="navigator.share ? navigator.share({title: document.title, url: location.href}) : navigator.clipboard.writeText(location.href)">
                📤
            </button>
        `;
        
        toolbar.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 1000;
            display: flex;
            gap: 0.5rem;
        `;

        document.body.appendChild(toolbar);
    }    createThemeToggle() {
        // Remove existing theme toggle if it exists
        const existingToggle = document.querySelector('.theme-toggle');
        if (existingToggle) {
            existingToggle.remove();
        }

        const themeToggle = document.createElement('button');
        themeToggle.className = 'theme-toggle';
        themeToggle.innerHTML = this.theme === 'light' ? '🌙' : '☀️';
        themeToggle.title = 'Changer le thème (Light/Dark)';
        themeToggle.setAttribute('aria-label', 'Toggle theme');

        themeToggle.addEventListener('click', () => {
            this.toggleTheme();
            themeToggle.innerHTML = this.theme === 'light' ? '🌙' : '☀️';
        });
        
        document.body.appendChild(themeToggle);
    }

    createBackToTopButton() {
        const backToTop = document.createElement('button');
        backToTop.className = 'back-to-top-btn';
        backToTop.innerHTML = '↑';
        backToTop.title = 'Retour en haut';
        backToTop.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            z-index: 1000;
            background: var(--primary-color);
            color: white;
            border: none;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            font-size: 1.2rem;
            cursor: pointer;
            opacity: 0;
            transform: translateY(100px);
            transition: all 0.3s ease;
        `;

        backToTop.addEventListener('click', () => {
            window.scrollTo({top: 0, behavior: 'smooth'});
        });

        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.style.opacity = '1';
                backToTop.style.transform = 'translateY(0)';
            } else {
                backToTop.style.opacity = '0';
                backToTop.style.transform = 'translateY(100px)';
            }
        });

        document.body.appendChild(backToTop);
    }

    addKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl + K for search
            if (e.ctrlKey && e.key === 'k') {
                e.preventDefault();
                const searchInput = document.getElementById('enhanced-search');
                if (searchInput) searchInput.focus();
            }
            
            // Ctrl + Shift + T for theme toggle
            if (e.ctrlKey && e.shiftKey && e.key === 'T') {
                e.preventDefault();
                this.toggleTheme();
            }
            
            // Home key for back to top
            if (e.key === 'Home' && e.ctrlKey) {
                e.preventDefault();
                window.scrollTo({top: 0, behavior: 'smooth'});
            }
        });
    }    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', this.theme);
        
        // Update theme toggle button
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.innerHTML = this.theme === 'light' ? '🌙' : '☀️';
        }
        
        this.savePreferences();
        this.showNotification(`Thème ${this.theme === 'light' ? 'clair' : 'sombre'} activé`, 'success');
        
        // Update popup theme toggle as well
        chrome.runtime.sendMessage({
            action: 'themeChanged',
            theme: this.theme
        });
    }

    toggleExtension() {
        this.isEnabled = !this.isEnabled;
        if (this.isEnabled) {
            this.enhancePortal();
            this.showNotification('Extension activée', 'success');
        } else {
            location.reload(); // Simple way to disable - reload original page
        }
        this.savePreferences();
    }

    // Utility functions
    createRippleEffect(event, element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
        `;
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }

    showLoadingState(element) {
        const originalText = element.textContent;
        element.textContent = 'Chargement...';
        element.style.opacity = '0.7';
        
        setTimeout(() => {
            element.textContent = originalText;
            element.style.opacity = '1';
        }, 1000);
    }

    getElementSelector(element) {
        // Simple selector generation for search results
        if (element.id) return `#${element.id}`;
        if (element.className) return `.${element.className.split(' ')[0]}`;
        return element.tagName.toLowerCase();
    }

    checkReadState(link) {
        const newsId = link.getAttribute('data-news-id');
        const readItems = JSON.parse(localStorage.getItem('enhanced-etu-read-news') || '[]');
        
        if (!readItems.includes(newsId)) {
            link.style.position = 'relative';
            const unreadDot = document.createElement('span');
            unreadDot.style.cssText = `
                position: absolute;
                top: 10px;
                right: 10px;
                width: 8px;
                height: 8px;
                background: var(--accent-color);
                border-radius: 50%;
            `;
            link.appendChild(unreadDot);
            
            link.addEventListener('click', () => {
                readItems.push(newsId);
                localStorage.setItem('enhanced-etu-read-news', JSON.stringify(readItems));
                unreadDot.remove();
            });
        }
    }

    addBreadcrumbs() {
        const breadcrumb = document.createElement('nav');
        breadcrumb.innerHTML = `
            <ol class="enhanced-breadcrumb">
                <li><a href="index.php">🏠 Accueil</a></li>
                <li class="current">Tableau de bord</li>
            </ol>
        `;
        breadcrumb.style.cssText = `
            margin: 1rem 0;
            padding: 0.5rem 1rem;
            background: var(--bg-secondary);
            border-radius: var(--radius-md);
        `;
        
        const container = document.querySelector('.container');
        if (container && container.firstChild) {
            container.insertBefore(breadcrumb, container.firstChild);
        }
    }
}

// Add required CSS animations
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes slideInLeft {
        from {
            transform: translateX(-100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutLeft {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(-100%);
            opacity: 0;
        }
    }
    
    .quick-action-btn {
        background: var(--bg-card);
        border: 1px solid var(--border-color);
        border-radius: 50%;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        box-shadow: var(--shadow-md);
        transition: all 0.3s ease;
    }
    
    .quick-action-btn:hover {
        transform: scale(1.1);
        box-shadow: var(--shadow-lg);
    }
    
    .enhanced-breadcrumb {
        list-style: none;
        display: flex;
        gap: 0.5rem;
    }
    
    .enhanced-breadcrumb li:not(:last-child)::after {
        content: '>';
        margin-left: 0.5rem;
        color: var(--text-muted);
    }
    
    .enhanced-breadcrumb a {
        color: var(--primary-color);
        text-decoration: none;
    }
    
    .enhanced-breadcrumb .current {
        color: var(--text-muted);
    }
    
    .skip-link:focus {
        top: 6px !important;
    }
`;
document.head.appendChild(animationStyles);

// Initialize the enhanced portal
new EnhancedETUPortal();
