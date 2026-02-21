import BasePage from './base.page';

class ECataloguePage extends BasePage {
  private readonly possiblePaths = ['/ecatalogue', '/e-catalogue'];
  private readonly headingSelectors = ['h1', '.page-title span.base', '.page-title'];

  public async open(): Promise<void> {
    for (const path of this.possiblePaths) {
      await super.open(path);
      if (await this.isLoaded()) {
        return;
      }
    }
  }

  public async getHeading(): Promise<string> {
    const heading = await this.pickVisible(this.headingSelectors);
    return this.getText(heading);
  }

  public async isLoaded(): Promise<boolean> {
    for (const selector of this.headingSelectors) {
      const heading = await $(selector);
      if ((await heading.isExisting()) && (await heading.isDisplayed())) {
        return true;
      }
    }

    return false;
  }
}

export default new ECataloguePage();
