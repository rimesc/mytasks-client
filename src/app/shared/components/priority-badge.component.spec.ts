import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';

import { Priority } from '../../api/priority';
import { TitleCasePipe } from '../pipes/title-case.pipe';
import { PriorityBadgeComponent } from './priority-badge.component';

describe('PriorityBadgeComponent', () => {

  let fixture: ComponentFixture<PriorityBadgeComponent>;
  let component: PriorityBadgeComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ Angular2FontawesomeModule ],
      declarations: [ PriorityBadgeComponent, TitleCasePipe ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  });

  beforeEach(async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(PriorityBadgeComponent);
      component = fixture.componentInstance;
    });
  }));

  it('should display LOW priority', () => {
    component.priority = Priority.LOW;
    fixture.detectChanges();
    let span = fixture.debugElement.query(By.css('.priority'));
    let icon = fixture.debugElement.query(By.css('fa'));
    let tooltipParent = span.query(By.css('span'));
    expect(span.nativeElement.classList).toContain('priority-low');
    expect(tooltipParent.properties['ngbTooltip']).toEqual('Low Priority');
    expect(icon.componentInstance.name).toEqual('chevron-circle-down');
  });

  it('should display NORMAL priority', () => {
    component.priority = Priority.NORMAL;
    fixture.detectChanges();
    let span = fixture.debugElement.query(By.css('.priority'));
    let icon = fixture.debugElement.query(By.css('fa'));
    let tooltipParent = span.query(By.css('span'));
    expect(span.nativeElement.classList).toContain('priority-normal');
    expect(tooltipParent.properties['ngbTooltip']).toEqual('Normal Priority');
    expect(icon.componentInstance.name).toEqual('minus-circle');
  });

  it('should display HIGH priority', () => {
    component.priority = Priority.HIGH;
    fixture.detectChanges();
    let span = fixture.debugElement.query(By.css('.priority'));
    let icon = fixture.debugElement.query(By.css('fa'));
    let tooltipParent = span.query(By.css('span'));
    expect(span.nativeElement.classList).toContain('priority-high');
    expect(tooltipParent.properties['ngbTooltip']).toEqual('High Priority');
    expect(icon.componentInstance.name).toEqual('chevron-circle-up');
  });

  it('should display CRITICAL priority', () => {
    component.priority = Priority.CRITICAL;
    fixture.detectChanges();
    let span = fixture.debugElement.query(By.css('.priority'));
    let icon = fixture.debugElement.query(By.css('fa'));
    let tooltipParent = span.query(By.css('span'));
    expect(span.nativeElement.classList).toContain('priority-critical');
    expect(tooltipParent.properties['ngbTooltip']).toEqual('Critical Priority');
    expect(icon.componentInstance.name).toEqual('exclamation-circle');
  });

});
