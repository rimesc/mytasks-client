import { TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ComponentFixture } from '@angular/core/testing';

import { State } from '../api/state';
import { TitleCasePipe } from './title-case.pipe';
import { StateBadgeComponent } from './state-badge.component';

describe('StateBadgeComponent', () => {

  let fixture: ComponentFixture<StateBadgeComponent>;
  let component: StateBadgeComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ StateBadgeComponent, TitleCasePipe ],
    });
  });

  beforeEach(async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(StateBadgeComponent);
      component = fixture.componentInstance;
    });
  }));

  it('should display the TO_DO state', () => {
    component.state = State.TO_DO;
    fixture.detectChanges();
    let span: Element = fixture.debugElement.query(By.css('.tag')).nativeElement;
    expect(span.classList.length).toEqual(2);
    expect(span.classList[1]).toEqual('tag-info');
    expect(span.textContent).toEqual('To Do');
  });

  it('should display the IN_PROGRESS state', () => {
    component.state = State.IN_PROGRESS;
    fixture.detectChanges();
    let span: Element = fixture.debugElement.query(By.css('.tag')).nativeElement;
    expect(span.classList[1]).toEqual('tag-success');
    expect(span.textContent).toEqual('In Progress');
  });

  it('should display the ON_HOLD state', () => {
    component.state = State.ON_HOLD;
    fixture.detectChanges();
    let span: Element = fixture.debugElement.query(By.css('.tag')).nativeElement;
    expect(span.classList[1]).toEqual('tag-warning');
    expect(span.textContent).toEqual('On Hold');
  });

  it('should display the DONE state', () => {
    component.state = State.DONE;
    fixture.detectChanges();
    let span: Element = fixture.debugElement.query(By.css('.tag')).nativeElement;
    expect(span.classList[1]).toEqual('tag-danger');
    expect(span.textContent).toEqual('Done');
  });

});
