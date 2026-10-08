import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import fs from 'node:fs/promises';
import { once } from 'node:events';
import { test } from 'node:test';

const publicRoutes = ['/', '/contacto', '/cobertura', '/filosofia', '/mision', '/vision', '/quienes-somos', '/trabaja-con-nosotros', '/gracias'];

test('generated tree registers all public routes and excludes the retired panel', async () => {
  const tree = await fs.readFile('src/routeTree.gen.ts', 'utf8');
  for (const route of publicRoutes) assert.ok(tree.includes(`'${route}'`), route);
  assert.ok(!tree.includes("'/admin'"));
  const routes = (await fs.readdir('src/routes')).filter(file => file.endsWith('.tsx'));
  assert.equal(routes.length, publicRoutes.length + 1); // Includes the root layout.
  const apiFiles = (await fs.readdir('api')).sort();
  assert.deepEqual(apiFiles, ['contact.test.ts', 'contact.ts']);
});

test('deployed data is the static source and contains no credential fields', async () => {
  const source = JSON.parse(await fs.readFile('site-data.json', 'utf8'));
  const deployed = JSON.parse(await fs.readFile('dist/site-data.json', 'utf8'));
  assert.deepEqual(deployed, source);
  function inspect(value) {
    if (!value || typeof value !== 'object') return;
    for (const [key, child] of Object.entries(value)) {
      assert.ok(!/pin|token|password|secret|formspree/i.test(key), key);
      inspect(child);
    }
  }
  inspect(deployed);
  const context = await fs.readFile('src/context/SiteDataContext.tsx', 'utf8');
  assert.ok(!/setInterval|setTimeout|\.setItem\(|\.getItem\(/.test(context));
  const form = await fs.readFile('src/routes/contacto.tsx', 'utf8');
  assert.ok(form.includes('fetch("/api/contact"'));
  assert.ok(form.includes('action="/api/contact"'));
});

test('production server serves public routes and rejects removed content APIs', async () => {
  const original = await fs.readFile('site-data.json', 'utf8');
  const child = spawn(process.execPath, ['dist/server.mjs'], {
    env: { ...process.env, NODE_ENV: 'production', PORT: '4317' },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  try {
    await new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error('Server startup timed out')), 15000);
      child.stdout.on('data', data => {
        if (data.toString().includes('Server running')) { clearTimeout(timer); resolve(); }
      });
      child.once('error', error => { clearTimeout(timer); reject(error); });
      child.once('exit', code => { clearTimeout(timer); reject(new Error(`Server exited: ${code}`)); });
    });
    for (const route of publicRoutes) {
      const response = await fetch(`http://127.0.0.1:4317${route}`);
      assert.equal(response.status, 200, route);
      assert.ok((await response.text()).includes('id="root"'), route);
    }
    const data = await fetch('http://127.0.0.1:4317/site-data.json');
    assert.deepEqual(await data.json(), JSON.parse(original));
    // Every non-contact API is absent; rejected writes cannot mutate the file.
    for (const endpoint of ['site-data', 'publish', ['publish', 'status'].join('-')]) {
      for (const method of ['GET', 'POST']) {
        const response = await fetch(`http://127.0.0.1:4317/api/${endpoint}`, {
          method, ...(method === 'POST' ? { body: '{}' } : {}),
        });
        assert.equal(response.status, 404, `${method} ${endpoint}`);
      }
    }
    assert.equal(await fs.readFile('site-data.json', 'utf8'), original);
    const server = await fs.readFile('server.ts', 'utf8');
    assert.ok(!/writeFile|app\.(post|put|patch|delete)\(/.test(server));
  } finally {
    const stopped = once(child, 'exit');
    child.kill();
    await stopped;
  }
});
