const test = require('node:test');
const assert = require('node:assert');
const app = require('../app');

test('GET / and /health respond with 200', async (t) => {
  await new Promise((resolve) => app.listen(0, resolve));
  const { port } = app.address();
  t.after(() => app.close());

  const root = await fetch(`http://localhost:${port}/`);
  assert.strictEqual(root.status, 200);

  const health = await fetch(`http://localhost:${port}/health`);
  assert.deepStrictEqual(await health.json(), { status: 'ok' });
});
