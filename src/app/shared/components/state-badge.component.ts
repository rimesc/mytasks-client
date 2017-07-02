import { Component, Input } from '@angular/core';

import { State } from '../../api/state';

@Component({
  selector: 'my-state-badge',
  template: `<my-badge label="{{states[state] | titlecase}}" [icon]="icon()" [context]="context()"></my-badge>`,
  styles: []
})
export class StateBadgeComponent {

  @Input()
  state: State;

  @Input()
  mode = 'normal';

  states = State;

  icon() {
    switch (this.state) {
      case State.TO_DO: return 'clock-o';
      case State.IN_PROGRESS: return 'play-circle-o';
      case State.ON_HOLD: return 'pause-circle-o';
      case State.DONE: return 'check-circle-o';
      default: return 'question-circle-o';
    }
  }

  context(): string {
    switch (this.state) {
      case State.TO_DO: return 'primary';
      case State.IN_PROGRESS: return 'success';
      case State.ON_HOLD: return 'warning';
      case State.DONE: return 'danger';
      default: return 'default';
    }
  }

}
