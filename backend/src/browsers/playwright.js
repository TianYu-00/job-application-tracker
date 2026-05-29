const { chromium } = require("playwright");

let browser;

async function getBrowser() {
  if (!browser) {
    browser = await chromium.launch({
      headless: true,
    });
  }

  return browser;
}

module.exports = {
  getBrowser,
};
