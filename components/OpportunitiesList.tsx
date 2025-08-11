'use client';
import React, { useEffect, useState, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Opportunity,
  OpportunityListResponse,
  fetchAllOpportunities,
} from '../src/api/opportunities';
import OpportunityCard from './OpportunityCard';
import SkeletonCard from './SkeletonCard';
import Pagination from './Pagination';
import SortSelect from './SortSelect';
import Filters from './Filters';
import { Option } from './filters/MultiSelectFilter';

export default function OpportunitiesList() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sortBy = searchParams.get('sortBy') || '-deadline';
  const page = parseInt(searchParams.get('page') || '1', 10);
  const typeParam = searchParams.get('type') || '';
  const countryParam = searchParams.get('country') || '';
  const cityParam = searchParams.get('city') || '';
  const searchQuery = searchParams.get('search') || '';
  const type = useMemo(() => (typeParam ? typeParam.split(',').filter(Boolean) : []), [typeParam]);
  const country = useMemo(
    () => (countryParam ? countryParam.split(',').filter(Boolean) : []),
    [countryParam],
  );
  const city = useMemo(() => (cityParam ? cityParam.split(',').filter(Boolean) : []), [cityParam]);
  const pageLengthParam = searchParams.get('pageLength');
  const pageLength = pageLengthParam ? parseInt(pageLengthParam, 10) : 6;

  const [allData, setAllData] = useState<Opportunity[]>([]);
  const [data, setData] = useState<OpportunityListResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [typeOptions, setTypeOptions] = useState<Option[]>([]);
  const [countryOptions, setCountryOptions] = useState<Option[]>([]);
  const [cityOptions, setCityOptions] = useState<Option[]>([]);
  const [progress, setProgress] = useState(0);

  // Restore previously used filters and pagination from session storage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!searchParams.toString()) {
      const saved = sessionStorage.getItem('opportunity-search');
      if (saved) {
        router.replace(`/opportunities?${saved}`);
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Persist current search params
  useEffect(() => {
    if (typeof window === 'undefined') return;
    sessionStorage.setItem('opportunity-search', searchParams.toString());
  }, [searchParams.toString()]);

  // Load all opportunities (from cache if available)
  useEffect(() => {
    let canceled = false;
    const cached = typeof window !== 'undefined'
      ? sessionStorage.getItem('all-opportunities')
      : null;
    if (cached) {
      try {
        const parsed: Opportunity[] = JSON.parse(cached);
        setAllData(parsed);
      } catch {
        // ignore parse errors
      }
    }

    async function loadAll() {
      try {
        await fetchAllOpportunities((partial, currentPage, pages) => {
          if (canceled) return;
          setAllData(partial);
          if (typeof window !== 'undefined') {
            sessionStorage.setItem('all-opportunities', JSON.stringify(partial));
          }
          if (pages) {
            setProgress((currentPage / pages) * 100);
          }
        });
      } catch (e) {
        console.error(e);
      }
    }
    loadAll();
    return () => {
      canceled = true;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Derive filter options from the full dataset
  useEffect(() => {
    const types = Array.from(
      new Set(allData.map((o) => o.type).filter((v): v is string => Boolean(v))),
    ).sort();
    const countries = Array.from(
      new Set(
        allData.map((o) => o.profile?.country).filter((v): v is string => Boolean(v)),
      ),
    ).sort();
    const cities = Array.from(
      new Set(allData.map((o) => o.profile?.city).filter((v): v is string => Boolean(v))),
    ).sort();
    setTypeOptions(types.map((v) => ({ value: v, label: v })));
    setCountryOptions(countries.map((v) => ({ value: v, label: v })));
    setCityOptions(cities.map((v) => ({ value: v, label: v })));
  }, [allData]);

  // Apply filters, sorting and pagination on the client
  useEffect(() => {
    setLoading(true);
    setError(null);
    try {
      let items = allData;
      if (type.length) items = items.filter((o) => o.type && type.includes(o.type));
      if (country.length)
        items = items.filter(
          (o) => o.profile?.country && country.includes(o.profile.country),
        );
      if (city.length)
        items = items.filter((o) => o.profile?.city && city.includes(o.profile.city));
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        items = items.filter((o) => o.title.toLowerCase().includes(q));
      }
      const field = sortBy.startsWith('-') ? sortBy.slice(1) : sortBy;
      const dir = sortBy.startsWith('-') ? -1 : 1;
      items = items.slice().sort((a: any, b: any) => {
        const av = a[field];
        const bv = b[field];
        if (!av || !bv) return 0;
        const ad = Date.parse(av);
        const bd = Date.parse(bv);
        if (!Number.isNaN(ad) && !Number.isNaN(bd)) {
          return (ad - bd) * dir;
        }
        return String(av).localeCompare(String(bv)) * dir;
      });
      const totalPages = pageLength ? Math.ceil(items.length / pageLength) : 1;
      const start = pageLength ? (page - 1) * pageLength : 0;
      const pageItems = pageLength ? items.slice(start, start + pageLength) : items;
      setData({ data: pageItems, pages: pageLength ? totalPages : undefined, entries: items.length });
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [allData, sortBy, page, type, country, city, pageLength, searchQuery]);

  const updateParams = (params: URLSearchParams) => {
    router.push(`/opportunities?${params.toString()}`);
  };

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sortBy', value);
    params.set('page', '1');
    updateParams(params);
  };

  const handleFilterChange = (name: string, value: string | string[]) => {
    const params = new URLSearchParams(searchParams.toString());
    if (Array.isArray(value)) {
      if (value.length) {
        params.set(name, value.join(','));
      } else {
        params.delete(name);
      }
    } else if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    params.set('page', '1');
    updateParams(params);
  };

  const handlePageChange = (p: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(p));
    updateParams(params);
  };

  const handleCardClick = (id: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('id', id);
    router.push(`/opportunities?${params.toString()}`);
  };

  return (
    <div>
      <div className="mb-4 flex flex-col gap-2">
        <Filters
          type={type}
          country={country}
          city={city}
          pageLength={pageLength}
          onChange={handleFilterChange}
          typeOptions={typeOptions}
          countryOptions={countryOptions}
          cityOptions={cityOptions}
        />
        <div className="flex items-center justify-end">
          <SortSelect value={sortBy} onChange={handleSortChange} />
        </div>
      </div>
      {progress > 0 && progress < 100 && (
        <div className="progress mb-4">
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: `${progress}%` }}
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      )}
      {error && (
        <div className="mb-4 rounded border border-red-200 bg-red-50 p-4">
          <p className="text-red-700">Failed to load opportunities.</p>
          <button
            className="mt-2 rounded border px-2 py-1"
            onClick={() => handleSortChange(sortBy)}
            aria-label="Retry loading opportunities"
          >
            Retry
          </button>
        </div>
      )}
      {loading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: pageLength || 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data?.data.map((item) => (
            <OpportunityCard key={item.id} item={item} onClick={() => handleCardClick(item.id)} />
          ))}
        </div>
      )}
      {!loading && !error && pageLength !== 0 && (
        <Pagination page={page} totalPages={data?.pages} onPageChange={handlePageChange} />
      )}
    </div>
  );
}

