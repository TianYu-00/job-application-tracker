# Job Application Tracker

This application is used to track job applications

# Features

### Frontend:

### Backend:

- Scrape The Web [ ]
- Get Job Information [ ]

### Thought process

- Frontend sends job URL
- Express receives request
- Route validates input
- Controller decides scraper type
- Registry picks correct scraper (I will use indeed as an example for now, will add others later on)
- Playwright opens browser
- Scrapes job page (This is going to be the hard part im guessing, as some are more dynamic)
- Returns structured JSON
- API responds to frontend

Some infos i want are:

- Job title
- Company
- Location
- Description (Not that important, but its not bad to have)

Well only get these info for now, well expand on it later on.

We will also need a database later on to store these colleted info.

Another nice thing to have is to convert the database to spreadsheet, so we could make a copy of it to be more portable.

### Docs

https://playwright.dev/docs/intro
https://playwright.dev/docs/navigations
https://playwright.dev/docs/locators
https://playwright.dev/docs/actionability
https://playwright.dev/docs/evaluating
https://playwright.dev/docs/debug
