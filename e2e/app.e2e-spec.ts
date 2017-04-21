import { browser, element, by, ExpectedConditions } from 'protractor';
import { MyTasksClientPage } from './app.po';

describe('myTasks client', function() {
  let page: MyTasksClientPage;

  beforeEach(() => {
    page = new MyTasksClientPage();
  });

  it('should initially display dashboard', () => {
    page.navigateTo();
    expect(page.navbar.getActiveLink()).toEqual('Dashboard');
    expect(page.getPageTitle()).toEqual('Dashboard');
  });

  describe('the main navbar', () => {

    it('should list the top-level pages', () => {
      page.navigateTo();
      expect(page.navbar.getLinks()).toEqual(['Dashboard', 'Projects', 'Tasks']);
    });

    it('should link to the projects page', () => {
      page.navigateTo();
      page.navbar.followLink('Projects');
      browser.wait(ExpectedConditions.urlIs('http://localhost:4200/projects'));
    });

    it('should link to the tasks page', () => {
      page.navigateTo();
      page.navbar.followLink('Tasks');
      browser.wait(ExpectedConditions.urlIs('http://localhost:4200/tasks'));
    });

  });
});
