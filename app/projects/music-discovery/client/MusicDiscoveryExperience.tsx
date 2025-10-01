'use client';

import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ReactMarkdown from 'react-markdown';
import SearchBar from './components/SearchBar';
import GraphCanvas from './components/GraphCanvas';
import GlobalPlayer from './components/GlobalPlayer';
import SidePanel from './components/SidePanel';
import { AuthProvider } from './lib/auth';
import styles from './styles.module.css';

const tabs = [
  { id: 'app', label: 'Interactieve app' },
  { id: 'blueprint', label: 'Blueprint' },
] as const;

type Tab = (typeof tabs)[number]['id'];

type Props = { blueprint: string };

function ExperienceShell({ blueprint }: Props) {
  const [tab, setTab] = useState<Tab>('app');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-100">MusicDiscovery Experience</h2>
        <div className={styles.tabs}>
          {tabs.map((item) => (
            <button
              key={item.id}
              className={`${styles.tabButton} ${tab === item.id ? styles.tabButtonActive : ''}`}
              onClick={() => setTab(item.id)}
              type="button"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {tab === 'app' ? (
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
      ) : (
        <article className={styles.blueprint}>
          <ReactMarkdown>{blueprint}</ReactMarkdown>
        </article>
      )}
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
