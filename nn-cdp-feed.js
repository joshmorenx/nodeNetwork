// One-off CDP driver: verifies the enhanced feed UI (light + dark theme),
// and checks the like + comment-toggle logic still works.
const { spawn } = require('child_process');
const fs = require('fs');

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const DEBUG_PORT = 9335;
const PROFILE = process.env.TEMP + '/nn-chrome-profile-' + Date.now();
const SHOT = process.env.TEMP;
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
  if (!targets) throw new Error('chrome devtools endpoint never came up');
  const page = targets.find((t) => t.type === 'page');
  if (!page) throw new Error('no page target');

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

  const shot = async (label) => {
    const s = await send('Page.captureScreenshot', { format: 'png' });
    const f = `${SHOT}/nn-feed-${label}.png`;
    fs.writeFileSync(f, Buffer.from(s.data, 'base64'));
    console.log('SCREENSHOT:', f);
  };

  await send('Page.enable');
  await send('Runtime.enable');
  await send('Log.enable');
  await send('Network.enable');

  // Set the auth cookie on the app origin, then load the feed
  await send('Network.setCookie', { name: 'token', value: TOKEN, url: 'http://localhost:5173/', path: '/' });
  await send('Page.navigate', { url: 'http://localhost:5173/feed' });
  await sleep(5000);

  const state1 = await evalJS(`JSON.stringify({
    url: location.href,
    postCards: document.querySelectorAll('.feed-post-card').length,
    sidebarCards: document.querySelectorAll('.feed-sidebar-card').length,
    composer: !!document.querySelector('.feed-composer'),
    datePills: document.querySelectorAll('.feed-date-pill').length,
    reactionBtns: document.querySelectorAll('.feed-reaction-btn').length,
    emptyState: document.querySelector('.feed-empty-state') ? document.querySelector('.feed-empty-state').textContent.trim() : null
  })`);
  console.log('FEED STATE (light):', state1);
  await shot('light');

  // ---- Logic check 1: like button updates the count ----
  const likeBefore = await evalJS(`(() => {
    const btn = document.querySelector('.feed-reaction-btn');
    if (!btn) return 'no btn';
    return btn.textContent.trim();
  })()`);
  console.log('LIKE BEFORE:', likeBefore);
  await evalJS(`document.querySelector('.feed-reaction-btn').click(); 'clicked'`);
  await sleep(2500);
  const likeAfter = await evalJS(`(() => {
    const btn = document.querySelector('.feed-reaction-btn');
    return btn ? btn.textContent.trim() : 'no btn';
  })()`);
  console.log('LIKE AFTER:', likeAfter);

  // ---- Logic check 2: comment button toggles the comment box ----
  const commentToggle = await evalJS(`(() => {
    const btns = document.querySelectorAll('.feed-reaction-btn');
    const commentBtn = btns[2];
    if (!commentBtn) return 'no comment btn';
    commentBtn.click();
    return 'clicked';
  })()`);
  console.log('COMMENT CLICK:', commentToggle);
  await sleep(1200);
  const commentBox = await evalJS(`(() => {
    const box = document.querySelector('[id^="comment-box-"]');
    if (!box) return 'no box';
    return JSON.stringify({ id: box.id, hidden: box.classList.contains('hidden'), visible: getComputedStyle(box).display !== 'none' });
  })()`);
  console.log('COMMENT BOX:', commentBox);

  // ---- Theme toggle to dark ----
  const themeSwitch = await evalJS(`(() => {
    const sw = document.getElementById('light-switch');
    if (!sw) return 'no switch';
    sw.click();
    return 'clicked';
  })()`);
  console.log('THEME CLICK:', themeSwitch);
  await sleep(2500);
  const state2 = await evalJS(`(() => {
    const card = document.querySelector('.feed-post-card');
    const body = document.querySelector('.feed-post-body');
    const side = document.querySelector('.feed-sidebar-card');
    return JSON.stringify({
      cardClass: card ? card.className.split(' ')[0] : null,
      bodyBg: body ? getComputedStyle(body).backgroundColor : null,
      sidebarBg: side ? getComputedStyle(side).backgroundColor : null,
      postCards: document.querySelectorAll('.feed-post-card').length
    });
  })()`);
  console.log('FEED STATE (dark):', state2);
  await shot('dark');

  console.log('CONSOLE ERRORS:', JSON.stringify(consoleErrors, null, 2));

  ws.close();
  chrome.kill();
}

main().catch((e) => { console.error('FAILED:', e.message); process.exit(1); });
