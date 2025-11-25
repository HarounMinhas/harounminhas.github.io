'use client';
import React from 'react';

export default function Pagination({ page, totalPages, onPageChange }: { page: number; totalPages?: number; onPageChange: (p: number) => void }) {
  if (!totalPages || totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <div className="mt-4 flex items-center justify-center gap-2" aria-label="Pagination navigation">
      <button
        className="rounded border px-2 py-1 text-sm disabled:opacity-50"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        aria-label="Previous page"
      >
        Prev
      </button>
      {pages.map(p => (
        <button
          key={p}
          className={`rounded border px-2 py-1 text-sm ${p === page ? 'bg-gray-200' : ''}`}
          onClick={() => onPageChange(p)}
          aria-current={p === page ? 'page' : undefined}
        >
          {p}
        </button>
      ))}
      <button
        className="rounded border px-2 py-1 text-sm disabled:opacity-50"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        aria-label="Next page"
      >
        Next
      </button>
    </div>
  );
}
