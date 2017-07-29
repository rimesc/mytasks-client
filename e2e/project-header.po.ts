import { element, by, ElementFinder } from 'protractor';
import { promise } from 'selenium-webdriver';

export class ProjectHeaderPage {

  private nav = element(by.css('.project-nav'));

  get activeTab() {
    return this.nav.element(by.css('.nav-link.active')).getText();
  }

  switchTab(label: string) {
    return this.tab(label).click();
  }

  get numberOfOpenTasks(): promise.Promise<number> {
    return this.badge('Tasks').then(text => +text);
  }

  get numberOfNotes(): promise.Promise<number> {
    return this.badge('Notes').then(text => +text);
  }

  private badge(label: string): promise.Promise<string> {
    return this.tab(label).element(by.css('.badge')).getText();
  }

  private tab(label: string): ElementFinder {
    return this.tabs.filter(elem => elem.getText().then(text => text.startsWith('Tasks'))).get(0);
  }

  private get tabs() {
    return this.nav.all(by.css('.nav-link'));
  }

}