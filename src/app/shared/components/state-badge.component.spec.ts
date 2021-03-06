import { Component } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ComponentFixture } from '@angular/core/testing';

import { Angular2FontawesomeModule } from 'angular2-fontawesome';

import { State } from '../../api/state';
import { TitleCasePipe } from '../pipes/title-case.pipe';
import { StateBadgeComponent } from './state-badge.component';
import { BadgeComponent } from './badge.component';

// Setting the properties via a host component is necessary to trigger a call to ngOnChanges.
@Component({
  selector: 'my-test-host',
  template: '<my-state-badge [state]="state" [mode]="mode"></my-state-badge>'
})
export class HostComponent {
  state: State;
  mode = 'normal';
}

describe('StateBadgeComponent', () => {

  let fixture: ComponentFixture<HostComponent>;
  let component: HostComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ Angular2FontawesomeModule ],
      declarations: [ HostComponent, StateBadgeComponent, BadgeComponent, TitleCasePipe ],
    });
  });

  beforeEach(async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(HostComponent);
      component = fixture.componentInstance;
    });
  }));

  it('should display the TO_DO state', () => {
    component.state = State.TO_DO;
    fixture.detectChanges();
    let span: Element = fixture.debugElement.query(By.css('.state')).nativeElement;
    expect(span.classList.length).toEqual(2);
    expect(span.classList[1]).toEqual('state-to_do');
    expect(span.textContent.trim()).toEqual('To Do');
    let icon: Element = fixture.debugElement.query(By.css('.fa')).nativeElement;
    expect(icon.classList[1]).toEqual('fa-clock-o');
    expect(icon.classList.length).toEqual(2);
  });

  it('should display the IN_PROGRESS state', () => {
    component.state = State.IN_PROGRESS;
    fixture.detectChanges();
    let span: Element = fixture.debugElement.query(By.css('.state')).nativeElement;
    expect(span.classList[1]).toEqual('state-in_progress');
    expect(span.textContent.trim()).toEqual('In Progress');
    let icon: Element = fixture.debugElement.query(By.css('.fa')).nativeElement;
    expect(icon.classList[1]).toEqual('fa-play-circle-o');
    expect(icon.classList.length).toEqual(2);
  });

  it('should display the ON_HOLD state', () => {
    component.state = State.ON_HOLD;
    fixture.detectChanges();
    let span: Element = fixture.debugElement.query(By.css('.state')).nativeElement;
    expect(span.classList[1]).toEqual('state-on_hold');
    expect(span.textContent.trim()).toEqual('On Hold');
    let icon: Element = fixture.debugElement.query(By.css('.fa')).nativeElement;
    expect(icon.classList[1]).toEqual('fa-pause-circle-o');
    expect(icon.classList.length).toEqual(2);
  });

  it('should display the DONE state', () => {
    component.state = State.DONE;
    fixture.detectChanges();
    let span: Element = fixture.debugElement.query(By.css('.state')).nativeElement;
    expect(span.classList[1]).toEqual('state-done');
    expect(span.textContent.trim()).toEqual('Done');
    let icon: Element = fixture.debugElement.query(By.css('.fa')).nativeElement;
    expect(icon.classList[1]).toEqual('fa-check-circle-o');
    expect(icon.classList.length).toEqual(2);
  });

});
