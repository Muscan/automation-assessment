Cypress.Commands.add('checkElementVisible', (selector, alias = '') => {
  const label = alias || selector;

  cy.log(`Checking visibility of: **${label}**`);

  cy.get(selector)
    .should('exist')
    .and('be.visible')
    .then(($el) => {
      const rect = $el[0].getBoundingClientRect();
      cy.log(`Element "${label}" — width: ${rect.width}px, height: ${rect.height}px`);
      expect(rect.width, `${label} width`).to.be.greaterThan(0);
      expect(rect.height, `${label} height`).to.be.greaterThan(0);
    });
});

Cypress.Commands.add('verifyExternalLink', (selector, expectedDomain) => {
  cy.get(selector)
    .should('have.attr', 'href')
    .and('include', expectedDomain);

  cy.log(`Link "${selector}" correctly points to **${expectedDomain}**`);
});
