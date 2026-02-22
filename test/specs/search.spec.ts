import SearchResultsPage from '../../src/pages/search-results.page';
import searchData from '../data/search-keywords.json';

describe('Singer BD - Search', () => {
  for (const keyword of searchData.keywords) {
    it(`should load results page for "${keyword}"`, async () => {
      await browser.url(`/catalogsearch/result/?q=${encodeURIComponent(keyword)}`);
      await SearchResultsPage.waitForResultsPage(keyword);
      await expect(await SearchResultsPage.hasResultOrEmptyState(keyword)).toBe(true);

      const currentUrl = decodeURIComponent(await browser.getUrl()).toLowerCase();
      await expect(currentUrl).toContain(keyword.toLowerCase().split(' ')[0]);
    });
  }
});
