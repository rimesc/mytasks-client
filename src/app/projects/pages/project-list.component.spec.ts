import { TestBed, async, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { ProjectListComponent } from './project-list.component';
import { Project } from '../../api/project';
import { ProjectForm } from '../../api/project-form';
import { ProjectService } from '../../services/project.service';
import { ModalService } from '../../core/modal.service';
import { NewProjectModalComponent } from '../modals/new-project-modal.component';

import { ProjectServiceSpy } from '../../testing/project-service-spy';
import { ModalServiceStub } from '../../testing/modal-stubs';
import { RouterLinkStubDirective } from '../../testing/router-stubs';

describe('ProjectListComponent', () => {
  let projects: Project[] = [
    { id: 1, name: 'My first project', description: 'This is my first project.', tasks: { total: 1, open: 1, closed: 0 } },
    { id: 2, name: 'My second project', description: 'This is my second project.', tasks: { total: 2, open: 0, closed: 2 } },
    { id: 3, name: 'My third project', description: 'This is my third project.', tasks: { total: 3, open: 2, closed: 1 } }
  ];

  let modalService: ModalServiceStub;
  let projectService: ProjectServiceSpy;

  let fixture: ComponentFixture<ProjectListComponent>;
  let page: Page;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [ NO_ERRORS_SCHEMA ],
      declarations: [ ProjectListComponent, RouterLinkStubDirective ],
      providers: [
        { provide: ProjectService, useClass: ProjectServiceSpy },
        { provide: ModalService, useClass: ModalServiceStub }
      ]
    });
    modalService = TestBed.get(ModalService);
    projectService = TestBed.get(ProjectService);
    projectService.getProjects.and.callFake(
      () => Promise.resolve(true).then(() => projects.map(p => Object.assign({}, p)))
    );
    projectService.createProject.and.callFake(
      (project: ProjectForm) => Promise.resolve(true).then(() => Object.assign({}, project))
    );
    TestBed.compileComponents();
  });

  describe('when navigating to the projects page', () => {

    beforeEach(async(() => {
      createComponent();
    }));

    it('should load the list of projects', () => {
      expect(page.projects).toEqual(projects);
      expect(projectService.getProjects.calls.count()).toEqual(1);
    });

    it('should display the list of projects', () => {
      expect(page.items.length).toEqual(projects.length);
      expect(page.items[0].headingText).toEqual('My first project');
      expect(page.items[0].contentText).toEqual('This is my first project.');
      expect(page.items[0].badgeText).toEqual('1');
      expect(page.items[1].headingText).toEqual('My second project');
      expect(page.items[1].contentText).toEqual('This is my second project.');
      expect(page.items[1].badgeText).toEqual('0');
      expect(page.items[2].headingText).toEqual('My third project');
      expect(page.items[2].contentText).toEqual('This is my third project.');
      expect(page.items[2].badgeText).toEqual('2');
    });

  });

  describe('when a project link is clicked', () => {

    beforeEach(async(() => {
      createComponent();
    }));

    it('should navigate to the selected project', () => {
      let link = page.items[1].link;
      link.triggerEventHandler('click', null);
      let routerLink = link.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective;
      expect(routerLink.navigatedTo).toEqual('/projects/2');
    });

  });

  describe('when the new project button is clicked', () => {

    let userInput: ProjectForm = { name: 'My new project', description: 'This is my new project.'};

    beforeEach(async(() => {
      createComponent();
      modalService.open.and.callFake(() => Promise.reject(''));
    }));

    it('should open the new project modal dialog', fakeAsync(() => {
      page.newProjectButton.triggerEventHandler('click', null);
      tick();
      expect(modalService.open.calls.mostRecent().args).toEqual([NewProjectModalComponent]);
    }));

    describe('when the dialog is confirmed', () => {

      beforeEach(async(() => {
        modalService.open.and.returnValue(Promise.resolve(userInput));
      }));

      it('should create a new project and reload the project list', fakeAsync(() => {
        expect(projectService.getProjects.calls.count()).toEqual(1);
        page.newProjectButton.triggerEventHandler('click', null);
        tick();
        expect(projectService.createProject.calls.count()).toEqual(1);
        expect(projectService.createProject.calls.mostRecent().args).toEqual([userInput]);
        expect(projectService.getProjects.calls.count()).toEqual(2);
      }));

    });

    describe('when the dialog is dismissed', () => {

      it('should do nothing', fakeAsync(() => {
        page.newProjectButton.triggerEventHandler('click', null);
        tick();
        expect(projectService.createProject.calls.count()).toEqual(0);
      }));

    });

  });

  describe('when there are no projects to display', () => {

    beforeEach(async(() => {
      projectService.getProjects.and.callFake(() => Promise.resolve(true).then(() => []));
      TestBed.compileComponents().then(createComponent);
    }));

    it('should display a placeholder message', () => {
      expect(page.placeholderText).toEqual('No projects to show.');
      expect(page.items).toBeEmptyArray();
    });

  });

  function createComponent() {
    fixture = TestBed.createComponent(ProjectListComponent);
    page = new Page(fixture);
    fixture.detectChanges();
    return fixture.whenStable().then(() => {
      fixture.detectChanges();
      page.addPageElements();
    });
  }

});

class Page {

  component: ProjectListComponent;

  placeholderText: string;
  items: ListItem[];
  newProjectButton: DebugElement;

  constructor(private fixture: ComponentFixture<ProjectListComponent>) { }

  addPageElements() {
    this.component = this.fixture.componentInstance;
    let placeholder = this.fixture.debugElement.query(By.css('li.list-group-placeholder'));
    if (placeholder) {
      this.placeholderText = (placeholder.nativeElement as Element).textContent.trim();
    }
    this.items = this.fixture.debugElement
      .queryAll(By.css('li.list-group-item'))
      .filter(el => el !== placeholder)
      .map(debugElement => new ListItem(debugElement));
    this.newProjectButton = this.fixture.debugElement.query(By.css('button'));
  }

  get projects() {
    return this.component.projects;
  }

}

class ListItem {

  headingText: string;
  contentText: string;
  badgeText: string;
  link: DebugElement;

  constructor(public debugElement: DebugElement) {
    this.headingText = (debugElement.query(By.css('h5')).nativeElement as Element).textContent.trim();
    this.contentText = (debugElement.query(By.css('li>p')).nativeElement as Element).textContent.trim();
    this.badgeText = (debugElement.query(By.css('span.badge-pill')).nativeElement as Element).textContent.trim();
    this.link = debugElement.query(By.css('h5 a'));
  }

}
