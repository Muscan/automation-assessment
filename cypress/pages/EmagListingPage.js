const SELECTORS = {
  cookieAccept: '.js-accept',
  productCard: '.card-item[data-product-id]',
  productTitle: 'a.card-v2-title',
  productPrice: 'p.product-new-price',
  starRating: '.star-rating',
  sortButton: '.sort-control-btn',
  filterItem: 'a.js-filter-item.filter-item',
};

class EmagListingPage {
  visit(url, retries = 2) {
    cy.visit(url, { failOnStatusCode: false, retryOnNetworkFailure: true });
    cy.get('body', { timeout: 15000 }).then(($body) => {
      const bodyText = $body.text();
      if (
        retries > 0 &&
        (bodyText.includes('Sorry, we could not load') ||
          bodyText.includes('Access Denied') ||
          $body.find(SELECTORS.productCard).length === 0 && !url.includes('cart'))
      ) {
        cy.wait(3000);
        this.visit(url, retries - 1);
      }
    });
    cy.wait(1000);
  }

  acceptCookies() {
    cy.get('body').then(($body) => {
      if ($body.find(SELECTORS.cookieAccept).length) {
        cy.get(SELECTORS.cookieAccept).first().click({ force: true });
        cy.wait(500);
      }
    });
  }

  dismissOverlays() {
    cy.get('body').then(($body) => {
      const closeSelectors = [
        '[class*="modal"] [class*="close"]',
        '[class*="popup"] [class*="close"]',
        'button[aria-label="Close"]',
        'button[aria-label="Închide"]',
      ];
      for (const sel of closeSelectors) {
        if ($body.find(sel).length) {
          cy.wrap($body.find(sel).first()).click({ force: true });
          return;
        }
      }
    });
  }

  filterByBrand(brand) {
    cy.get('body').then(($body) => {
      const $brandLink = $body.find(SELECTORS.filterItem).filter(`:contains("${brand}")`);
      if ($brandLink.length) {
        cy.wrap($brandLink.first()).scrollIntoView().click({ force: true });
      } else {
        cy.contains('a', 'Brand', { matchCase: false }).click({ force: true });
        cy.wait(500);
        cy.contains(SELECTORS.filterItem, brand).click({ force: true });
      }
    });
    cy.wait(2000);
  }

  sortByPriceDesc() {
    this._selectSortOption('Pret descrescator');
  }

  sortByPriceAsc() {
    this._selectSortOption('Pret crescator');
  }

  _selectSortOption(label) {
    cy.get(SELECTORS.sortButton).first().click({ force: true });
    cy.contains('a', label, { matchCase: false }).click({ force: true });
    cy.wait(2000);
  }

  findProductWithMinRating(minStars, callback) {
    cy.get(SELECTORS.productCard).then(($cards) => {
      let found = false;

      const checkCard = (idx) => {
        if (idx >= $cards.length) {
          if (!found) {
            throw new Error(`No product with rating >= ${minStars} stars found in ${$cards.length} cards`);
          }
          return;
        }
        if (found) return;

        const $card = $cards.eq(idx);
        const $starEl = $card.find(SELECTORS.starRating).first();
        const starClass = $starEl.attr('class') || '';
        const ratingMatch = starClass.match(/rated-(\d)/);
        const rating = ratingMatch ? parseInt(ratingMatch[1], 10) : 0;

        if (rating >= minStars) {
          found = true;

          const name = $card.find(SELECTORS.productTitle).first().text().trim();
          const priceText = $card.find(SELECTORS.productPrice).first().text().trim();
          const price = this._parseRomanianPrice(priceText);
          const url = $card.find(SELECTORS.productTitle).first().attr('href');
          const dataName = $card.attr('data-name') || name;
          const brand = this._extractBrand(dataName);

          callback({ name, brand, price, url, index: idx });
        } else {
          checkCard(idx + 1);
        }
      };

      checkCard(0);
    });
  }

  _extractBrand(productName) {
    const words = productName.trim().split(/\s+/);
    if (words.length >= 2) return words[1];
    return words[0] || '';
  }

  _parseRomanianPrice(text) {
    const match = text.match(/([\d.]+,?\d*)/);
    if (!match) return 0;
    return parseFloat(match[1].replace(/\./g, '').replace(',', '.')) || 0;
  }
}

module.exports = new EmagListingPage();
