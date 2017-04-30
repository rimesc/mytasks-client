import { element, by, ElementFinder } from 'protractor';
import { promise } from 'selenium-webdriver';

export class Navbar {

  pagesNav = new Nav('.pages-nav');
  toolsNav = new Nav('.tools-nav');

  get pages() {
    return this.pagesNav.links.map(e => e.getText());
  }

  get activePage() {
    return this.pagesNav.activeLink;
  }

  goToPage(name: string) {
    return this.pagesNav.click(e => e.getText().then(text => text === name));
  }

  logOut() {
    return this.toolsNav.click(e => e.getAttribute('title').then(text => text === 'Logout'));
  }

}

class Nav {

  private nav: ElementFinder;

  constructor(selector: string) {
    this.nav = element(by.css(selector));
  }

  get links() {
    return this.nav.all(by.css('.nav-link'));
  }

  get activeLink() {
    return this.nav.element(by.css('.nav-link.active')).getText();
  }

  click(filter: (e: ElementFinder) => promise.Promise<boolean>) {
    return this.links.filter(filter).click();
  }

}

