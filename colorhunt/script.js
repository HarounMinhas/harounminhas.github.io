/**
 * Language
 */
const LANG_STORAGE_KEY = 'lang';

const TRANSLATIONS = {
    nl: {
        'lang.aria': 'Kies taal',
        'lang.nl': 'Nederlands',
        'lang.en': 'Engels',

        'nav.back': 'Terug naar Portfolio',
        'nav.typography': 'Typografie',
        'nav.components': 'Componenten',
        'nav.forms': 'Formulieren',
        'nav.utilities': 'Utilities',

        'hero.lead': 'Test Bootstrap componenten met ColorHunt color palettes',
        'hero.cta': 'Klik op 🎨 rechtsboven om palettes te importeren en toe te passen',

        'section.typography': 'Typografie',
        'typography.lead': 'Dit is een lead paragraph die opvalt.',
        'typography.paragraph': 'Dit is een normale paragraph met bold text, italic text, en highlighted text.',
        'typography.quote': 'Een quote die inspirerend is.',
        'typography.author': 'Auteur naam',

        'section.buttons': 'Knoppen & Badges',
        'button.primary': 'Primair',
        'button.secondary': 'Secundair',
        'button.success': 'Succes',
        'button.danger': 'Gevaar',
        'button.warning': 'Waarschuwing',
        'button.info': 'Info',
        'button.light': 'Licht',
        'button.dark': 'Donker',
        'badge.primary': 'Primair',
        'badge.secondary': 'Secundair',
        'badge.success': 'Succes',
        'badge.danger': 'Gevaar',
        'badge.warning': 'Waarschuwing',
        'badge.info': 'Info',

        'section.cards': 'Kaarten',
        'cards.title1': 'Kaart titel 1',
        'cards.title2': 'Kaart titel 2',
        'cards.title3': 'Kaart titel 3',
        'cards.subtitle': 'Subtitel',
        'cards.text1': 'Dit is een voorbeeldkaart met wat tekst om de layout te demonstreren.',
        'cards.text2': 'Een kaart met achtergrondkleur voor extra aandacht.',
        'cards.text3': 'Kaart met een header sectie.',
        'cards.moreInfo': 'Meer info',
        'cards.featured': 'Uitgelicht',

        'section.alerts': 'Meldingen',
        'alerts.primary': 'Dit is een primair bericht',
        'alerts.success': 'Dit is een succes bericht',
        'alerts.warning': 'Dit is een waarschuwing',
        'alerts.danger': 'Dit is een foutmelding',

        'section.forms': 'Formulieren',
        'forms.email': 'E-mailadres',
        'forms.emailPlaceholder': 'naam@voorbeeld.com',
        'forms.password': 'Wachtwoord',
        'forms.select': 'Selecteer optie',
        'forms.choose': 'Kies...',
        'forms.option1': 'Optie 1',
        'forms.option2': 'Optie 2',
        'forms.option3': 'Optie 3',
        'forms.remember': 'Onthoud mij',
        'forms.submit': 'Verstuur',
        'forms.message': 'Bericht',
        'forms.range': 'Range slider',
        'forms.switch': 'Toggle switch',

        'section.utilities': 'Progress & Spinners',
        'utilities.loading': 'Laden...',

        'footer.copyright': '© 2025 Haroun Minhas. ColorHunt Palette Tester.',

        'widget.toggleAria': 'Open palette widget',
        'widget.title': 'ColorHunt Importer',
        'widget.closeAria': 'Sluiten',
        'widget.closeTitle': 'Sluiten',
        'widget.placeholder': 'Plak ColorHunt link...',
        'widget.hint': 'Plak een link om automatisch toe te voegen. Duplicaten lichten op.',
        'widget.empty': 'Nog geen palettes.',
        'widget.selectFromWebsite': 'Selecteer van website',
        'modal.title': 'Selecteer palettes van ColorHunt',
        'modal.loading': 'Palettes laden...',
        'modal.empty': 'Geen palettes gevonden.',
        'modal.error': 'Kon palettes niet laden.'
    },
    en: {
        'lang.aria': 'Choose language',
        'lang.nl': 'Dutch',
        'lang.en': 'English',

        'nav.back': 'Back to Portfolio',
        'nav.typography': 'Typography',
        'nav.components': 'Components',
        'nav.forms': 'Forms',
        'nav.utilities': 'Utilities',

        'hero.lead': 'Test Bootstrap components with ColorHunt color palettes',
        'hero.cta': 'Click 🎨 in the top-right to import and apply palettes',

        'section.typography': 'Typography',
        'typography.lead': 'This is a standout lead paragraph.',
        'typography.paragraph': 'This is a regular paragraph with bold text, italic text, and highlighted text.',
        'typography.quote': 'An inspiring quote.',
        'typography.author': 'Author name',

        'section.buttons': 'Buttons & Badges',
        'button.primary': 'Primary',
        'button.secondary': 'Secondary',
        'button.success': 'Success',
        'button.danger': 'Danger',
        'button.warning': 'Warning',
        'button.info': 'Info',
        'button.light': 'Light',
        'button.dark': 'Dark',
        'badge.primary': 'Primary',
        'badge.secondary': 'Secondary',
        'badge.success': 'Success',
        'badge.danger': 'Danger',
        'badge.warning': 'Warning',
        'badge.info': 'Info',

        'section.cards': 'Cards',
        'cards.title1': 'Card title 1',
        'cards.title2': 'Card title 2',
        'cards.title3': 'Card title 3',
        'cards.subtitle': 'Subtitle',
        'cards.text1': 'This is a sample card with some text to demonstrate the layout.',
        'cards.text2': 'A card with a background color for extra emphasis.',
        'cards.text3': 'Card with a header section.',
        'cards.moreInfo': 'More info',
        'cards.featured': 'Featured',

        'section.alerts': 'Alerts',
        'alerts.primary': 'This is a primary alert',
        'alerts.success': 'This is a success alert',
        'alerts.warning': 'This is a warning alert',
        'alerts.danger': 'This is a danger alert',

        'section.forms': 'Forms',
        'forms.email': 'Email address',
        'forms.emailPlaceholder': 'name@example.com',
        'forms.password': 'Password',
        'forms.select': 'Select option',
        'forms.choose': 'Choose...',
        'forms.option1': 'Option 1',
        'forms.option2': 'Option 2',
        'forms.option3': 'Option 3',
        'forms.remember': 'Remember me',
        'forms.submit': 'Submit',
        'forms.message': 'Message',
        'forms.range': 'Range slider',
        'forms.switch': 'Toggle switch',

        'section.utilities': 'Progress & Spinners',
        'utilities.loading': 'Loading...',

        'footer.copyright': '© 2025 Haroun Minhas. ColorHunt Palette Tester.',

        'widget.toggleAria': 'Open palette widget',
        'widget.title': 'ColorHunt Importer',
        'widget.closeAria': 'Close',
        'widget.closeTitle': 'Close',
        'widget.placeholder': 'Paste ColorHunt link...',
        'widget.hint': 'Paste a link to auto-add. Duplicates will flash.',
        'widget.empty': 'No palettes yet.',
        'widget.selectFromWebsite': 'Select from website',
        'modal.title': 'Select palettes from ColorHunt',
        'modal.loading': 'Loading palettes...',
        'modal.empty': 'No palettes found.',
        'modal.error': 'Unable to load palettes.'
    }
};

function normalizeLang(value) {
    return value === 'en' ? 'en' : 'nl';
}

function detectBrowserLang() {
    const raw = (navigator.languages?.[0] ?? navigator.language ?? '').toLowerCase();
    return raw.startsWith('en') ? 'en' : 'nl';
}

function getLang() {
    try {
        const stored = localStorage.getItem(LANG_STORAGE_KEY);
        if (stored) {
            return normalizeLang(stored);
        }
    } catch {
        // ignore
    }
    return detectBrowserLang();
}

function setLang(lang) {
    const normalized = normalizeLang(lang);
    try {
        localStorage.setItem(LANG_STORAGE_KEY, normalized);
    } catch {
        // ignore
    }
    applyLang(normalized);
}

function t(key) {
    const lang = getLang();
    return TRANSLATIONS[lang]?.[key] ?? TRANSLATIONS.nl?.[key] ?? key;
}

function applyLang(lang) {
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach((el) => {
        const key = el.getAttribute('data-i18n');
        const value = TRANSLATIONS[lang]?.[key] ?? TRANSLATIONS.nl?.[key];
        if (typeof value === 'string') {
            el.textContent = value;
        }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
        const key = el.getAttribute('data-i18n-placeholder');
        const value = TRANSLATIONS[lang]?.[key] ?? TRANSLATIONS.nl?.[key];
        if (typeof value === 'string') {
            el.setAttribute('placeholder', value);
        }
    });

    document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
        const key = el.getAttribute('data-i18n-aria');
        const value = TRANSLATIONS[lang]?.[key] ?? TRANSLATIONS.nl?.[key];
        if (typeof value === 'string') {
            el.setAttribute('aria-label', value);
        }
    });

    document.querySelectorAll('[data-i18n-title]').forEach((el) => {
        const key = el.getAttribute('data-i18n-title');
        const value = TRANSLATIONS[lang]?.[key] ?? TRANSLATIONS.nl?.[key];
        if (typeof value === 'string') {
            el.setAttribute('title', value);
        }
    });

    const current = document.getElementById('langCurrent');
    if (current) {
        current.textContent = lang === 'nl' ? '🇧🇪 NL' : '🇬🇧 EN';
    }

    document.querySelectorAll('[data-check-lang]').forEach((el) => {
        const checkLang = el.getAttribute('data-check-lang');
        el.style.visibility = checkLang === lang ? 'visible' : 'hidden';
    });

    document.querySelectorAll('[data-lang]').forEach((btn) => {
        const btnLang = btn.getAttribute('data-lang');
        btn.classList.toggle('active', btnLang === lang);
    });

    refreshPaletteModalStatus();
}

function initLanguageSwitcher() {
    const lang = getLang();

    document.querySelectorAll('[data-lang]').forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            setLang(btn.getAttribute('data-lang'));
        });
    });

    applyLang(lang);
}

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
let paletteModalStatusKey = null;
let paletteModalLoaded = false;
let paletteModalPalettes = [];

// DOM Elements
const widgetToggle = document.getElementById('widgetToggle');
const widgetContent = document.getElementById('widgetContent');
const widgetClose = document.getElementById('widgetClose');
const paletteUrlInput = document.getElementById('paletteUrl');
const paletteList = document.getElementById('paletteList');
const emptyState = document.getElementById('emptyState');
const openPaletteModalBtn = document.getElementById('openPaletteModal');
const paletteModal = document.getElementById('paletteModal');
const paletteModalStatus = document.getElementById('paletteModalStatus');
const paletteModalList = document.getElementById('paletteModalList');

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

if (openPaletteModalBtn) {
    openPaletteModalBtn.addEventListener('click', async () => {
        const modalInstance = bootstrap.Modal.getOrCreateInstance(paletteModal);
        modalInstance.show();
        if (!paletteModalLoaded) {
            await loadPaletteModal();
        } else {
            renderPaletteModal(paletteModalPalettes);
        }
    });
}

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

function getColorKey(colors) {
    return colors.join('-');
}

function isPaletteAdded(colors) {
    const colorKey = getColorKey(colors);
    return palettes.some(palette => palette.colorKey === colorKey);
}

function setPaletteModalStatus(key, isError = false) {
    paletteModalStatusKey = key;
    if (!key) {
        paletteModalStatus.textContent = '';
    } else {
        paletteModalStatus.textContent = t(key);
    }
    paletteModalStatus.classList.toggle('error', isError);
}

function refreshPaletteModalStatus() {
    if (!paletteModalStatusKey) return;
    paletteModalStatus.textContent = t(paletteModalStatusKey);
}

function parsePaletteColorsFromHref(href) {
    if (!href) return null;
    const match = href.match(/palette\/([a-fA-F0-9]{12,})/);
    if (!match || !match[1]) return null;
    const hexString = match[1];
    const colors = hexString.match(/.{1,6}/g);
    if (!colors || colors.length < 4) return null;
    return {
        colors: colors.slice(0, 4).map(color => `#${color.toUpperCase()}`),
        url: `https://colorhunt.co/palette/${hexString}`
    };
}

function extractPalettesFromHtml(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const scope = doc.querySelector('.page') || doc;
    const paletteLinks = Array.from(scope.querySelectorAll('a[href*="/palette/"]'));
    const unique = new Map();

    paletteLinks.forEach((link) => {
        const data = parsePaletteColorsFromHref(link.getAttribute('href'));
        if (!data) return;
        const key = getColorKey(data.colors);
        if (!unique.has(key)) {
            unique.set(key, data);
        }
    });

    return Array.from(unique.values());
}

async function fetchPaletteHtml() {
    const urls = [
        'https://colorhunt.co/',
        'https://r.jina.ai/http://colorhunt.co/'
    ];

    for (const url of urls) {
        try {
            const response = await fetch(url, { mode: 'cors' });
            if (!response.ok) continue;
            const text = await response.text();
            if (text && text.length > 0) {
                return text;
            }
        } catch (error) {
            // try next URL
        }
    }
    return null;
}

function createModalPaletteCard(palette) {
    const card = document.createElement('div');
    card.className = 'palette-modal-card';
    card.dataset.colorKey = getColorKey(palette.colors);

    const preview = document.createElement('div');
    preview.className = 'palette-modal-preview';

    palette.colors.forEach((color) => {
        const block = document.createElement('div');
        block.className = 'palette-modal-color';
        block.style.backgroundColor = color;
        preview.appendChild(block);
    });

    const codes = document.createElement('div');
    codes.className = 'palette-modal-codes';
    codes.textContent = palette.colors.join(', ');

    card.appendChild(preview);
    card.appendChild(codes);

    card.addEventListener('click', () => {
        addPalette(palette.url, palette.colors);
        updateModalCardState(card, palette.colors);
    });

    updateModalCardState(card, palette.colors);

    return card;
}

function updateModalCardState(card, colors) {
    card.classList.toggle('added', isPaletteAdded(colors));
}

function renderPaletteModal(palettesToRender) {
    paletteModalList.innerHTML = '';

    if (palettesToRender.length === 0) {
        setPaletteModalStatus('modal.empty');
        return;
    }

    setPaletteModalStatus('');

    palettesToRender.forEach((palette) => {
        paletteModalList.appendChild(createModalPaletteCard(palette));
    });
}

async function loadPaletteModal() {
    setPaletteModalStatus('modal.loading');
    paletteModalList.innerHTML = '';

    const html = await fetchPaletteHtml();
    if (!html) {
        setPaletteModalStatus('modal.error', true);
        return;
    }

    paletteModalPalettes = extractPalettesFromHtml(html);
    renderPaletteModal(paletteModalPalettes);
    paletteModalLoaded = true;
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
    initLanguageSwitcher();
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
