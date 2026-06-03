import { getScraper } from "../scrapers/index.js";

async function scrapeJob(url) {
  const scraper = getScraper(url);

  if (!scraper) {
    throw new Error("No scraper found for this URL");
  }

  return await scraper.scrape(url);
}

export { scrapeJob };
