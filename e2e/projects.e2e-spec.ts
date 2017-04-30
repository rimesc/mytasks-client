import { browser, ExpectedConditions, promise } from 'protractor';
import { post } from 'request';

import { ProjectsPage } from './projects.po';
import { ProjectModal } from './project-modal.po';

describe('the projects page', function() {
  let page: ProjectsPage;
  let newProjectModal: ProjectModal;

  beforeEach(() => {
    page = new ProjectsPage();
    newProjectModal = new ProjectModal();
  });

  it('should be the active page', () => {
    page.navigateTo();
    expect(page.navbar.activePage).toEqual('Projects');
  });

  it('should be titled "Projects"', () => {
    page.navigateTo();
    expect(page.getPageTitle()).toEqual('Projects');
  });

  it('should display a list of projects', () => {
    page.navigateTo();
    expect(page.items).toBeArrayOfSize(3);
  });

  describe('each project item', () => {

    it('should display the project name', () => {
      page.navigateTo();
      expect(page.item(0).then(item => item.name)).toEqual('My first project');
      expect(page.item(1).then(item => item.name)).toEqual('My second project');
      expect(page.item(2).then(item => item.name)).toEqual('My third project');
    });

    it('should link to the project detail page', () => {
      page.navigateTo();
      expect(page.item(0).then(item => item.link)).toEqual('http://localhost:4200/projects/1');
      expect(page.item(1).then(item => item.link)).toEqual('http://localhost:4200/projects/2');
      expect(page.item(2).then(item => item.link)).toEqual('http://localhost:4200/projects/3');
    });

    it('should display the project description', () => {
      page.navigateTo();
      expect(page.item(0).then(item => item.description)).toStartWith('This is my first sample project.');
      expect(page.item(1).then(item => item.description)).toStartWith('This is my second sample project.');
      expect(page.item(2).then(item => item.description)).toStartWith('This is my third sample project.');
    });

    it('should display the number of incomplete tasks', () => {
      page.navigateTo();
      expect(page.item(0).then(item => item.openTasks)).toEqual(2);
      expect(page.item(1).then(item => item.openTasks)).toEqual(2);
      expect(page.item(2).then(item => item.openTasks)).toEqual(0);
    });

    describe('clicking on the project name', () => {

      it('should navigate to the project detail page', () => {
        page.navigateTo();
        page.item(0).then(item => item.go());
        browser.wait(ExpectedConditions.urlIs('http://localhost:4200/projects/1'));
      });

    });

  });

  describe('the new project button', () => {

    it('should open the new project modal', () => {
      page.navigateTo();
      page.newProjectButton.click();
      newProjectModal.waitUntilOpen();
    });

  });

  describe('the new project modal', () => {

    afterEach(() => {
      let defer = promise.defer();
      post('http://localhost:8080/api/dev/reset', (error, response, body) => {
        if (error) {
          defer.reject(error);
        } else if (response.statusCode !== 200) {
          defer.reject('Failed to reset data: POST returned status ' + response.statusCode);
        } else {
          defer.fulfill();
        }
      });
    });

    it('should require a name', () => {
      page.navigateTo();
      page.newProjectButton.click();
      newProjectModal.waitUntilOpen();
      expect(newProjectModal.canSubmit).toBeFalse();
      newProjectModal.enterName('Foo').then(() => {
        expect(newProjectModal.canSubmit).toBeTrue();
      });
      newProjectModal.clear().then(() => {
        expect(newProjectModal.canSubmit).toBeFalse();
      });
    });

    it('should not create a new project on cancel', () => {
      page.navigateTo();
      page.newProjectButton.click();
      newProjectModal.waitUntilOpen();
      newProjectModal.enterName('My new project');
      newProjectModal.cancel();
      expect(page.items).toBeArrayOfSize(3);
    });

    it('should create a new project and insert it at the end of the list on submit', () => {
      page.navigateTo();
      page.newProjectButton.click();
      newProjectModal.waitUntilOpen();
      newProjectModal.enterName('My new project');
      newProjectModal.submit();
      expect(page.items).toBeArrayOfSize(4);
      expect(page.item(3).then(item => item.name)).toEqual('My new project');
    });

  });

});
