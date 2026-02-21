import type { WebdriverIO } from 'webdriverio';

export default class BasePage {
  public async open(path: string): Promise<void> {
    await browser.url(path);
  }

  public async click(element: WebdriverIO.Element): Promise<void> {
    await element.waitForClickable({ timeout: 15000 });
    await element.click();
  }

  public async type(element: WebdriverIO.Element, value: string): Promise<void> {
    await element.waitForDisplayed({ timeout: 15000 });
    await element.clearValue();
    await element.setValue(value);
  }

  public async getText(element: WebdriverIO.Element): Promise<string> {
    await element.waitForDisplayed({ timeout: 15000 });
    return element.getText();
  }

  // Helps keep tests stable when selectors vary between desktop/mobile or theme updates.
  protected async pickVisible(selectors: string[]): Promise<WebdriverIO.Element> {
    for (const selector of selectors) {
      const element = await $(selector);
      if (await element.isExisting()) {
        return element;
      }
    }

    throw new Error(`No matching selector found from: ${selectors.join(', ')}`);
  }
}
