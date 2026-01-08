import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { ProviderId } from '@musicdiscovery/shared';

import AppRoutes from './AppRoutes';
import BackgroundSurface from './components/BackgroundSurface';
import BackgroundToggle, { type BackgroundMode } from './components/BackgroundToggle';
import './styles.css';
import { useArtistDetails } from './hooks/useArtistDetails';
import { useArtistSearch } from './hooks/useArtistSearch';
import { useProviderSelection } from './hooks/useProviderSelection';
import { useTabState } from './hooks/useTabState';
import { useToastQueue } from './hooks/useToastQueue';
import { useScrollPreserver } from './hooks/useScrollPreserver';

const INTRO_ACK_KEY = 'musicdiscovery-intro-acknowledged';

export default function App(): JSX.Element {
  const preserveScroll = useScrollPreserver();
  const { toasts, pushToast } = useToastQueue();
  const {
    provider,
    providers,
    status: providerStatus,
    error: providerError,
    selectProvider
  } = useProviderSelection();
  const {
    tabs,
    tabItems,
    activeTab,
    activeTabId,
    openOrFocus,
    focusTab,
    closeTab,
    clearTabs,
    updateTabArtist
  } = useTabState({ preserveScroll });
  const {
    query,
    results,
    status: searchStatus,
    error: searchError,
    selectedId,
    highlightedArtist,
    confirmedArtist,
    isPopoverVisible,
    updateQuery,
    focusResults,
    confirmSelection,
    selectArtist
  } = useArtistSearch();
  const {
    status: detailStatus,
    error: detailError,
    artist: detailArtist,
    topTracks,
    relatedArtists
  } = useArtistDetails(activeTabId, provider);

  const [backgroundMode, setBackgroundMode] = useState<BackgroundMode>(() => {
    if (typeof window !== 'undefined') {
      const stored = window.localStorage.getItem('background-mode');
      if (stored === 'static' || stored === 'animated') {
        return stored;
      }
    }
    return 'animated';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('background-mode', backgroundMode);
    }
  }, [backgroundMode]);

  const [isIntroOpen, setIsIntroOpen] = useState(() => {
    if (typeof window === 'undefined') {
      return false;
    }

    return window.localStorage.getItem(INTRO_ACK_KEY) !== 'true';
  });

  const acknowledgeIntro = useCallback(() => {
    setIsIntroOpen(false);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(INTRO_ACK_KEY, 'true');
    }
  }, []);

  const handledConfirmedArtistRef = useRef<string | null>(null);

  useEffect(() => {
    if (!confirmedArtist) {
      handledConfirmedArtistRef.current = null;
      return;
    }

    if (handledConfirmedArtistRef.current === confirmedArtist.id) {
      return;
    }

    handledConfirmedArtistRef.current = confirmedArtist.id;
    openOrFocus(confirmedArtist);
  }, [confirmedArtist, openOrFocus]);

  useEffect(() => {
    if (detailArtist) {
      updateTabArtist(detailArtist);
    }
  }, [detailArtist, updateTabArtist]);

  const lastSearchErrorRef = useRef<string | null>(null);
  useEffect(() => {
    if (searchStatus === 'error' && searchError && lastSearchErrorRef.current !== searchError) {
      lastSearchErrorRef.current = searchError;
      pushToast(searchError);
    } else if (searchStatus !== 'error') {
      lastSearchErrorRef.current = null;
    }
  }, [searchError, searchStatus, pushToast]);

  const lastDetailErrorRef = useRef<string | null>(null);
  useEffect(() => {
    if (detailStatus === 'error' && detailError && lastDetailErrorRef.current !== detailError) {
      lastDetailErrorRef.current = detailError;
      pushToast(detailError);
    } else if (detailStatus !== 'error') {
      lastDetailErrorRef.current = null;
    }
  }, [detailError, detailStatus, pushToast]);

  const handleProviderChange = useCallback(
    (next: ProviderId) => {
      if (next === provider) {
        return;
      }
      clearTabs();
      handledConfirmedArtistRef.current = null;
      selectProvider(next);
    },
    [provider, clearTabs, selectProvider]
  );

  const selectedArtist = detailArtist ?? activeTab?.artist ?? null;
  const hasTabs = tabs.length > 0;

  const headerProps = useMemo(
    () => ({
      provider,
      providerOptions: providers,
      providerStatus,
      providerError,
      onProviderChange: handleProviderChange,
      backgroundMode,
      onBackgroundModeChange: setBackgroundMode
    }),
    [provider, providers, providerStatus, providerError, handleProviderChange, backgroundMode]
  );

  const searchProps = useMemo(
    () => ({
      query,
      results,
      status: searchStatus,
      error: searchError,
      selectedId,
      highlightedArtist,
      isPopoverVisible,
      onQueryChange: updateQuery,
      onFocusResults: focusResults,
      onConfirmSelection: confirmSelection,
      onSelectArtist: selectArtist,
      onOpenArtist: openOrFocus
    }),
    [
      query,
      results,
      searchStatus,
      searchError,
      selectedId,
      highlightedArtist,
      isPopoverVisible,
      updateQuery,
      focusResults,
      confirmSelection,
      selectArtist,
      openOrFocus
    ]
  );

  const tabsProps = useMemo(
    () => ({
      items: tabItems,
      activeId: activeTabId,
      onFocus: focusTab,
      onClose: closeTab,
      hasTabs
    }),
    [tabItems, activeTabId, focusTab, closeTab, hasTabs]
  );

  const detailProps = useMemo(
    () => ({
      provider,
      status: detailStatus,
      error: detailError,
      selectedArtist,
      topTracks,
      relatedArtists,
      onPreviewError: pushToast,
      onOpenRelated: openOrFocus
    }),
    [
      provider,
      detailStatus,
      detailError,
      selectedArtist,
      topTracks,
      relatedArtists,
      pushToast,
      openOrFocus
    ]
  );

  return (
    <BackgroundSurface mode={backgroundMode}>
      {isIntroOpen ? (
        <div
          className="intro-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Info"
          onClick={acknowledgeIntro}
        >
          <div className="intro-overlay__backdrop" />
          <div
            className="intro-overlay__panel"
            role="document"
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <p className="label">Kleine opmerking</p>
            <p className="muted">
              Zoeken kan in het begin wat traag zijn. Dit komt omdat de app nog in testfase zit en op gratis services
              draait.
            </p>
            <p className="muted">
              Krijg je niet meteen resultaten? Refresh even of wacht een minuutje — dan is de service waarschijnlijk aan
              het opstarten.
            </p>
            <div className="intro-overlay__actions">
              <button type="button" className="intro-overlay__button" onClick={acknowledgeIntro}>
                Oké, begrepen
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <AppRoutes header={headerProps} search={searchProps} tabs={tabsProps} detail={detailProps} toasts={toasts} />

      <footer className="app__footer-controls">
        <BackgroundToggle value={backgroundMode} onChange={setBackgroundMode} />
      </footer>
    </BackgroundSurface>
  );
}
