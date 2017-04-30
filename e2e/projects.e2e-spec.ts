import { browser, ExpectedConditions } from 'protractor';
import { ProjectsPage } from './projects.po';

describe('the projects page', function() {
  let page: ProjectsPage;

  beforeEach(() => {
    page = new ProjectsPage();
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
    });

    it('should link to the project detail page', () => {
    });

    it('should display the project summary', () => {
    });

    it('should display the number of incomplete tasks', () => {
    });

    describe('clicking on the project name', () => {

      it('should navigate to the project detail page', () => {
      });

    });

  });

  describe('the new project button', () => {

    it('should open the new project modal', () => {

    });

  });

  describe('the new project modal', () => {

    it('should create a new project on submit', () => {

    });

    it('should not create a new project on cancel', () => {

    });

  });

});
