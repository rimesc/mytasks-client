import { browser, element, by, ExpectedConditions } from 'protractor';
import { EMAIL, PASSWORD } from './credentials';

export class LoginOverlay {

  private overlay = element(by.css('.auth0-lock-overlay'));
  private form = new LoginForm();

  loginIfNeeded() {
    return this.needsLogin().then(needsLogin => {
      if (needsLogin) {
        this.form.login();
      }
    });
  }

  loggedOut() {
    this.form.message().then(message => expect(message).toEqual('LOGGED OUT'));
  }

  private needsLogin() {
    return this.overlay.isPresent();
  }

}

class LoginForm {

  private loginForm = element(by.css('.auth0-lock-content'));
  private emailInput = this.loginForm.element(by.css('.auth0-lock-input-email input'));
  private passwordInput = this.loginForm.element(by.css('.auth0-lock-input-password input'));
  private lastLogin = element(by.css('.auth0-lock-last-login-pane .auth0-lock-social-button'));
  private messageSpan = element(by.css('.auth0-global-message span'));
  private submitButton = element(by.css('.auth0-lock-submit'));

  login() {
    browser.wait(ExpectedConditions.visibilityOf(this.loginForm));
    // if there is no password field, assume the last login has been remembered and click the alternative link 
    return this.isPasswordRequired().then(required => required ? this.enterCredentials() : this.lastLogin.click());
  }

  message() {
    browser.wait(ExpectedConditions.visibilityOf(this.loginForm));
    return this.messageSpan.getText();
  }

  private isPasswordRequired() {
    return this.passwordInput.isPresent();
  }

  private enterCredentials() {
    browser.wait(ExpectedConditions.visibilityOf(this.emailInput));
    browser.wait(ExpectedConditions.visibilityOf(this.passwordInput));
    this.emailInput.sendKeys(EMAIL);
    this.passwordInput.sendKeys(PASSWORD);
    return this.submitButton.click();
  }

}
