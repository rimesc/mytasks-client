import { Component, Input, OnChanges, SimpleChange } from '@angular/core';

import { State } from '../api/state';

@Component({
  selector: 'my-state-badge',
  template: `<span [ngClass]="classes" title="{{states[state] | titlecase}}">
    <fa *ngIf="icon" [name]="icon"></fa>
    <span *ngIf="mode === 'normal'">{{states[state] | titlecase}}</span>
  </span>`,
  styles: []
})
export class StateBadgeComponent implements OnChanges {

  @Input()
  state: State;

  @Input()
  mode: string = 'normal';

  classes: string[] = [];
  icon: string = 'default';
  states = State;

  ngOnChanges(changes: {[propertyName: string]: SimpleChange}) {
    for (let prop of Object.keys(changes)) {
      let change = changes[prop];
      switch (prop) {
        case 'state':
          this.updateClasses(change.currentValue, this.mode);
          this.updateIcon(change.currentValue);
          break;
        case 'mode':
          this.updateClasses(this.state, change.currentValue);
          break;
      }
    }
  }

  private updateClasses(state: State, mode: string) {
    let colour = this.colour(state);
    switch (this.mode) {
      case 'minimal':
        this.classes = ['text-' + (colour || 'muted')];
        break;
      case 'normal':
        this.classes = ['tag', 'tag-' + (colour || 'default')];
        break;
    }
  }

  private updateIcon(state: State) {
    switch (state) {
      case State.TO_DO:
        this.icon = 'clock-o';
        break;
      case State.IN_PROGRESS:
        this.icon =  'play-circle-o';
        break;
      case State.ON_HOLD:
        this.icon =  'pause-circle-o';
        break;
      case State.DONE:
        this.icon =  'check-circle-o';
        break;
      default:
        this.icon =  'question-circle-o';
    }
  }

  private colour(state: State): string {
    switch (state) {
      case State.TO_DO:
        return 'primary';
      case State.IN_PROGRESS:
        return 'success';
      case State.ON_HOLD:
        return 'warning';
      case State.DONE:
        return 'danger';
      default:
        return undefined;
    }
  }

}
