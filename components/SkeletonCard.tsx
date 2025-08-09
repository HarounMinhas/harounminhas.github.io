'use client';
import React from 'react';

export default function SkeletonCard() {
  return (
    <div className="flex w-full flex-col overflow-hidden rounded border bg-white p-4 shadow-sm animate-pulse">
      <div className="mb-4 h-40 w-full bg-gray-200" />
      <div className="mb-2 h-4 w-3/4 bg-gray-200" />
      <div className="mb-2 h-3 w-1/2 bg-gray-200" />
      <div className="h-3 w-full bg-gray-200" />
    </div>
  );
}
