/**
 * Generates RFC4122 version 4 compliant UUID.
 * Used for unique palette identification.
 */
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// Application state
let palettes = [];
let highlightedId = null; // Palette ID currently being highlighted (duplicate detection)
let activePaletteId = null; // Currently applied palette ID
let highlightTimer = null; // Debounce timer for highlight animation

// DOM Elements
const widgetToggle = document.getElementById('widgetToggle');
const widgetContent = document.getElementById('widgetContent');
const widgetClose = document.getElementById('widgetClose');
const paletteUrlInput = document.getElementById('paletteUrl');
const paletteList = document.getElementById('paletteList');
const emptyState = document.getElementById('emptyState');

// Default palettes loaded on initialization
const defaultPalettes = [
    {
        url: 'https://colorhunt.co/palette/5a9cb5face68faac68fa6868',
        colors: ['#5A9CB5', '#FACE68', '#FAAC68', '#FA6868']
    },
    {
        url: 'https://colorhunt.co/palette/22283100adb5393e46eeeeee',
        colors: ['#222831', '#00ADB5', '#393E46', '#EEEEEE']
    },
    {
        url: 'https://colorhunt.co/palette/06283d1363df47b5ffdff6ff',
        colors: ['#06283D', '#1363DF', '#47B5FF', '#DFF6FF']
    }
];

// Widget toggle handlers
widgetToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    widgetContent.classList.toggle('active');
    if (widgetContent.classList.contains('active')) {
        paletteUrlInput.focus();
    }
});

widgetClose.addEventListener('click', () => {
    widgetContent.classList.remove('active');
});

// Close widget when clicking outside
document.addEventListener('click', (e) => {
    const colorWidget = document.getElementById('colorWidget');
    if (!colorWidget.contains(e.target)) {
        widgetContent.classList.remove('active');
    }
});

widgetContent.addEventListener('click', (e) => {
    e.stopPropagation();
});

/**
 * Extracts hex color codes from ColorHunt palette URL.
 * ColorHunt URLs contain concatenated hex values in the path.
 * 
 * @param {string} url - ColorHunt palette URL
 * @returns {string[]|null} Array of hex color codes or null if invalid
 */
function extractColors(url) {
    try {
        const match = url.match(/palette\/([a-fA-F0-9]+)/);
        if (!match || !match[1]) return null;
        
        const hexString = match[1];
        const colors = hexString.match(/.{1,6}/g);
        
        return (colors && colors.length > 0) 
            ? colors.map(c => `#${c.toUpperCase()}`) 
            : null;
    } catch (e) {
        return null;
    }
}

/**
 * Applies color palette to page by setting CSS custom properties.
 * Also converts hex to RGB format for alpha channel support.
 * 
 * @param {string[]} colors - Array of hex color codes
 * @param {string} paletteId - UUID of palette being applied
 */
function applyColorPalette(colors, paletteId) {
    if (colors.length < 4) return;
    
    const root = document.documentElement;
    
    root.style.setProperty('--color-primary', colors[0]);
    root.style.setProperty('--color-secondary', colors[1]);
    root.style.setProperty('--color-accent', colors[2]);
    root.style.setProperty('--color-highlight', colors[3]);
    
    // Convert hex to RGB for rgba() usage in CSS
    const hexToRgb = (hex) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    };
    
    const rgb1 = hexToRgb(colors[0]);
    const rgb2 = hexToRgb(colors[1]);
    const rgb3 = hexToRgb(colors[2]);
    const rgb4 = hexToRgb(colors[3]);
    
    if (rgb1) root.style.setProperty('--color-primary-rgb', `${rgb1.r}, ${rgb1.g}, ${rgb1.b}`);
    if (rgb2) root.style.setProperty('--color-secondary-rgb', `${rgb2.r}, ${rgb2.g}, ${rgb2.b}`);
    if (rgb3) root.style.setProperty('--color-accent-rgb', `${rgb3.r}, ${rgb3.g}, ${rgb3.b}`);
    if (rgb4) root.style.setProperty('--color-highlight-rgb', `${rgb4.r}, ${rgb4.g}, ${rgb4.b}`);
    
    widgetToggle.style.backgroundColor = colors[0];
    
    activePaletteId = paletteId;
    renderPalettes();
}

/**
 * Creates DOM element for a single palette card.
 * 
 * @param {Object} palette - Palette object with id, colors, and metadata
 * @param {number} index - Position in palettes array
 * @returns {HTMLElement} Palette card element
 */
function createPaletteCard(palette, index) {
    const card = document.createElement('div');
    card.className = 'palette-card';
    card.dataset.id = palette.id;
    
    const isHighlighted = palette.id === highlightedId;
    const isActive = palette.id === activePaletteId;
    
    if (isHighlighted) {
        card.classList.add('highlighted');
    }
    if (isActive) {
        card.classList.add('active');
    }
    
    // Color preview blocks
    const previewContainer = document.createElement('div');
    previewContainer.className = 'palette-preview-container';
    palette.colors.forEach(color => {
        const colorBlock = document.createElement('div');
        colorBlock.className = 'palette-color-block';
        colorBlock.style.backgroundColor = color;
        colorBlock.title = color;
        previewContainer.appendChild(colorBlock);
    });
    
    // Palette metadata
    const infoContainer = document.createElement('div');
    infoContainer.className = 'palette-info';
    
    const paletteId = document.createElement('span');
    paletteId.className = 'palette-id';
    paletteId.textContent = `#${palette.id.substring(0, 8)}`;
    
    const colorCodes = document.createElement('span');
    colorCodes.className = 'palette-codes';
    colorCodes.textContent = palette.colors.join(', ');
    
    infoContainer.appendChild(paletteId);
    infoContainer.appendChild(colorCodes);
    
    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'palette-delete-btn';
    deleteBtn.innerHTML = '✕';
    deleteBtn.onclick = (e) => {
        e.stopPropagation();
        removePalette(palette.id);
    };
    
    // Click to apply palette
    card.onclick = () => {
        applyColorPalette(palette.colors, palette.id);
    };
    
    card.appendChild(previewContainer);
    card.appendChild(infoContainer);
    card.appendChild(deleteBtn);
    
    return card;
}

/**
 * Re-renders the entire palette list.
 * Shows empty state when no palettes exist.
 */
function renderPalettes() {
    paletteList.innerHTML = '';
    
    if (palettes.length === 0) {
        emptyState.style.display = 'block';
        paletteList.style.display = 'none';
    } else {
        emptyState.style.display = 'none';
        paletteList.style.display = 'flex';
        
        palettes.forEach((palette, index) => {
            const card = createPaletteCard(palette, index);
            paletteList.appendChild(card);
        });
    }
}

/**
 * Adds a new palette or highlights existing duplicate.
 * Duplicates are detected by comparing concatenated color values.
 * 
 * @param {string} url - Source ColorHunt URL
 * @param {string[]} colors - Array of hex color codes
 * @returns {boolean} True if palette was added, false if duplicate
 */
function addPalette(url, colors) {
    const uniqueColorKey = colors.join('-');
    const existingPalette = palettes.find(p => p.colorKey === uniqueColorKey);
    
    if (existingPalette) {
        // Duplicate found: flash highlight animation
        highlightedId = existingPalette.id;
        renderPalettes();
        
        if (highlightTimer) clearTimeout(highlightTimer);
        highlightTimer = setTimeout(() => {
            highlightedId = null;
            renderPalettes();
        }, 1500);
        
        return false;
    } else {
        // New palette: prepend to list
        const newPalette = {
            id: generateUUID(),
            url: url,
            colors: colors,
            colorKey: uniqueColorKey,
            timestamp: new Date().toLocaleTimeString()
        };
        
        palettes.unshift(newPalette);
        renderPalettes();
        return true;
    }
}

/**
 * Removes palette by ID.
 * If removed palette was active, applies first available palette.
 * 
 * @param {string} id - UUID of palette to remove
 */
function removePalette(id) {
    palettes = palettes.filter(p => p.id !== id);
    
    if (activePaletteId === id && palettes.length > 0) {
        applyColorPalette(palettes[0].colors, palettes[0].id);
    }
    
    renderPalettes();
}

// Auto-detect and add palette on input change
paletteUrlInput.addEventListener('input', (e) => {
    const value = e.target.value;
    const extractedColors = extractColors(value);
    
    if (extractedColors) {
        addPalette(value, extractedColors);
        paletteUrlInput.value = '';
    }
});

/**
 * Loads default palettes on page initialization.
 * Applies first palette automatically.
 */
function initializeDefaultPalettes() {
    defaultPalettes.forEach(palette => {
        addPalette(palette.url, palette.colors);
    });
    
    if (palettes.length > 0) {
        applyColorPalette(palettes[0].colors, palettes[0].id);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    initializeDefaultPalettes();
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#exampleModal') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});
