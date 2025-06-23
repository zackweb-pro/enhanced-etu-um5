# Enhanced eTU UM5 Portal - Chrome Extension

A modern Chrome extension that transforms the Mohammed V University student portal with professional UI/UX enhancements while preserving all original functionalities.

## 🌟 Features

### 🎨 Modern Design System
- **Professional Interface**: Clean, modern design with beautiful gradients and shadows
- **Dark/Light Theme**: Toggle between themes with smooth transitions
- **Responsive Design**: Optimized for all screen sizes
- **Modern Typography**: Enhanced fonts (Inter & Poppins) for better readability

### ⚡ Enhanced User Experience
- **Smooth Animations**: Professional hover effects and transitions
- **Interactive Elements**: Ripple effects, loading states, and micro-interactions
- **Quick Actions Toolbar**: Easy access to refresh, print, and share functions
- **Keyboard Shortcuts**: Power user features with hotkeys

### 🔍 Smart Features
- **Integrated Search**: Quick search functionality across the portal (Ctrl+K)
- **Notification System**: Real-time notifications for new announcements
- **Reading Progress**: Track read/unread news items
- **Back to Top**: Smooth scroll to top with visual indicator

### ♿ Accessibility Improvements
- **Skip Links**: Screen reader navigation support
- **Enhanced Focus States**: Better keyboard navigation
- **ARIA Labels**: Improved semantic markup
- **High Contrast**: Better color contrast ratios

## 🚀 Installation

### Method 1: Manual Installation (Development)
1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension folder
5. The extension will be installed and ready to use

### Method 2: Chrome Web Store (Coming Soon)
*This extension will be available on the Chrome Web Store soon*

## 🎯 Usage

### Basic Usage
1. **Navigate** to your UM5 student portal
2. **Click** the extension icon in Chrome toolbar
3. **Toggle** features on/off as needed
4. **Enjoy** the enhanced experience!

### Keyboard Shortcuts
- `Ctrl + K` - Open search
- `Ctrl + Shift + T` - Toggle theme
- `Ctrl + Home` - Scroll to top

### Extension Popup Controls
- **Theme Toggle**: Switch between light and dark modes
- **Extension Toggle**: Enable/disable all enhancements
- **Open Portal**: Quick link to UM5 portal
- **Refresh**: Reload current page
- **Help**: View feature guide

## 🛠️ Technical Details

### Architecture
- **Manifest V3**: Latest Chrome extension standards
- **Content Scripts**: Non-intrusive page enhancement
- **CSS Variables**: Dynamic theming system
- **Local Storage**: User preference persistence

### Browser Support
- Chrome 88+
- Chromium-based browsers (Edge, Brave, etc.)

### Permissions
- `activeTab`: Access current tab for enhancements
- `scripting`: Inject enhancement scripts
- `storage`: Save user preferences
- `host_permissions`: Work on UM5 domains

## 🎨 Themes

### Light Theme
- Clean white backgrounds
- Blue primary colors (#2563eb)
- Subtle shadows and borders
- Professional appearance

### Dark Theme
- Dark slate backgrounds (#0f172a)
- Consistent color scheme
- Reduced eye strain
- Modern dark UI

## 🔧 Customization

The extension uses CSS custom properties for easy theming:

```css
:root {
  --primary-color: #2563eb;
  --bg-primary: #ffffff;
  --text-primary: #1e293b;
  /* ... more variables */
}
```

## 📱 Responsive Design

- **Mobile First**: Optimized for all devices
- **Flexible Layouts**: Adapts to screen sizes
- **Touch Friendly**: Proper touch targets
- **Fast Loading**: Optimized performance

## 🔒 Privacy & Security

- **No Data Collection**: Extension doesn't collect personal data
- **Local Storage Only**: Preferences stored locally
- **Secure Permissions**: Minimal required permissions
- **Open Source**: Transparent code

## 🐛 Known Issues & Solutions

### Common Issues
1. **Extension not working**: Ensure you're on UM5 portal domain
2. **Styles not loading**: Try refreshing the page
3. **Theme not saving**: Check Chrome storage permissions

### Troubleshooting
1. **Reload Extension**: Go to `chrome://extensions/` and reload
2. **Clear Cache**: Clear browser cache and reload
3. **Check Console**: Open DevTools for error messages

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Bug Reports
1. Check existing issues first
2. Provide detailed description
3. Include steps to reproduce
4. Add screenshots if relevant

### Feature Requests
1. Describe the feature clearly
2. Explain the use case
3. Consider implementation complexity

### Code Contributions
1. Fork the repository
2. Create feature branch
3. Make your changes
4. Test thoroughly
5. Submit pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **UM5 Students**: For inspiration and feedback
- **Chrome Extension Docs**: For excellent documentation
- **Open Source Community**: For tools and libraries

## 📞 Support

### Getting Help
- **GitHub Issues**: Report bugs and request features
- **Email**: webzack0@gmail.com
- **Documentation**: Check this README first

### FAQ

**Q: Will this work on other university portals?**
A: Currently designed specifically for UM5 portal, but can be adapted.

**Q: Does this affect portal functionality?**
A: No, all original functions are preserved. This only enhances the appearance.

**Q: Can I customize the colors?**
A: Yes, you can modify the CSS variables in the styles.css file.

**Q: Is my data safe?**
A: Yes, the extension only stores theme preferences locally and doesn't collect any personal information.

## 🚀 Roadmap

### Version 1.1 (Planned)
- [ ] More theme options
- [ ] Custom color picker
- [ ] Enhanced animations
- [ ] Better mobile experience

### Version 1.2 (Future)
- [ ] Plugin system
- [ ] Advanced search filters
- [ ] PDF export features
- [ ] Multi-language support

---

**Made with ❤️ for UM5 students**

*Enhance your university portal experience with modern design and improved usability!*
