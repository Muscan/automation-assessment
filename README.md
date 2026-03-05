# Cypress E2E Tests

Automated tests for [airportlabs.com](https://airportlabs.com) and [emag.ro](https://www.emag.ro).

**Cypress version:** 13.17.0

## Install

```bash
npm install
```

## Run

```bash
npm run cy:open       # interactive UI
npm run cy:run        # headless
npm run cy:run:chrome # Chrome specifically
```

## Structure

Tests are organized using **Page Object Model** — selectors live in `cypress/pages/`, test data in `cypress/fixtures/`, reusable checks in `cypress/support/commands.js`, and specs in `cypress/e2e/` (one file per scenario).

## What's tested

| Scenario | What it checks |
|---|---|
| 1 - Section title | Heading text, font size, font weight, desktop + mobile |
| 2 - Activity numbers | Statistics values and labels, data-driven from fixture |
| 3 - Social media | Footer links — visibility, hrefs, link targets |
| 4 - Logo | Visible, real dimensions, image loaded |
| 5 - Navigation | Nav bar, CTA, sticky nav on scroll |
| 6 - eMag shopping | Most expensive TV, cheapest accessory, cart total verification |
