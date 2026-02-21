import ECataloguePage from '../../src/pages/ecatalogue.page';

describe('Singer BD - E-Catalogue', () => {
  it('should open e-catalogue page', async () => {
    await ECataloguePage.open();
    await expect(await ECataloguePage.isLoaded()).toBe(true);

    const heading = (await ECataloguePage.getHeading()).toLowerCase();
    const currentUrl = (await browser.getUrl()).toLowerCase();
    await expect(currentUrl.includes('/ecatalogue') || currentUrl.includes('/e-catalogue')).toBe(true);
    await expect(heading.length).toBeGreaterThan(0);
  });
});
