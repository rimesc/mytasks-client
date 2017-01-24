import { TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { RouterLinkStubDirective } from '../testing/router-stubs';

import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';
import { MomentModule } from 'angular2-moment';

import { Priority } from '../api/priority';
import { State } from '../api/state';
import { Task } from '../api/task';
import { TaskItemComponent } from './task-item.component';
import { TagsComponent } from '../shared/tags.component';
import { PriorityBadgeComponent } from '../shared/priority-badge.component';
import { StateBadgeComponent } from '../shared/state-badge.component';
import { TitleCasePipe } from '../shared/title-case.pipe';

describe('TaskItemComponent', () => {

  let fixture: ComponentFixture<TaskItemComponent>;
  let component: TaskItemComponent;
  let task: Task = {
    id: 11,
    summary: 'Example task',
    priority: Priority.NORMAL,
    state: State.TO_DO,
    tags: [ ],
    created: new Date(),
    project: { id: 1, name: 'Example project' },
    href: 'api/tasks/11'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ Angular2FontawesomeModule, MomentModule ],
      declarations: [
        TaskItemComponent,
        TagsComponent,
        PriorityBadgeComponent,
        StateBadgeComponent,
        TitleCasePipe,
        RouterLinkStubDirective
      ],
    });
  });

  beforeEach(async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(TaskItemComponent);
      component = fixture.componentInstance;
      component.task = task;
      fixture.detectChanges();
    });
  }));

  it('should display the task summary', () => {
    let summary: Element = fixture.debugElement.query(By.css('.task-summary')).nativeElement;
    expect(summary.textContent.trim()).toEqual('Example task');
  });

  it('should link to the task detail page', () => {
    let link: DebugElement = fixture.debugElement.query(By.directive(RouterLinkStubDirective));
    link.triggerEventHandler('click', null);
    let routerLink = link.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective;
    expect(routerLink.navigatedTo).toEqual('/tasks/11');
  });

  it('should display the task priority', () => {
    let span: Element = fixture.debugElement.query(By.directive(PriorityBadgeComponent)).nativeElement;
    expect(span.textContent.trim()).toEqual('Normal');
  });

  it('should display the task state', () => {
    let span: Element = fixture.debugElement.query(By.directive(StateBadgeComponent)).nativeElement;
    expect(span.textContent.trim()).toEqual('To Do');
  });

  it('should display the task created date for new tasks', () => {
    let span: Element = fixture.debugElement.query(By.css('.modification-time')).nativeElement;
    expect(span.textContent.trim()).toStartWith('Created');
    // we don't know exactly when it was created, but it should be have been within a few seconds
    expect(span.textContent.trim()).toEndWith('seconds ago');
  });

  it('should display the task updated date for modified tasks', () => {
    task.updated = new Date();
    fixture.detectChanges();
    let span: Element = fixture.debugElement.query(By.css('.modification-time')).nativeElement;
    expect(span.textContent.trim()).toStartWith('Last modified');
    // we don't know exactly when it was created, but it should be have been within a few seconds
    expect(span.textContent.trim()).toEndWith('seconds ago');
  });

});
