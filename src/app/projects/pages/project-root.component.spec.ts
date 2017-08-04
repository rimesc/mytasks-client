import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { ProjectRootComponent } from './project-root.component';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../api/project';

import { ActivatedRouteStub } from '../../testing/router-stubs';

describe('ProjectRootComponent', () => {

  const PROJECT: Project = {
    id: 1, name: 'My sample project', description: 'This is my sample project.',
    tasks: { total: 3, open: 2, closed: 1},
    notes: { raw: 'Lorem *ipsum* dolor sit amet.', html: '<p>Lorem <em>ipsum</em> dolor sit amet.</p>' }
  };

  let activatedRoute: ActivatedRouteStub;

  let fixture: ComponentFixture<ProjectRootComponent>;
  let page: Page;

  beforeEach(() => {
    let fakeProjectService = { }; // required, but never used, in these tests

    TestBed.configureTestingModule({
      schemas: [ NO_ERRORS_SCHEMA ],
      declarations: [ ProjectRootComponent ],
      providers: [
        { provide: ProjectService, useValue: fakeProjectService },
        { provide: ActivatedRoute, useClass: ActivatedRouteStub }
      ]
    });

    activatedRoute = TestBed.get(ActivatedRoute);

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

  constructor(private fixture: ComponentFixture<ProjectRootComponent>) { }

  addPageElements() {
    this.component = this.fixture.componentInstance;
    this.header = this.fixture.debugElement.query(By.css('my-project-header'));
    this.messages = this.fixture.debugElement.query(By.css('my-messages'));
  }

  get project() {
    return this.component.project;
  }

}
