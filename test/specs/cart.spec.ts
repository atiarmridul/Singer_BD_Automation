import CartPage from '../../src/pages/cart.page';

describe('Singer BD - Cart', () => {
  it('should open cart page and render cart state', async () => {
    await CartPage.open();
    const currentUrl = (await browser.getUrl()).toLowerCase();
    await expect(currentUrl).toContain('/checkout/cart');

    const cartState = await CartPage.getCartState();
    await expect(['empty', 'items']).toContain(cartState);
  });
});
