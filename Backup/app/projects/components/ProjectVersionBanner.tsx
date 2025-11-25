"use client";

import { useEffect, useState } from "react";

type ProjectVersionBannerProps = {
  className?: string;
};

type TimestampSource = string | null | undefined;

export type TimestampInfo = {
  rawValue: string | null;
  displayValue: string | null;
  isParsed: boolean;
};

const TIMESTAMP_SOURCES: readonly TimestampSource[] = [
  process.env.NEXT_PUBLIC_DEPLOYED_AT,
  process.env.NEXT_PUBLIC_BUILD_TIMESTAMP,
  process.env.NEXT_PUBLIC_BUILD_TIME,
  process.env.NEXT_PUBLIC_VERCEL_DEPLOYMENT_DATETIME,
];

const pad = (value: number) => value.toString().padStart(2, "0");

export const formatTimestampWithSeconds = (date: Date) => {
  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1);
  const year = date.getFullYear();
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  const offsetMinutes = -date.getTimezoneOffset();
  const offsetSign = offsetMinutes >= 0 ? "+" : "-";
  const absoluteOffsetMinutes = Math.abs(offsetMinutes);
  const offsetHours = pad(Math.floor(absoluteOffsetMinutes / 60));
  const offsetRemainingMinutes = pad(absoluteOffsetMinutes % 60);

  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds} (UTC${offsetSign}${offsetHours}:${offsetRemainingMinutes})`;
};

export const parseTimestamp = (value: string): Date | null => {
  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }

  let parsedDate = new Date(trimmed);
  if (Number.isNaN(parsedDate.getTime())) {
    const numericValue = Number.parseInt(trimmed, 10);
    if (!Number.isNaN(numericValue)) {
      const milliseconds = trimmed.length === 10 ? numericValue * 1000 : numericValue;
      parsedDate = new Date(milliseconds);
    }
  }

  if (Number.isNaN(parsedDate.getTime())) {
    return null;
  }

  return parsedDate;
};

export const DEFAULT_TIMESTAMP_INFO: TimestampInfo = Object.freeze({
  rawValue: null,
  displayValue: null,
  isParsed: false,
});

type DeriveTimestampInfoOptions = {
  parse?: (value: string) => Date | null;
  format?: (date: Date) => string;
};

const findFirstCandidate = (sources: readonly TimestampSource[]) =>
  sources.find((value) => typeof value === "string" && value.trim().length > 0) ?? null;

export const deriveTimestampInfo = (
  sources: readonly TimestampSource[],
  options: DeriveTimestampInfoOptions = {},
): TimestampInfo => {
  const candidate = findFirstCandidate(sources);
  if (!candidate) {
    return DEFAULT_TIMESTAMP_INFO;
  }

  const trimmedCandidate = candidate.trim();
  const parse = options.parse ?? parseTimestamp;
  const format = options.format ?? formatTimestampWithSeconds;
  const parsedDate = parse(trimmedCandidate);

  if (!parsedDate) {
    return {
      rawValue: trimmedCandidate,
      displayValue: `Onbekend formaat (${trimmedCandidate})`,
      isParsed: false,
    };
  }

  return {
    rawValue: trimmedCandidate,
    displayValue: format(parsedDate),
    isParsed: true,
  };
};

const getContainerClassName = (className?: string) => {
  const baseClassName = "rounded-lg border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-900 shadow-sm";
  return className ? `${baseClassName} ${className}` : baseClassName;
};

const areTimestampInfosEqual = (a: TimestampInfo, b: TimestampInfo) =>
  a.rawValue === b.rawValue && a.displayValue === b.displayValue && a.isParsed === b.isParsed;

const ProjectVersionBanner = ({ className }: ProjectVersionBannerProps) => {
  const [timestampInfo, setTimestampInfo] = useState<TimestampInfo>(DEFAULT_TIMESTAMP_INFO);

  useEffect(() => {
    const info = deriveTimestampInfo(TIMESTAMP_SOURCES);
    setTimestampInfo((previous) => (areTimestampInfosEqual(previous, info) ? previous : info));
  }, []);

  const { rawValue, displayValue, isParsed } = timestampInfo;
  const containerClassName = getContainerClassName(className);

  return (
    <div className={containerClassName} title={rawValue ?? undefined}>
      <p className="text-sm font-semibold text-sky-900">Versie gedeployed op:</p>
      <p className="mt-1 text-sm text-sky-800">
        {displayValue ?? "Versie-informatie niet beschikbaar"}
      </p>
      {rawValue && (
        <p className="mt-2 text-xs text-sky-600">
          Bronstempel: <code className="rounded bg-sky-100 px-1 py-0.5 text-sky-700">{rawValue}</code>
          {!isParsed && " — controleer het formaat van deze waarde."}
        </p>
      )}
    </div>
  );
};

export default ProjectVersionBanner;
