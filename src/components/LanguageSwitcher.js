import React, { useEffect, useMemo, useState } from 'react';
import { Dropdown } from 'react-bootstrap';

const LANG_STORAGE_KEY = 'lang';

const normalizeLang = (value) => {
  if (value === 'en' || value === 'nl') return value;
  return 'nl';
};

const LanguageSwitcher = () => {
  const initialLang = useMemo(() => {
    try {
      return normalizeLang(localStorage.getItem(LANG_STORAGE_KEY));
    } catch {
      return 'nl';
    }
  }, []);

  const [lang, setLang] = useState(initialLang);

  useEffect(() => {
    try {
      localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch {
      // ignore
    }
  }, [lang]);

  const currentFlag = lang === 'nl' ? '🇧🇪' : '🇬🇧';

  return (
    <Dropdown align="end">
      <Dropdown.Toggle
        id="language-switcher"
        variant="link"
        size="sm"
        className="p-0 text-decoration-none"
        aria-label="Kies taal"
      >
        <span aria-hidden="true" style={{ fontSize: '1.1rem' }}>
          {currentFlag}
        </span>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item
          active={lang === 'nl'}
          onClick={() => setLang('nl')}
          aria-current={lang === 'nl' ? 'true' : undefined}
        >
          🇧🇪 NL{lang === 'nl' ? ' ✓' : ''}
        </Dropdown.Item>
        <Dropdown.Item
          active={lang === 'en'}
          onClick={() => setLang('en')}
          aria-current={lang === 'en' ? 'true' : undefined}
        >
          🇬🇧 EN{lang === 'en' ? ' ✓' : ''}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default LanguageSwitcher;
