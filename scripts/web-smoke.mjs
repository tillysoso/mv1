// Web smoke test: does the exported web build actually render?
//
// `expo export` exiting 0 only proves the bundle compiled. It says nothing
// about whether React mounts — e.g. a react / react-dom version mismatch
// compiles fine and then throws at startup, leaving a blank page. This serves
// dist/ (run `npm run build:web` first), opens it in headless Chromium, and
// fails unless the page renders visible text without an uncaught error.
//
// Usage: node scripts/web-smoke.mjs [distDir]

import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, resolve } from 'node:path';
import { chromium } from 'playwright';

const DIST = resolve(process.argv[2] ?? 'dist');
const RENDER_TIMEOUT_MS = 20_000;

const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.ico': 'image/x-icon',
  '.ttf': 'font/ttf', '.otf': 'font/otf', '.woff': 'font/woff', '.woff2': 'font/woff2',
};

// Static server with SPA fallback: unknown paths get index.html, as a real host would.
async function serve() {
  const server = createServer(async (req, res) => {
    const path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    let file = join(DIST, path);
    if (!file.startsWith(DIST) || !(await stat(file).then((s) => s.isFile(), () => false))) {
      file = join(DIST, 'index.html');
    }
    res.writeHead(200, { 'Content-Type': MIME[extname(file)] ?? 'application/octet-stream' });
    res.end(await readFile(file));
  });
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  return server;
}

const server = await serve();
const url = `http://127.0.0.1:${server.address().port}/`;
const browser = await chromium.launch();
const errors = [];

try {
  const page = await browser.newPage();
  page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
  page.on('console', (m) => { if (m.type() === 'error') errors.push(`console.error: ${m.text()}`); });

  await page.goto(url, { waitUntil: 'load' });

  let text = '';
  try {
    await page.waitForFunction(
      () => (document.getElementById('root')?.innerText.trim().length ?? 0) > 0,
      null,
      { timeout: RENDER_TIMEOUT_MS },
    );
    text = await page.locator('#root').innerText();
  } catch {
    // fall through — reported below with any captured errors
  }

  // Uncaught exceptions fail the check even if something rendered; console
  // errors are reported but only fail it when nothing rendered at all, since
  // third-party SDKs (analytics, monitoring) log noise without keys set.
  const pageErrors = errors.filter((e) => e.startsWith('pageerror'));
  if (!text.trim() || pageErrors.length) {
    console.error(`✗ web build did not render at ${url}`);
    console.error(`  #root text: ${JSON.stringify(text.trim().slice(0, 200))}`);
    for (const e of errors) console.error(`  ${e}`);
    process.exitCode = 1;
  } else {
    console.log(`✓ web build rendered: ${JSON.stringify(text.trim().replace(/\s+/g, ' ').slice(0, 120))}`);
    for (const e of errors) console.log(`  (non-fatal) ${e}`);
  }
} finally {
  await browser.close();
  server.close();
}
