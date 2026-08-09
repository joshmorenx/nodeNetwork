// Final smoke test: feed renders with the enhanced UI and core logic intact.
const { spawn } = require('child_process');
const fs = require('fs');

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const DEBUG_PORT = 9336;
const PROFILE = process.env.TEMP + '/nn-chrome-profile-' + Date.now();
const TOKEN = fs.readFileSync(process.env.TEMP + '/nn-feed-token.txt', 'utf-8').trim();
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
  const chrome = spawn(CHROME, [
    '--headless=new', '--disable-gpu', '--no-sandbox', '--disable-dev-shm-usage',
    '--disable-extensions', `--remote-debugging-port=${DEBUG_PORT}`,
    `--user-data-dir=${PROFILE}`, '--window-size=1440,900', 'about:blank',
  ], { stdio: 'ignore' });

  await sleep(3000);
  let targets = null;
  for (let i = 0; i < 20; i++) {
    try { targets = await (await fetch(`http://127.0.0.1:${DEBUG_PORT}/json`)).json(); break; }
    catch (e) { await sleep(500); }
  }
  const page = targets.find((t) => t.type === 'page');
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  let id = 0;
  const pending = new Map();
  const consoleErrors = [];

  ws.onmessage = (e) => {
    const msg = JSON.parse(e.data);
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      msg.error ? reject(new Error(msg.error.message)) : resolve(msg.result);
    } else if (msg.method === 'Runtime.consoleAPICalled' && msg.params.type === 'error') {
      consoleErrors.push(msg.params.args.map((a) => a.value || a.description || '').join(' '));
    } else if (msg.method === 'Log.entryAdded' && msg.params.entry.level === 'error') {
      consoleErrors.push(msg.params.entry.text);
    }
  };
  await new Promise((resolve, reject) => { ws.onopen = resolve; ws.onerror = reject; });

  const send = (method, params = {}) =>
    new Promise((resolve, reject) => {
      const msgId = ++id;
      pending.set(msgId, { resolve, reject });
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });

  const evalJS = async (expression) => {
    const res = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
    return res.result.value;
  };

  await send('Page.enable');
  await send('Runtime.enable');
  await send('Log.enable');
  await send('Network.enable');
  await send('Network.setCookie', { name: 'token', value: TOKEN, url: 'http://localhost:5173/', path: '/' });
  await send('Page.navigate', { url: 'http://localhost:5173/feed' });
  await sleep(5000);

  const state = await evalJS(`JSON.stringify({
    url: location.href,
    postCards: document.querySelectorAll('.feed-post-card').length,
    sidebarCards: document.querySelectorAll('.feed-sidebar-card').length,
    composer: !!document.querySelector('.feed-composer'),
    reactionBtns: document.querySelectorAll('.feed-reaction-btn').length,
    datePills: document.querySelectorAll('.feed-date-pill').length,
    sidebarTitle: document.querySelector('.feed-sidebar-title') ? document.querySelector('.feed-sidebar-title').textContent.trim() : null,
    bodyText: document.querySelector('.feed-post-body') ? document.querySelector('.feed-post-body').textContent.trim().slice(0, 60) : null
  })`);
  console.log('FINAL FEED STATE:', state);

  // like still works
  const likeBefore = await evalJS(`document.querySelector('.feed-reaction-btn') ? document.querySelector('.feed-reaction-btn').textContent.trim() : 'none'`);
  await evalJS(`document.querySelector('.feed-reaction-btn').click(); 'ok'`);
  await sleep(2500);
  const likeAfter = await evalJS(`document.querySelector('.feed-reaction-btn').textContent.trim()`);
  console.log('LIKE:', likeBefore, '->', likeAfter);

  console.log('CONSOLE ERRORS:', JSON.stringify(consoleErrors));

  ws.close();
  chrome.kill();
}

main().catch((e) => { console.error('FAILED:', e.message); process.exit(1); });
