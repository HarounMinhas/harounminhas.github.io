'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Opportunity, fetchOpportunity } from '../../../src/api/opportunities';

export default function OpportunityDetail() {
  const params = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { id } = params;
  const [data, setData] = useState<Opportunity | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchOpportunity(id)
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  const backHref = `/opportunities?${searchParams.toString()}`;

  if (loading) return <div className="py-10 text-center" role="status">Loading…</div>;
  if (error) return <div className="py-10 text-center">Failed to load. <button className="underline" onClick={() => router.refresh()}>Retry</button></div>;
  if (!data) return null;

  const location = [data.profile.city, data.profile.country].filter(Boolean).join(', ');

  return (
    <article className="space-y-4">
      <nav>
        <Link href={backHref} className="text-blue-600 hover:underline">← Back to opportunities</Link>
      </nav>
      <header className="space-y-2">
        <h1 className="text-2xl font-bold">{data.title}</h1>
        <div className="text-gray-600">{data.profile.organizationName}</div>
        <div className="text-sm text-gray-500">{location}</div>
      </header>
      {data.profile.profileImageUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={data.profile.profileImageUrl}
          alt={`${data.profile.organizationName} logo`}
          className="h-60 w-full rounded object-cover" />
      )}
      {data.description?.map((d, i) => (
        <p key={i} className="whitespace-pre-wrap">{d.content}</p>
      ))}
      {data.required?.items && data.required.items.length > 0 && (
        <div>
          <h2 className="font-semibold">Requirements</h2>
          <ul className="list-disc pl-5">
            {data.required.items.map(it => (<li key={it}>{it}</li>))}
          </ul>
          {data.required.other && <p>{data.required.other}</p>}
        </div>
      )}
      {data.applicationFees && data.applicationFees.length > 0 && (
        <div>
          <h2 className="font-semibold">Application Fees</h2>
          <table className="mt-2 w-full text-sm">
            <thead><tr><th className="text-left">Price</th><th className="text-left">Currency</th><th className="text-left">Description</th></tr></thead>
            <tbody>
              {data.applicationFees.map((fee, i) => (
                <tr key={i} className="border-t">
                  <td>{fee.price}</td>
                  <td>{fee.currency}</td>
                  <td>{fee.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="space-x-2">
        {data.apply?.onlineForm && (
          <a
            href={data.apply.onlineForm}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded bg-blue-600 px-4 py-2 text-white"
          >
            Apply
          </a>
        )}
        {data.contact?.url && (
          <a
            href={data.contact.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded border px-4 py-2"
          >
            Visit
          </a>
        )}
        {data.contact?.email && (
          <a
            href={`mailto:${data.contact.email}`}
            className="inline-block rounded border px-4 py-2"
          >
            Email
          </a>
        )}
      </div>
      <div className="text-xs text-gray-500">
        <div>Created: {formatDate(data.createdAt)}</div>
        <div>Last Modified: {formatDate(data.lastModifiedDate)}</div>
      </div>
    </article>
  );
}

function formatDate(date?: string) {
  if (!date) return '—';
  try {
    return new Date(date).toLocaleString();
  } catch {
    return date;
  }
}
