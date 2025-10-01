'use client';

import { useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SearchBar from './components/SearchBar';
import GraphCanvas from './components/GraphCanvas';
import GlobalPlayer from './components/GlobalPlayer';
import SidePanel from './components/SidePanel';
import { AuthProvider } from './lib/auth';
import styles from './styles.module.css';

const apis = [
  {
    id: 'musicbrainz',
    name: 'MusicBrainz API',
    description: 'Open muziekencyclopedie zonder authenticatie, ideaal voor metadata en artiestrelaties.',
    requiresToken: false,
    docsUrl:
      'https://musicbrainz.org/doc/Development/XML_Web_Service/Version_2',
  },
  {
    id: 'itunes',
    name: 'iTunes Search API',
    description:
      'Publieke catalogus van Apple Music/iTunes zonder token, perfect voor snelle zoekopdrachten.',
    requiresToken: false,
    docsUrl:
      'https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI',
  },
  {
    id: 'songsterr',
    name: 'Songsterr Tabs API',
    description:
      'Gitaar-tabs, akkoorden en artiestinformatie zonder API-sleutel, ideaal voor creatieve inspiratie.',
    requiresToken: false,
    docsUrl: 'https://www.songsterr.com/a/wa/api',
  },
  {
    id: 'spotify',
    name: 'Spotify Web API',
    description:
      'Volledige catalogus met streaming metadata, vereist OAuth-token voor toegang.',
    requiresToken: true,
    docsUrl: 'https://developer.spotify.com/documentation/web-api',
  },
  {
    id: 'lastfm',
    name: 'Last.fm API',
    description:
      'Community-statistieken, scrobbles en aanbevelingen via een eenvoudige REST API (API-key vereist).',
    requiresToken: true,
    docsUrl: 'https://www.last.fm/api',
  },
] as const;

type Props = { blueprint: string };

function ExperienceShell({ blueprint: _blueprint }: Props) {
  const [selectedApiId, setSelectedApiId] = useState<string | null>(null);
  const selectedApi = useMemo(() => apis.find((api) => api.id === selectedApiId) ?? null, [selectedApiId]);

  return (
    <div className="space-y-6">
      <div className={styles.toolbar}>
        <div>
          <h2 className="text-xl font-semibold text-slate-100">MusicDiscovery</h2>
          <p className="mt-1 text-sm text-slate-300">
            Kies een muziek API om te starten. Beschikbaar zijn zowel open bronnen zonder token als platform-API&apos;s met
            OAuth.
          </p>
        </div>
        <div className={styles.apiPicker}>
          <span className={styles.apiPickerLabel}>Selecteer muziek API</span>
          <ul className={styles.apiList} role="list">
            {apis.map((api) => {
              const isActive = selectedApiId === api.id;

              return (
                <li key={api.id}>
                  <button
                    className={`${styles.apiButton} ${isActive ? styles.apiButtonActive : ''}`}
                    onClick={() => setSelectedApiId(api.id)}
                    type="button"
                    aria-pressed={isActive}
                  >
                    <div className={styles.apiButtonHeader}>
                      <span>{api.name}</span>
                      {!api.requiresToken ? (
                        <span
                          className={styles.apiBadge}
                          aria-label="Geen token of key nodig"
                          title="Geen token of key nodig"
                        >
                          🔓
                        </span>
                      ) : (
                        <span
                          className={styles.apiBadgeLocked}
                          aria-label="Token of API-sleutel vereist"
                          title="Token of API-sleutel vereist"
                        >
                          🔐
                        </span>
                      )}
                    </div>
                    <p className={styles.apiDescription}>{api.description}</p>
                    <span className={styles.apiDocs} aria-hidden="true">
                      Documentatie · {new URL(api.docsUrl).hostname}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div>
        {selectedApi ? (
          <div className={styles.selectionNotice}>
            <span>
              Geselecteerde API: <strong>{selectedApi.name}</strong>
            </span>
            <a className={styles.selectionLink} href={selectedApi.docsUrl} target="_blank" rel="noreferrer">
              Bekijk documentatie
            </a>
          </div>
        ) : (
          <div className={styles.selectionNoticeMuted}>Selecteer een API hierboven om de ervaring te starten.</div>
        )}
      </div>

      {selectedApi ? (
        <div className={styles.app}>
          <header className={styles.header}>
            <div className={styles.logo}>MusicDiscovery</div>
            <SearchBar />
            <nav style={{ display: 'flex', gap: 10 }}>
              <a className={styles.btn} href="#">Home</a>
              <a className={styles.btn} href="#discover">Discover</a>
              <a className={styles.btn} href="#library">Library</a>
            </nav>
          </header>
          <main className={styles.main}>
            <div className={styles.canvasWrap}>
              <GraphCanvas />
            </div>
            <SidePanel />
          </main>
          <footer className={styles.footer}>
            <div>
              <div className={styles.label}>Global player</div>
              <div style={{ color: 'white', fontWeight: 600 }}>Luister 30s previews</div>
            </div>
            <GlobalPlayer />
          </footer>
        </div>
      ) : null}
    </div>
  );
}

export default function MusicDiscoveryExperience({ blueprint }: Props) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ExperienceShell blueprint={blueprint} />
      </QueryClientProvider>
    </AuthProvider>
  );
}
