class EmagProductPage {
  addToCart() {
    cy.contains('button', 'Adauga in Cos', { matchCase: false, timeout: 10000 })
      .first()
      .click({ force: true });

    cy.wait(2000);
  }

  dismissCartModal() {
    cy.get('body').then(($body) => {
      const closeSelectors = [
        '.close[data-dismiss="modal"]',
        '[class*="modal"] .close',
        'button:contains("Continua cumparaturile")',
        'button:contains("Continuă cumpărăturile")',
        'a:contains("Continua cumparaturile")',
      ];
      for (const sel of closeSelectors) {
        if ($body.find(sel).length) {
          cy.wrap($body.find(sel).first()).click({ force: true });
          cy.wait(500);
          return;
        }
      }
    });
  }
}

module.exports = new EmagProductPage();
