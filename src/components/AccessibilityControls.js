import React, { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useAccessibility } from '../context/AccessibilityContext';

const AccessibilityControls = ({ variant = 'floating' }) => {
  const { preferences, togglePreference, resetPreferences } = useAccessibility();
  const [open, setOpen] = useState(false);
  const isInline = variant === 'navbar';
  const containerClass = `accessibility-controls${isInline ? ' accessibility-controls-inline' : ''}`;

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
      <Card
        id="accessibility-panel"
        className={`accessibility-panel shadow ${open ? 'show' : ''}`}
        aria-hidden={!open}
        role="dialog"
        aria-modal={!isInline}
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
