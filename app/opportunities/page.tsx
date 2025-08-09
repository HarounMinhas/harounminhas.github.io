import React, { Suspense } from 'react';
import OpportunitiesList from "../../components/OpportunitiesList";

export default function OpportunitiesPage() {
  return (
    <Suspense fallback={<div className="py-10 text-center" role="status">Loading…</div>}>
      <OpportunitiesList />
    </Suspense>
  );
}
