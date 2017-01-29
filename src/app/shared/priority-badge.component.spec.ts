import { TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ComponentFixture } from '@angular/core/testing';

import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';

import { Priority } from '../api/priority';
import { TitleCasePipe } from './title-case.pipe';
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
    let span: Element = fixture.debugElement.query(By.css('.tag')).nativeElement;
    expect(span.classList.length).toEqual(2);
    expect(span.classList[1]).toEqual('tag-success');
    expect(span.textContent.trim()).toEqual('Low');
  });

  it('should display NORMAL priority', () => {
    component.priority = Priority.NORMAL;
    fixture.detectChanges();
    let span: Element = fixture.debugElement.query(By.css('.tag')).nativeElement;
    expect(span.classList[1]).toEqual('tag-info');
    expect(span.textContent.trim()).toEqual('Normal');
  });

  it('should display HIGH priority', () => {
    component.priority = Priority.HIGH;
    fixture.detectChanges();
    let span: Element = fixture.debugElement.query(By.css('.tag')).nativeElement;
    expect(span.classList[1]).toEqual('tag-warning');
    expect(span.textContent.trim()).toEqual('High');
  });

  it('should display CRITICAL priority', () => {
    component.priority = Priority.CRITICAL;
    fixture.detectChanges();
    let span: Element = fixture.debugElement.query(By.css('.tag')).nativeElement;
    expect(span.classList[1]).toEqual('tag-danger');
    expect(span.textContent.trim()).toEqual('Critical');
  });

});
