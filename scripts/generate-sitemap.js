/**
 * Generates the complete sitemap.xml from site route data.
 * Run: node scripts/generate-sitemap.js
 */
import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const SITE = 'https://chrisyourmanwithavan.com';
const today = new Date().toISOString().split('T')[0];

const SERVICES = [
  'small-removals',
  'courier',
  'waste-removal',
  'collection-and-delivery',
  'end-of-tenancy',
  'flat-pack-assembly',
];

const ALL_LOCATIONS = [
  'cumnock', 'ayr', 'kilmarnock', 'irvine', 'troon', 'prestwick',
  'kirkconnel', 'sanquhar', 'mossblown', 'ardrossan', 'dreghorn', 'saltcoats',
  'beith', 'stewarton', 'patna', 'dalmellington', 'maybole', 'newmilns',
  'darvel', 'dalrymple', 'galston', 'girvan', 'dalry', 'kilwinning', 'largs',
  'auchinleck', 'mauchline',
];

const LOW_RANKING_LOCATIONS = [
  'irvine', 'kilmarnock', 'troon', 'ayr', 'dalry', 'ardrossan', 'cumnock',
  'beith', 'auchinleck', 'darvel', 'mauchline', 'prestwick', 'newmilns',
  'kirkconnel', 'mossblown', 'dreghorn', 'girvan',
];

const PRIORITY_LOCATIONS = new Set([
  'cumnock', 'ayr', 'kilmarnock', 'irvine', 'troon', 'prestwick',
]);

function urlEntry(path, { priority, changefreq = 'monthly' }) {
  const loc = path === '/' ? `${SITE}/` : `${SITE}${path}`;
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

const entries = [
  urlEntry('/', { priority: '1.0', changefreq: 'weekly' }),
  urlEntry('/services', { priority: '0.9' }),
  ...SERVICES.map((slug) => urlEntry(`/services/${slug}`, { priority: '0.8' })),
  urlEntry('/locations', { priority: '0.9' }),
  ...ALL_LOCATIONS.map((slug) =>
    urlEntry(`/locations/${slug}`, {
      priority: PRIORITY_LOCATIONS.has(slug) ? '0.8' : '0.7',
    })
  ),
  urlEntry('/contact', { priority: '0.8' }),
  ...LOW_RANKING_LOCATIONS.flatMap((location) =>
    SERVICES.map((service) =>
      urlEntry(`/locations/${location}/${service}`, { priority: '0.7' })
    )
  ),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">

${entries.join('\n\n')}

</urlset>
`;

const outPath = join(root, 'public', 'sitemap.xml');
writeFileSync(outPath, sitemap);
console.log(`Generated sitemap with ${entries.length} URLs (lastmod: ${today}).`);
