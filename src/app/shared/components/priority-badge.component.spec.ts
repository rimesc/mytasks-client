import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
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
    let span: Element = fixture.debugElement.query(By.css('span')).nativeElement;
    let icon: DebugElement = fixture.debugElement.query(By.css('fa'));
    expect(span.classList).toContain('priority-low');
    expect(span.attributes.getNamedItem('title').textContent.trim()).toEqual('Low Priority');
    expect(icon.componentInstance.name).toEqual('chevron-circle-down');
  });

  it('should display NORMAL priority', () => {
    component.priority = Priority.NORMAL;
    fixture.detectChanges();
    let span: Element = fixture.debugElement.query(By.css('span')).nativeElement;
    let icon: DebugElement = fixture.debugElement.query(By.css('fa'));
    expect(span.classList).toContain('priority-normal');
    expect(span.attributes.getNamedItem('title').textContent.trim()).toEqual('Normal Priority');
    expect(icon.componentInstance.name).toEqual('minus-circle');
  });

  it('should display HIGH priority', () => {
    component.priority = Priority.HIGH;
    fixture.detectChanges();
    let span: Element = fixture.debugElement.query(By.css('span')).nativeElement;
    let icon: DebugElement = fixture.debugElement.query(By.css('fa'));
    expect(span.classList).toContain('priority-high');
    expect(span.attributes.getNamedItem('title').textContent.trim()).toEqual('High Priority');
    expect(icon.componentInstance.name).toEqual('chevron-circle-up');
  });

  it('should display CRITICAL priority', () => {
    component.priority = Priority.CRITICAL;
    fixture.detectChanges();
    let span: Element = fixture.debugElement.query(By.css('span')).nativeElement;
    let icon: DebugElement = fixture.debugElement.query(By.css('fa'));
    expect(span.classList).toContain('priority-critical');
    expect(span.attributes.getNamedItem('title').textContent.trim()).toEqual('Critical Priority');
    expect(icon.componentInstance.name).toEqual('exclamation-circle');
  });

});
