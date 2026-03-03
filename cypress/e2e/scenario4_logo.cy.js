import homePage from '../pages/HomePage';

describe('Scenario 4 | Logo Verification', () => {
  beforeEach(() => {
    homePage.visit();
    homePage.acceptCookiesIfPresent();
  });

  it('logo is visible, src is non-empty and references AirportLabs', () => {
    homePage.logo.should('be.visible').invoke('attr', 'src').then((src) => {
      expect(src, 'src must not be empty').to.not.be.empty;
      const isLogoUrl = src.includes('AL_Logo') || src.includes('airportlabs') || src.includes('logo');
      expect(isLogoUrl, `src "${src}" should reference AirportLabs logo`).to.be.true;
    });
  });

  it('logo width and height are both greater than 0', () => {
    homePage.logo.should('be.visible').then(($el) => {
      const rect = $el[0].getBoundingClientRect();
      expect(rect.width, 'logo width').to.be.greaterThan(0);
      expect(rect.height, 'logo height').to.be.greaterThan(0);
    });
  });

  it('logo naturalWidth > 0 — image actually loaded (negative: not a broken image)', () => {
    homePage.logo.then(($el) => {
      expect($el[0].naturalWidth, 'naturalWidth must be > 0 — image should not be broken').to.be.greaterThan(0);
    });
  });
});
