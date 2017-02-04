import { TestBed, async, inject, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { Project } from '../api/project';
import { ProjectForm } from '../api/project-form';
import { TaskForm } from '../api/task-form';
import { Priority } from '../api/priority';
import { ProjectService } from '../services/project.service';
import { TaskService } from '../services/task.service';
import { ProjectDetailComponent } from './project-detail.component';
import { ModalService } from '../core/modal.service';

import { ActivatedRouteStub, RouterStub } from '../testing/router-stubs';
import { ModalServiceStub } from '../testing/modal-stubs';

describe('ProjectDetailComponent', () => {
  let project: Project = {
    id: 1, name: 'My sample project', description: 'This is my sample project.',
    tasks: { total: 3, open: 2, closed: 1},
    notes: { raw: 'Lorem *ipsum* dolor sit amet.', html: '<p>Lorem <em>ipsum</em> dolor sit amet.</p>' }
  };

  let routerStub = new RouterStub();
  let activatedRouteStub;
  let modalServiceStub;
  let fakeProjectService;
  let fakeTaskService;

  let fixture: ComponentFixture<ProjectDetailComponent>;
  let page: Page;

  beforeEach(() => {
    modalServiceStub = new ModalServiceStub();
    activatedRouteStub = new ActivatedRouteStub();
    fakeProjectService = {
      getProject: jasmine.createSpy('getProject').and.callFake(
        (id: number) => Promise.resolve(true).then(() => Object.assign({}, project))
      ),
      updateProject: jasmine.createSpy('updateProject').and.callFake(
        (id: number, proj: ProjectForm) => Promise.resolve(true).then(() => Object.assign({}, project, proj))
      ),
      deleteProject: jasmine.createSpy('deleteProject').and.callFake(
        (id: number) => Promise.resolve(true).then(() => {})
      )
    };
    fakeTaskService = {
      createTask: jasmine.createSpy('createTask').and.callFake(
        (pid: number, task: TaskForm) => Promise.resolve(true).then(() => Object.assign({}, task))
      )
    };
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ ProjectDetailComponent ],
      providers: [
        ProjectDetailComponent,
        { provide: ProjectService, useValue: fakeProjectService },
        { provide: TaskService, useValue: fakeTaskService },
        { provide: ModalService, useValue: modalServiceStub },
        { provide: Router, useValue: routerStub },
        { provide: ActivatedRoute, useValue: activatedRouteStub }
      ]
    });
  });

  describe('when navigating to an existing project', () => {

    beforeEach(async(() => {
      activatedRouteStub.testData = { project: Object.assign({}, project) };
      TestBed.compileComponents().then(createComponent);
    }));

    it('should load the project', () => {
      expect(page.project).toEqual(project);
    });

    it('should have no error messages', () => {
      expect(page.messages.properties['messages']).toBeEmptyArray();
    });

    it('should display an error message if the project does not exist', () => {
      expect(page.messages.properties['messages']).toBeEmptyArray();
    });

    it('should display the project in the header', () => {
      expect(page.header.properties['project']).toEqual(project);
    });

    it('should display the project notes', () => {
      expect(page.notes.properties['notes']).toEqual(project.notes);
    });

  });

  describe('when navigating to a non-existent project', () => {

    beforeEach(async(() => {
      activatedRouteStub.testError = { code: 'Not Found', message: 'The requested project could not be found.' };
      TestBed.compileComponents().then(createComponent);
    }));

    it('should display an error message', () => {
      expect(page.messages.properties['messages']).toBeArrayOfSize(1);
      expect(page.messages.properties['messages'][0].severity).toEqual('danger');
      expect(page.messages.properties['messages'][0].code).toEqual('Not Found');
      expect(page.messages.properties['messages'][0].detail).toEqual('The requested project could not be found.');
    });

    it('should not display a project header', inject([ProjectService], (service: ProjectService) => {
      expect(page.header).toBeNull();
    }));

    it('should not display any project notes', () => {
      expect(page.notes).toBeNull();
    });

  });

  describe('when the edit button is clicked', () => {

    beforeEach(async(() => {
      activatedRouteStub.testData = { project: Object.assign({}, project) };
      TestBed.compileComponents().then(createComponent);
    }));

    it('should open the edit project modal dialog', fakeAsync(() => {
      page.toolbar.triggerEventHandler('edit', null);
      tick();
      expect(page.modalService.contentName).toEqual('EditProjectModalComponent');
      expect(page.modalService.initialForm).toEqual({ name: 'My sample project', description: 'This is my sample project.' });
    }));

    describe('when the dialog is confirmed', () => {

      let userInput = { name: 'My edited project', description: 'This is my edited project.' };

      beforeEach(async(() => {
        page.modalService.userInput = userInput;
      }));

      it('should update the project', fakeAsync(() => {
        page.toolbar.triggerEventHandler('edit', null);
        tick();
        expect(page.updateProjectSpy.calls.count()).toEqual(1);
        expect(page.updateProjectSpy.calls.mostRecent().args).toEqual([1, userInput]);
        expect(page.project.name).toEqual('My edited project');
        expect(page.project.description).toEqual('This is my edited project.');
      }));

    });

    describe('when the dialog is dismissed', () => {

      beforeEach(async(() => {
        page.modalService.userInput = undefined;
      }));

      it('should do nothing', fakeAsync(() => {
        expect(page.project.name).toEqual('My sample project');
        page.toolbar.triggerEventHandler('edit', null);
        tick();
        expect(page.updateProjectSpy.calls.count()).toEqual(0);
        expect(page.project.name).toEqual('My sample project');
        expect(page.project.description).toEqual('This is my sample project.');
      }));

    });

  });

  describe('when the delete button is clicked', () => {

    beforeEach(async(() => {
      activatedRouteStub.testData = { project: Object.assign({}, project) };
      TestBed.compileComponents().then(createComponent);
    }));

    it('should open the delete project modal dialog', fakeAsync(() => {
      page.toolbar.triggerEventHandler('delete', null);
      tick();
      expect(page.modalService.contentName).toEqual('DeleteProjectModalComponent');
    }));

    describe('when the dialog is confirmed', () => {

      beforeEach(async(() => {
        page.modalService.userInput = {};
      }));

      it('should delete the project', fakeAsync(() => {
        page.toolbar.triggerEventHandler('delete', null);
        tick();
        expect(page.deleteProjectSpy.calls.count()).toEqual(1);
        expect(page.deleteProjectSpy.calls.mostRecent().args).toEqual([1]);
        expect(page.router.lastNavigatedTo).toEqual(['projects']);
      }));

    });

    describe('when the dialog is dismissed', () => {

      it('should do nothing', fakeAsync(() => {
        page.toolbar.triggerEventHandler('edit', null);
        tick();
        expect(page.deleteProjectSpy.calls.count()).toEqual(0);
      }));

    });

  });

  describe('when the new task button is clicked', () => {

    let userInput: TaskForm = { summary: 'My new task', priority: Priority.HIGH, tags: ['foo', 'bar']};

    beforeEach(async(() => {
      activatedRouteStub.testData = { project: Object.assign({}, project) };
      TestBed.compileComponents().then(createComponent);
    }));

    // in this case, the toolbar is responsible for creating the modal dialog and passing
    // back the user input
    it('should create a new task and update the project', fakeAsync(() => {
      expect(page.project.tasks.open).toEqual(2);
      expect(page.project.tasks.total).toEqual(3);
      page.toolbar.triggerEventHandler('newTask', userInput);
      tick();
      expect(page.createTaskSpy.calls.count()).toEqual(1);
      expect(page.createTaskSpy.calls.mostRecent().args).toEqual([1, userInput]);
      expect(page.project.tasks.open).toEqual(3);
      expect(page.project.tasks.total).toEqual(4);
    }));

  });

  function createComponent() {
    fixture = TestBed.createComponent(ProjectDetailComponent);
    page = new Page(fixture);
    fixture.detectChanges();
    return fixture.whenStable().then(() => {
      fixture.detectChanges();
      page.addPageElements();
    });
  }

});

class Page {

  component: ProjectDetailComponent;

  router: RouterStub;
  modalService: ModalServiceStub;
  getProjectSpy: jasmine.Spy;
  updateProjectSpy: jasmine.Spy;
  deleteProjectSpy: jasmine.Spy;
  createTaskSpy: jasmine.Spy;

  messages: DebugElement;
  header: DebugElement;
  toolbar: DebugElement;
  notes: DebugElement;

  constructor(private fixture: ComponentFixture<ProjectDetailComponent>) {
    this.getProjectSpy = fixture.debugElement.injector.get(ProjectService).getProject;
    this.updateProjectSpy = fixture.debugElement.injector.get(ProjectService).updateProject;
    this.deleteProjectSpy = fixture.debugElement.injector.get(ProjectService).deleteProject;
    this.createTaskSpy = fixture.debugElement.injector.get(TaskService).createTask;
    this.router = fixture.debugElement.injector.get(Router);
    this.modalService = fixture.debugElement.injector.get(ModalService);
  }

  addPageElements() {
    this.component = this.fixture.componentInstance;
    this.messages = this.fixture.debugElement.query(By.css('my-messages'));
    this.header = this.fixture.debugElement.query(By.css('my-project-header'));
    this.toolbar = this.fixture.debugElement.query(By.css('my-project-toolbar'));
    this.notes = this.fixture.debugElement.query(By.css('my-markdown-view'));
  }

  get project() {
    return this.component.project;
  }

}
