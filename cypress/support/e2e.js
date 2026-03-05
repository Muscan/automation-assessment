import './commands';

// Prevent Cypress from failing on uncaught exceptions from the application
Cypress.on('uncaught:exception', (err) => {
  // Return false to prevent the error from failing the test
  return false;
});

// Increase timeout for external sites
Cypress.config('pageLoadTimeout', 120000);
