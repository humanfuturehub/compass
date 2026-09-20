// Fails if a component or page contains a literal hex colour or px value.
// The only files allowed to hold them are app/globals.css and tailwind.config.ts.

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const ROOTS = ['app', 'components', 'lib'];
const ALLOWED = new Set(['app/globals.css']);
const HEX = /#[0-9a-fA-F]{3,8}\b/;
const PX = /\b\d+(\.\d+)?px\b/;

function* walk(dir) {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) yield* walk(path);
    else if (/\.(tsx?|css)$/.test(entry)) yield path;
  }
}

const hits = [];
for (const root of ROOTS) {
  let exists = true;
  try {
    statSync(root);
  } catch {
    exists = false;
  }
  if (!exists) continue;
  for (const file of walk(root)) {
    if (ALLOWED.has(file)) continue;
    const lines = readFileSync(file, 'utf8').split('\n');
    lines.forEach((line, i) => {
      const code = line.trim();
      if (/^(\/\/|\/\*|\*)/.test(code)) return; // comments may describe sizes
      if (HEX.test(code) || PX.test(code)) hits.push(`${file}:${i + 1}: ${code}`);
    });
  }
}

if (hits.length > 0) {
  console.error('check-tokens: literal hex or px value outside the token config:');
  for (const hit of hits) console.error(`  ${hit}`);
  process.exit(1);
}
console.log('check-tokens: ok');
