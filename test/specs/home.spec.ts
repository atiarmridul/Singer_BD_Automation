import HomePage from '../../src/pages/home.page';

describe('Singer BD - Home', () => {
  it('should open homepage successfully', async () => {
    await HomePage.open();
    await expect(await HomePage.isLoaded()).toBe(true);
    const currentUrl = (await browser.getUrl()).toLowerCase();
    await expect(currentUrl).toContain('singerbd.com');
  });
});
