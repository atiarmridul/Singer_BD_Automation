import HomePage from '../../src/pages/home.page';
import SearchResultsPage from '../../src/pages/search-results.page';
import { searchKeywords } from '../data/search-keywords';

describe('Singer BD - Search', () => {
  for (const keyword of searchKeywords) {
    it(`should search for "${keyword}" and show results page`, async () => {
      await HomePage.open();
      await HomePage.search(keyword);

      await SearchResultsPage.waitForResultsPage(keyword);
      await expect(await SearchResultsPage.hasResultOrEmptyState()).toBe(true);

      const currentUrl = decodeURIComponent(await browser.getUrl()).toLowerCase();
      await expect(currentUrl).toContain(keyword.toLowerCase().split(' ')[0]);
    });
  }
});
