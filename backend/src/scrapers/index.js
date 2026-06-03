import { scrapeIndeedJob } from "./indeed.js";

const scrapers = [
  {
    name: "indeed",
    match: (url) => url.includes("indeed.com"),
    scrape: scrapeIndeedJob,
  },
];

function getScraper(url) {
  return scrapers.find((s) => s.match(url));
}

export { getScraper };
