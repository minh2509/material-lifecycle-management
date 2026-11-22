import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const readJson = async name => JSON.parse(await readFile(new URL(`../public/demo/${name}`, import.meta.url), 'utf8'));

test('bundled catalog and provenance form a consistent runnable demo', async () => {
  const catalog = await readJson('catalog.json');
  const provenance = await readJson('provenance.json');
  assert.equal(catalog.contract, 'DemoDataset.catalog');
  assert.equal(provenance.contract, 'DemoDataset.provenance');
  assert(Array.isArray(catalog.items) && catalog.items.length > 0);
  for (const item of catalog.items) {
    for (const field of ['code', 'name', 'unit']) assert.equal(typeof item[field], 'string');
  }
  assert.equal(catalog.items.length, provenance.counts.admitted);
  assert.equal(provenance.diagnostics.length, provenance.counts.diagnostic);
  assert.equal(catalog.source.sha256, provenance.source.sha256);
});
