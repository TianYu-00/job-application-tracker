const { getScraper } = require("../scrapers");

async function scrapeJob(url) {
  const scraper = getScraper(url);

  if (!scraper) {
    throw new Error("No scraper found for this URL");
  }

  return await scraper.scrape(url);
}

module.exports = {
  scrapeJob,
};
