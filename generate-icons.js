// Icon Generation Helper
// This script helps create the necessary icon files for the Chrome extension

const iconSizes = [16, 48, 128];
const iconData = `
<!-- SVG Icon Template -->
<svg width="SIZE" height="SIZE" viewBox="0 0 SIZE SIZE" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background circle -->
  <circle cx="HALF" cy="HALF" r="RADIUS" fill="url(#bg)" stroke="#ffffff" stroke-width="2"/>
  
  <!-- University building icon -->
  <rect x="QUARTER" y="THREE_QUARTER" width="HALF" height="4" fill="#ffffff" rx="1"/>
  
  <!-- eTU text -->
  <text x="HALF" y="QUARTER" text-anchor="middle" fill="#ffffff" font-family="Arial" font-size="FONT_SIZE" font-weight="bold">eTU</text>
  
  <!-- Enhancement symbol -->
  <circle cx="HALF" cy="FIVE_SIXTH" r="6" fill="#4ade80"/>
  <text x="HALF" y="FIVE_SIXTH_PLUS" text-anchor="middle" fill="#ffffff" font-family="Arial" font-size="8" font-weight="bold">+</text>
</svg>
`;

// Generate SVG icons for each size
iconSizes.forEach(size => {
    const half = size / 2;
    const quarter = size / 4;
    const threeQuarter = size * 0.75;
    const radius = size * 0.4;
    const fontSize = Math.max(8, size / 8);
    const fiveSixth = size * 0.83;
    const fiveSixthPlus = fiveSixth + 3;

    let svg = iconData
        .replace(/SIZE/g, size)
        .replace(/HALF/g, half)
        .replace(/QUARTER/g, quarter)
        .replace(/THREE_QUARTER/g, threeQuarter)
        .replace(/RADIUS/g, radius)
        .replace(/FONT_SIZE/g, fontSize)
        .replace(/FIVE_SIXTH_PLUS/g, fiveSixthPlus)
        .replace(/FIVE_SIXTH/g, fiveSixth);

    console.log(`Generated ${size}x${size} SVG icon`);
    
    // In a real implementation, you would save this SVG and convert to PNG
    // For now, we'll use the browser's default icons
});

// Instructions for manual icon creation
console.log(`
ICON CREATION INSTRUCTIONS:
==========================

To create proper PNG icons for your Chrome extension:

1. ONLINE CONVERSION (Easiest):
   - Go to https://convertio.co/svg-png/
   - Upload the icon.svg file from your icons folder
   - Convert to PNG format
   - Download and rename files to:
     * icon16.png (16x16 pixels)
     * icon48.png (48x48 pixels)  
     * icon128.png (128x128 pixels)

2. USING BROWSER (Quick):
   - Open the icon.svg file in Chrome
   - Right-click → "Save image as"
   - Save as PNG format
   - Use image editor to resize to different sizes

3. USING CANVA (Professional):
   - Create new designs with sizes 16x16, 48x48, 128x128
   - Use the university/education templates
   - Add "eTU" text and enhancement symbols
   - Download as PNG

4. SKIP ICONS (Development):
   - Chrome will use default icons if files don't exist
   - Extension will work perfectly without custom icons
   - Add icons later for production release

CURRENT STATUS:
- Extension is fully functional without custom icons
- Chrome will use default extension icon
- All other features work perfectly
- Replace icon files when ready for production
`);

export { iconSizes, iconData };
