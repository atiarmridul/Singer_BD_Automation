import BasePage from './base.page';

class HomePage extends BasePage {
  private readonly searchInputSelectors = [
    'input#search',
    'input[name="q"]',
    'input[type="search"]',
    'form[action*="search"] input',
    'input[placeholder*="Search"]',
    'input[placeholder*="search"]',
    'input[aria-label*="Search"]',
    'input[aria-label*="search"]',
    '[role="search"] input'
  ];

  private readonly searchToggleSelectors = [
    'button[aria-label*="Search"]',
    'button[aria-label*="search"]',
    'button[title*="Search"]',
    '.search-toggle',
    '[data-testid*="search"] button'
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
    try {
      const searchInput = await this.findSearchInput();
      if (!searchInput) {
        throw new Error('Search input not found');
      }

      await this.type(searchInput, keyword);
      await browser.keys('Enter');
      return;
    } catch {
      // Fallback when homepage search UI is hidden or selector mapping changes.
      await browser.url(`/catalogsearch/result/?q=${encodeURIComponent(keyword)}`);
    }
  }

  private async findSearchInput(): Promise<any> {
    for (const toggleSelector of this.searchToggleSelectors) {
      const toggle = await $(toggleSelector);
      if ((await toggle.isExisting()) && (await toggle.isDisplayed())) {
        try {
          await this.click(toggle);
        } catch {
          // Continue even if toggle interaction fails; input may already be visible.
        }
      }
    }

    for (const selector of this.searchInputSelectors) {
      const input = await $(selector);
      if ((await input.isExisting()) && (await input.isDisplayed())) {
        return input;
      }
    }

    await browser.waitUntil(
      async () => {
        for (const selector of this.searchInputSelectors) {
          const input = await $(selector);
          if ((await input.isExisting()) && (await input.isDisplayed())) {
            return true;
          }
        }
        return false;
      },
      { timeout: 5000, interval: 250, timeoutMsg: 'Search input did not appear on homepage' }
    );

    return this.pickVisible(this.searchInputSelectors);
  }
}

export default new HomePage();
