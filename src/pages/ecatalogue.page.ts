import BasePage from './base.page';

class ECataloguePage extends BasePage {
  private readonly possiblePaths = ['/ecatalogue', '/e-catalogue'];
  private readonly headingSelectors = ['h1', '.page-title span.base', '.page-title'];
  private readonly anyHeadingSelector = ['h1', '.page-title span.base', '.page-title'].join(', ');

  public async open(): Promise<void> {
    for (const path of this.possiblePaths) {
      await super.open(path);
      if (await this.isLoaded(8000)) {
        return;
      }
    }

    throw new Error(`Unable to load e-catalogue page using paths: ${this.possiblePaths.join(', ')}`);
  }

  public async getHeading(): Promise<string> {
    const heading = await this.pickVisible(this.headingSelectors);
    return this.getText(heading);
  }

  public async isLoaded(timeout = 2000): Promise<boolean> {
    const heading = await $(this.anyHeadingSelector);
    try {
      await heading.waitForExist({ timeout });
      return heading.isDisplayed();
    } catch {
      return false;
    }
  }
}

export default new ECataloguePage();
