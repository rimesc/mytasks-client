import { browser, element, by } from 'protractor';
import { promise, By } from 'selenium-webdriver';

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

  get pageTitle() {
    return element(by.css('my-app-root h1')).getText();
  }

  // Use reduce as an alternative to map - https://github.com/angular/protractor/issues/2227
  protected findAll<T>(locator: By, mapper: (ElementFinder) => T = (e => e)): promise.Promise<T[]> {
    return element.all(locator).reduce((items, elem) => {
      items.push(mapper(elem));
      return items;
    }, []);
  }

}
