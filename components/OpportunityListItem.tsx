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

function excerpt(text?: string) {
  if (!text) return '';
  return text.replace(/\n+/g, ' ').slice(0, 200) + (text.length > 200 ? '…' : '');
}

export default function OpportunityListItem({ item, onClick }: { item: Opportunity; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="list-group-item list-group-item-action d-flex gap-3 py-3 text-start"
      aria-label={`View details for ${item.title}`}
    >
      {item.profile.profileImageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.profile.profileImageUrl}
          alt={`${item.profile.organizationName} logo`}
          width={32}
          height={32}
          className="rounded-circle flex-shrink-0"
        />
      ) : (
        <div
          className="rounded-circle flex-shrink-0 bg-gray-200 d-flex align-items-center justify-content-center"
          style={{ width: 32, height: 32 }}
        >
          N/A
        </div>
      )}
      <div className="d-flex gap-2 w-100 justify-content-between">
        <div>
          <h6 className="mb-0">{item.title}</h6>
          <p className="mb-0 opacity-75">
            {item.profile.organizationName}
            {item.profile.organizationName ? ' – ' : ''}
            {excerpt(item.description?.[0]?.content)}
          </p>
        </div>
        <small className="opacity-50 text-nowrap">{formatDate(item.deadline)}</small>
      </div>
    </button>
  );
}
