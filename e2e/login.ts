import { browser, element, by, ExpectedConditions } from 'protractor';
import { EMAIL, PASSWORD } from './credentials';

export function login() {
  let loginOverlay = element(by.css('.auth0-lock-overlay'));
  browser.wait(loginOverlay.isPresent().then( needsLogin => {
    if (needsLogin) {
      doLogin();
    }
  }));
}

function doLogin() {
  let loginForm = element(by.css('.auth0-lock-content'));
  let emailInput = element(by.name('email'));
  let passwordInput = element(by.name('password'));
  let submitButton = element(by.css('.auth0-lock-submit'));
  browser.wait(ExpectedConditions.visibilityOf(loginForm));
  if (!passwordInput.isPresent()) {
    // if there is no password field, assume the last login has been remembered and click the alternative link 
    let altLink = element(by.css('.auth0-lock-alternative-link'));
    altLink.click();
  }
  browser.wait(ExpectedConditions.visibilityOf(passwordInput));
  emailInput.sendKeys(EMAIL);
  passwordInput.sendKeys(PASSWORD);
  submitButton.click();
}
