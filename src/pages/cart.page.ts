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
  private readonly anyCartStateSelector = [
    '.cart.item',
    '.cart.table-wrapper tbody tr',
    '.cart-container .item-info',
    '.cart-empty p',
    '.cart-empty',
    '.checkout-cart-index .cart-empty'
  ].join(', ');

  public async open(): Promise<void> {
    await super.open('/checkout/cart/');
  }

  public async getCartState(): Promise<'empty' | 'items' | 'unknown'> {
    const cartStateMarker = await $(this.anyCartStateSelector);
    await cartStateMarker.waitForExist({ timeout: 10000 });

    for (const selector of this.cartItemSelectors) {
      const items = await $$(selector);
      if ((await items.length) > 0) {
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
