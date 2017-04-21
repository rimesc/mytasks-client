import { browser, element, by } from 'protractor';
import { login } from './login';

export class AnyPage {
  path: string;
  navbar: Navbar = new Navbar();

  navigateTo() {
    browser.get(this.path);
    login();
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
