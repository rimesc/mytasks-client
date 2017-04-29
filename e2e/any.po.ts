import { browser, element, by } from 'protractor';
import { LoginOverlay } from './login-overlay.po';

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

export class Navbar {

  getActiveLink() {
    return element(by.css('.nav-link.active')).getText();
  }

  getLinks() {
    return this.links().map(e => e.getText());
  }

  followLink(name: string) {
    this.links().filter(e => e.getText().then(t => t === name)).click();
  }

  private links() {
    return element.all(by.css('.pages-nav li a'));
  }

}
