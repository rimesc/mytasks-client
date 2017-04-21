import { browser, element, by } from 'protractor';
import { login } from './login';

export class MyTasksClientPage {
  navigateTo() {
    browser.get('/');
    login();
  }

  getPageTitle() {
    return element(by.css('my-app-root h1')).getText();
  }
}
