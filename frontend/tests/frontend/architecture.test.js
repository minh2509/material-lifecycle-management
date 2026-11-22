import test from 'node:test';
import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../../src/', import.meta.url));
async function filesIn(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map(entry => entry.isDirectory()
    ? filesIn(path.join(directory, entry.name)) : path.join(directory, entry.name)))).flat();
}
const files = (await filesIn(root)).filter(file => /\.(js|jsx)$/.test(file));
const graph = new Map();
for (const file of files) {
  const source = await readFile(file, 'utf8');
  const imports = [...source.matchAll(/\b(?:from\s*|import\s*\()(["'])(\.[^"']+)\1/g)]
    .map(match => path.resolve(path.dirname(file), match[2]));
  graph.set(file, { source, imports });
}

test('module dependencies respect feature interfaces and lower layers', () => {
  const knownFiles = new Set(graph.keys());
  for (const [file, { imports }] of graph) {
    const owner = path.relative(root, file).split(path.sep);
    for (const dependency of imports) {
      const target = path.relative(root, dependency).split(path.sep);
      if (/\.(js|jsx)$/.test(dependency)) assert(knownFiles.has(dependency), `Missing import: ${file} -> ${dependency}`);
      if (owner[0] === 'features' && target[0] === 'features') {
        assert.equal(owner[1], target[1], `Feature imports another feature: ${file}`);
      }
      if (owner[0] !== 'features' && target[0] === 'features') {
        assert.equal(owner[0], 'app', `Lower layer imports a feature: ${file}`);
        assert.equal(target.slice(2).join('/'), 'index.js', `App bypasses feature interface: ${file}`);
      }
      if (['design-system', 'shared', 'infrastructure'].includes(owner[0])) {
        assert.notEqual(target[0], 'app', `Lower layer imports app: ${file}`);
      }
      if (owner[0] === 'design-system') assert.equal(target[0], 'design-system', `Design system depends on domain: ${file}`);
    }
  }
});

test('module graph has no circular dependency', () => {
  const visited = new Set(), active = new Set();
  function visit(file) {
    assert(!active.has(file), `Circular dependency: ${file}`);
    if (visited.has(file)) return;
    active.add(file);
    for (const dependency of graph.get(file)?.imports || []) if (graph.has(dependency)) visit(dependency);
    active.delete(file);
    visited.add(file);
  }
  for (const file of graph.keys()) visit(file);
});

test('JSX remains bounded and native form controls belong to the design system', () => {
  for (const [file, { source }] of graph) {
    if (!file.endsWith('.jsx')) continue;
    assert(source.trimEnd().split('\n').length <= 200, `JSX exceeds 200 lines: ${file}`);
    if (!path.relative(root, file).startsWith('design-system/')) {
      assert(!/<(?:button|input|select|textarea|table)\b/.test(source), `Bypassed design system: ${file}`);
    }
  }
});

test('feature styles use CSS Modules instead of leaking global selectors', async () => {
  const cssFiles = (await filesIn(path.join(root, 'features'))).filter(file => file.endsWith('.css'));
  for (const file of cssFiles) {
    assert(file.endsWith('.module.css'), `Feature stylesheet must be scoped: ${file}`);
    assert(!/:global\(/.test(await readFile(file, 'utf8')), `Feature exports a global selector: ${file}`);
  }
});
