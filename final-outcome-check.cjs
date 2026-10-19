const fs = require('fs');

(async () => {
  const tabs = await (await fetch('http://127.0.0.1:9227/json')).json();
  const page = tabs.find((item) => item.type === 'page');
  const socket = new WebSocket(page.webSocketDebuggerUrl);
  const pending = new Map();
  let id = 0;
  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    if (message.id && pending.has(message.id)) {
      pending.get(message.id)(message);
      pending.delete(message.id);
    }
  };
  await new Promise((resolve) => { socket.onopen = resolve; });
  const call = (method, params = {}) => new Promise((resolve) => {
    const callId = ++id;
    pending.set(callId, resolve);
    socket.send(JSON.stringify({ id: callId, method, params }));
  });
  const evaluate = (expression) => call('Runtime.evaluate', { expression, returnByValue: true });
  const wait = (time = 500) => new Promise((resolve) => setTimeout(resolve, time));

  for (const [width, height] of [[1920, 1080], [1440, 900], [390, 844]]) {
    await call('Emulation.setDeviceMetricsOverride', {
      width,
      height,
      deviceScaleFactor: 1,
      mobile: width < 600,
    });
    await wait(300);
    await evaluate(`document.querySelectorAll('.final-outcome__tabs [role="tab"]')[0].click(); true`);
    await wait(300);
    await evaluate(`window.scrollBy(0, document.querySelector('.final-outcome').getBoundingClientRect().top); true`);
    await wait(1200);
    await evaluate(`window.scrollBy(0, document.querySelector('.final-outcome').getBoundingClientRect().top); true`);
    await wait(500);
    const desktop = await evaluate(`JSON.stringify((() => {
      const section = document.querySelector('.final-outcome').getBoundingClientRect();
      const visual = document.querySelector('.final-outcome__visual').getBoundingClientRect();
      const image = document.querySelector('.final-outcome__visual img');
      return {
        viewport: [window.innerWidth, window.innerHeight],
        section: { top: section.top, height: section.height },
        visual: { width: visual.width, height: visual.height },
        tabs: document.querySelectorAll('.final-outcome__tabs [role="tab"]').length,
        imageLoaded: image.naturalWidth > 0,
        imageRect: { top: image.getBoundingClientRect().top, bottom: image.getBoundingClientRect().bottom, width: image.getBoundingClientRect().width, height: image.getBoundingClientRect().height },
        imageStyles: { width: getComputedStyle(image).width, height: getComputedStyle(image).height, objectFit: getComputedStyle(image).objectFit },
        imageContained: image.getBoundingClientRect().width <= visual.width && image.getBoundingClientRect().height <= visual.height,
        horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      };
    })())`);
    console.log(`${width}x${height}`, desktop.result.result.value);
    if (width === 1920) {
      const screenshot = await call('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync('final-outcome-desktop.png', Buffer.from(screenshot.result.data, 'base64'));
    }
  }

  await call('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await evaluate(`document.querySelectorAll('.final-outcome__tabs [role="tab"]')[1].click(); true`);
  await wait(1500);
  const mobileTab = await evaluate(`JSON.stringify({
    selected: document.querySelector('.final-outcome__tabs [aria-selected="true"]')?.textContent.trim(),
    src: document.querySelector('.final-outcome__visual img')?.getAttribute('src'),
    loaded: document.querySelector('.final-outcome__visual img')?.naturalWidth > 0,
    copy: document.querySelector('.final-outcome__footer p')?.textContent.trim(),
    href: document.querySelector('.final-outcome__footer a')?.href,
  })`);
  console.log('MOBILE TAB', mobileTab.result.result.value);
  socket.close();
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
