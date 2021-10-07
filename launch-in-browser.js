const puppeteer = require('puppeteer');

const url = 'https://www.google.com';

async function initializeCDP(page) {
  return await page.target().createCDPSession();
}

(async function main() {
  const browser = await puppeteer.launch({
    headless:false,
    defaultViewport:null,
    devtools: true,
  });
  const page = (await browser.pages())[0];
  await initializeCDP(page);
  browser.on('targetcreated', async (target) => {
    const page = await target.page();
    const client = await initializeCDP(page);
  })
  await page.goto(url);
  await page.evaluate(() => {
    // Plugin code
    window.$Widget = (function(window, undefined) {
      // TODO
      return {
        test: 'test',
      };
    })(window);
    console.log(window.$Widget);

    // Test code
    const testItem = document.createElement('div');
    testItem.style.fontSize = '48px';
    testItem.innerHTML = window.$Widget.test;
    const body = document.querySelector('body');
    body.appendChild(testItem);
  });
})();
