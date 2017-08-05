import { TestBed, async, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Location } from '@angular/common';

import { ProjectOverviewComponent } from './project-overview.component';
import { Project } from '../../api/project';
import { CurrentProjectService } from '../services/current-project.service';
import { ModalService } from '../../core/modal.service';
import { DeleteProjectModalComponent } from '../modals/delete-project-modal.component';
import { EditProjectModalComponent } from '../modals/edit-project-modal.component';
import { PluralisePipe } from '../../shared/pipes/pluralise.pipe';

import { ModalServiceSpy } from '../../testing/modal-service-spy';
import { CurrentProjectServiceSpy } from '../testing/current-project-service-spy';
import { DummyComponent } from '../../testing/dummy.component';

describe('ProjectOverviewComponent', () => {

  const PROJECT: Project = {
    id: 1, name: 'My sample project', description: 'This is my sample project.',
    tasks: { total: 3, open: 2, closed: 1},
    notes: { raw: 'Lorem *ipsum* dolor sit amet.', html: '<p>Lorem <em>ipsum</em> dolor sit amet.</p>' }
  };

  let location: Location;
  let projectService: CurrentProjectServiceSpy;
  let modalService: ModalServiceSpy;

  let fixture: ComponentFixture<ProjectOverviewComponent>;
  let page: Page;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [ NO_ERRORS_SCHEMA ],
      imports: [
        RouterTestingModule.withRoutes([ { path: 'projects', component: DummyComponent } ])
      ],
      declarations: [ ProjectOverviewComponent, PluralisePipe, DummyComponent ],
      providers: [
        { provide: CurrentProjectService, useClass: CurrentProjectServiceSpy },
        { provide: ModalService, useClass: ModalServiceSpy }
      ]
    });
    location = TestBed.get(Location);
    modalService = TestBed.get(ModalService);
    projectService = TestBed.get(CurrentProjectService);

    projectService.project = Object.assign({}, PROJECT);

    TestBed.compileComponents();
  });

  beforeEach(async(() => {
    createComponent();
  }));

  it('should display the project', () => {
    expect(page.project).toEqual(PROJECT);
  });

  it('should display the correct project name', () => {
    expect(page.title.nativeElement.textContent).toEqual('My sample project');
  });

  it('should display the correct project description', () => {
    expect(page.description.nativeElement.textContent).toEqual('This is my sample project.');
  });

  it('should display the correct number of open tasks', () => {
    expect(page.openTasks.nativeElement.textContent).toEqual('2 open tasks');
  });

  it('should display the project notes', () => {
    expect(page.notes.properties['notes']).toEqual(PROJECT.notes.raw);
  });

  describe('when the edit button is clicked', () => {

    beforeEach(async(() => {
      modalService.open.and.callFake(() => Promise.reject(''));
    }));

    it('should open the edit project modal dialog', fakeAsync(() => {
      page.toolbar.triggerEventHandler('edit', null);
      tick();
      expect(modalService.open.calls.mostRecent().args)
        .toEqual([EditProjectModalComponent, { name: 'My sample project', description: 'This is my sample project.' }]);
    }));

    describe('when the dialog is confirmed', () => {

      let userInput = { name: 'My edited project', description: 'This is my edited project.' };

      beforeEach(async(() => {
        modalService.open.and.returnValue(Promise.resolve(userInput));
      }));

      it('should update the project', fakeAsync(() => {
        page.toolbar.triggerEventHandler('edit', null);
        tick();
        expect(page.updateProjectSpy.calls.count()).toEqual(1);
        expect(page.updateProjectSpy.calls.mostRecent().args).toEqual([userInput]);
        expect(page.project.name).toEqual('My edited project');
        expect(page.project.description).toEqual('This is my edited project.');
      }));

    });

    describe('when the dialog is dismissed', () => {

      beforeEach(async(() => {
        modalService.open.and.callFake(() => Promise.reject(''));
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
      modalService.open.and.callFake(() => Promise.reject(''));
    }));

    it('should open the delete project modal dialog', fakeAsync(() => {
      page.toolbar.triggerEventHandler('delete', null);
      tick();
      expect(modalService.open.calls.mostRecent().args).toEqual([DeleteProjectModalComponent]);
    }));

    describe('when the dialog is confirmed', () => {

      beforeEach(async(() => {
        modalService.open.and.returnValue(Promise.resolve({}));
      }));

      it('should delete the project', fakeAsync(() => {
        page.toolbar.triggerEventHandler('delete', null);
        tick();
        expect(page.deleteProjectSpy.calls.count()).toEqual(1);
        expect(location.path()).toEqual('/projects');
      }));

    });

    describe('when the dialog is dismissed', () => {

      beforeEach(async(() => {
        modalService.open.and.callFake(() => Promise.reject(''));
      }));

      it('should do nothing', fakeAsync(() => {
        page.toolbar.triggerEventHandler('delete', null);
        tick();
        expect(page.deleteProjectSpy.calls.count()).toEqual(0);
      }));

    });

  });

  function createComponent() {
    fixture = TestBed.createComponent(ProjectOverviewComponent);
    page = new Page(fixture);
    fixture.detectChanges();
    return fixture.whenStable().then(() => {
      fixture.detectChanges();
      page.addPageElements();
    });
  }

});

class Page {

  component: ProjectOverviewComponent;

  updateProjectSpy: jasmine.Spy;
  deleteProjectSpy: jasmine.Spy;

  title: DebugElement;
  description: DebugElement;
  openTasks: DebugElement;
  toolbar: DebugElement;
  notes: DebugElement;

  constructor(private fixture: ComponentFixture<ProjectOverviewComponent>) {
    this.updateProjectSpy = fixture.debugElement.injector.get(CurrentProjectService).update as jasmine.Spy;
    this.deleteProjectSpy = fixture.debugElement.injector.get(CurrentProjectService).delete as jasmine.Spy;
  }

  addPageElements() {
    this.component = this.fixture.componentInstance;
    this.title = this.fixture.debugElement.query(By.css('h1'));
    this.description = this.fixture.debugElement.query(By.css('.lead'));
    this.openTasks = this.fixture.debugElement.query(By.css('.open-tasks'));
    this.toolbar = this.fixture.debugElement.query(By.css('my-project-toolbar'));
    this.notes = this.fixture.debugElement.query(By.css('my-notes'));
  }

  get project() {
    return this.component.project;
  }

}
