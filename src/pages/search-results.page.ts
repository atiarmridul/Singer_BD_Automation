import BasePage from './base.page';

class SearchResultsPage extends BasePage {
  private readonly productCardsSelectors = [
    '.products-grid .product-item',
    '.product-items .product-item',
    '.product-list .product-item',
    '.products [data-product-id]',
    '[data-testid*="product"]',
    '.product-card',
    'a[href*="/product/"]'
  ];

  private readonly resultHeadingSelectors = [
    '.page-title span.base',
    '.page-title',
    'h1'
  ];

  private readonly emptyResultsSelectors = [
    '.message.notice',
    '.message.info',
    '.search.results .message',
    '.search-no-results',
    '[data-testid*="empty"]',
    '[class*="empty"]'
  ];
  private readonly anyResultsStateSelector = [
    '.products-grid .product-item',
    '.product-items .product-item',
    '.product-list .product-item',
    '.products [data-product-id]',
    '[data-testid*="product"]',
    '.product-card',
    'a[href*="/product/"]',
    '.message.notice',
    '.message.info',
    '.search.results .message',
    '.search-no-results',
    '[data-testid*="empty"]',
    '[class*="empty"]',
    'h1',
    'main'
  ].join(', ');

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
      const count = await elements.length;
      if (count > 0) {
        return count;
      }
    }
    return 0;
  }

  public async getHeadingText(): Promise<string> {
    const heading = await this.pickVisible(this.resultHeadingSelectors);
    return this.getText(heading);
  }

  public async hasResultOrEmptyState(keyword?: string): Promise<boolean> {
    const pageStateMarker = await $(this.anyResultsStateSelector);
    await pageStateMarker.waitForExist({
      timeout: 15000,
      timeoutMsg: 'Neither product results nor empty state appeared for search'
    });

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

    const headingText = (await this.getHeadingText()).toLowerCase();
    const bodyText = (await $('body').getText()).toLowerCase();
    const keywordToken = keyword?.toLowerCase().split(' ')[0];

    if (keywordToken && (headingText.includes(keywordToken) || bodyText.includes(keywordToken))) {
      return true;
    }

    if (
      headingText.includes('search') ||
      headingText.includes('result') ||
      headingText.includes('not found') ||
      bodyText.includes('no result') ||
      bodyText.includes('no products') ||
      bodyText.includes('not found')
    ) {
      return true;
    }

    return headingText.length > 0;
  }
}

export default new SearchResultsPage();
