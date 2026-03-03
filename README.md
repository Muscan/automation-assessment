# Cypress E2E Tests

Automated tests for [airportlabs.com](https://airportlabs.com) using Cypress.

**Cypress version:** 13.17.0

## How to install

```bash
npm install
```

## How to run

Open Cypress UI (pick and run tests manually):

```bash
npm run cy:open
```

Run all tests headless in terminal:

```bash
npm run cy:run
```

Run in Chrome specifically:

```bash
npm run cy:run:chrome
```

## What's tested

| Scenario | What it checks |
|---|---|
| 1 - Section title | "Our activity in numbers" heading — text, font size, font weight, desktop + mobile |
| 2 - Activity numbers | Statistics values and labels, data-driven from a fixture file |
| 3 - Social media | Footer social links — visibility, correct hrefs, link targets |
| 4 - Logo | Logo is visible, has real dimensions, image actually loaded |
| 5 - Navigation | Nav bar, Platform/Company links, "Get in Touch" CTA, sticky nav on scroll |

## Project structure

```
cypress/
  e2e/                    # test files
    scenario1_sectionTitle.cy.js
    scenario2_activityNumbers.cy.js
    scenario3_socialMedia.cy.js
    scenario4_logo.cy.js
    scenario5_navigation.cy.js
  fixtures/
    statistics.json       # test data for scenario 2 (data-driven)
  pages/
    HomePage.js           # Page Object Model — all selectors live here
  support/
    commands.js           # custom Cypress commands (checkElementVisible, verifyExternalLink)
    e2e.js                # support file, loads commands
cypress.config.js         # Cypress config (base URL, timeouts, etc.)
```

## Patterns used

- **Page Object Model** — `HomePage.js` keeps all selectors in one place so tests stay clean
- **Custom commands** — `checkElementVisible` and `verifyExternalLink` in `commands.js`
- **Data-driven test** — scenario 2 reads stats from `statistics.json` fixture
- **Negative tests** — scenario 3 checks links don't open in same tab, scenario 4 checks logo isn't broken, scenario 5 checks nav links aren't empty
