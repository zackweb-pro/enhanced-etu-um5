// Enhanced eTU Portal - Popup Script
class PopupController {
    constructor() {
        this.init();
    }

    async init() {
        // Load current settings
        await this.loadSettings();
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Check if we're on a supported page
        this.checkCurrentTab();
    }    async loadSettings() {
        try {
            const result = await chrome.storage.sync.get(['theme', 'gradient', 'isEnabled']);
            
            // Update theme toggle
            const themeSwitch = document.getElementById('themeSwitch');
            const themeIcon = document.querySelector('#themeToggle .control-icon');
            
            if (result.theme === 'dark') {
                themeSwitch.classList.add('active');
                themeIcon.textContent = '☀️';
                document.querySelector('#themeToggle .control-label span:last-child').textContent = 'Mode Clair';
            } else {
                themeSwitch.classList.remove('active');
                themeIcon.textContent = '🌙';
                document.querySelector('#themeToggle .control-label span:last-child').textContent = 'Mode Sombre';
            }
            
            // Update extension toggle
            const extensionSwitch = document.getElementById('extensionSwitch');
            if (result.isEnabled !== false) {
                extensionSwitch.classList.add('active');
            } else {
                extensionSwitch.classList.remove('active');
            }
            
            // Load gradient settings
            await this.loadGradientSettings();
        } catch (error) {
            console.log('Using default settings');
        }
    }

    setupEventListeners() {
        // Theme toggle
        document.getElementById('themeToggle').addEventListener('click', () => {
            this.toggleTheme();
        });

        // Extension toggle
        document.getElementById('extensionToggle').addEventListener('click', () => {
            this.toggleExtension();
        });

        // Open portal
        document.getElementById('openPortal').addEventListener('click', () => {
            this.openPortal();
        });

        // Refresh button
        document.getElementById('refreshBtn').addEventListener('click', () => {
            this.refreshCurrentTab();
        });

        // Help button
        document.getElementById('helpBtn').addEventListener('click', () => {
            this.showHelp();
        });

        // Gradient selector
        document.getElementById('gradientSelector').addEventListener('click', () => {
            this.toggleGradientGrid();
        });
        
        // Gradient options
        document.querySelectorAll('.gradient-option').forEach(option => {
            option.addEventListener('click', (e) => {
                e.stopPropagation();
                this.selectGradient(option.dataset.gradient);
            });
        });
    }

    async toggleTheme() {
        const themeSwitch = document.getElementById('themeSwitch');
        const themeIcon = document.querySelector('#themeToggle .control-icon');
        const themeLabel = document.querySelector('#themeToggle .control-label span:last-child');
        
        const isActive = themeSwitch.classList.contains('active');
        const newTheme = isActive ? 'light' : 'dark';
        
        // Update UI
        if (isActive) {
            themeSwitch.classList.remove('active');
            themeIcon.textContent = '🌙';
            themeLabel.textContent = 'Mode Sombre';
        } else {
            themeSwitch.classList.add('active');
            themeIcon.textContent = '☀️';
            themeLabel.textContent = 'Mode Clair';
        }
        
        // Save setting
        await chrome.storage.sync.set({ theme: newTheme });
        
        // Send message to content script
        this.sendMessageToActiveTab({ action: 'toggleTheme' });
        
        this.showNotification(`Thème ${newTheme === 'light' ? 'clair' : 'sombre'} activé`);
    }

    async toggleExtension() {
        const extensionSwitch = document.getElementById('extensionSwitch');
        const isActive = extensionSwitch.classList.contains('active');
        const newState = !isActive;
        
        // Update UI
        if (newState) {
            extensionSwitch.classList.add('active');
        } else {
            extensionSwitch.classList.remove('active');
        }
        
        // Save setting
        await chrome.storage.sync.set({ isEnabled: newState });
        
        // Send message to content script
        this.sendMessageToActiveTab({ action: 'toggleExtension' });
        
        this.showNotification(`Extension ${newState ? 'activée' : 'désactivée'}`);
    }

    async openPortal() {
        // Common UM5 portal URLs
        const portalUrls = [
            'https://etu.um5.ac.ma',
            'https://portail.um5.ac.ma',
            'https://www.um5.ac.ma'
        ];
        
        // Try to find if any tab is already open with the portal
        try {
            const tabs = await chrome.tabs.query({});
            const portalTab = tabs.find(tab => 
                portalUrls.some(url => tab.url && tab.url.includes(url.replace('https://', '')))
            );
            
            if (portalTab) {
                // Switch to existing tab
                chrome.tabs.update(portalTab.id, { active: true });
                chrome.windows.update(portalTab.windowId, { focused: true });
            } else {
                // Open new tab
                chrome.tabs.create({ url: portalUrls[0] });
            }
        } catch (error) {
            // Fallback: just open a new tab
            chrome.tabs.create({ url: portalUrls[0] });
        }
        
        window.close();
    }

    async refreshCurrentTab() {
        try {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            chrome.tabs.reload(tab.id);
            this.showNotification('Page actualisée');
            
            setTimeout(() => {
                window.close();
            }, 1000);
        } catch (error) {
            this.showNotification('Erreur lors de l\'actualisation');
        }
    }

    showHelp() {
        const helpContent = `
            <div style="text-align: left; line-height: 1.6;">
                <h3>🚀 Enhanced eTU Portal</h3>
                <p><strong>Fonctionnalités:</strong></p>
                <ul style="margin: 10px 0; padding-left: 20px;">
                    <li>🎨 Interface moderne et professionnelle</li>
                    <li>🌙 Thème sombre/clair</li>
                    <li>⚡ Animations fluides</li>
                    <li>🔍 Recherche intégrée</li>
                    <li>📱 Design responsive</li>
                    <li>♿ Accessibilité améliorée</li>
                </ul>
                
                <p><strong>Raccourcis clavier:</strong></p>
                <ul style="margin: 10px 0; padding-left: 20px;">
                    <li><code>Ctrl + K</code> - Recherche</li>
                    <li><code>Ctrl + Shift + T</code> - Changer thème</li>
                    <li><code>Ctrl + Home</code> - Haut de page</li>
                </ul>
                
                <p style="margin-top: 15px; font-size: 12px; opacity: 0.8;">
                    Cette extension améliore votre expérience sur le portail étudiant UM5 avec une interface moderne tout en préservant toutes les fonctionnalités.
                </p>
            </div>
        `;
        
        // Create modal overlay
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            animation: fadeIn 0.3s ease;
        `;
        
        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: white;
            color: #333;
            padding: 20px;
            border-radius: 12px;
            max-width: 300px;
            max-height: 80vh;
            overflow-y: auto;
            position: relative;
            animation: slideIn 0.3s ease;
        `;
        
        const closeButton = document.createElement('button');
        closeButton.innerHTML = '×';
        closeButton.style.cssText = `
            position: absolute;
            top: 10px;
            right: 15px;
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #666;
        `;
        
        closeButton.onclick = () => modal.remove();
        modal.onclick = (e) => {
            if (e.target === modal) modal.remove();
        };
        
        modalContent.innerHTML = helpContent;
        modalContent.appendChild(closeButton);
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        // Add animation styles
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes slideIn {
                from { transform: translateY(-50px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }

    async sendMessageToActiveTab(message) {
        try {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            if (tab.id) {
                chrome.tabs.sendMessage(tab.id, message);
            }
        } catch (error) {
            console.log('Could not send message to active tab');
        }
    }

    async checkCurrentTab() {
        try {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            const supportedDomains = ['um5.ac.ma', 'localhost', '127.0.0.1'];
            
            const isSupported = supportedDomains.some(domain => 
                tab.url && tab.url.includes(domain)
            );
            
            if (!isSupported) {
                // Show message that extension works on UM5 portal
                const statusText = document.querySelector('.status-text');
                const statusIndicator = document.querySelector('.status-indicator');
                
                statusText.textContent = 'Visitez le portail UM5';
                statusIndicator.style.background = '#f59e0b';
                statusIndicator.style.animation = 'none';
                
                // Disable some controls
                const controls = document.querySelectorAll('.control-item');
                controls[0].style.opacity = '0.5'; // Theme toggle
                controls[1].style.opacity = '0.5'; // Extension toggle
            }
        } catch (error) {
            console.log('Could not check current tab');
        }
    }

    showNotification(message) {
        // Remove existing notification
        const existing = document.querySelector('.notification');
        if (existing) existing.remove();
        
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Hide notification
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 2000);
    }

    toggleGradientGrid() {
        const gradientGrid = document.getElementById('gradientGrid');
        const isVisible = gradientGrid.style.display !== 'none';
        
        gradientGrid.style.display = isVisible ? 'none' : 'grid';
        
        // Add animation
        if (!isVisible) {
            gradientGrid.style.opacity = '0';
            gradientGrid.style.transform = 'translateY(-10px)';
            
            setTimeout(() => {
                gradientGrid.style.transition = 'all 0.3s ease';
                gradientGrid.style.opacity = '1';
                gradientGrid.style.transform = 'translateY(0)';
            }, 10);
        }
    }
    
    async selectGradient(gradientName) {
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
        
        // Update preview
        const gradientPreview = document.getElementById('currentGradient');
        gradientPreview.style.background = gradientMap[gradientName];
        
        // Update active state
        document.querySelectorAll('.gradient-option').forEach(option => {
            option.classList.remove('active');
        });
        document.querySelector(`[data-gradient="${gradientName}"]`).classList.add('active');
        
        // Save setting
        await chrome.storage.sync.set({ gradient: gradientName });
        
        // Send message to content script
        this.sendMessageToActiveTab({ 
            action: 'changeGradient', 
            gradient: gradientName 
        });
        
        // Hide grid
        this.toggleGradientGrid();
        
        const gradientNumber = gradientName.replace('gradient-', '');
        this.showNotification(`Thème gradient ${gradientNumber} appliqué!`);
    }
    
    async loadGradientSettings() {
        try {
            const result = await chrome.storage.sync.get(['gradient']);
            const currentGradient = result.gradient || 'gradient-1';
            
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
            
            // Update preview
            const gradientPreview = document.getElementById('currentGradient');
            gradientPreview.style.background = gradientMap[currentGradient];
            
            // Update active state
            document.querySelector(`[data-gradient="${currentGradient}"]`)?.classList.add('active');
        } catch (error) {
            console.log('Using default gradient');
        }
    }
}

// Initialize popup when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PopupController();
});
