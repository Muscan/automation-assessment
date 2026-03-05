const CART_URL = 'https://www.emag.ro/cart/products';

const SELECTORS = {
  cartItem: 'div.cart-widget.cart-line',
  cartItemTitle: 'a.main-product-title',
  cartItemPrice: '.line-price-container p.product-new-price',
};

class EmagCartPage {
  visit() {
    cy.visit(CART_URL, { failOnStatusCode: false });
    cy.wait(2000);
  }

  getCartItems() {
    return cy.get(SELECTORS.cartItem);
  }

  getCartItemCount() {
    return this.getCartItems().its('length');
  }

  getItemPrice(index) {
    return this.getCartItems()
      .eq(index)
      .find(SELECTORS.cartItemPrice)
      .first()
      .invoke('text')
      .then((text) => this._parsePrice(text));
  }

  getTotalPrice() {
    return cy
      .contains('.main-cart-container-right span', 'Cost produse')
      .parent()
      .invoke('text')
      .then((text) => this._parsePrice(text));
  }

  _parsePrice(text) {
    const cleaned = text.replace(/Lei/gi, '').replace(/\s+/g, '').trim();
    const match = cleaned.match(/([\d.]+,?\d*)/);
    if (!match) return 0;
    return parseFloat(match[1].replace(/\./g, '').replace(',', '.')) || 0;
  }
}

module.exports = new EmagCartPage();
