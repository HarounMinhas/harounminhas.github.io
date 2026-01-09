import React, { useEffect, useMemo, useState } from 'react';
import { Dropdown, Button } from 'react-bootstrap';

// Predefined color palettes with CSS custom property values
const colorPalettes = [
  {
    id: 'default',
    name: 'Standaard',
    description: 'Huidige frisse groen-tinten',
    swatch: ['#328e6e', '#67ae6e', '#90c67c', '#f9f6f3'],
    colors: {
      primary: '#328e6e',
      secondary: '#67ae6e',
      background: '#f9f6f3',
      accent: '#90c67c',
      textDark: '#1c352d',
      textMuted: '#4f6f64',
    },
  },
  {
    id: 'bosrijke-warmte',
    name: 'Bosrijke warmte',
    description: 'Diep groen met warme accenten',
    swatch: ['#243829', '#6b8f71', '#cfa07b', '#f5efe6'],
    colors: {
      primary: '#243829',
      secondary: '#6b8f71',
      background: '#f5efe6',
      accent: '#cfa07b',
      textDark: '#1c3529',
      textMuted: '#4e6355',
    },
  },
  {
    id: 'zachte-zon',
    name: 'Zachte zon',
    description: 'Lichte crème met zachte groentinten',
    swatch: ['#a0c878', '#ddeb9d', '#faf6e9', '#fffdf6'],
    colors: {
      primary: '#a0c878',
      secondary: '#ddeb9d',
      background: '#fffdf6',
      accent: '#faf6e9',
      textDark: '#4a4a3f',
      textMuted: '#6a6a5a',
    },
  },
  {
    id: 'frisse-tuin',
    name: 'Frisse tuin',
    description: 'Groene tuinaccenten met zachte achtergrond',
    swatch: ['#328e6e', '#67ae6e', '#90c67c', '#e1eebc'],
    colors: {
      primary: '#328e6e',
      secondary: '#67ae6e',
      background: '#e1eebc',
      accent: '#90c67c',
      textDark: '#1c352d',
      textMuted: '#2f5d4a',
    },
  },
  {
    id: 'salie-hout',
    name: 'Salië & hout',
    description: 'Saliegroen met aardse basis',
    swatch: ['#40513b', '#609966', '#9dc08b', '#edf1d6'],
    colors: {
      primary: '#609966',
      secondary: '#9dc08b',
      background: '#edf1d6',
      accent: '#9dc08b',
      textDark: '#40513b',
      textMuted: '#55694d',
    },
  },
];

/**
 * Provides theme/color palette selection with localStorage persistence.
 * Renders as Bootstrap dropdown on desktop and custom modal on mobile.
 * Applies color values to CSS custom properties on document root.
 */
const ThemeSwitcher = () => {
  const [selectedId, setSelectedId] = useState('default');
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Create lookup map for O(1) palette access by ID
  const paletteMap = useMemo(
    () => Object.fromEntries(colorPalettes.map((palette) => [palette.id, palette])),
    []
  );

  // Detect mobile viewport for conditional rendering
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Load saved palette from localStorage on mount
  useEffect(() => {
    const storedTheme = localStorage.getItem('preferredPalette');
    if (storedTheme && paletteMap[storedTheme]) {
      setSelectedId(storedTheme);
      applyPalette(paletteMap[storedTheme].colors);
    } else {
      applyPalette(paletteMap.default.colors);
    }
  }, [paletteMap]);

  // Prevent body scroll when mobile modal is open
  useEffect(() => {
    if (isMobile && open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobile, open]);

  /**
   * Applies color values to CSS custom properties on document root.
   * These properties are referenced throughout the application's CSS.
   * 
   * @param {Object} colors - Object mapping property names to hex color values
   */
  const applyPalette = (colors) => {
    const root = document.documentElement.style;
    Object.entries(colors).forEach(([key, value]) => {
      root.setProperty(`--${key}`, value);
    });
  };

  /**
   * Handles palette selection, persists to localStorage, and closes mobile modal.
   * 
   * @param {string} id - Palette identifier
   */
  const handlePaletteSelect = (id) => {
    const palette = paletteMap[id];
    if (!palette) return;
    setSelectedId(id);
    applyPalette(palette.colors);
    localStorage.setItem('preferredPalette', id);
    if (isMobile) {
      setOpen(false);
    }
  };

  // Close modal when clicking backdrop overlay
  const handleBackdropClick = (e) => {
    if (e.target.classList.contains('theme-backdrop')) {
      setOpen(false);
    }
  };

  const selectedPalette = paletteMap[selectedId];

  // Mobile-specific rendering with custom modal
  if (isMobile) {
    return (
      <div className="theme-switcher-mobile">
        <Button
          variant="light"
          size="sm"
          className="theme-toggle shadow-sm"
          onClick={() => setOpen(!open)}
          aria-label="Kleurenschema kiezen"
        >
          <span role="img" aria-hidden="true">
            🎨
          </span>
        </Button>
        
        {/* Modal and backdrop only render when open */}
        {open && (
          <>
            <div 
              className="theme-backdrop" 
              onClick={handleBackdropClick}
              aria-hidden="true"
            />
            
            <div className="theme-modal show">
              <div className="theme-modal-content shadow-sm border-0">
                <div className="px-3 py-3 border-bottom">
                  <div className="fw-semibold">Kleurenschema</div>
                  <div className="text-muted small">Kies een palet voor de hele pagina</div>
                </div>
                <div className="theme-modal-body p-2">
                  {colorPalettes.map((palette) => (
                    <button
                      key={palette.id}
                      onClick={() => handlePaletteSelect(palette.id)}
                      className={`theme-modal-item ${selectedId === palette.id ? 'active' : ''}`}
                    >
                      <div>
                        <div className="fw-semibold">{palette.name}</div>
                        <div className="text-muted small">{palette.description}</div>
                      </div>
                      <div className="d-flex align-items-center gap-1">
                        {palette.swatch.map((color) => (
                          <span
                            key={color}
                            className="theme-swatch"
                            style={{ backgroundColor: color }}
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                    </button>
                  ))}
                </div>
                <div className="px-3 py-2 border-top small text-muted">
                  Actief: <strong>{selectedPalette?.name}</strong>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

  // Desktop rendering with Bootstrap dropdown
  return (
    <Dropdown show={open} onToggle={setOpen} align="start">
      <Dropdown.Toggle
        as={Button}
        variant="light"
        size="sm"
        className="theme-toggle shadow-sm"
        aria-label="Kleurenschema kiezen"
      >
        <span role="img" aria-hidden="true">
          🎨
        </span>
      </Dropdown.Toggle>
      <Dropdown.Menu className="theme-dropdown p-2 shadow-sm border-0">
        <div className="px-2 pb-2">
          <div className="fw-semibold">Kleurenschema</div>
          <div className="text-muted small">Kies een palet voor de hele pagina</div>
        </div>
        {colorPalettes.map((palette) => (
          <Dropdown.Item
            key={palette.id}
            onClick={() => handlePaletteSelect(palette.id)}
            active={selectedId === palette.id}
            className="d-flex justify-content-between align-items-center gap-2 rounded-3"
          >
            <div>
              <div className="fw-semibold">{palette.name}</div>
              <div className="text-muted small">{palette.description}</div>
            </div>
            <div className="d-flex align-items-center gap-1">
              {palette.swatch.map((color) => (
                <span
                  key={color}
                  className="theme-swatch"
                  style={{ backgroundColor: color }}
                  aria-hidden="true"
                />
              ))}
            </div>
          </Dropdown.Item>
        ))}
        <div className="px-2 pt-2 border-top small text-muted">
          Actief: <strong>{selectedPalette?.name}</strong>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ThemeSwitcher;
