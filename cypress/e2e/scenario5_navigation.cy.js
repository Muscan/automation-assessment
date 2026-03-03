import homePage from '../pages/HomePage';

describe('Scenario 5 | Navigation & Get in Touch CTA', () => {
  beforeEach(() => {
    homePage.visit();
    homePage.acceptCookiesIfPresent();
  });

  it('nav bar is visible and contains Platform and Company links', () => {
    homePage.navBar.should('be.visible');
    homePage.platformNavItem.should('be.visible');
    homePage.companyNavItem.should('be.visible');
  });

  it('"Get in Touch" CTA is visible with a contact-related href', () => {
    homePage.getInTouchButton.should('be.visible')
      .invoke('attr', 'href')
      .then((href) => {
        expect(href, 'href must not be empty').to.not.be.empty;
        const isContactRelated = href.includes('contact') || href.includes('touch') || href.includes('demo');
        expect(isContactRelated, `href "${href}" should be contact-related`).to.be.true;
      });
  });

  it('nav is still visible after scrolling 500px', () => {
    cy.scrollTo(0, 500);
    homePage.navBar.should('be.visible');
  });

  it('nav links do NOT have empty href attributes (negative)', () => {
    cy.get('nav a').each(($a) => {
      const href = $a.attr('href');
      if (href !== undefined) {
        expect(href.trim(), 'nav link href must not be an empty string').to.not.equal('');
      }
    });
  });
});
