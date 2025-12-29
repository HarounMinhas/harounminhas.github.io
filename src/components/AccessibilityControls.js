import React, { useState, useEffect } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useAccessibility } from '../context/AccessibilityContext';

const AccessibilityControls = ({ variant = 'floating' }) => {
  const { preferences, togglePreference, resetPreferences } = useAccessibility();
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const isInline = variant === 'navbar';
  const containerClass = `accessibility-controls${isInline ? ' accessibility-controls-inline' : ''}`;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  const handleBackdropClick = (e) => {
    if (e.target.classList.contains('accessibility-backdrop')) {
      setOpen(false);
    }
  };

  return (
    <div className={containerClass} aria-live="polite">
      <Button
        variant="primary"
        className="accessibility-toggle"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-controls="accessibility-panel"
        aria-label="Toegankelijkheidsinstellingen openen"
      >
        <span aria-hidden="true" className="accessibility-icon" role="presentation">
          ♿
        </span>
        <span className="visually-hidden">Toegankelijkheidsopties</span>
      </Button>
      
      {isMobile && open && (
        <div 
          className="accessibility-backdrop" 
          onClick={handleBackdropClick}
          aria-hidden="true"
        />
      )}
      
      <Card
        id="accessibility-panel"
        className={`accessibility-panel shadow ${open ? 'show' : ''} ${isMobile ? 'mobile-modal' : ''}`}
        aria-hidden={!open}
        role="dialog"
        aria-modal={isMobile}
        aria-label="Toegankelijkheidsvoorkeuren"
      >
        <Card.Body>
          <Card.Title as="h2" className="h5">
            Voorkeuren
          </Card.Title>
          <Form>
            <Form.Check
              type="switch"
              id="dyslexicFont"
              label="Dyslexievriendelijk lettertype"
              checked={preferences.dyslexicFont}
              onChange={() => togglePreference('dyslexicFont')}
            />
            <Form.Check
              type="switch"
              id="grayscale"
              label="Zwart-wit modus"
              checked={preferences.grayscale}
              onChange={() => togglePreference('grayscale')}
            />
            <Form.Check
              type="switch"
              id="highContrast"
              label="Hoog contrast"
              checked={preferences.highContrast}
              onChange={() => togglePreference('highContrast')}
            />
            <Button variant="outline-secondary" size="sm" className="mt-3" onClick={resetPreferences}>
              Herstel standaardinstellingen
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AccessibilityControls;
