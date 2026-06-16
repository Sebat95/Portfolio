import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import type { Plugin } from 'vite';
import { buildResumeJson, transformIndexHtml } from './ai-exports';

export function aiExportsPlugin(): Plugin {
  let isProductionBuild = false;

  return {
    name: 'ai-exports',
    config(_, { command }) {
      isProductionBuild = command === 'build';
    },
    async buildStart() {
      const publicDir = path.resolve('public');
      await mkdir(publicDir, { recursive: true });
      await writeFile(
        path.join(publicDir, 'resume.json'),
        `${JSON.stringify(buildResumeJson(), null, 2)}\n`,
        'utf8'
      );

      if (isProductionBuild) {
        const sitemapPath = path.join(publicDir, 'sitemap.xml');
        const today = new Date().toISOString().slice(0, 10);
        const sitemap = await readFile(sitemapPath, 'utf8');
        await writeFile(
          sitemapPath,
          sitemap.replaceAll(
            /<lastmod>.*?<\/lastmod>/g,
            `<lastmod>${today}</lastmod>`
          ),
          'utf8'
        );
      }
    },
    transformIndexHtml(html) {
      return transformIndexHtml(html);
    }
  };
}
