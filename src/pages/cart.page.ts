import BasePage from './base.page';

class CartPage extends BasePage {
  private readonly emptyCartMessageSelectors = [
    '.cart-empty p',
    '.cart-empty',
    '.checkout-cart-index .cart-empty'
  ];

  private readonly cartItemSelectors = [
    '.cart.item',
    '.cart.table-wrapper tbody tr',
    '.cart-container .item-info'
  ];

  public async open(): Promise<void> {
    await super.open('/checkout/cart/');
  }

  public async getCartState(): Promise<'empty' | 'items' | 'unknown'> {
    for (const selector of this.cartItemSelectors) {
      const items = await $$(selector);
      if (items.length > 0) {
        return 'items';
      }
    }

    for (const selector of this.emptyCartMessageSelectors) {
      const message = await $(selector);
      if ((await message.isExisting()) && (await message.isDisplayed())) {
        return 'empty';
      }
    }

    return 'unknown';
  }
}

export default new CartPage();
