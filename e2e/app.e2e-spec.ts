import { browser, ExpectedConditions } from 'protractor';
import { MyTasksClientPage } from './app.po';

describe('MyTasks client', () => {
  let page: MyTasksClientPage;

  beforeAll(() => {
    page = new MyTasksClientPage();
    page.navigateTo();
  });

  it('redirects to the dashboard', () => {
    browser.wait(ExpectedConditions.urlIs('http://localhost:4200/dashboard'));
  });

  describe('the main navbar', () => {

    it('lists the top-level pages', () => {
      expect(page.navbar.pages).toEqual(['Dashboard', 'Projects', 'Tasks']);
    });

    it('links to the projects page', () => {
      page.navbar.goToPage('Projects');
      browser.wait(ExpectedConditions.urlIs('http://localhost:4200/projects'));
    });

    it('links to the tasks page', () => {
      page.navbar.goToPage('Tasks');
      browser.wait(ExpectedConditions.urlIs('http://localhost:4200/tasks'));
    });

    it('links to the dashboard', () => {
      browser.get('/projects');  // go to a different page first
      page.navbar.goToPage('Dashboard');
      browser.wait(ExpectedConditions.urlIs('http://localhost:4200/dashboard'));
    });

    it('allows the user to log out', () => {
      page.navbar.logOut().then(() => {
        expect(page.login.loggedOut());
      });
    });

  });
});
