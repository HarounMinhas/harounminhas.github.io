import { cache } from 'react';
import fs from 'fs/promises';
import path from 'path';

type MarkdownDocument = {
  file: string;
  content: string;
};

const readProjectFile = cache(async (slug: string, file: string) => {
  const fullPath = path.join(process.cwd(), 'projects', slug, file);
  return fs.readFile(fullPath, 'utf8');
});

export async function getProjectMarkdown(slug: string, file: string): Promise<MarkdownDocument> {
  const content = await readProjectFile(slug, file);
  return { file, content };
}

export async function getProjectMarkdownMap<Files extends readonly string[]>(
  slug: string,
  files: Files,
): Promise<Record<Files[number], string>> {
  const entries = await Promise.all(
    files.map(async (file) => {
      const { content } = await getProjectMarkdown(slug, file);
      return [file, content] as const;
    }),
  );

  return Object.fromEntries(entries) as Record<Files[number], string>;
}
