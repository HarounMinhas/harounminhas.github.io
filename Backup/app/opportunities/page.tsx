'use client';
import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import OpportunitiesList from "../../components/OpportunitiesList";
import OpportunityDetail from "../../components/OpportunityDetail";

function Content() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  return id ? <OpportunityDetail id={id} /> : <OpportunitiesList />;
}

export default function OpportunitiesPage() {
  return (
    <Suspense fallback={<div className="py-10 text-center" role="status">Loading…</div>}>
      <Content />
    </Suspense>
  );
}
