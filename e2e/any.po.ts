import { browser, element, by } from 'protractor';
import { LoginOverlay } from './login-overlay.po';
import { Navbar } from './navbar.po';

export class AnyPage {
  path: string;
  navbar: Navbar = new Navbar();
  login: LoginOverlay = new LoginOverlay();

  navigateTo() {
    browser.get(this.path);
    this.login.loginIfNeeded();
  }

  getPageTitle() {
    return element(by.css('my-app-root h1')).getText();
  }
}
