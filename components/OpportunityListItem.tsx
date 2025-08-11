'use client';
import React from 'react';
import { Opportunity } from '../src/api/opportunities';

function formatDate(date?: string) {
  if (!date) return 'No deadline';
  try {
    return new Date(date).toLocaleDateString();
  } catch {
    return date;
  }
}

export default function OpportunityListItem({ item, onClick }: { item: Opportunity; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="list-group-item list-group-item-action flex w-full gap-3 py-3 text-left hover:bg-gray-50 focus:outline-none"
      aria-label={`View details for ${item.title}`}
    >
      {item.profile.profileImageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.profile.profileImageUrl}
          alt={`${item.profile.organizationName} logo`}
          width={32}
          height={32}
          className="h-8 w-8 flex-shrink-0 rounded-full object-cover"
        />
      ) : (
        <div className="h-8 w-8 flex-shrink-0 rounded-full bg-gray-200" />
      )}
      <div className="flex w-full justify-between gap-2">
        <div>
          <h6 className="mb-0 font-medium">{item.title}</h6>
          <p className="mb-0 text-sm text-gray-600">{item.profile.organizationName}</p>
        </div>
        <small className="opacity-50 text-nowrap text-xs">{formatDate(item.deadline)}</small>
      </div>
    </button>
  );
}
