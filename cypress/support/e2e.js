import './commands';

// eMag sometimes throws uncaught errors from third-party scripts — ignore them so tests don't fail
Cypress.on('uncaught:exception', (err) => {
  return false;
});

// eMag pages can be slow to load, default 60s wasn't always enough
Cypress.config('pageLoadTimeout', 120000);