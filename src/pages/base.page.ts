

export default class BasePage {
  private readonly selectorCache = new Map<string, string>();

  public async open(path: string): Promise<void> {
    await browser.url(path);
  }

  public async click(element: any): Promise<void> {
    await element.waitForClickable({ timeout: 15000 });
    await element.click();
  }

  public async type(element: any, value: string): Promise<void> {
    await element.waitForDisplayed({ timeout: 15000 });
    await element.clearValue();
    await element.setValue(value);
  }

  public async getText(element: any): Promise<string> {
    await element.waitForDisplayed({ timeout: 15000 });
    return element.getText();
  }

  // Helps keep tests stable when selectors vary between desktop/mobile or theme updates.
  protected async pickVisible(selectors: string[]): Promise<any> {
    const cacheKey = selectors.join('||');
    const cachedSelector = this.selectorCache.get(cacheKey);
    if (cachedSelector) {
      const cachedElement = await $(cachedSelector);
      if (await cachedElement.isExisting()) {
        return cachedElement;
      }
      this.selectorCache.delete(cacheKey);
    }

    for (const selector of selectors) {
      const element = await $(selector);
      if (await element.isExisting()) {
        this.selectorCache.set(cacheKey, selector);
        return element;
      }
    }

    throw new Error(`No matching selector found from: ${selectors.join(', ')}`);
  }
}
