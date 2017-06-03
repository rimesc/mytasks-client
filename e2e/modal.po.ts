import { browser, element, by, ExpectedConditions } from 'protractor';

export class Modal {

  protected content = element(by.css('.modal-content'));
  protected header = element(by.css('.modal-header'));
  protected body = element(by.css('.modal-body'));
  protected footer = element(by.css('.modal-footer'));

  get title() {
    return this.header.element(by.css('.modal-title')).getText();
  }

  waitUntilOpen() {
    return browser.wait(ExpectedConditions.visibilityOf(this.content));
  }

  waitUntilClosed() {
    return browser.wait(ExpectedConditions.invisibilityOf(this.content));
  }

}
