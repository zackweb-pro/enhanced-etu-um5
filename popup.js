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
    }

    async loadSettings() {
        try {
            const result = await chrome.storage.sync.get(['theme', 'isEnabled']);
            
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
}

// Initialize popup when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PopupController();
});
