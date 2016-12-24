import { Component, Input } from '@angular/core';

import { State } from '../api/state';

@Component({
  selector: 'my-state-badge',
  template: `
    <span class="tag tag-{{context()}}">{{states[state] | titlecase}}</span>
  `,
  styles: []
})
export class StateBadgeComponent {
  @Input()
  state: State;

  states = State;

  context(): string {
    switch (this.state) {
      case State.TO_DO:
        return 'info';
      case State.IN_PROGRESS:
        return 'success';
      case State.ON_HOLD:
        return 'warning';
      case State.DONE:
        return 'danger';
      default:
        return 'default';
    }
  }
}
