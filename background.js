// Background Script for Enhanced eTU Portal Extension
// This script handles extension lifecycle and communication

chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === 'install') {
        // First time installation
        console.log('Enhanced eTU Portal extension installed!');
        
        // Set default preferences
        chrome.storage.sync.set({
            theme: 'light',
            isEnabled: true,
            firstTime: true
        });
        
        // Open welcome page (optional)
        // chrome.tabs.create({ url: 'welcome.html' });
        
    } else if (details.reason === 'update') {
        // Extension updated
        console.log('Enhanced eTU Portal extension updated!');
        
        // Handle any migration if needed
        handleUpdateMigration();
    }
});

// Handle extension startup
chrome.runtime.onStartup.addListener(() => {
    console.log('Enhanced eTU Portal extension started');
});

// Listen for messages from content scripts and popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    switch (message.action) {
        case 'getSettings':
            chrome.storage.sync.get(['theme', 'isEnabled'], (result) => {
                sendResponse(result);
            });
            return true; // Keep message channel open for async response
            
        case 'saveSettings':
            chrome.storage.sync.set(message.settings, () => {
                sendResponse({ success: true });
            });
            return true;
            
        case 'openPortal':
            openPortalTab();
            sendResponse({ success: true });
            break;
            
        case 'getTabInfo':
            if (sender.tab) {
                sendResponse({
                    tabId: sender.tab.id,
                    url: sender.tab.url,
                    title: sender.tab.title
                });
            }
            break;
            
        default:
            sendResponse({ error: 'Unknown action' });
    }
});

// Handle tab updates to inject content script if needed
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url) {
        const supportedDomains = ['um5.ac.ma', 'localhost', '127.0.0.1'];
        const isSupported = supportedDomains.some(domain => tab.url.includes(domain));
        
        if (isSupported) {
            // Update extension icon to indicate it's active
            chrome.action.setIcon({
                tabId: tabId,
                path: {
                    16: 'icons/icon16.png',
                    48: 'icons/icon48.png',
                    128: 'icons/icon128.png'
                }
            });
            
            chrome.action.setBadgeText({
                tabId: tabId,
                text: '✓'
            });
            
            chrome.action.setBadgeBackgroundColor({
                tabId: tabId,
                color: '#4ade80'
            });
        } else {
            // Reset icon for unsupported pages
            chrome.action.setBadgeText({
                tabId: tabId,
                text: ''
            });
        }
    }
});

// Function to open portal in new tab or switch to existing one
async function openPortalTab() {
    const portalUrls = [
        'https://etu.um5.ac.ma',
        'https://portail.um5.ac.ma',
        'https://www.um5.ac.ma'
    ];
    
    try {
        // Check if portal is already open
        const tabs = await chrome.tabs.query({});
        const portalTab = tabs.find(tab => 
            portalUrls.some(url => tab.url && tab.url.includes(url.replace('https://', '')))
        );
        
        if (portalTab) {
            // Switch to existing tab
            await chrome.tabs.update(portalTab.id, { active: true });
            await chrome.windows.update(portalTab.windowId, { focused: true });
        } else {
            // Open new tab
            await chrome.tabs.create({ url: portalUrls[0] });
        }
    } catch (error) {
        console.error('Error opening portal tab:', error);
        // Fallback
        chrome.tabs.create({ url: portalUrls[0] });
    }
}

// Handle update migration
function handleUpdateMigration() {
    chrome.storage.sync.get(null, (items) => {
        // Add any migration logic here for future updates
        console.log('Current settings:', items);
        
        // Example: Add new default settings
        const defaultSettings = {
            animationsEnabled: true,
            searchEnabled: true,
            notificationsEnabled: true
        };
        
        // Merge with existing settings
        const updatedSettings = { ...defaultSettings, ...items };
        
        chrome.storage.sync.set(updatedSettings, () => {
            console.log('Settings migrated successfully');
        });
    });
}

// Context menu setup (optional)
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: 'enhancedETU',
        title: 'Enhanced eTU Portal',
        contexts: ['page']
    });
    
    chrome.contextMenus.create({
        id: 'toggleTheme',
        parentId: 'enhancedETU',
        title: 'Toggle Theme',
        contexts: ['page']
    });
    
    chrome.contextMenus.create({
        id: 'openPortal',
        parentId: 'enhancedETU',
        title: 'Open UM5 Portal',
        contexts: ['page']
    });
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
    switch (info.menuItemId) {
        case 'toggleTheme':
            chrome.tabs.sendMessage(tab.id, { action: 'toggleTheme' });
            break;
            
        case 'openPortal':
            openPortalTab();
            break;
    }
});

// Handle extension icon click (alternative to popup)
chrome.action.onClicked.addListener((tab) => {
    // This will only fire if no popup is set in manifest
    // Currently we have a popup, but this is here for future use
    console.log('Extension icon clicked on tab:', tab.url);
});

// Keep track of active enhanced tabs
let enhancedTabs = new Set();

// Listen for tab removal to clean up
chrome.tabs.onRemoved.addListener((tabId) => {
    enhancedTabs.delete(tabId);
});

// Utility function to broadcast messages to all enhanced tabs
function broadcastToEnhancedTabs(message) {
    enhancedTabs.forEach(tabId => {
        chrome.tabs.sendMessage(tabId, message).catch(() => {
            // Tab might be closed, remove from set
            enhancedTabs.delete(tabId);
        });
    });
}

// Register enhanced tabs
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'registerTab' && sender.tab) {
        enhancedTabs.add(sender.tab.id);
        sendResponse({ success: true });
    }
});

console.log('Enhanced eTU Portal background script loaded');
