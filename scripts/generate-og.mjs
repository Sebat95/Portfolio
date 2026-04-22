import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const publicDir = path.join(root, 'public');
const svgPath = path.join(publicDir, 'og-1200x630.svg');
const iconPath = path.join(publicDir, 'icon.png');
const outPath = path.join(publicDir, 'og-1200x630.png');

await mkdir(publicDir, { recursive: true });

const svg = await readFile(svgPath);

// Render background + text from SVG, then composite the real site icon
// so the social preview matches the brand mark exactly.
const base = sharp(svg, { density: 200 })
  .resize(1200, 630, { fit: 'cover' })
  .png({ quality: 95 });

const icon = await sharp(iconPath)
  .resize(280, 280, { fit: 'contain' })
  .png()
  .toBuffer();

const png = await base
  .composite([
    {
      input: icon,
      left: 100,
      top: Math.round((630 - 280) / 2)
    }
  ])
  .toBuffer();

await writeFile(outPath, png);
console.log(`Generated ${path.relative(root, outPath)}`);

