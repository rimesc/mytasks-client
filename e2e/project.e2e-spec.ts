import { browser, ExpectedConditions } from 'protractor';

import { ProjectPage } from './project.po';
import { ProjectsPage } from './projects.po';
import { resetData } from './api-util';

describe('the project page', () => {
  let page: ProjectPage;

  beforeEach(() => {
    page = new ProjectPage(1);
    page.navigateTo();
  });

  it('is the active page', () => {
    expect(page.navbar.activePage).toEqual('Projects');
  });

  it('displays the project title', () => {
    expect(page.pageTitle).toEqual('My first project');
  });

  it ('displays the project description', () => {
    expect(page.description).toEqual('This is my first sample project.');
  });

  it ('displays the incomplete task count', () => {
    expect(page.openTasks).toEqual(2);
  });

  it ('displays the project notes', () => {
    expect(page.notes).toContain('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
    expect(page.notes).toContain('Nunc id enim quis eros fermentum fermentum.');
    expect(page.notes).toContain('Proin quam odio, pulvinar vitae quam ac, cursus accumsan nibh.');
  });

  describe('the edit project button', () => {

    it('opens the edit project modal when clicked', () => {
      page.editProjectButton.click();
      page.editProjectModal.waitUntilOpen();
      expect(page.editProjectModal.title).toEqual('Edit Project');
    });

  });

  describe('the delete project button', () => {

    it('opens the delete project confirmation modal when clicked', () => {
      page.deleteProjectButton.click();
      page.deleteProjectModal.waitUntilOpen();
      expect(page.deleteProjectModal.title).toEqual('Delete Project');
    });

  });

  describe('the new task button', () => {

    it('opens the new task modal when clicked', () => {
      page.newTaskButton.click();
      page.newTaskModal.waitUntilOpen();
      expect(page.newTaskModal.title).toEqual('New Task');
    });

  });

  describe('the edit project modal', () => {

    afterEach(() => {
      resetData();
    });

    it('opens with the existing project details', () => {
      page.editProjectButton.click();
      page.editProjectModal.waitUntilOpen();
      expect(page.editProjectModal.nameInput.value).toEqual('My first project');
      expect(page.editProjectModal.descriptionInput.value).toEqual('This is my first sample project.');
    });

    it('requires a name', () => {
      page.editProjectButton.click();
      page.editProjectModal.waitUntilOpen();
      expect(page.editProjectModal.canSubmit).toBeTrue();
      page.editProjectModal.clear().then(() => {
        expect(page.editProjectModal.canSubmit).toBeFalse();
        expect(page.editProjectModal.nameInput.hasError).toBeTrue();
      });
    });

    it('does not modify the project when cancelled', () => {
      page.editProjectButton.click();
      page.editProjectModal.waitUntilOpen();
      page.editProjectModal.nameInput.enter('My updated project');
      page.editProjectModal.cancel();
      expect(page.pageTitle).toEqual('My first project');
    });

    it('modifies the project and updates the page when submitted', () => {
      page.editProjectButton.click();
      page.editProjectModal.waitUntilOpen();
      page.editProjectModal.nameInput.enter('My updated project');
      page.editProjectModal.descriptionInput.enter('This project has been updated.');
      page.editProjectModal.submit();
      expect(page.pageTitle).toEqual('My updated project');
      expect(page.description).toEqual('This project has been updated.');
    });

  });

  describe('the delete project confirmation modal', () => {

    afterEach(() => {
      resetData();
    });

    it('does not delete the project and remains on the project page when cancelled', () => {
      page.deleteProjectButton.click();
      page.deleteProjectModal.waitUntilOpen();
      page.deleteProjectModal.cancel();
      expect(page.pageTitle).toEqual('My first project');
      page.navigateTo();
      expect(page.pageTitle).toEqual('My first project');
    });

    it('deletes the project and redirects to the project list when submitted', () => {
      page.deleteProjectButton.click();
      page.deleteProjectModal.waitUntilOpen();
      page.deleteProjectModal.confirm();
      browser.wait(ExpectedConditions.urlIs('http://localhost:4200/projects'));
      expect(new ProjectsPage().items).toBeArrayOfSize(2);
    });

  });

  describe('the new task modal', () => {

    afterEach(() => {
      resetData();
    });

    it('requires a summary', () => {
      page.newTaskButton.click();
      page.newTaskModal.waitUntilOpen();
      expect(page.newTaskModal.canSubmit).toBeFalse();
      expect(page.newTaskModal.summaryInput.hasError).toBeFalse();  // the error message is suppressed until the field is edited
      page.newTaskModal.summaryInput.enter('Foo').then(() => {
        expect(page.newTaskModal.canSubmit).toBeTrue();
      });
      page.newTaskModal.clear().then(() => {
        expect(page.newTaskModal.summaryInput.hasError).toBeTrue();
        expect(page.newTaskModal.canSubmit).toBeFalse();
      });
    });

    it('does not create a new task when cancelled', () => {
      page.newTaskButton.click();
      page.newTaskModal.waitUntilOpen();
      page.newTaskModal.summaryInput.enter('My new task');
      page.newTaskModal.cancel();
      expect(page.openTasks).toEqual(2);
    });

    it('creates a new task when submitted', () => {
      page.newTaskButton.click();
      page.newTaskModal.waitUntilOpen();
      page.newTaskModal.summaryInput.enter('My new task');
      page.newTaskModal.selectPriority('High');
      page.newTaskModal.submit();
      expect(page.openTasks).toEqual(3);
      // TODO assert task details once there is a page objects for the project tasks page
    });

  });

  describe('the edit notes button', () => {

    it('switches to editing mode when clicked', () => {
      page.editNotesButton.click();
      browser.wait(ExpectedConditions.visibilityOf(page.notesEditor.markdownInput.input));
    });

  });

  describe('the notes editor', () => {

    afterEach(() => {
      resetData();
    });

    it('does not modify the notes when cancelled', () => {
      page.editNotesButton.click();
      page.notesEditor.markdownInput.enter('These notes have been edited.');
      page.notesEditor.cancel();
      page.discardChangesModal.waitUntilOpen();
      page.discardChangesModal.submit();
      page.notesEditor.waitUntilClosed();
      expect(page.notes).toStartWith('Lorem ipsum');
      expect(page.notes).toEndWith('Cras tempor nunc');
    });

    it('modifies the notes and updates the page when saved', () => {
      page.editNotesButton.click();
      page.notesEditor.markdownInput.enter('These notes have been edited.');
      page.notesEditor.save();
      expect(page.notes).toEqual('These notes have been edited.');
    });

  });

});
