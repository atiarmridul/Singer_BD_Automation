import BasePage from './base.page';

class SearchResultsPage extends BasePage {
  private readonly productCardsSelectors = [
    '.products-grid .product-item',
    '.product-items .product-item',
    '.product-list .product-item'
  ];

  private readonly resultHeadingSelectors = [
    '.page-title span.base',
    '.page-title',
    'h1'
  ];

  private readonly emptyResultsSelectors = [
    '.message.notice',
    '.message.info',
    '.search.results .message'
  ];

  public async waitForResultsPage(keyword: string): Promise<void> {
    await browser.waitUntil(
      async () => {
        const url = await browser.getUrl();
        const normalized = decodeURIComponent(url).toLowerCase();
        return (
          normalized.includes('catalogsearch') ||
          normalized.includes('search') ||
          normalized.includes(`q=${keyword.toLowerCase().replace(/\s+/g, '+')}`) ||
          normalized.includes(keyword.toLowerCase())
        );
      },
      {
        timeout: 15000,
        timeoutMsg: 'Search results URL did not load in time'
      }
    );
  }

  public async getResultCount(): Promise<number> {
    for (const selector of this.productCardsSelectors) {
      const elements = await $$(selector);
      if ((await elements.length) > 0) {
        return elements.length;
      }
    }
    return 0;
  }

  public async getHeadingText(): Promise<string> {
    const heading = await this.pickVisible(this.resultHeadingSelectors);
    return this.getText(heading);
  }

  public async hasResultOrEmptyState(): Promise<boolean> {
    await browser.waitUntil(
      async () => {
        const count = await this.getResultCount();
        if (count > 0) {
          return true;
        }

        for (const selector of this.emptyResultsSelectors) {
          const node = await $(selector);
          if ((await node.isExisting()) && (await node.isDisplayed())) {
            return true;
          }
        }

        return false;
      },
      {
        timeout: 15000,
        timeoutMsg: 'Neither product results nor empty state appeared for search'
      }
    );

    return true;
  }
}

export default new SearchResultsPage();
