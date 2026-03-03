class HomePage {
  get logo() {
    return cy.get('nav img[src*="AL_Logo"], header img[src*="AL_Logo"], .w-nav img, nav a img').filter(':visible').first();
  }

  get activitySectionTitle() {
    return cy.contains('h2', 'Our activity in numbers');
  }

  get facebookLink() {
    return cy.get('a[href*="facebook.com/AirportLabs"]');
  }

  get instagramLink() {
    return cy.get('a[href*="instagram.com/airportlabspeople"]');
  }

  get linkedInLink() {
    return cy.get('a[href*="linkedin.com/company/airportlabs"]');
  }

  get navBar() {
    return cy.get('nav, .navbar, [class*="nav"]').first();
  }

  get getInTouchButton() {
    return cy.contains('a, button', 'Get in Touch');
  }

  get platformNavItem() {
    return cy.contains('nav a, nav button, nav li', 'Platform');
  }

  get companyNavItem() {
    return cy.contains('nav a, nav button, nav li', 'Company');
  }

  visit() {
    cy.visit('/');
  }

  acceptCookiesIfPresent() {
    cy.get('body').then(($body) => {
      const $cookie = $body.find('[class*="cookie"], [id*="cookie"], [aria-label*="cookie"]');
      if ($cookie.length > 0) {
        const $btn = $cookie.find('button');
        if ($btn.length > 0) {
          cy.wrap($btn.first()).click({ force: true });
        }
      }
    });
  }

  scrollToActivitySection() {
    this.activitySectionTitle.scrollIntoView({ offset: { top: -100, left: 0 } });
  }

  scrollToFooter() {
    cy.get('footer, [class*="footer"]').first().scrollIntoView();
  }
}

module.exports = new HomePage();
