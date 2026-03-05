import emagListingPage from '../pages/EmagListingPage';
import emagProductPage from '../pages/EmagProductPage';
import emagCartPage from '../pages/EmagCartPage';

describe('Scenario 6 | eMag.ro Shopping — TV + Accessory Cart Verification', () => {
  let savedTv = {};
  let savedAccessory = {};

  before(() => {
    cy.fixture('emagBrand').as('brandData');
  });

  it('finds the most expensive TV with rating >= 3, cheapest accessory with rating >= 3, and verifies cart totals', function () {
    const { brand, tvCategoryUrl, accessoryCategoryUrl } = this.brandData;

    emagListingPage.visit(tvCategoryUrl);
    emagListingPage.acceptCookies();
    emagListingPage.dismissOverlays();

    emagListingPage.filterByBrand(brand);
    emagListingPage.sortByPriceDesc();

    emagListingPage.findProductWithMinRating(3, (product) => {
      savedTv = {
        name: product.name,
        brand: product.brand,
        price: product.price,
        url: product.url,
      };

      cy.log(`**TV Found:** ${savedTv.name}`);
      cy.log(`**TV Brand:** ${savedTv.brand}`);
      cy.log(`**TV Price:** ${savedTv.price} Lei`);

      expect(savedTv.name, 'TV name should not be empty').to.not.be.empty;
      expect(savedTv.price, 'TV price should be > 0').to.be.greaterThan(0);
    });

    cy.then(() => {
      cy.visit(savedTv.url, { failOnStatusCode: false });
      emagProductPage.addToCart();
      emagProductPage.dismissCartModal();
    });

    cy.then(() => {
      emagListingPage.visit(accessoryCategoryUrl);
      emagListingPage.dismissOverlays();
    });

    emagListingPage.filterByBrand(brand);
    emagListingPage.sortByPriceAsc();

    emagListingPage.findProductWithMinRating(3, (product) => {
      savedAccessory = {
        name: product.name,
        brand: product.brand,
        price: product.price,
        url: product.url,
      };

      cy.log(`**Accessory Found:** ${savedAccessory.name}`);
      cy.log(`**Accessory Brand:** ${savedAccessory.brand}`);
      cy.log(`**Accessory Price:** ${savedAccessory.price} Lei`);

      expect(savedAccessory.name, 'Accessory name should not be empty').to.not.be.empty;
      expect(savedAccessory.price, 'Accessory price should be > 0').to.be.greaterThan(0);
    });

    cy.then(() => {
      cy.visit(savedAccessory.url, { failOnStatusCode: false });
      emagProductPage.addToCart();
      emagProductPage.dismissCartModal();
    });

    emagCartPage.visit();

    emagCartPage.getCartItemCount().should('eq', 2);

    emagCartPage.getCartItems().then(($items) => {
      const cartText = $items.text();
      const tvSnippet = savedTv.name.substring(0, 20);
      const accessorySnippet = savedAccessory.name.substring(0, 20);

      expect(cartText, 'Cart should contain TV product').to.include(tvSnippet);
      expect(cartText, 'Cart should contain accessory product').to.include(accessorySnippet);
    });

    const cartPrices = [];
    emagCartPage
      .getItemPrice(0)
      .then((price) => {
        cartPrices.push(price);
      })
      .then(() => {
        emagCartPage.getItemPrice(1).then((price) => {
          cartPrices.push(price);

          const savedPrices = [savedTv.price, savedAccessory.price].sort((a, b) => a - b);
          const sortedCartPrices = [...cartPrices].sort((a, b) => a - b);

          cy.log(`**Saved prices:** ${savedPrices.join(', ')} Lei`);
          cy.log(`**Cart prices:** ${sortedCartPrices.join(', ')} Lei`);

          expect(sortedCartPrices[0], 'Cheaper item price should match').to.be.closeTo(savedPrices[0], 1);
          expect(sortedCartPrices[1], 'Expensive item price should match').to.be.closeTo(savedPrices[1], 1);
        });
      });

    emagCartPage.getTotalPrice().then((total) => {
      const expectedTotal = savedTv.price + savedAccessory.price;

      cy.log(`**Expected total:** ${expectedTotal} Lei`);
      cy.log(`**Cart total:** ${total} Lei`);

      expect(total, 'Cart total should equal sum of items').to.be.closeTo(expectedTotal, 1);
    });
  });
});
