import { TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';

import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';

import { Project } from '../api/project';
import { ProjectHeaderComponent } from './project-header.component';

describe('ProjectHeaderComponent', () => {

  let fixture: ComponentFixture<ProjectHeaderComponent>;
  let component: ProjectHeaderComponent;
  let project: Project = {
    id: 1,
    name: 'My first project',
    description: 'This is my first project',
    tasks: { open: 0, closed: 0, total: 0 }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ Angular2FontawesomeModule ],
      declarations: [ ProjectHeaderComponent ],
    });
  });

  beforeEach(async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(ProjectHeaderComponent);
      component = fixture.componentInstance;
      component.project = project;
      fixture.detectChanges();
    });
  }));

  it('should display the correct project name', () => {
    let de: DebugElement = fixture.debugElement.query(By.css('h1'));
    expect(de.nativeElement.textContent).toEqual('My first project');
  });

  it('should display the correct project description', () => {
    let de: DebugElement = fixture.debugElement.query(By.css('.lead'));
    expect(de.nativeElement.textContent).toEqual('This is my first project');
  });

  it('should display the correct number of open tasks', () => {
    project.tasks.open = 1;
    fixture.detectChanges();
    let de: DebugElement = fixture.debugElement.query(By.css('.open-tasks'));
    expect(de.nativeElement.textContent).toEqual('1 open task');

    project.tasks.open = 2;
    fixture.detectChanges();
    expect(de.nativeElement.textContent).toEqual('2 open tasks');

    project.tasks.open = 0;
    fixture.detectChanges();
    expect(de.nativeElement.textContent).toEqual('0 open tasks');
  });

});
