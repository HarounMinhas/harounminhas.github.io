import { describe, expect, it } from "vitest";
import {
  DEFAULT_TIMESTAMP_INFO,
  deriveTimestampInfo,
  formatTimestampWithSeconds,
  parseTimestamp,
} from "../app/projects/components/ProjectVersionBanner";

describe("parseTimestamp", () => {
  it("parses ISO timestamps", () => {
    const date = parseTimestamp("2024-05-01T12:34:56Z");
    expect(date).not.toBeNull();
    expect(date?.toISOString()).toBe("2024-05-01T12:34:56.000Z");
  });

  it("parses Unix timestamps in seconds", () => {
    const date = parseTimestamp("1714563296");
    expect(date).not.toBeNull();
    expect(date?.getTime()).toBe(1714563296000);
  });

  it("returns null for invalid values", () => {
    expect(parseTimestamp("not-a-date")).toBeNull();
  });
});

describe("deriveTimestampInfo", () => {
  it("returns the default info when no sources are available", () => {
    const info = deriveTimestampInfo([]);
    expect(info).toEqual(DEFAULT_TIMESTAMP_INFO);
  });

  it("marks unparsable timestamps with an explanatory message", () => {
    const info = deriveTimestampInfo(["  invalid  "], {
      parse: () => null,
      format: formatTimestampWithSeconds,
    });

    expect(info).toEqual({
      rawValue: "invalid",
      displayValue: "Onbekend formaat (invalid)",
      isParsed: false,
    });
  });

  it("formats valid timestamps using the provided formatter", () => {
    const info = deriveTimestampInfo([" 2024-05-01T12:34:56Z "], {
      parse: (value) => new Date(value),
      format: () => "formatted-value",
    });

    expect(info).toEqual({
      rawValue: "2024-05-01T12:34:56Z",
      displayValue: "formatted-value",
      isParsed: true,
    });
  });
});
