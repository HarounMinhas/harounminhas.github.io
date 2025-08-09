'use client';
import React from 'react';

export function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={`rounded px-2 py-0.5 text-xs ${className}`}>{children}</span>;
}

export function TypeBadge({ type }: { type?: string }) {
  if (!type) return null;
  return <Badge className="bg-blue-100 text-blue-800">{type.replace(/_/g, ' ')}</Badge>;
}

export function FeeBadge({ text }: { text: string }) {
  return <Badge className="bg-yellow-100 text-yellow-800">{text}</Badge>;
}

export function RewardBadge({ text }: { text: string }) {
  return <Badge className="bg-green-100 text-green-800">{text}</Badge>;
}

export function SponsoredBadge() {
  return <Badge className="bg-pink-100 text-pink-800">Sponsored</Badge>;
}
