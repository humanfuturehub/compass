// Fails the build if a server-only secret reaches the browser bundle.
// Runs after `next build`. Checks .next/static for the *values* of the two
// server-only variables (when set) and for their *names*, which would only
// appear client-side if some component referenced them.

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const STATIC_DIR = '.next/static';
const SERVER_ONLY = ['SUPABASE_SERVICE_ROLE_KEY', 'SESSION_SECRET'];

const needles = [];
for (const name of SERVER_ONLY) {
  needles.push({ label: `${name} (name)`, text: name });
  const value = process.env[name];
  if (value && value.length >= 8) needles.push({ label: `${name} (value)`, text: value });
}

function* walk(dir) {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) yield* walk(path);
    else yield path;
  }
}

let dirExists = true;
try {
  statSync(STATIC_DIR);
} catch {
  dirExists = false;
}
if (!dirExists) {
  console.error(`check-secrets: ${STATIC_DIR} not found — run after next build`);
  process.exit(1);
}

const hits = [];
for (const file of walk(STATIC_DIR)) {
  const content = readFileSync(file, 'utf8');
  for (const { label, text } of needles) {
    if (content.includes(text)) hits.push(`${label} in ${file}`);
  }
}

if (hits.length > 0) {
  console.error('check-secrets: server-only secret found in the browser bundle:');
  for (const hit of hits) console.error(`  - ${hit}`);
  process.exit(1);
}
console.log(`check-secrets: ok (${needles.length} patterns, ${STATIC_DIR} clean)`);
