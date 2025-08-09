'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { OpportunityListResponse, fetchOpportunities } from '../src/api/opportunities';
import OpportunityCard from './OpportunityCard';
import SkeletonCard from './SkeletonCard';
import Pagination from './Pagination';
import SortSelect from './SortSelect';

export default function OpportunitiesList() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sortBy = searchParams.get('sortBy') || '-deadline';
  const page = parseInt(searchParams.get('page') || '1', 10);

  const [data, setData] = useState<OpportunityListResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchOpportunities({ sortBy, page })
      .then((res) => setData(res))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [sortBy, page]);

  const updateParams = (params: URLSearchParams) => {
    router.push(`/opportunities?${params.toString()}`);
  };

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sortBy', value);
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
      <div className="mb-4 flex items-center justify-end">
        <SortSelect value={sortBy} onChange={handleSortChange} />
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
          {Array.from({ length: 6 }).map((_, i) => (
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
      {!loading && !error && (
        <Pagination page={page} totalPages={data?.pages} onPageChange={handlePageChange} />
      )}
    </div>
  );
}
