import React, { useCallback, useMemo, useState } from 'react';
import type { Artist, ProviderId } from '@musicdiscovery/shared';
import ArtistSearch from './components/ArtistSearch';
import ArtistDetails from './components/ArtistDetails';
import ProviderSelector from './components/ProviderSelector';
import { useArtistSearch } from './hooks/useArtistSearch';
import { useArtistDetails } from './hooks/useArtistDetails';
import { useProviders } from './hooks/useProviders';

export default function App() {
  const [query, setQuery] = useState('');
  const [provider, setProvider] = useState<ProviderId>('tokenless');
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [previewError, setPreviewError] = useState<string | null>(null);

  const { providers, status: providerStatus } = useProviders();
  const { results: searchResults, status: searchStatus } = useArtistSearch(query, provider);
  const {
    artist,
    topTracks,
    relatedArtists,
    serviceMetadata,
    status: detailsStatus,
    error: detailsError
  } = useArtistDetails(selectedArtist?.id ?? null, provider);

  const handleSelectArtist = useCallback((nextArtist: Artist) => {
    setSelectedArtist(nextArtist);
    setPreviewError(null);
  }, []);

  const handleOpenRelated = useCallback(
    (relatedArtist: Artist) => {
      handleSelectArtist(relatedArtist);
    },
    [handleSelectArtist]
  );

  const handlePreviewError = useCallback((message: string) => {
    setPreviewError(message);
  }, []);

  const effectiveProvider = useMemo(() => {
    if (providerStatus === 'idle' || providerStatus === 'loading') {
      return provider;
    }
    if (!providers) {
      return provider;
    }
    return providers.default;
  }, [provider, providers, providerStatus]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Music Discovery</h1>
        <p>Ontdek gelijkaardige artiesten, luister naar voorbeeldnummers en verken je muzieksmaak.</p>
      </header>
      <main className="app-main">
        {providers && providers.items.length > 1 && (
          <ProviderSelector
            providers={providers.items}
            activeProvider={effectiveProvider}
            onChange={setProvider}
          />
        )}
        <ArtistSearch
          query={query}
          onQueryChange={setQuery}
          results={searchResults}
          status={searchStatus}
          onSelect={handleSelectArtist}
        />
        {previewError && (
          <div role="alert" className="preview-error-banner">
            <p>{previewError}</p>
            <button
              type="button"
              onClick={() => setPreviewError(null)}
              aria-label="Foutmelding sluiten"
            >
              &times;
            </button>
          </div>
        )}
        {selectedArtist && artist ? (
          <ArtistDetails
            artist={artist}
            status={detailsStatus}
            topTracks={topTracks}
            relatedArtists={relatedArtists}
            serviceMetadata={serviceMetadata}
            error={detailsError}
            provider={effectiveProvider}
            onPreviewError={handlePreviewError}
            onOpenRelated={handleOpenRelated}
          />
        ) : null}
      </main>
    </div>
  );
}
