import BasePage from './base.page';

class HomePage extends BasePage {
  private readonly searchInputSelectors = [
    'input#search',
    'input[name="q"]'
  ];

  public async open(): Promise<void> {
    await super.open('/');
  }

  public async isLoaded(): Promise<boolean> {
    await browser.waitUntil(
      async () => {
        const url = (await browser.getUrl()).toLowerCase();
        const title = await browser.getTitle();
        return url.includes('singerbd.com') && title.trim().length > 0;
      },
      { timeout: 15000, timeoutMsg: 'Singer BD homepage did not fully load' }
    );

    return true;
  }

  public async search(keyword: string): Promise<void> {
    const searchInput = await this.pickVisible(this.searchInputSelectors);
    await this.type(searchInput, keyword);
    await browser.keys('Enter');
  }
}

export default new HomePage();
