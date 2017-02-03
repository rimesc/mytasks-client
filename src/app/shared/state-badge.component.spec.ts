import { Component } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ComponentFixture } from '@angular/core/testing';

import { Angular2FontawesomeModule } from 'angular2-fontawesome';

import { State } from '../api/state';
import { TitleCasePipe } from './title-case.pipe';
import { StateBadgeComponent } from './state-badge.component';

// Setting the properties via a host component is necessary to trigger a call to ngOnChanges.
@Component({
  selector: 'my-test-host',
  template: '<my-state-badge [state]="state" [mode]="mode"></my-state-badge>'
})
export class HostComponent {
  state: State;
  mode: string = 'normal';
}

describe('StateBadgeComponent', () => {

  let fixture: ComponentFixture<HostComponent>;
  let component: HostComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ Angular2FontawesomeModule ],
      declarations: [ HostComponent, StateBadgeComponent, TitleCasePipe ],
    });
  });

  beforeEach(async(() => {
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(HostComponent);
      component = fixture.componentInstance;
    });
  }));

  describe('in normal mode', () => {

    it('should display the TO_DO state', () => {
      component.state = State.TO_DO;
      fixture.detectChanges();
      let span: Element = fixture.debugElement.query(By.css('.tag')).nativeElement;
      expect(span.classList.length).toEqual(2);
      expect(span.classList[1]).toEqual('tag-primary');
      expect(span.textContent.trim()).toEqual('To Do');
      let icon: Element = fixture.debugElement.query(By.css('.fa')).nativeElement;
      expect(icon.classList[1]).toEqual('fa-clock-o');
      expect(icon.classList.length).toEqual(2);
    });

    it('should display the IN_PROGRESS state', () => {
      component.state = State.IN_PROGRESS;
      fixture.detectChanges();
      let span: Element = fixture.debugElement.query(By.css('.tag')).nativeElement;
      expect(span.classList[1]).toEqual('tag-success');
      expect(span.textContent.trim()).toEqual('In Progress');
      let icon: Element = fixture.debugElement.query(By.css('.fa')).nativeElement;
      expect(icon.classList[1]).toEqual('fa-play-circle-o');
      expect(icon.classList.length).toEqual(2);
    });

    it('should display the ON_HOLD state', () => {
      component.state = State.ON_HOLD;
      fixture.detectChanges();
      let span: Element = fixture.debugElement.query(By.css('.tag')).nativeElement;
      expect(span.classList[1]).toEqual('tag-warning');
      expect(span.textContent.trim()).toEqual('On Hold');
      let icon: Element = fixture.debugElement.query(By.css('.fa')).nativeElement;
      expect(icon.classList[1]).toEqual('fa-pause-circle-o');
      expect(icon.classList.length).toEqual(2);
    });

    it('should display the DONE state', () => {
      component.state = State.DONE;
      fixture.detectChanges();
      let span: Element = fixture.debugElement.query(By.css('.tag')).nativeElement;
      expect(span.classList[1]).toEqual('tag-danger');
      expect(span.textContent.trim()).toEqual('Done');
      let icon: Element = fixture.debugElement.query(By.css('.fa')).nativeElement;
      expect(icon.classList[1]).toEqual('fa-check-circle-o');
      expect(icon.classList.length).toEqual(2);
    });

  });

  describe('in minimal mode', () => {

    beforeEach(() => {
      component.mode = 'minimal';
    });

    it('should display the TO_DO state', () => {
      component.state = State.TO_DO;
      fixture.detectChanges();
      let span: Element = fixture.debugElement.query(By.css('span')).nativeElement;
      expect(span.classList[0]).toEqual('text-primary');
      expect(span.classList.length).toEqual(1);
      expect(span.textContent.trim()).toBeEmptyString();
      let icon: Element = fixture.debugElement.query(By.css('.fa')).nativeElement;
      expect(icon.classList[1]).toEqual('fa-clock-o');
      expect(icon.classList.length).toEqual(2);
    });

    it('should display the IN_PROGRESS state', () => {
      component.state = State.IN_PROGRESS;
      fixture.detectChanges();
      let span: Element = fixture.debugElement.query(By.css('span')).nativeElement;
      expect(span.classList[0]).toEqual('text-success');
      expect(span.classList.length).toEqual(1);
      expect(span.textContent.trim()).toBeEmptyString();
      let icon: Element = fixture.debugElement.query(By.css('.fa')).nativeElement;
      expect(icon.classList[1]).toEqual('fa-play-circle-o');
      expect(icon.classList.length).toEqual(2);
    });

    it('should display the ON_HOLD state', () => {
      component.state = State.ON_HOLD;
      fixture.detectChanges();
      let span: Element = fixture.debugElement.query(By.css('span')).nativeElement;
      expect(span.classList[0]).toEqual('text-warning');
      expect(span.classList.length).toEqual(1);
      expect(span.textContent.trim()).toBeEmptyString();
      let icon: Element = fixture.debugElement.query(By.css('.fa')).nativeElement;
      expect(icon.classList[1]).toEqual('fa-pause-circle-o');
      expect(icon.classList.length).toEqual(2);
    });

    it('should display the DONE state', () => {
      component.state = State.DONE;
      fixture.detectChanges();
      let span: Element = fixture.debugElement.query(By.css('span')).nativeElement;
      expect(span.classList[0]).toEqual('text-danger');
      expect(span.classList.length).toEqual(1);
      expect(span.textContent.trim()).toBeEmptyString();
      let icon: Element = fixture.debugElement.query(By.css('.fa')).nativeElement;
      expect(icon.classList[1]).toEqual('fa-check-circle-o');
      expect(icon.classList.length).toEqual(2);
    });

  });

});
