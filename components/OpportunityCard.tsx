'use client';
import React from 'react';
import { Opportunity } from '../src/api/opportunities';
import { FeeBadge, RewardBadge, SponsoredBadge, TypeBadge } from './Badges';

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

function feeLabel(item: Opportunity) {
  if (item.fee === 'FREE') return 'Free';
  if (item.applicationFees && item.applicationFees.length > 0) {
    const fee = item.applicationFees[0];
    return `${fee.price} ${fee.currency}`;
  }
  if (item.fee) return item.fee;
  return 'No fee';
}

export default function OpportunityCard({ item, onClick }: { item: Opportunity; onClick?: () => void }) {
  const location = [item.profile.city, item.profile.country].filter(Boolean).join(', ');
  const hasRewards = item.rewards && item.rewards.rewardTypes && item.rewards.rewardTypes.length > 0;
  return (
    <button
      onClick={onClick}
      className="flex w-full flex-col overflow-hidden rounded border bg-white text-left shadow-sm hover:shadow-md focus:outline-none focus:ring"
      aria-label={`View details for ${item.title}`}
    >
      <div className="h-40 w-full overflow-hidden bg-gray-100">
        {item.profile.profileImageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.profile.profileImageUrl}
            alt={`${item.profile.organizationName} logo`}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-gray-400">No image</div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{item.title}</h3>
          {item.boost?.isHighlighted && <SponsoredBadge />}
        </div>
        <div className="text-sm text-gray-600">
          <span>{item.profile.organizationName}</span>
          {item.profile.verified ? <span className="ml-1" aria-label="verified">✔️</span> : null}
        </div>
        <div className="text-xs text-gray-500">{location}</div>
        <div className="flex flex-wrap gap-1">
          <TypeBadge type={item.type} />
          <FeeBadge text={feeLabel(item)} />
          {hasRewards
            ? item.rewards!.rewardTypes!.map(rt => <RewardBadge key={rt} text={rt} />)
            : item.rewards?.rewardDescription && <RewardBadge text={item.rewards.rewardDescription.slice(0, 20)} />}
        </div>
        <div className="text-sm text-gray-700">{excerpt(item.description?.[0]?.content)}</div>
        <div className="mt-auto text-sm font-medium">Deadline: {formatDate(item.deadline)}</div>
      </div>
    </button>
  );
}
