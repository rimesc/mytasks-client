import { browser, by, element, ElementFinder, ExpectedConditions } from 'protractor';
import { Key } from 'selenium-webdriver';

/**
 * Wrapper for a form input element.
 */
class FormInput {

  input: ElementFinder;
  label: ElementFinder;

  constructor(name: string) {
    this.input = element(by.name(name));
    this.label = element(by.xpath(`.//label[@for='${name}']`));
  }

  get hasError() {
    return this.label.element(by.css('.text-danger')).isDisplayed();
  }

}

/**
 * Wrapper for a text input element (e.g. `input` or `textarea`).
 */
export class TextInput extends FormInput {

  get value() {
    return this.input.getAttribute('value');
  }

  enter(value: string) {
    browser.wait(ExpectedConditions.visibilityOf(this.input));
    return this.input.clear().then(() => this.input.sendKeys(value).then(() => this.input.sendKeys(Key.TAB)));
  }

  /**
   * Clears the field (and then types and removes a single character to trigger validation).
   */
  clear() {
    return this.input.clear().then(() => this.input.sendKeys(' ')).then(() => this.input.sendKeys(Key.BACK_SPACE));
  }

}

/**
 * Wrapper for a `select` element that supports choosing an option by label.
 */
export class Select extends FormInput {

  /**
   * Chooses an option from a select input.
   */
  choose(option: string) {
    browser.wait(ExpectedConditions.visibilityOf(this.input));
    return this.input.all(by.tagName('option')).filter(opt => opt.getText() === '').click();
  }

}
