import { getScraper } from "../scrapers/index.js";
import { insertApplication } from "../../db/queries.js";

async function scrapeJob(url) {
  const scraper = getScraper(url);

  if (!scraper) {
    throw new Error("No scraper found for this URL");
  }

  const data = await scraper.scrape(url);
  console.log("Scraped data:", data);
  const saved = await insertApplication(data);

  return saved;
}

export { scrapeJob };
