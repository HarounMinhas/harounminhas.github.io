// State
let palettes = [];
let highlightedId = null;
let activePaletteId = null;
let highlightTimer = null;

// DOM Elements
const widgetToggle = document.getElementById('widgetToggle');
const widgetContent = document.getElementById('widgetContent');
const widgetClose = document.getElementById('widgetClose');
const paletteUrlInput = document.getElementById('paletteUrl');
const paletteList = document.getElementById('paletteList');
const emptyState = document.getElementById('emptyState');

// Default palettes
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

// Toggle widget
widgetToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    widgetContent.classList.toggle('active');
    if (widgetContent.classList.contains('active')) {
        paletteUrlInput.focus();
    }
});

// Close widget with close button
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

// Prevent closing when clicking inside widget
widgetContent.addEventListener('click', (e) => {
    e.stopPropagation();
});

// Extract colors from ColorHunt URL
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

// Apply color palette to page
function applyColorPalette(colors, paletteId) {
    if (colors.length < 4) return;
    
    const root = document.documentElement;
    
    root.style.setProperty('--color-primary', colors[0]);
    root.style.setProperty('--color-secondary', colors[1]);
    root.style.setProperty('--color-accent', colors[2]);
    root.style.setProperty('--color-highlight', colors[3]);
    
    // Convert hex to RGB
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
    
    // Update active palette
    activePaletteId = paletteId;
    renderPalettes();
}

// Create palette card HTML
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
    
    // Preview container
    const previewContainer = document.createElement('div');
    previewContainer.className = 'palette-preview-container';
    palette.colors.forEach(color => {
        const colorBlock = document.createElement('div');
        colorBlock.className = 'palette-color-block';
        colorBlock.style.backgroundColor = color;
        colorBlock.title = color;
        previewContainer.appendChild(colorBlock);
    });
    
    // Info container
    const infoContainer = document.createElement('div');
    infoContainer.className = 'palette-info';
    
    const paletteId = document.createElement('span');
    paletteId.className = 'palette-id';
    paletteId.textContent = `#${palette.id.toString().slice(-4)}`;
    
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
    
    // Click to apply
    card.onclick = () => {
        applyColorPalette(palette.colors, palette.id);
    };
    
    card.appendChild(previewContainer);
    card.appendChild(infoContainer);
    card.appendChild(deleteBtn);
    
    return card;
}

// Render palette list
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

// Add palette
function addPalette(url, colors) {
    const uniqueColorKey = colors.join('-');
    const existingPalette = palettes.find(p => p.colorKey === uniqueColorKey);
    
    if (existingPalette) {
        // DUPLICATE FOUND: Flash effect
        highlightedId = existingPalette.id;
        renderPalettes();
        
        if (highlightTimer) clearTimeout(highlightTimer);
        highlightTimer = setTimeout(() => {
            highlightedId = null;
            renderPalettes();
        }, 1500);
        
        return false;
    } else {
        // NEW PALETTE: Add to list
        const newPalette = {
            id: Date.now(),
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

// Remove palette
function removePalette(id) {
    palettes = palettes.filter(p => p.id !== id);
    
    // If the removed palette was active, set the first one as active
    if (activePaletteId === id && palettes.length > 0) {
        applyColorPalette(palettes[0].colors, palettes[0].id);
    }
    
    renderPalettes();
}

// Handle input change with auto-detection
paletteUrlInput.addEventListener('input', (e) => {
    const value = e.target.value;
    const extractedColors = extractColors(value);
    
    if (extractedColors) {
        addPalette(value, extractedColors);
        paletteUrlInput.value = '';
    }
});

// Initialize with default palettes
function initializeDefaultPalettes() {
    defaultPalettes.forEach(palette => {
        addPalette(palette.url, palette.colors);
    });
    
    // Apply first palette
    if (palettes.length > 0) {
        applyColorPalette(palettes[0].colors, palettes[0].id);
    }
}

// Initialize on load
window.addEventListener('DOMContentLoaded', () => {
    initializeDefaultPalettes();
});

// Smooth scroll for navigation links
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