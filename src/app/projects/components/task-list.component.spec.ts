import { TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { RouterLinkStubDirective } from '../../testing/router-stubs';

import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';
import { MomentModule } from 'angular2-moment';
import * as moment from 'moment/moment';

import { Priority } from '../../api/priority';
import { State } from '../../api/state';
import { Task } from '../../api/task';
import { TaskListComponent } from './task-list.component';
import { TaskBadgesComponent } from '../../shared/components/task-badges.component';
import { PriorityBadgeComponent } from '../../shared/components/priority-badge.component';
import { StateBadgeComponent } from '../../shared/components/state-badge.component';
import { TagComponent } from '../../shared/components/tag.component';
import { BadgeComponent } from '../../shared/components/badge.component';
import { TitleCasePipe } from '../../shared/pipes/title-case.pipe';

describe('TaskListComponent', () => {

  let fixture: ComponentFixture<TaskListComponent>;
  let page: Page;

  let tasks: Task[] = [
    {
      id: 11, summary: 'Example task #1', priority: Priority.NORMAL, state: State.TO_DO, tags: ['foo', 'bar'], created: new Date(),
      project: { id: 1, name: 'Example project' }, href: 'api/tasks/11'
    },
    {
      id: 12, summary: 'Example task #2', priority: Priority.HIGH, state: State.IN_PROGRESS, tags: [], created: new Date(),
      project: { id: 1, name: 'Example project' }, href: 'api/tasks/12'
    },
    {
      id: 21, summary: 'Example task #3', priority: Priority.LOW, state: State.DONE, tags: ['foo'], created: new Date(),
      project: { id: 1, name: 'Example project' }, href: 'api/tasks/21'
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ Angular2FontawesomeModule, MomentModule ],
      declarations: [
        TaskListComponent,
        TaskBadgesComponent,
        PriorityBadgeComponent,
        StateBadgeComponent,
        TagComponent,
        BadgeComponent,
        TitleCasePipe,
        RouterLinkStubDirective
      ],
    });
  });

  beforeEach(async(createComponent));

  function createComponent() {
    fixture = TestBed.createComponent(TaskListComponent);
    fixture.componentInstance.tasks = tasks;
    page = new Page(fixture);
    fixture.detectChanges();
    return fixture.whenStable().then(() => {
      fixture.detectChanges();
      page.addPageElements();
    });
  }

  it('should display all the tasks', () => {
    expect(page.items.map(s => s.summary)).toEqual(['Example task #1', 'Example task #2', 'Example task #3']);
  });

  it('should display the task summary', () => {
    expect(page.items[0].summary).toEqual('Example task #1');
    expect(page.items[1].summary).toEqual('Example task #2');
    expect(page.items[2].summary).toEqual('Example task #3');
  });

  it('should link to the task detail pages', () => {
    let routerLink = page.items[0].link.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective;
    page.items[0].link.triggerEventHandler('click', null);
    expect(routerLink.navigatedTo).toEqual('/tasks/11');
  });

  it('should display the task priority', () => {
    expect(page.items[0].priority).toEqual('Normal');
    expect(page.items[1].priority).toEqual('High');
    expect(page.items[2].priority).toEqual('Low');
  });

  it('should display the task state', () => {
    expect(page.items[0].stateIcon).toEqual('clock-o');
    expect(page.items[1].stateIcon).toEqual('play-circle-o');
    expect(page.items[2].stateIcon).toEqual('check-circle-o');
  });

  describe('task created/modified date', () => {

    afterEach(() => {
      // this is necessary to reset the timeout that the amTimeAgo pipe sets to a reasonable length
      tasks[0].created = new Date();
      tasks[0].updated = undefined;
      fixture.detectChanges();
    });

    it('should be displayed for new tasks', () => {
      tasks[0].created = moment().subtract(3, 'days').toDate();
      fixture.detectChanges();
      expect(page.items[0].timestamp).toEqual('Created 3 days ago');
    });

    it('should displayed for modified tasks', () => {
      tasks[0].updated = moment().subtract(7, 'hours').toDate();
      fixture.detectChanges();
      expect(page.items[0].timestamp).toEqual('Updated 7 hours ago');
    });

  });

});

class Page {

  component: TaskListComponent;

  items: ListItem[];
  placeholderText: string;

  constructor(private fixture: ComponentFixture<TaskListComponent>) {
  }

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
  }

  get tasks() {
    return this.component.tasks;
  }

}

class ListItem {

  link: DebugElement;
  summary: string;
  stateIcon: string;
  tags: string[];
  priority: string;

  constructor(public debugElement: DebugElement) {
    this.link = debugElement.query(By.directive(RouterLinkStubDirective));
    this.summary = (debugElement.query(By.css('.task-summary')).nativeElement as Element).textContent.trim();
    this.stateIcon = (debugElement.query(By.css('.fa')).nativeElement as Element).classList[1].replace('fa-', '');
    this.tags = debugElement.queryAll(By.css('ul.item-details .badge')).map(e => (e.nativeElement as Element).textContent.trim());
    this.priority = (debugElement.query(By.directive(PriorityBadgeComponent)).nativeElement as Element).textContent.trim();
  }

  get timestamp() {
    return (this.debugElement.query(By.css('.modification-time')).nativeElement as Element).textContent.trim();
  }

}
