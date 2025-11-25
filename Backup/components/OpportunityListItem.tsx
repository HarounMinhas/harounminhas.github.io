'use client';
import React from 'react';
import { Opportunity } from '../src/api/opportunities';
import { getCountryName } from '../src/countries';
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

export default function OpportunityListItem({ item, onClick }: { item: Opportunity; onClick?: () => void }) {
  const location = [item.profile.city, getCountryName(item.profile.country)].filter(Boolean).join(', ');
  const hasRewards = item.rewards && item.rewards.rewardTypes && item.rewards.rewardTypes.length > 0;
  return (
    <button
      onClick={onClick}
      className="list-group-item list-group-item-action d-flex gap-3 py-3 text-start"
      aria-label={`View details for ${item.title}`}
      style={{ marginBottom: 10 }}
    >
      {item.profile.profileImageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.profile.profileImageUrl}
          alt={`${item.profile.organizationName} logo`}
          width={100}
          height={100}
          className="rounded object-cover flex-shrink-0"
          style={{ objectFit: 'cover' }}
        />
      ) : (
        <div
          className="rounded flex-shrink-0 bg-gray-200 d-flex align-items-center justify-content-center"
          style={{ width: 100, height: 100 }}
        >
          N/A
        </div>
      )}
      <div className="d-flex gap-2 w-100 justify-content-between">
        <div className="flex-grow-1">
          <div className="d-flex align-items-center gap-1">
            <h6 className="mb-0">{item.title}</h6>
            {item.boost?.isHighlighted && <SponsoredBadge />}
          </div>
          <div className="mb-1 text-sm text-muted">
            {item.profile.organizationName}
            {item.profile.verified ? <span className="ms-1" aria-label="verified">✔️</span> : null}
            {location ? <span> – {location}</span> : null}
          </div>
          <div className="d-flex flex-wrap gap-1 mb-1">
            <TypeBadge type={item.type} />
            <FeeBadge text={feeLabel(item)} />
            {hasRewards
              ? item.rewards!.rewardTypes!.map((rt) => <RewardBadge key={rt} text={rt} />)
              : item.rewards?.rewardDescription && (
                  <RewardBadge text={item.rewards.rewardDescription.slice(0, 20)} />
                )}
          </div>
          <p className="mb-0 opacity-75">{excerpt(item.description?.[0]?.content)}</p>
        </div>
        <small className="opacity-50 text-nowrap">{formatDate(item.deadline)}</small>
      </div>
    </button>
  );
}
