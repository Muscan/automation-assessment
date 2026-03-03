import homePage from '../pages/HomePage';

const socialLinks = [
  {
    platform: 'Facebook',
    selector: 'a[href*="facebook.com/AirportLabs"]',
    expectedHref: 'https://www.facebook.com/AirportLabs',
    expectedDomain: 'facebook.com'
  },
  {
    platform: 'Instagram',
    selector: 'a[href*="instagram.com/airportlabspeople"]',
    expectedHref: 'https://www.instagram.com/airportlabspeople/',
    expectedDomain: 'instagram.com'
  },
  {
    platform: 'LinkedIn',
    selector: 'a[href*="linkedin.com/company/airportlabs"]',
    expectedHref: 'https://www.linkedin.com/company/airportlabs/',
    expectedDomain: 'linkedin.com'
  },
];

describe('Scenario 3 | Social Media Links', () => {
  beforeEach(() => {
    homePage.visit();
    homePage.acceptCookiesIfPresent();
    homePage.scrollToFooter();
  });

  it('Facebook link is visible (custom command: checkElementVisible)', () => {
    cy.checkElementVisible(socialLinks[0].selector, 'Facebook link');
  });

  it('all 3 social links are visible in the footer', () => {
    homePage.facebookLink.should('be.visible');
    homePage.instagramLink.should('be.visible');
    homePage.linkedInLink.should('be.visible');
  });

  it('each social link has the correct href', () => {
    socialLinks.forEach(({ selector, expectedHref }) => {
      cy.get(selector).should('have.attr', 'href', expectedHref);
    });
  });

  it('each social link href points to the expected domain (custom command)', () => {
    socialLinks.forEach(({ selector, expectedDomain }) => {
      cy.verifyExternalLink(selector, expectedDomain);
    });
  });

  it('each social link contains an img with a non-empty src', () => {
    socialLinks.forEach(({ selector }) => {
      cy.get(selector).find('img').should('have.attr', 'src').and('not.be.empty');
    });
  });

  it('social links do NOT open in the same tab (negative: no target="_self")', () => {
    socialLinks.forEach(({ selector }) => {
      cy.get(selector).should('not.have.attr', 'target', '_self');
    });
  });
});
