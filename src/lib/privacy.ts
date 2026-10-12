import { readFileSync } from 'node:fs';
import path from 'node:path';

/**
 * Reads the approved policy text from privacy-source.html (repo root) at build time.
 * The policy body and attribution are returned verbatim; nothing is rewritten.
 */
export function loadPrivacySource(file = 'privacy-source.html') {
  const html = readFileSync(path.resolve(process.cwd(), file), 'utf8');

  const body = html.match(/<div class="card">([\s\S]*?)<\/div>\s*<\/main>/)?.[1];
  const attribution = html.match(/<footer>([\s\S]*?)<\/footer>/)?.[1];
  const effectiveDate = html.match(/Effective as of (\d{4}-\d{2}-\d{2})/)?.[1];

  if (!body || !attribution || !effectiveDate) {
    throw new Error(`Could not parse ${file}: policy body, attribution or effective date missing.`);
  }

  return { body: body.trim(), attribution: attribution.trim(), effectiveDate };
}
