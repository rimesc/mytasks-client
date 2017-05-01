import { browser, element, by, ExpectedConditions, ElementFinder } from 'protractor';
import { Key } from 'selenium-webdriver';

function clear(field: ElementFinder) {
  // clearing a field doesn't trigger validation, so type and then remove a single character 
  return field.clear().then(() => field.sendKeys(' ')).then(() => field.sendKeys(Key.BACK_SPACE));
}

export class ProjectModal {

  private content = element(by.css('.modal-content'));
  private nameLabel = this.content.element(by.css('.control-label .text-danger'));
  private nameInput = this.content.element(by.name('name'));
  private descriptionInput = this.content.element(by.name('description'));
  private submitButton = this.content.element(by.css('.btn-primary'));
  private cancelButton = this.content.element(by.css('.btn-secondary'));

  waitUntilOpen() {
    return browser.wait(ExpectedConditions.visibilityOf(this.content));
  }

  waitUntilClosed() {
    return browser.wait(ExpectedConditions.invisibilityOf(this.content));
  }

  enterName(name: string) {
    browser.wait(ExpectedConditions.visibilityOf(this.nameInput));
    return this.nameInput.sendKeys(name);
  }

  get hasFieldError() {
    return this.nameLabel.isDisplayed();
  }

  enterDescription(description: string) {
    browser.wait(ExpectedConditions.visibilityOf(this.descriptionInput));
    return this.descriptionInput.sendKeys(description);
  }

  clear() {
    browser.wait(ExpectedConditions.visibilityOf(this.nameInput));
    browser.wait(ExpectedConditions.visibilityOf(this.descriptionInput));
    return clear(this.nameInput).then(() => clear(this.descriptionInput));
  }

  get canSubmit() {
    return this.submitButton.isEnabled();
  }

  submit() {
    return this.submitButton.click().then(() => this.waitUntilClosed());
  }

  cancel() {
    return this.cancelButton.click().then(() => this.waitUntilClosed());
  }

}
