'use client';
import React, { useEffect, useState, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Opportunity,
  OpportunityListResponse,
  fetchOpportunities,
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
  const type = useMemo(() => (typeParam ? typeParam.split(',').filter(Boolean) : []), [typeParam]);
  const country = useMemo(() => (countryParam ? countryParam.split(',').filter(Boolean) : []), [countryParam]);
  const city = useMemo(() => (cityParam ? cityParam.split(',').filter(Boolean) : []), [cityParam]);
  const pageLengthParam = searchParams.get('pageLength');
  const pageLength = pageLengthParam ? parseInt(pageLengthParam, 10) : 6;

  const [data, setData] = useState<OpportunityListResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [typeOptions, setTypeOptions] = useState<Option[]>([]);
  const [countryOptions, setCountryOptions] = useState<Option[]>([]);
  const [cityOptions, setCityOptions] = useState<Option[]>([]);

  useEffect(() => {
    let canceled = false;
    async function loadOptions() {
      try {
        const all: Opportunity[] = await fetchAllOpportunities();
        if (canceled) return;
        const types = Array.from(
          new Set(all.map((o) => o.type).filter((v): v is string => Boolean(v))),
        ).sort();
        const countries = Array.from(
          new Set(
            all.map((o) => o.profile?.country).filter((v): v is string => Boolean(v)),
          ),
        ).sort();
        const cities = Array.from(
          new Set(all.map((o) => o.profile?.city).filter((v): v is string => Boolean(v))),
        ).sort();
        setTypeOptions(types.map((v) => ({ value: v, label: v })));
        setCountryOptions(countries.map((v) => ({ value: v, label: v })));
        setCityOptions(cities.map((v) => ({ value: v, label: v })));
      } catch (e) {
        console.error(e);
      }
    }
    loadOptions();
    return () => {
      canceled = true;
    };
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchOpportunities({ sortBy, page, type, country, city, pageLength })
      .then((res) => setData(res))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [sortBy, page, type, country, city, pageLength]);

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

