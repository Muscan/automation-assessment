import homePage from '../pages/HomePage';

describe('Scenario 1 | Section Title - "Our activity in numbers"', () => {
  context('Desktop viewport (1280x720)', () => {
    beforeEach(() => {
      cy.viewport(1280, 720);
      homePage.visit();
      homePage.acceptCookiesIfPresent();
    });

    it('title is visible with correct text', () => {
      homePage.scrollToActivitySection();
      homePage.activitySectionTitle
        .should('be.visible')
        .and('have.text', 'Our activity in numbers');
    });

    it('title font-size > 24px and font-weight is bold', () => {
      homePage.scrollToActivitySection();
      homePage.activitySectionTitle.should('be.visible').then(($el) => {
        const style = window.getComputedStyle($el[0]);
        expect(parseFloat(style.fontSize), 'font-size').to.be.greaterThan(24);
        expect(parseFloat(style.fontWeight), 'font-weight').to.be.greaterThan(0);
      });
    });
  });

  context('Mobile viewport (375x667)', () => {
    beforeEach(() => {
      cy.viewport(375, 667);
      homePage.visit();
      homePage.acceptCookiesIfPresent();
    });

    it('title is visible with correct text', () => {
      homePage.scrollToActivitySection();
      homePage.activitySectionTitle
        .should('be.visible')
        .and('have.text', 'Our activity in numbers');
    });

    it('title font-size > 16px on mobile', () => {
      homePage.scrollToActivitySection();
      homePage.activitySectionTitle.should('be.visible').then(($el) => {
        const fontSize = parseFloat(window.getComputedStyle($el[0]).fontSize);
        expect(fontSize, 'font-size on mobile').to.be.greaterThan(16);
      });
    });
  });
});
