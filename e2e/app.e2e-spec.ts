import { browser, element, by, ExpectedConditions } from 'protractor';
import { MyTasksClientPage } from './app.po';

describe('myTasks client', function() {
  let page: MyTasksClientPage;

  beforeEach(() => {
    page = new MyTasksClientPage();
  });

  it('should initially display dashboard', () => {
    page.navigateTo();
    expect(page.navbar.activePage).toEqual('Dashboard');
    expect(page.getPageTitle()).toEqual('Dashboard');
  });

  describe('the main navbar', () => {

    it('should list the top-level pages', () => {
      page.navigateTo();
      expect(page.navbar.pages).toEqual(['Dashboard', 'Projects', 'Tasks']);
    });

    it('should link to the projects page', () => {
      page.navigateTo();
      page.navbar.goToPage('Projects');
      browser.wait(ExpectedConditions.urlIs('http://localhost:4200/projects'));
    });

    it('should link to the tasks page', () => {
      page.navigateTo();
      page.navbar.goToPage('Tasks');
      browser.wait(ExpectedConditions.urlIs('http://localhost:4200/tasks'));
    });

    it('should allow the user to log out', () => {
      page.navigateTo();
      page.navbar.logOut().then(() => {
        expect(page.login.loggedOut());
      });
    });

  });
});
