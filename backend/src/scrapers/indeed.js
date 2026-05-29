const { getBrowser } = require("../browsers/playwright");

async function scrapeIndeedJob(url) {
  const browser = await getBrowser();

  const context = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    viewport: { width: 1280, height: 720 },
  });

  const page = await context.newPage();

  await page.goto(url, {
    waitUntil: "networkidle",
  });

  const data = await page.evaluate(() => {
    const getText = (sel) => document.querySelector(sel)?.innerText?.trim() || null;

    return {
      title: getText("h1"),
      company: getText('[data-testid="inlineHeader-companyName"]'),
      location: getText('[data-testid="inlineHeader-companyLocation"]'),
      description: getText("#jobDescriptionText"),
    };
  });

  await page.close();
  await context.close();

  return {
    ...data,
    url,
  };
}

module.exports = { scrapeIndeedJob };
