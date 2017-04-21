import { browser, element, by, ExpectedConditions } from 'protractor';
import { EMAIL, PASSWORD } from './credentials';

export function login() {
  if (element(by.css('auth0-lock-overlay')).isPresent()) {
    let loginForm = element(by.css('.auth0-lock-content'));
    let emailInput = element(by.name('email'));
    let passwordInput = element(by.name('password'));
    let submitButton = element(by.css('.auth0-lock-submit'));
    browser.wait(ExpectedConditions.visibilityOf(loginForm));
    if (!passwordInput.isPresent()) {
      // if there is no password field, assume the last login has been remembered and click the alternative link 
      let altLink = element(by.css('.auth0-lock-alternative-link'));
      altLink.click();
      passwordInput = element(by.name('password'));
      browser.wait(ExpectedConditions.visibilityOf(passwordInput));
    }
    emailInput.sendKeys(EMAIL);
    passwordInput.sendKeys(PASSWORD);
    submitButton.click();
  }
}
