import homePage from '../pages/HomePage';

describe('Scenario 2 | Our Activity in Numbers - Data-Driven', () => {
  beforeEach(() => {
    homePage.visit();
    homePage.acceptCookiesIfPresent();
    homePage.scrollToActivitySection();
  });

  it('each stat displayValue and label is visible (data-driven fixture)', () => {
    cy.fixture('statistics').then((stats) => {
      stats.forEach((stat) => {
        cy.contains(stat.displayValue)
          .scrollIntoView({ offset: { top: -100, left: 0 } })
          .should('be.visible');

        cy.contains(stat.label)
          .scrollIntoView({ offset: { top: -100, left: 0 } })
          .should('be.visible');
      });
    });
  });

  it('"100+ Airports Worldwide" value, label and font-size are correct', () => {
    cy.contains('100+')
      .scrollIntoView({ offset: { top: -100, left: 0 } })
      .should('be.visible');

    cy.contains('Airports Worldwide')
      .scrollIntoView({ offset: { top: -100, left: 0 } })
      .should('be.visible');

    cy.contains('100+').then(($el) => {
      const fontSize = parseFloat(window.getComputedStyle($el[0]).fontSize);
      expect(fontSize, '"100+" font-size').to.be.greaterThan(24);
    });
  });

  it('"100+" element has a non-transparent color', () => {
    cy.contains('100+').then(($el) => {
      const color = window.getComputedStyle($el[0]).color;
      expect(color, 'color must not be fully transparent').not.to.equal('rgba(0, 0, 0, 0)');
    });
  });
});
