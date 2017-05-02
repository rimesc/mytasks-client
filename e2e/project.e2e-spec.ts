import { browser, ExpectedConditions, promise } from 'protractor';

import { ProjectPage } from './project.po';

fdescribe('the project page', function() {
  let page: ProjectPage;

  beforeEach(() => {
    page = new ProjectPage(1);
  });

  it('should be the active page', () => {
    page.navigateTo();
    expect(page.navbar.activePage).toEqual('Projects');
  });

  it('should be titled with the project title', () => {
    page.navigateTo();
    expect(page.pageTitle).toEqual('My first project');
  });

  it ('should display the project description', () => {
    page.navigateTo();
    expect(page.description).toEqual('This is my first sample project.');
  });

  it ('should display the incomplete task count', () => {
    page.navigateTo();
    expect(page.openTasks).toEqual(2);
  });

  it ('should display the project notes', () => {
    page.navigateTo();
    expect(page.notes).toContain('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
    expect(page.notes).toContain('Nunc id enim quis eros fermentum fermentum.');
    expect(page.notes).toContain('Proin quam odio, pulvinar vitae quam ac, cursus accumsan nibh.');
  });

});
