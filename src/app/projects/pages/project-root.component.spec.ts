import { TestBed, async, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { ProjectRootComponent } from './project-root.component';
import { ProjectService } from '../../services/project.service';
import { TaskService } from '../../services/task.service';
import { Priority } from '../../api/priority';
import { Project } from '../../api/project';
import { TaskForm } from '../../api/task-form';

import { ActivatedRouteStub } from '../../testing/router-stubs';
import { DummyComponent } from '../../testing/dummy.component';

describe('ProjectRootComponent', () => {

  const PROJECT: Project = {
    id: 1, name: 'My sample project', description: 'This is my sample project.',
    tasks: { total: 3, open: 2, closed: 1},
    notes: { raw: 'Lorem *ipsum* dolor sit amet.', html: '<p>Lorem <em>ipsum</em> dolor sit amet.</p>' }
  };

  let activatedRoute: ActivatedRouteStub;
  let location: Location;

  let fixture: ComponentFixture<ProjectRootComponent>;
  let page: Page;

  beforeEach(() => {
    let fakeProjectService = { }; // required, but never used, in these tests
    let fakeTaskService = {
      createTask: jasmine.createSpy('createTask').and.callFake(
        (pid: number, task: TaskForm) => Promise.resolve(true).then(() => Object.assign({ id: 1 }, task))
      )
    };

    TestBed.configureTestingModule({
      schemas: [ NO_ERRORS_SCHEMA ],
      imports: [
        RouterTestingModule.withRoutes([ { path: 'tasks/:taskId', component: DummyComponent } ])
      ],
      declarations: [ ProjectRootComponent, DummyComponent ],
      providers: [
        { provide: ProjectService, useValue: fakeProjectService },
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        { provide: TaskService, useValue: fakeTaskService }
      ]
    });

    activatedRoute = TestBed.get(ActivatedRoute);
    location = TestBed.get(Location);

    TestBed.compileComponents();
  });

  describe('when navigating to an existing project', () => {

    beforeEach(async(() => {
      activatedRoute.testData = { project: Object.assign({}, PROJECT) };
      createComponent();
    }));

    it('should load the project', () => {
      expect(page.project).toEqual(PROJECT);
    });

    it('should display the header for the project', () => {
      expect(page.header.properties['project']).toEqual(PROJECT);
    });

    it('should have no error messages', () => {
      expect(page.messages.properties['messages']).toBeEmptyArray();
    });

    describe('when the new task button is clicked', () => {

      let userInput: TaskForm = { summary: 'My new task', priority: Priority.HIGH, tags: ['foo', 'bar']};

      // the header component is responsible for creating the modal dialog and passing
      // back the user input
      it('should create a new task and navigate to it', fakeAsync(() => {
        page.header.triggerEventHandler('newTask', userInput);
        tick();
        expect(page.createTaskSpy.calls.count()).toEqual(1);
        expect(page.createTaskSpy.calls.mostRecent().args).toEqual([1, userInput]);
        expect(location.path()).toEqual('/tasks/1');
      }));

    });

  });

  describe('when navigating to a non-existent project', () => {

    beforeEach(async(() => {
      activatedRoute.testError = { code: 'Not Found', message: 'The requested project could not be found.' };
      TestBed.compileComponents().then(createComponent);
    }));

    it('should load no project', () => {
      expect(page.project).toBeUndefined();
    });

    it('should display an error message', () => {
      expect(page.messages.properties['messages']).toBeArrayOfSize(1);
      expect(page.messages.properties['messages'][0].severity).toEqual('danger');
      expect(page.messages.properties['messages'][0].code).toEqual('Not Found');
      expect(page.messages.properties['messages'][0].detail).toEqual('The requested project could not be found.');
    });

  });

  function createComponent() {
    fixture = TestBed.createComponent(ProjectRootComponent);
    page = new Page(fixture);
    fixture.detectChanges();
    return fixture.whenStable().then(() => {
      fixture.detectChanges();
      page.addPageElements();
    });
  }

});

class Page {

  component: ProjectRootComponent;

  header: DebugElement;
  messages: DebugElement;

  createTaskSpy: jasmine.Spy;

  constructor(private fixture: ComponentFixture<ProjectRootComponent>) { }

  addPageElements() {
    this.component = this.fixture.componentInstance;
    this.header = this.fixture.debugElement.query(By.css('my-project-header'));
    this.messages = this.fixture.debugElement.query(By.css('my-messages'));
    this.createTaskSpy = this.fixture.debugElement.injector.get(TaskService).createTask as jasmine.Spy;
  }

  get project() {
    return this.component.project;
  }

}
