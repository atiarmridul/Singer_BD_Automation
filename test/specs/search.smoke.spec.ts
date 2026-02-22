import HomePage from '../../src/pages/home.page';
import SearchResultsPage from '../../src/pages/search-results.page';
import { searchKeywords } from '../data/search-keywords';

describe('Singer BD - Search Smoke', () => {
  it('should search from homepage and open results page', async () => {
    const keyword = searchKeywords[0];
    await HomePage.open();
    await HomePage.search(keyword);

    await SearchResultsPage.waitForResultsPage(keyword);
    await expect(await SearchResultsPage.hasResultOrEmptyState(keyword)).toBe(true);
  });
});
