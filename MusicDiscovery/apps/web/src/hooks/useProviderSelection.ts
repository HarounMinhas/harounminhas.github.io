import { useCallback } from 'react';
import { PROVIDERS, type ProviderId, type ProviderMetadata } from '@musicdiscovery/shared';

export type ProviderStatus = 'loading' | 'ready' | 'error';

interface ProviderSelectionState {
  provider: ProviderId;
  providers: ProviderMetadata[];
  status: ProviderStatus;
  error: string | null;
  selectProvider: (next: ProviderId) => void;
}

// Locked provider selection: always use Deezer (primary) with iTunes links available.
// This intentionally disables runtime switching and removes any persisted selection.
const LOCKED_PROVIDER: ProviderId = 'deezer';

export function useProviderSelection(): ProviderSelectionState {
  const selectProvider = useCallback(() => {
    // no-op: provider selection removed
  }, []);

  return {
    provider: LOCKED_PROVIDER,
    providers: PROVIDERS.filter((p) => p.id === 'deezer' || p.id === 'itunes'),
    status: 'ready',
    error: null,
    selectProvider
  };
}
