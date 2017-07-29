/// <reference types="jasmine-expect" />

import { browser, ExpectedConditions } from 'protractor';

import { ProjectsPage } from './projects.po';
import { resetData } from './api-util';

describe('the projects page', () => {
  let page: ProjectsPage;

  beforeEach(() => {
    page = new ProjectsPage();
    page.navigateTo();
  });

  it('is the active page', () => {
    expect(page.navbar.activePage).toEqual('Projects');
  });

  it('is titled "Projects"', () => {
    expect(page.pageTitle).toEqual('Projects');
  });

  it('displays a list of all the projects', () => {
    expect(page.items).toBeArrayOfSize(3);
  });

  describe('each project item', () => {

    it('displays the project name', () => {
      expect(page.item(0).then(item => item.name)).toEqual('My first project');
      expect(page.item(1).then(item => item.name)).toEqual('My second project');
      expect(page.item(2).then(item => item.name)).toEqual('My third project');
    });

    it('links to the project detail page', () => {
      expect(page.item(0).then(item => item.link)).toEqual('http://localhost:4200/projects/1');
      expect(page.item(1).then(item => item.link)).toEqual('http://localhost:4200/projects/2');
      expect(page.item(2).then(item => item.link)).toEqual('http://localhost:4200/projects/3');
    });

    it('displays the project description', () => {
      expect(page.item(0).then(item => item.description)).toStartWith('This is my first sample project.');
      expect(page.item(1).then(item => item.description)).toStartWith('This is my second sample project.');
      expect(page.item(2).then(item => item.description)).toStartWith('This is my third sample project.');
    });

    it('displays the number of incomplete tasks', () => {
      expect(page.item(0).then(item => item.openTasks)).toEqual(2);
      expect(page.item(1).then(item => item.openTasks)).toEqual(2);
      expect(page.item(2).then(item => item.openTasks)).toEqual(0);
    });

    describe('clicking on the project name', () => {

      it('navigates to the project detail page', () => {
        page.item(0).then(item => item.go());
        browser.wait(ExpectedConditions.urlIs('http://localhost:4200/projects/1/overview'));
      });

    });

  });

  describe('the new project button', () => {

    it('opens the new project modal when clicked', () => {
      page.newProjectButton.click();
      page.newProjectModal.waitUntilOpen();
      expect(page.newProjectModal.title).toEqual('New Project');
    });

  });

  describe('the new project modal', () => {

    afterEach(() => {
      resetData();
    });

    it('requires a name', () => {
      page.newProjectButton.click();
      page.newProjectModal.waitUntilOpen();
      expect(page.newProjectModal.canSubmit).toBeFalse();
      expect(page.newProjectModal.nameInput.hasError).toBeFalse(); // the error message is suppressed until the field is edited
      page.newProjectModal.nameInput.enter('Foo').then(() => {
        expect(page.newProjectModal.canSubmit).toBeTrue();
      });
      page.newProjectModal.clear().then(() => {
        expect(page.newProjectModal.nameInput.hasError).toBeTrue();
        expect(page.newProjectModal.canSubmit).toBeFalse();
      });
    });

    it('does not create a new project when cancelled', () => {
      page.newProjectButton.click();
      page.newProjectModal.waitUntilOpen();
      page.newProjectModal.nameInput.enter('My new project');
      page.newProjectModal.cancel();
      expect(page.items).toBeArrayOfSize(3);
    });

    it('creates a new project when submitted', () => {
      page.newProjectButton.click();
      page.newProjectModal.waitUntilOpen();
      page.newProjectModal.nameInput.enter('My new project');
      page.newProjectModal.submit();
      expect(page.items).toBeArrayOfSize(4);
      expect(page.item(3).then(item => item.name)).toEqual('My new project');
    });

  });

});
